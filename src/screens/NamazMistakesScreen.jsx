import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../utils/translations';
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

// Motion components are now imported directly from framer-motion

// GlowCard component
const GlowCard = ({ children, className = '', ...props }) => (
  <div className={`relative ${className}`} {...props}>
    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl opacity-50"></div>
    <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl border border-amber-200/30 dark:border-amber-700/30 shadow-2xl">
      {children}
    </div>
  </div>
);

export default function NamazMistakesScreen() {
  const { t } = useTranslation();
  
  // Helper function to get translated mistake data
  const getTranslatedMistakes = () => [
    {
      id: 1,
      title: t('Rushing The Prayer'),
      mistake: t('Rushing The Prayer Mistake'),
      fix: t('Rushing The Prayer Fix'),
      category: t('tTmpo'),
      severity: 'High',
      tips: t('Rushing The Prayer Tips')
    },
    {
      id: 2,
      title: t('Incorrect Posture'),
      mistake: t('Incorrect Posture Mistake'),
      fix: t('Incorrect Posture Fix'),
      category: t('Posture'),
      severity: 'High',
      tips: t('In correct Posture Tips')
    },
    {
      id: 3,
      title: t('Lack OfFocus'),
      mistake: t('Lack OfFocus Mistake'),
      fix: t('Lack OfFocus Fix'),
      category: t('Spirituality'),
      severity: 'Medium',
      tips: t('Lack OfF ocusTips')
    },
      {
      id: 4,
      title: t('Not Reciting Fatiha'),
      mistake: t('Not Reciting Fatiha Mistake'),
      fix: t('Not Reciting Fatiha Fix'),
      category: t('Recitation'),
      severity: 'High',
      tips: t('Not Reciting Fatiha Tips')
    },
    {
      id: 5,
      title: t('Improper Dress'),
      mistake: t('Improper Dress Mistake'),
      fix: t('Imprope rDress Fix'),
      category: t('Appearance'),
      severity: 'Medium',
      tips: t('Improper Dress Tips')
    },
    {
      id: 6,
      title: t('Not Facing Qibla'),
      mistake: t('Not Facing Qibla Mistake'),
      fix: t('Not Facing Qibla Fix'),
      category: t('Direction'),
      severity: 'High',
      tips: t('NotFacing Qibla Tips')
    },
    {
      id: 7,
      title: t('Skipping Takbir'),
      mistake: t('Skipping Takbir Mistake'),
      fix: t('Skipping Takbir Fix'),
      category: t('Ritual'),
      severity: 'Medium',
      tips: t('Skipping Takbir Tips')
    },
    {
      id: 8,
      title: t('Not Maintaining Wudu'),
      mistake: t('Not Maintaining Wudu Mistake'),
      fix: t('Not Maintaining Wudu Fix'),
      category: t('Purification'),
      severity: 'High',
      tips: t('Not Maintaining Wudu Tips')
    },
    {
      id: 9,
      title: t('Rushing Between Positions'),
      mistake: t('Rushing Between Positions Mistake'),
      fix: t('Rushing Between Positions Fix'),
      category: t('Tempo'),
      severity: 'Medium',
      tips: t('Rushing Between Positions Tips')
    },
    {
      id: 10,
      title: t('Not Completing Prayer'),
      mistake: t('Not Completing Prayer Mistake'),
      fix: t('Not Completing Prayer Fix'),
      category: t('Completion'),
      severity: 'High',
      tips: t('Not Completing Prayer Tips')
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMistake, setSelectedMistake] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showTips, setShowTips] = useState(false);

  const mistakes = getTranslatedMistakes();
  
  const categories = ['all', ...new Set(mistakes.map(m => m.category))];
  
  const filteredMistakes = mistakes.filter(mistake => {
    const matchesSearch = mistake.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mistake.mistake.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mistake.fix.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mistake.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRandomMistake = () => {
    const randomIndex = Math.floor(Math.random() * mistakes.length);
    setSelectedMistake(mistakes[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12 py-6 sm:py-12 px-3 sm:px-4">
        {/* Header Section */}
        <motion.div 
          className="w-full text-center mb-12 sm:mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            <motion.div 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-6"
              variants={pulseAnimation}
              animate="animate"
            >
              ⚠️ {t('Common Mistakes In Prayer')}
            </motion.div>
            <div className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed px-2">
              {t('Learn To Avoid Common Errors And Improve Your Prayer')}
            </div>
          </div>
        </motion.div>
        {/* Islamic Quote Section */}
        <motion.div 
          className="w-full max-w-4xl mx-auto mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 text-center">
            <div className="text-2xl md:text-3xl font-arabic text-slate-800 dark:text-slate-200 mb-4 leading-relaxed font-bold">
              "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلاً أَنْ يُتْقِنَهُ"
            </div>
            <div className="text-base md:text-lg text-slate-600 dark:text-slate-300 opacity-90 italic mb-2">
              "Indeed, Allah loves that when one of you does something, he does it with excellence"
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
              Hadith
            </div>
          </div>
        </motion.div>

        {/* Priority Legend */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>{t('High Priority')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>{t('Medium Priority')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>{t('Low Priority')}</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="w-full max-w-4xl mx-auto mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <input
                  placeholder={t('Search Mistakes')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? t('all Categories') : cat}
                  </option>
                ))}
              </select>
              <motion.button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors"
                {...buttonPress}
              >
                {viewMode === 'grid' ? '🔲' : '📋'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results Count and Random Button */}
        <motion.div 
          className="w-full max-w-4xl mx-auto mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="flex justify-between items-center text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">{filteredMistakes.length} {t('Mistakes Found')}</span>
            <div className="flex gap-2">
              <motion.button
                onClick={getRandomMistake}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg"
                {...buttonPress}
              >
                🎲 {t('Random Mistake')}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mistakes Grid/List */}
        <motion.div 
          className="w-full max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredMistakes.length === 0 ? (
            <motion.div 
              className="text-center text-slate-600 dark:text-slate-400 text-lg py-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
              variants={fadeInUp}
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-semibold mb-2">{t('No Mistakes Found')}</p>
              <p className="text-sm">{t('Try Different Keywords')}</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredMistakes.map((mistake, index) => (
                <motion.div
                  key={mistake.id}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl hover:border-blue-400 dark:hover:border-blue-500"
                  onClick={() => setSelectedMistake(mistake)}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                        {mistake.title}
                      </h3>
                      <div className={`w-4 h-4 rounded-full ${getSeverityColor(mistake.severity)} shadow-lg`}></div>
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 mb-3 font-semibold">
                      {mistake.category}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 line-clamp-3 text-sm leading-relaxed">
                      {mistake.mistake}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {t('Severity')}: {mistake.severity}
                    </span>
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg text-sm font-semibold hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMistake(mistake);
                      }}
                      {...buttonPress}
                    >
                      {t('View Details')}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Mistake Details Modal */}
        {selectedMistake && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-slate-800/95 dark:to-slate-800/80 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getSeverityColor(selectedMistake.severity)}`}></div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{selectedMistake.title}</h2>
                </div>
                <motion.button
                  onClick={() => setSelectedMistake(null)}
                  className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-2xl"
                  {...buttonPress}
                >
                  ✕
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{t('The Mistake')}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{selectedMistake.mistake}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{t('How To Fix')}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{selectedMistake.fix}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{t('Category')}</h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    {selectedMistake.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{t('Severity')}</h3>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm text-white ${
                    selectedMistake.severity === 'High' ? 'bg-red-500' :
                    selectedMistake.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`}>
                    {selectedMistake.severity}
                  </span>
                </div>

                {selectedMistake.tips && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{t('Help ful Tips')}</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedMistake.tips}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <motion.button
                  onClick={() => setSelectedMistake(null)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all"
                  {...buttonPress}
                >
                  {t('Close')}
                </motion.button>
              </div>
            </GlowCard>
          </div>
        )}
      </div>
    </div>
  );
} 
