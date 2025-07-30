import React, { useState, useEffect } from 'react';
import AIChatComponent from '../components/AIChatComponent';

const AIAssistantScreen = () => {
  const [showChat, setShowChat] = useState(false);
  const [quickActions, setQuickActions] = useState([]);

  const aiFeatures = [
    {
      icon: '🕌',
      title: 'Prayer Guidance',
      description: 'Get detailed guidance on how to perform prayers correctly',
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '📖',
      title: 'Islamic Knowledge',
      description: 'Ask questions about Islamic teachings, Hadith, and Quran',
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    },
    {
      icon: '🤲',
      title: 'Dua & Supplications',
      description: 'Learn about various duas and when to recite them',
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '🧭',
      title: 'Spiritual Advice',
      description: 'Get personalized spiritual guidance and advice',
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    },
    {
      icon: '📚',
      title: 'Hadith Explanations',
      description: 'Understand the meaning and significance of Hadith',
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '🌟',
      title: 'Islamic Etiquette',
      description: 'Learn about Islamic manners and proper conduct',
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    }
  ];

  const commonQuestions = [
    "How do I perform Wudu correctly?",
    "What are the benefits of praying on time?",
    "How can I improve my concentration in prayer?",
    "What should I do if I miss a prayer?",
    "How do I make up for missed prayers?",
    "What are the virtues of each prayer time?",
    "How can I develop khushu' (humility) in prayer?",
    "What are the recommended supplications after prayer?",
    "How do I perform Istikhara prayer?",
    "What are the benefits of Tahajjud prayer?",
    "How should I behave in the mosque?",
    "What are the etiquettes of reading Quran?"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🤖</div>
        <h1 className="text-2xl sm:text-4xl font-bold text-brass mb-2">Islamic AI Assistant</h1>
        <p className="text-sm sm:text-lg text-mocha font-medium max-w-2xl mx-auto px-2">
          Your personal guide for Islamic knowledge, prayer guidance, and spiritual advice. 
          Ask me anything about Islam, prayers, duas, and Islamic teachings.
        </p>
      </div>

      {/* Quick Start Button */}
      <div className="text-center mb-8 sm:mb-12">
        <button
          onClick={() => setShowChat(true)}
          className="bg-gradient-to-r from-brass to-wood text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          🚀 Start Chatting with AI Assistant
        </button>
      </div>

      {/* AI Features Grid */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-wood mb-4 sm:mb-6 text-center">What I Can Help You With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              onClick={feature.action}
              className="bg-gradient-to-br from-[#fffbe6] to-[#f7ecd7] border-2 border-brass rounded-2xl p-4 sm:p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300 group"
            >
                             <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
               <h3 className="text-lg sm:text-xl font-bold text-brass mb-2">{feature.title}</h3>
               <p className="text-mocha text-xs sm:text-sm leading-relaxed font-medium">{feature.description}</p>
              <div className="mt-4 text-brass font-semibold group-hover:text-wood transition">
                Ask me about this →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Questions */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-wood mb-4 sm:mb-6 text-center">Common Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {commonQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setShowChat(true)}
              className="text-left p-3 sm:p-4 bg-gradient-to-r from-[#fffbe6] to-[#f7ecd7] border border-brass/30 rounded-xl hover:border-brass hover:shadow-md transition text-xs sm:text-sm font-medium text-mocha hover:text-brass hover:bg-gradient-to-r hover:from-brass hover:to-wood hover:text-white"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-[#fffbe6] to-[#f7ecd7] border-2 border-brass rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-brass mb-4 sm:mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                     <div className="text-center">
             <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">💬</div>
             <h3 className="text-base sm:text-lg font-bold text-wood mb-2">Ask Questions</h3>
             <p className="text-mocha text-xs sm:text-sm font-medium">Type your questions about Islam, prayers, or any Islamic topic</p>
           </div>
           <div className="text-center">
             <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🤖</div>
             <h3 className="text-base sm:text-lg font-bold text-wood mb-2">AI Response</h3>
             <p className="text-mocha text-xs sm:text-sm font-medium">Get accurate, respectful answers based on authentic Islamic sources</p>
           </div>
           <div className="text-center">
             <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📚</div>
             <h3 className="text-base sm:text-lg font-bold text-wood mb-2">Learn & Grow</h3>
             <p className="text-mocha text-xs sm:text-sm font-medium">Deepen your understanding and strengthen your faith</p>
           </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-wood mb-4 sm:mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                     <div className="bg-white border-2 border-brass rounded-xl p-4 sm:p-6">
             <div className="text-xl sm:text-2xl mb-2 sm:mb-3">🎯</div>
             <h3 className="text-base sm:text-lg font-bold text-brass mb-2">Accurate Information</h3>
             <p className="text-mocha text-xs sm:text-sm font-medium">All responses are based on authentic Islamic sources and scholarly consensus</p>
           </div>
           <div className="bg-white border-2 border-brass rounded-xl p-4 sm:p-6">
             <div className="text-xl sm:text-2xl mb-2 sm:mb-3">🤝</div>
             <h3 className="text-base sm:text-lg font-bold text-brass mb-2">Respectful Approach</h3>
             <p className="text-mocha text-xs sm:text-sm font-medium">Maintains Islamic etiquette and cultural sensitivity in all interactions</p>
           </div>
           <div className="bg-white border-2 border-brass rounded-xl p-4 sm:p-6">
             <div className="text-xl sm:text-2xl mb-2 sm:mb-3">📱</div>
             <h3 className="text-base sm:text-lg font-bold text-brass mb-2">Always Available</h3>
             <p className="text-mocha text-xs sm:text-sm font-medium">Get instant answers to your questions anytime, anywhere</p>
           </div>
           <div className="bg-white border-2 border-brass rounded-xl p-4 sm:p-6">
             <div className="text-xl sm:text-2xl mb-2 sm:mb-3">🌱</div>
             <h3 className="text-base sm:text-lg font-bold text-brass mb-2">Personal Growth</h3>
             <p className="text-mocha text-xs sm:text-sm font-medium">Tailored guidance to help you grow spiritually and religiously</p>
           </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showChat && (
        <AIChatComponent onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default AIAssistantScreen; 