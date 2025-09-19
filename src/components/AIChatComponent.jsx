import React, { useState, useRef, useEffect } from 'react';
import geminiService from '../utils/geminiService';
import { useTranslation } from '../utils/translations';

const AIChatComponent = ({ onClose, initialQuestion = '' }) => {
  const { t } = useTranslation();
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
      let errorMessage = t('error Sending Message');
      
      if (err.message && err.message.includes('503')) {
        errorMessage = t('service  High Traffic');
        setServiceStatus('overloaded');
      } else if (err.message && err.message.includes('overloaded')) {
        errorMessage = t('service High Traffic');
        setServiceStatus('overloaded');
      } else if (err.message && err.message.includes('quota')) {
        errorMessage = t('service Unavailable');
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
    t('how To Pray'),
    t('prayer Benefits'),
    t('concentration'),
    t('missed Prayer'),
    t('make Up Prayers'),
    t('prayer Virtues'),
    t('khushu'),
    t('supplications')
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
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {serviceStatus === 'overloaded' ? '🔄' : serviceStatus === 'error' ? '⚠️' : '🤖'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t('islamicAiAssistantTitle')}</h2>
            <p className="text-xs text-gray-400">
              {serviceStatus === 'overloaded' ? t('service High Traffic') :
               serviceStatus === 'error' ? t('service Unavailable') :
               t('ask Me Any thing General')}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300 text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-gray-300 py-8">
            <div className="text-6xl mb-6">🕌</div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('assalamuAlaikum')}</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">{t('here To Help You')}</p>
            
            {/* Quick Questions */}
            <div className="space-y-4">
              <p className="text-purple-400 font-semibold text-lg">{t('quick Questions Label')}</p>
              <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 text-gray-300 hover:text-white font-medium backdrop-blur-sm"
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
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm'
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</div>
              <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-gray-300 border border-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="animate-spin text-purple-400">🤖</div>
                <span className="text-sm">{t('thinking')}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl max-w-[80%] backdrop-blur-sm">
              <div className="text-sm mb-3">{error}</div>
              {retryCount < 3 && (
                <button
                  onClick={handleRetry}
                  className="text-xs px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors duration-300"
                >
                  🔄 {t('retry')}
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-gray-800/50 backdrop-blur-sm">
        {/* Service Status Indicator */}
        {serviceStatus !== 'available' && (
          <div className="mb-4 p-3 rounded-xl text-sm text-center backdrop-blur-sm">
            {serviceStatus === 'overloaded' ? (
              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                🔄 {t('service Busy TryAgain')}
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400">
                ⚠️ {t('service Unavailable Basic')}
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                serviceStatus === 'overloaded' ? t('service Busy TryAgain') :
                serviceStatus === 'error' ? t('serviceUnavailableBasic') :
                t('ask Me Any thing General')
              }
              className="w-full p-4 pr-12 border border-white/20 rounded-2xl resize-none focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 bg-white/5 text-white placeholder-gray-400 text-sm backdrop-blur-sm"
              rows="1"
              style={{ minHeight: '50px', maxHeight: '120px' }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
            >
              ➤
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => geminiService.resetChat()}
            className="text-xs px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full hover:bg-purple-600/30 transition-colors duration-300 border border-purple-500/30"
          >
            {t('new Chat')}
          </button>
          <button
            onClick={() => setMessages([])}
            className="text-xs px-4 py-2 bg-gray-600/20 text-gray-300 rounded-full hover:bg-gray-600/30 transition-colors duration-300 border border-gray-500/30"
          >
            {t('clear History')}
          </button>
          <button
            onClick={testAIService}
            className="text-xs px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full hover:bg-blue-600/30 transition-colors duration-300 border border-blue-500/30"
          >
            {t('test AI')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatComponent; 
