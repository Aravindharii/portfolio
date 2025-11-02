// components/ChatBot.jsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-open on both desktop and mobile after 1 second - FIX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage('bot', "Hello! I'm Aravind's AI assistant, powered by Google Gemini. I can help you learn about his experience, projects, skills, and research. What would you like to know?");
      }, 300);
    }
  }, [isOpen, messages.length]);

  // Focus input when opened on mobile - FIX for cursor
  useEffect(() => {
    if (isOpen && isMobile && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 600);
    }
  }, [isOpen, isMobile]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    addMessage('user', userMessage);
    setInputValue('');
    setError(null);
    setIsTyping(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-10)
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();
      setIsTyping(false);
      
      if (data.success) {
        addMessage('bot', data.message);
      } else {
        addMessage('bot', "I apologize, but I couldn't process that request. Please try again.");
        setError(data.error || 'Error');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      const errorMsg = error.name === 'AbortError' 
        ? "Request timed out. Please try again." 
        : "Connection error. Please check your internet and try again.";
      addMessage('bot', errorMsg);
      setError('Network Error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { icon: '💼', text: 'Work Experience', query: 'Tell me about your professional work experience and roles' },
    { icon: '🚀', text: 'Key Projects', query: 'What are your most significant projects?' },
    { icon: '⚡', text: 'Technical Skills', query: 'What are your technical skills and expertise?' },
    { icon: '📧', text: 'Contact Info', query: 'How can I contact you or connect with you?' },
    { icon: '📚', text: 'Research Work', query: 'Tell me about your research interests and work' },
    { icon: '🎓', text: 'Education', query: 'What is your educational background?' },
  ];

  const handleQuickAction = (query) => {
    addMessage('user', query);
    setInputValue('');
    setError(null);
    setIsTyping(true);
    
    setTimeout(async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            conversationHistory: messages.slice(-10)
          })
        });

        const data = await response.json();
        setIsTyping(false);
        
        if (data.success) {
          addMessage('bot', data.message);
        } else {
          addMessage('bot', "I apologize, but I couldn't process that request. Please try again.");
        }
      } catch (error) {
        setIsTyping(false);
        addMessage('bot', "Connection error. Please check your internet and try again.");
      }
    }, 500);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <>
      {/* Floating Button - Desktop Only */}
      {!isMobile && (
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 z-40 group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              />
              
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-2xl border border-blue-400/30">
                <span className="relative text-3xl">💬</span>
              </div>

              <motion.div
                className="absolute -top-3 -right-3 px-3 py-1.5 bg-blue-600 rounded-full text-xs font-semibold text-white shadow-lg"
                animate={{ 
                  y: [-3, -8, -3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Ask AI
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {/* Mobile Floating Button */}
      {isMobile && !isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-xl border border-blue-400/30">
            <span className="text-3xl">💬</span>
          </div>
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for Mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />
            )}

            {/* Chat Window */}
            <motion.div
              initial={isMobile ? { y: '100%', opacity: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
              animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
              exit={isMobile ? { y: '100%', opacity: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className={`fixed z-50 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col
                ${isMobile 
                  ? 'bottom-0 left-0 right-0 h-[92vh] rounded-t-3xl w-full' 
                  : 'bottom-6 right-6 w-[500px] h-[700px] rounded-2xl'
                }`}
            >
              {/* Header - Professional Style */}
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 px-6 py-4 border-b border-blue-400/20 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center text-lg font-semibold text-blue-600 dark:text-blue-400">
                      AI
                    </div>
                    <div>
                      <h2 className="text-white font-semibold text-base">Aravind's AI Assistant</h2>
                      <p className="text-blue-100 dark:text-blue-300 text-xs flex items-center gap-2">
                        <motion.span
                          className="w-1.5 h-1.5 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        Available (Powered by Gemini)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearChat}
                      className="w-9 h-9 hover:bg-white/15 rounded-lg flex items-center justify-center transition-colors text-white"
                      title="Clear chat"
                    >
                      <span className="text-lg">🗑</span>
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-9 h-9 hover:bg-white/15 rounded-lg flex items-center justify-center transition-colors text-white"
                      title="Close"
                    >
                      <span className="text-xl">✕</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white dark:bg-slate-950 custom-scrollbar">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">Welcome</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">Ask me anything about Aravind's profile</p>
                    
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 w-full px-1">
                      {quickActions.slice(0, isMobile ? 4 : 6).map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickAction(action.query)}
                          className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-xl hover:bg-blue-100 dark:hover:bg-slate-700 transition-all text-left"
                        >
                          <div className="text-xl mb-1.5">{action.icon}</div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white">{action.text}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                      <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-slate-700'
                      }`}>
                        {message.text}
                      </div>
                      <p className={`text-xs mt-1 px-2 ${
                        message.sender === 'user' 
                          ? 'text-gray-500 dark:text-gray-400' 
                          : 'text-gray-500 dark:text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2">
                    <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-950 flex-shrink-0">
                <div className="flex items-end gap-3 mb-2">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all caret-blue-600 dark:caret-blue-400"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 rounded-lg flex items-center justify-center transition-colors text-white font-semibold disabled:opacity-50"
                  >
                    ↑
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Powered by Google Gemini
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </>
  );
}
