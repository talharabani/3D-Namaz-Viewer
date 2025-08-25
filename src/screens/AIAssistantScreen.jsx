import React, { useState, useEffect } from 'react';
import AIChatComponent from '../components/AIChatComponent';
import { useTranslation } from '../utils/translations';
import { GlowCard } from '../components/nurui/spotlight-card';
import { 
  MotionDiv, 
  MotionCard, 
  MotionButton,
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions
} from '../utils/animations';

const AIAssistantScreen = () => {
  const { t } = useTranslation();
  const [showChat, setShowChat] = useState(false);
  const [quickActions, setQuickActions] = useState([]);

  const aiFeatures = [
    {
      icon: '🕌',
      title: t('prayerGuidance'),
      description: t('prayerGuidanceDesc'),
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '📖',
      title: t('islamicKnowledge'),
      description: t('islamicKnowledgeDesc'),
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    },
    {
      icon: '🤲',
      title: t('duasAndSupplications'),
      description: t('duasAndSupplicationsDesc'),
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '🧭',
      title: t('spiritualAdvice'),
      description: t('spiritualAdviceDesc'),
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    },
    {
      icon: '📚',
      title: t('hadithExplanations'),
      description: t('hadithExplanationsDesc'),
      action: () => setShowChat(true),
      color: 'from-brass to-wood'
    },
    {
      icon: '🌟',
      title: t('islamicEtiquette'),
      description: t('islamicEtiquetteDesc2'),
      action: () => setShowChat(true),
      color: 'from-wood to-brass'
    }
  ];

  const commonQuestions = [
    t('howToPray'),
    t('prayerBenefits'),
    t('concentration'),
    t('missedPrayer'),
    t('makeUpPrayers'),
    t('prayerVirtues'),
    t('khushu'),
    t('supplications'),
    t('istikhara'),
    t('tahajjud'),
    t('mosqueBehavior'),
    t('quranEtiquette')
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 py-8 px-4">
        {/* Header Section */}
        <div className="w-full text-center mb-8">
          <div className="text-5xl font-heading text-brass font-bold drop-shadow-2xl mb-4 bg-gradient-to-r from-brass to-wood bg-clip-text text-transparent">
            {t('islamicAiAssistantTitle')}
          </div>
          <div className="text-lg text-text dark:text-darktext opacity-90 max-w-2xl mx-auto">
            {t('islamicAiAssistantSubtitle')}
          </div>
        </div>

        {/* Quick Start Button */}
        <div className="w-full max-w-4xl text-center">
          <button
            onClick={() => setShowChat(true)}
            className="bg-gradient-to-r from-brass to-wood text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border border-wood"
          >
            🚀 {t('startChattingWithAssistant')}
          </button>
        </div>

        {/* AI Features Grid */}
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading text-brass font-bold">{t('whatICanHelpWith')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className="group relative card p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden cursor-pointer"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
                
                <div className="relative text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-brass mb-2">{feature.title}</h3>
                  <p className="text-sm text-text dark:text-darktext leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Questions */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-heading text-brass font-bold">{t('commonQuestions')}</h3>
              <p className="text-text dark:text-darktext">{t('clickAnyQuestionToStart')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setShowChat(true)}
                  className="text-left p-3 rounded-lg bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 hover:from-brass/20 hover:to-wood/20 transition-all duration-300 hover:scale-102"
                >
                  <span className="text-text dark:text-darktext text-sm">{question}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl shadow-2xl max-w-4xl w-full h-[80vh] border border-brass/20">
              <div className="flex items-center justify-between p-4 border-b border-brass/20">
                <h2 className="text-xl font-heading text-brass font-bold">{t('islamicAiAssistantTitle')}</h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                >
                  ✕
                </button>
              </div>
              <div className="h-full">
                <AIChatComponent />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantScreen; 