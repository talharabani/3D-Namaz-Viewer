import React, { useState, useRef, useEffect } from 'react';
import geminiService from '../utils/geminiService';

const AIChatComponent = ({ onClose, initialQuestion = '' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(initialQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [serviceStatus, setServiceStatus] = useState('available'); // 'available', 'overloaded', 'error'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, []);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);
    setServiceStatus('available');

    try {
      const response = await geminiService.sendMessage(message);
      
      // Check if response contains fallback indicators
      if (response.includes('fallback response') || response.includes('AI service is currently experiencing high traffic')) {
        setServiceStatus('overloaded');
      } else if (response.includes('quota has been exceeded')) {
        setServiceStatus('error');
      } else {
        setServiceStatus('available');
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI Chat Error:', err);
      
      // Handle different types of errors
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (err.message && err.message.includes('503')) {
        errorMessage = 'The AI service is currently overloaded. Please try again in a few minutes.';
        setServiceStatus('overloaded');
      } else if (err.message && err.message.includes('overloaded')) {
        errorMessage = 'The AI service is experiencing high traffic. Please try again later.';
        setServiceStatus('overloaded');
      } else if (err.message && err.message.includes('quota')) {
        errorMessage = 'Daily AI service quota exceeded. Please try again tomorrow.';
        setServiceStatus('error');
      } else {
        setServiceStatus('error');
      }
      
      setError(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I perform Wudu correctly?",
    "What are the benefits of praying on time?",
    "How can I improve my concentration in prayer?",
    "What should I do if I miss a prayer?",
    "How do I make up for missed prayers?",
    "What are the virtues of each prayer time?",
    "How can I develop khushu' (humility) in prayer?",
    "What are the recommended supplications after prayer?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    handleSendMessage(question);
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = messages.findLast(msg => msg.sender === 'user');
      if (lastUserMessage) {
        setError(null);
        setRetryCount(0);
        handleSendMessage(lastUserMessage.text);
      }
    }
  };

  // Debug function to test AI service
  const testAIService = async () => {
    console.log('🧪 Testing AI Service...');
    try {
      const response = await geminiService.sendMessage('Hello, can you help me with prayer guidance?');
      console.log('✅ AI Service Response:', response);
      return response;
    } catch (error) {
      console.error('❌ AI Service Error:', error);
      return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-br from-[#fffbe6] via-white to-[#f7ecd7] rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] sm:h-[80vh] flex flex-col border-2 border-brass">
        {/* Header */}
        <div className="bg-gradient-to-r from-brass to-wood text-white p-4 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {serviceStatus === 'overloaded' ? '🔄' : serviceStatus === 'error' ? '⚠️' : '🤖'}
            </div>
            <div>
              <h2 className="text-xl font-bold">Islamic AI Assistant</h2>
              <p className="text-sm opacity-90">
                {serviceStatus === 'overloaded' ? 'Service experiencing high traffic' :
                 serviceStatus === 'error' ? 'Service temporarily unavailable' :
                 'Ask me anything about Islam, prayers, and guidance'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                      {messages.length === 0 && !isLoading && (
              <div className="text-center text-mocha py-4 sm:py-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🕌</div>
                <h3 className="text-base sm:text-lg font-bold text-brass mb-2">Assalamu alaikum!</h3>
                <p className="text-xs sm:text-sm mb-4 sm:mb-6">I'm here to help you with Islamic knowledge and prayer guidance.</p>
                
                {/* Quick Questions */}
                <div className="space-y-2">
                  <p className="text-xs text-wood font-semibold">Quick Questions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-left p-2 sm:p-3 bg-gradient-to-r from-[#fffbe6] to-[#f7ecd7] rounded-lg border border-brass/30 hover:border-brass hover:shadow-md transition text-xs sm:text-sm text-mocha font-medium"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-brass to-wood text-white'
                    : 'bg-gradient-to-r from-[#fffbe6] to-[#f7ecd7] text-mocha border border-brass/30'
                }`}
              >
                <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{message.text}</div>
                <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-wood'}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-[#fffbe6] to-[#f7ecd7] text-mocha border border-brass/30 p-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="animate-spin text-brass">🤖</div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl max-w-[80%]">
                <div className="text-sm mb-2">{error}</div>
                {retryCount < 3 && (
                  <button
                    onClick={handleRetry}
                    className="text-xs px-3 py-1 bg-red-100 hover:bg-red-200 rounded-full transition"
                  >
                    🔄 Retry
                  </button>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-brass/30">
          {/* Service Status Indicator */}
          {serviceStatus !== 'available' && (
            <div className="mb-2 p-2 rounded-lg text-xs text-center">
              {serviceStatus === 'overloaded' ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700">
                  🔄 AI service is experiencing high traffic. Responses may be delayed.
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 text-red-700">
                  ⚠️ AI service temporarily unavailable. Basic responses provided.
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  serviceStatus === 'overloaded' ? "Service busy - try again in a few minutes..." :
                  serviceStatus === 'error' ? "Service unavailable - basic responses only..." :
                  "Ask me about Islamic knowledge, prayers, or guidance..."
                }
                className="w-full p-2 sm:p-3 pr-10 sm:pr-12 border border-brass/30 rounded-2xl resize-none focus:outline-none focus:border-brass focus:ring-2 focus:ring-brass/20 bg-[#fffbe6] text-mocha placeholder-mocha/60 text-xs sm:text-sm"
                rows="1"
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brass text-white flex items-center justify-center hover:bg-wood disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
              >
                ➤
              </button>
            </div>
          </div>
          
                     {/* Action Buttons */}
           <div className="flex gap-2 mt-2 sm:mt-3">
             <button
               onClick={() => geminiService.resetChat()}
               className="text-xs px-2 sm:px-3 py-1 bg-wood text-white rounded-full hover:bg-brass transition"
             >
               New Chat
             </button>
             <button
               onClick={() => setMessages([])}
               className="text-xs px-2 sm:px-3 py-1 bg-gray-200 text-mocha rounded-full hover:bg-gray-300 transition"
             >
               Clear History
             </button>
             <button
               onClick={testAIService}
               className="text-xs px-2 sm:px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
             >
               Test AI
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatComponent; 