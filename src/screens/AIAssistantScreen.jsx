import React, { useState, useEffect } from 'react';
import AIChatComponent from '../components/AIChatComponent';
import { useTranslation } from '../utils/translations';
import { motion } from 'framer-motion';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions,
  pulseAnimation,
  mosqueGlow
} from '../utils/animations';

const AIAssistantScreen = () => {
  const { t } = useTranslation();
  const [showChat, setShowChat] = useState(false);
  const [quickActions, setQuickActions] = useState([]);

  const aiFeatures = [
    {
      icon: '🕌',
      title: t('prayer Guidance'),
      description: t('prayer Guidance Desc'),
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '📖',
      title: t('islamic Knowledge'),
      description: t('islamic Knowledge Desc'),
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    },
    {
      icon: '🤲',
      title: t('duas And Supplications'),
      description: t('duas And Supplications Desc'),
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '🧭',
      title: t('spiritual Advice'),
      description: t('spiritual Advice Desc'),
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    },
    {
      icon: '📚',
      title: t('hadith Explanations'),
      description: t('hadith Explanations Desc'),
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '🌟',
      title: t('islamic Etiquette'),
      description: t('islamic Etiquette Desc'),
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    }
  ];

  const commonQuestions = [
    t('how To Pray'),
    t('prayer Benefits'),
    t('concentration'),
    t('missed Prayer'),
    t('make Up Prayers'),
    t('prayer Virtues'),
    t('khushu'),
    t('supplications'),
    t('istikhara'),
    t('tahajjud'),
    t('mosque Behavior'),
    t('quran Etiquette')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-12 py-12 px-4">
        {/* Header Section */}
        <motion.div 
          className="w-full text-center mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="relative">
            <motion.div 
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              variants={pulseAnimation}
              animate="animate"
            >
              {t('islamic AiAssistant Title')}
            </motion.div>
            <div className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('islamic AiAssistant Subtitle')}
            </div>
          </div>
        </motion.div>

        {/* Quick Start Button */}
        <motion.div 
          className="w-full max-w-4xl text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.smooth, delay: 0.2 }}
        >
          <motion.button
            onClick={() => setShowChat(true)}
            className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-500 border border-purple-400/30 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative flex items-center gap-3">
              <span className="text-3xl group-hover:animate-bounce">🚀</span>
              {t('start Chatting With Assistant')}
            </div>
          </motion.button>
        </motion.div>

        {/* AI Features Grid */}
        <motion.div 
          className="w-full max-w-7xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="text-center mb-12"
            variants={staggerItem}
          >
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('what I Can Help With')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                onClick={feature.action}
                className="group relative p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl hover:bg-white/20 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                variants={staggerItem}
                whileHover={{ y: -10, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative text-center">
                  <motion.div 
                    className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/50 rounded-3xl transition-colors duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Common Questions */}
        <motion.div 
          className="w-full max-w-6xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.smooth, delay: 0.4 }}
        >
          <div className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('common Questions')}
              </h3>
              <p className="text-gray-300 text-lg">{t('click Any Question To Start')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => setShowChat(true)}
                  className="group text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-102 backdrop-blur-sm"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-white group-hover:text-purple-300 transition-colors duration-300 font-medium">
                    {question}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Chat Modal */}
        {showChat && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.smooth}
          >
            <motion.div 
              className="bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full h-[85vh] border border-purple-400/30 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={transitions.spring}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🤖</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{t('islamic Ai Assistant Title')}</h2>
                    <p className="text-gray-400">AI-powered Islamic guidance</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowChat(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className="h-full">
                <AIChatComponent onClose={() => setShowChat(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantScreen; 
