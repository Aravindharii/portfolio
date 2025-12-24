// components/ChatBot.jsx (FULLY FIXED - No Early Returns, Auto-open Works)
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
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // ✅ Added explicit desktop flag
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasAutoOpenedRef = useRef(false);

  // ✅ SINGLE device detection effect
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // ✅ Auto-open ONLY on desktop with fixed dependency array


  // ✅ Auto-open ONLY on desktop with fixed dependency array
  useEffect(() => {
    if (isDesktop && !isOpen && !hasAutoOpenedRef.current) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        hasAutoOpenedRef.current = true; // Mark as opened
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]); // ✅ Remove isOpen from dependencies

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        addMessage('bot', "Hello! 👋 I'm Aravind's AI assistant. Feel free to ask me about his experience, projects, skills, or research. What would you like to know?");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Focus input when opened on mobile
  useEffect(() => {
    if (isOpen && isMobile && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile]);


  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
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
      const timeoutId = setTimeout(() => controller.abort(), 15000);

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

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickActions = [
    { icon: '💼', text: 'Experience', query: 'Tell me about your professional work experience and roles' },
    { icon: '🚀', text: 'Projects', query: 'What are your most significant projects?' },
    { icon: '⚡', text: 'Skills', query: 'What are your technical skills and expertise?' },
    { icon: '📧', text: 'Contact', query: 'How can I contact you or connect with you?' },
    { icon: '📚', text: 'Research', query: 'Tell me about your research interests and work' },
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

  // Responsive dimensions - ✅ No early returns
  const getDimensions = () => {
    if (isMobile) {
      return { width: '100%', height: '100vh', rounded: 'rounded-t-3xl' };
    }
    if (isTablet) {
      return { width: '90%', height: '85vh', rounded: 'rounded-2xl' };
    }
    return { width: '520px', height: '750px', rounded: 'rounded-2xl' };
  };

  const dims = getDimensions();

  // ✅ ALL RENDERING HAPPENS BELOW - No early returns above this
  return (
    <>
      {/* Floating Button - All Devices */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 group"
            aria-label="Open chat"
          >
            {/* Glowing background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* Main button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border border-purple-300/30 hover:shadow-purple-500/50 hover:shadow-2xl transition-all active:scale-95">
              <span className="relative text-3xl">💬</span>
            </div>

            {/* Ask Me Badge - All Devices */}
            <motion.div
              className="absolute -top-2 -right-2 px-2.5 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white shadow-lg border border-purple-400/50"
              animate={{
                y: [-2, -10, -2],
                scale: [1, 1.15, 1]
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              Ask Me
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Mobile & Tablet */}
            {(isMobile || isTablet) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              />
            )}

            {/* Chat Window - Fully Responsive */}
            <motion.div
              initial={isMobile ? { y: '100%', opacity: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
              animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
              exit={isMobile ? { y: '100%', opacity: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className={`fixed z-50 bg-black border border-white/10 shadow-2xl overflow-hidden flex flex-col
                ${isMobile
                  ? 'bottom-0 left-0 right-0 h-screen rounded-t-3xl w-full'
                  : isTablet
                    ? 'bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 rounded-2xl'
                    : 'bottom-6 right-6 rounded-2xl'
                }
                ${dims.rounded}`}
              style={{
                width: dims.width,
                height: dims.height,
                maxHeight: isMobile ? 'calc(100vh - 40px)' : dims.height,
              }}
            >
              {/* Header - Synced Design */}
              <div className="relative bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 backdrop-blur-sm px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-lg font-bold text-white flex-shrink-0 border border-purple-400/50 shadow-lg"
                    >
                      🤖
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-white font-bold text-sm sm:text-base truncate">Aravind's AI Assistant</h2>
                      <p className="text-purple-300/70 text-xs flex items-center gap-1.5">
                        <motion.span
                          className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span>Powered by Gemini</span>
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons - User Friendly */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearChat}
                      className="w-8 h-8 sm:w-9 sm:h-9 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all text-gray-300 hover:text-white"
                      title="Clear conversation"
                      aria-label="Clear chat"
                    >
                      🗑️
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setIsOpen(false)}
                      className="w-9 h-9 sm:w-10 sm:h-10 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 rounded-lg flex items-center justify-center transition-all text-gray-300 hover:text-white group relative"
                      title="Close chat"
                      aria-label="Close chat"
                    >
                      <motion.span
                        className="text-xl font-light"
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 90 }}
                      >
                        ✕
                      </motion.span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 sm:py-5 space-y-3 sm:space-y-4 custom-scrollbar">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-6 sm:py-8 px-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], y: [0, -8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="text-5xl sm:text-6xl mb-4 sm:mb-6"
                    >
                      🤖
                    </motion.div>
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1.5">Welcome!</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-7 sm:mb-8 max-w-xs">Ask me anything about Aravind's experience, projects, and skills</p>

                    {/* Quick Actions */}
                    <div className={`grid gap-2.5 sm:gap-3 w-full max-w-md
                      ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}
                    `}>
                      {quickActions.slice(0, isMobile ? 4 : 6).map((action, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAction(action.query)}
                          className="p-2.5 sm:p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 rounded-lg sm:rounded-xl hover:bg-purple-500/20 transition-all text-left group"
                        >
                          <div className="text-lg sm:text-xl mb-1.5 group-hover:scale-110 transition-transform">{action.icon}</div>
                          <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors line-clamp-2">{action.text}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
                  >
                    <div className={`flex gap-2.5 max-w-[90%] sm:max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      {message.sender === 'bot' && (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-lg">
                          AI
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <div className={`rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm leading-relaxed break-words ${message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none shadow-lg'
                          : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 rounded-bl-none'
                          }`}>
                          {message.text}
                        </div>
                        <div className="flex items-center gap-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <p className={`text-xs ${message.sender === 'user'
                            ? 'text-gray-400'
                            : 'text-gray-500'
                            }`}>
                            {message.timestamp}
                          </p>
                          {message.sender === 'bot' && (
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(message.text, message.id)}
                              className="text-gray-500 hover:text-purple-400 transition-colors text-xs"
                              title="Copy message"
                              aria-label="Copy message"
                            >
                              {copiedId === message.id ? '✓' : '📋'}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-lg">
                      AI
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-400 rounded-full"
                            animate={{ y: [0, -8, 0], scale: [1, 1.15, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-3.5 sm:p-5 bg-black/50 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-end gap-2 sm:gap-3">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all caret-purple-500 resize-none"
                    disabled={isTyping}
                    rows="1"
                    aria-label="Message input"
                  />
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 rounded-lg flex items-center justify-center transition-all text-white font-semibold disabled:opacity-50 flex-shrink-0 shadow-lg hover:shadow-purple-500/50"
                    aria-label="Send message"
                  >
                    <span className="text-lg">→</span>
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2 opacity-60">
                  Press Enter to send
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
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }

        .custom-scrollbar {
          scroll-behavior: smooth;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
