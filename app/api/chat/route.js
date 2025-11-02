// app/api/chat/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Portfolio context for AI
const PORTFOLIO_CONTEXT = `
You are an AI assistant for Aravind V H's professional portfolio website. You should be friendly, professional, and helpful. Keep responses concise and engaging.

PROFESSIONAL SUMMARY:
- Full Stack Developer specializing in MERN Stack (MongoDB, Express.js, React, Node.js)
- Currently working at Expertzlab Technologies Pvt Ltd (August 2024 - Present)
- 2+ years of experience in web development
- Based in Ernakulam, Kerala, India

CURRENT ROLE:
- Developing Eduvocate, a scalable e-learning platform using React, Node.js, MongoDB, and FastAPI
- Implementing microservices architecture with Nameko
- Built Expertzlab.com using Next.js, Sanity CMS, Firebase, and Nodemailer

TECHNICAL SKILLS:
- Languages: JavaScript, TypeScript
- Frontend: React, Next.js, Angular
- Backend: Node.js, Express.js
- Databases: MongoDB, SQL, Firebase
- Cloud: AWS, GCP
- Web: Bootstrap, Tailwind CSS, HTML5, CSS3

PROJECTS:
1. Eduvocate - E-learning platform (React, Node.js, MongoDB, FastAPI)
2. Expertzlab.com - Training website (Next.js, Sanity CMS, Firebase)
3. AI Chatbot Nova - Hybrid AI chatbot
4. EcoShopper - E-commerce platform
5. IoT Research - Published in IJIRT, IJRSET, IJCRT

RESEARCH:
- "Scalable IoT Architectures Using Microservices"
- Published in 3 international journals

EDUCATION:
- MCom - Mahatma Gandhi University (2024-2026)
- Bachelor of Commerce - Rajagiri College (2021-2024)
- MERN Stack Training - GoFreeLab Technologies

CONTACT:
- Email: aravindhari1718@gmail.com
- Phone: +91 9995475379
- LinkedIn: linkedin.com/in/aravind-v-h-4862b5287
- Location: Ernakulam, Kerala, India

INSTRUCTIONS:
- Be friendly and professional
- Keep responses SHORT (2-3 sentences max)
- Provide accurate information only
- Suggest reaching out to Aravind for detailed discussions
`;

// Portfolio keywords for intelligent matching
const PORTFOLIO_KEYWORDS = {
  experience: ['experience', 'work', 'job', 'role', 'position', 'worked', 'working', 'company', 'expertzlab'],
  projects: ['project', 'portfolio', 'built', 'developed', 'created', 'eduvocate', 'ecommerce', 'chatbot', 'research'],
  skills: ['skill', 'expertise', 'technology', 'language', 'framework', 'database', 'tool', 'stack', 'mern', 'react', 'node', 'mongodb', 'javascript'],
  education: ['education', 'college', 'university', 'study', 'degree', 'course', 'training', 'rajagiri', 'mcom'],
  contact: ['contact', 'email', 'phone', 'linkedin', 'connect', 'reach', 'address', 'location', 'phone number'],
  research: ['research', 'paper', 'publication', 'journal', 'iot', 'microservices', 'architecture'],
};

// Models to try (ordered by speed)
const MODELS_TO_TRY = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-flash-latest',
  'gemini-pro-latest'
];

/**
 * EXTREME LEVEL LOGIC: Intelligent Query Classifier
 * Analyzes query relevance to portfolio with confidence scoring
 */
function classifyQuery(message) {
  const query = message.toLowerCase();
  
  // Level 1: Direct keyword matching with scoring
  let categoryMatches = {};
  let maxScore = 0;
  let matchedCategory = null;

  for (const [category, keywords] of Object.entries(PORTFOLIO_KEYWORDS)) {
    let score = 0;
    let matchCount = 0;

    keywords.forEach(keyword => {
      if (query.includes(keyword)) {
        score += 10;
        matchCount++;
        // Boost score if multiple keywords match
        if (matchCount > 1) score += 5;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      matchedCategory = category;
    }
    categoryMatches[category] = score;
  }

  // Level 2: Semantic relevance analysis
  const commonPhrases = {
    about_aravind: ['tell me about', 'who is', 'about aravind', 'profile', 'background'],
    help_general: ['help', 'assist', 'explain', 'define', 'what is', 'how to', 'how does'],
    hiring: ['hire', 'recruiter', 'recruitment', 'opportunity', 'vacancy', 'position'],
  };

  let semanticBoost = 0;
  for (const [phrase, keywords] of Object.entries(commonPhrases)) {
    keywords.forEach(keyword => {
      if (query.includes(keyword)) {
        if (phrase === 'about_aravind') semanticBoost += 15;
        else if (phrase === 'hiring') semanticBoost += 20;
        else if (phrase === 'help_general') semanticBoost += 3;
      }
    });
  }

  // Level 3: Calculate final confidence score (0-100)
  let confidenceScore = Math.min(maxScore + semanticBoost, 100);

  // Level 4: Query length and specificity check
  const wordCount = query.split(' ').length;
  if (wordCount < 3) confidenceScore *= 0.8; // Boost short queries with keywords
  if (wordCount > 50) confidenceScore *= 0.95; // Slight penalty for very long queries

  // Level 5: Repeated context detection
  const isGeneralQuestion = query.match(/^(what|how|why|when|where|which|who)/i) && 
                            matchedCategory === null;
  
  if (isGeneralQuestion) {
    confidenceScore = Math.max(0, confidenceScore - 20);
  }

  return {
    message: message,
    query: query,
    matchedCategory: matchedCategory,
    confidenceScore: Math.round(confidenceScore),
    categoryScores: categoryMatches,
    isPortfolioRelated: confidenceScore >= 40,
    responseType: 
      confidenceScore >= 80 ? 'portfolio_focused' :
      confidenceScore >= 40 ? 'hybrid' : 'general_knowledge'
  };
}

/**
 * EXTREME LEVEL: Build contextual prompt based on classification
 */
function buildContextualPrompt(message, classification, conversationHistory) {
  const { responseType, matchedCategory, confidenceScore } = classification;
  
  let prompt = '';

  // Build system instruction
  if (responseType === 'portfolio_focused') {
    prompt += `${PORTFOLIO_CONTEXT}\n\n`;
    prompt += `[INSTRUCTION: User is asking about Aravind's ${matchedCategory || 'profile'}. Use portfolio context. Keep response SHORT (2-3 sentences).]\n\n`;
  } 
  else if (responseType === 'hybrid') {
    prompt += `${PORTFOLIO_CONTEXT}\n\n`;
    prompt += `[INSTRUCTION: This is somewhat related to Aravind's profile. Try to connect to portfolio where possible, but also use general knowledge. Keep response SHORT (2-3 sentences).]\n\n`;
  } 
  else {
    // General knowledge mode - minimal portfolio context
    prompt += `You are a helpful AI assistant. You can mention Aravind V H is a Full Stack Developer if relevant, but primarily provide helpful general knowledge responses.\n\n`;
    prompt += `[INSTRUCTION: This question is not directly about Aravind's portfolio. Provide a helpful general answer. If the topic could relate to Aravind's skills, mention that context. Keep response SHORT (2-3 sentences).]\n\n`;
  }

  // Add conversation history (last 5 messages)
  if (conversationHistory && conversationHistory.length > 0) {
    prompt += 'CONVERSATION CONTEXT:\n';
    conversationHistory.slice(-5).forEach(msg => {
      const sender = msg.sender === 'user' ? 'User' : 'Assistant';
      prompt += `${sender}: ${msg.text}\n`;
    });
    prompt += '\n';
  }

  // Add the current message with confidence indicator
  prompt += `[User Query - Relevance: ${classification.confidenceScore}%]\n`;
  prompt += `User: ${message}\n`;
  prompt += `Assistant:`;

  return prompt;
}

/**
 * EXTREME LEVEL: Validate and refine response
 */
function validateResponse(response, classification) {
  // Check if response is valid
  if (!response || response.trim() === '') {
    return { valid: false, reason: 'Empty response' };
  }

  // Check for generic/unhelpful responses in general mode
  if (classification.responseType === 'general_knowledge') {
    const genericPhrases = [
      'i cannot help with that',
      'i don\'t have information',
      'i\'m unable to',
      'i can\'t provide',
      'contact aravind'
    ];

    const isGeneric = genericPhrases.some(phrase => 
      response.toLowerCase().includes(phrase)
    );

    if (isGeneric) {
      return { 
        valid: false, 
        reason: 'Too generic for general knowledge mode',
        shouldRetry: true 
      };
    }
  }

  // Check response length (should be 2-3 sentences max)
  const sentenceCount = (response.match(/[.!?]/g) || []).length;
  if (sentenceCount > 5) {
    return { 
      valid: true, 
      warning: 'Response too long',
      trimmed: response.split(/[.!?]/)[0] + '.'
    };
  }

  return { valid: true, reason: 'Response is valid' };
}

/**
 * POST handler for chat messages
 */
export async function POST(request) {
  let selectedModel = null;
  let lastError = null;
  let classification = null;

  try {
    const { message, conversationHistory } = await request.json();

    // Validate input
    if (!message || message.trim() === '') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Message is required',
          error: 'Empty message'
        },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key not configured');
      return NextResponse.json(
        { 
          success: false,
          message: 'AI service is not properly configured.',
          error: 'Missing API key'
        },
        { status: 500 }
      );
    }

    // EXTREME LEVEL 1: Classify the query
    classification = classifyQuery(message);
    console.log('🔍 Query Classification:', {
      category: classification.matchedCategory,
      confidence: classification.confidenceScore,
      type: classification.responseType
    });

    // EXTREME LEVEL 2: Build contextual prompt
    const prompt = buildContextualPrompt(message, classification, conversationHistory);

    // Try each model with intelligent error handling
    for (const modelName of MODELS_TO_TRY) {
      try {
        selectedModel = modelName;
        console.log(`📡 Trying model: ${modelName} [${classification.responseType}]`);

        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: classification.responseType === 'general_knowledge' ? 0.7 : 0.6,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 500,
          }
        });

        // Use streaming for faster response
        const streamResponse = await model.generateContentStream(prompt);
        
        // Collect all chunks
        let fullText = '';
        for await (const chunk of streamResponse.stream) {
          fullText += chunk.text();
        }

        const text = fullText.trim();

        if (!text || text === '') {
          console.warn(`⚠️ Model ${modelName} returned empty response`);
          lastError = 'Empty response';
          continue;
        }

        // EXTREME LEVEL 3: Validate response quality
        const validation = validateResponse(text, classification);
        
        if (!validation.valid && validation.shouldRetry) {
          console.warn(`⚠️ Response validation failed: ${validation.reason}`);
          lastError = validation.reason;
          continue;
        }

        const finalResponse = validation.trimmed || text;

        console.log(`✅ Success with ${modelName} [${classification.responseType}]`);

        return NextResponse.json({
          success: true,
          message: finalResponse,
          model: selectedModel,
          classification: {
            category: classification.matchedCategory,
            confidence: classification.confidenceScore,
            responseType: classification.responseType,
            isPortfolioRelated: classification.isPortfolioRelated
          },
          timestamp: new Date().toISOString()
        }, { status: 200 });

      } catch (modelError) {
        console.warn(`⚠️ Model ${modelName} failed:`, modelError.message);
        lastError = modelError;
        
        if (modelError.message.includes('timeout')) {
          continue;
        }
        if (modelError.message.includes('API key') || modelError.message.includes('authentication')) {
          throw modelError;
        }
        continue;
      }
    }

    // If all models failed
    throw lastError || new Error('All models failed to respond');

  } catch (error) {
    console.error('❌ Gemini API Error:', {
      message: error.message,
      model: selectedModel,
      classification: classification?.responseType,
      timestamp: new Date().toISOString()
    });

    let userMessage = "I'm temporarily unavailable. Please try again in a moment.";
    let statusCode = 500;

    if (error.message.includes('timeout')) {
      userMessage = "Request timed out. Please try again.";
      statusCode = 504;
    } else if (error.message.includes('API key') || error.message.includes('authentication')) {
      userMessage = "Configuration error. Please contact Aravind.";
      statusCode = 401;
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      userMessage = "Network error. Please check your connection.";
      statusCode = 503;
    } else if (error.message.includes('rate')) {
      userMessage = "Rate limited. Please wait a moment.";
      statusCode = 429;
    }

    return NextResponse.json({
      success: false,
      message: `${userMessage} Contact: aravindhari1718@gmail.com or +91 9995475379`,
      error: error.message,
      model: selectedModel,
      timestamp: new Date().toISOString()
    }, { status: statusCode });
  }
}

/**
 * GET handler - returns API status
 */
export async function GET(request) {
  try {
    const hasApiKey = !!process.env.GEMINI_API_KEY;
    
    return NextResponse.json({
      status: hasApiKey ? 'configured' : 'missing',
      message: hasApiKey 
        ? 'Gemini AI Chat API is running with intelligent portfolio matching' 
        : 'Gemini API key is not configured.',
      service: 'Gemini AI Chat with Extreme Logic Classification',
      availableModels: MODELS_TO_TRY,
      features: [
        'Intelligent query classification',
        'Semantic relevance scoring',
        'Hybrid portfolio + general knowledge mode',
        'Response validation',
        'Confidence-based routing'
      ],
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to check API status',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * OPTIONS handler
 */
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
    }
  });
}
