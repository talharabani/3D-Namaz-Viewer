import React, { useState, useEffect } from 'react';
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

export default function NamazMistakesScreen() {
  const { t } = useTranslation();
  
  // Helper function to get translated mistake data
  const getTranslatedMistakes = () => [
    {
      id: 1,
      title: t('rushingThePrayer'),
      mistake: t('rushingThePrayerMistake'),
      fix: t('rushingThePrayerFix'),
      category: t('tempo'),
      severity: 'High',
      tips: t('rushingThePrayerTips')
    },
    {
      id: 2,
      title: t('incorrectPosture'),
      mistake: t('incorrectPostureMistake'),
      fix: t('incorrectPostureFix'),
      category: t('posture'),
      severity: 'High',
      tips: t('incorrectPostureTips')
    },
    {
      id: 3,
      title: t('lackOfFocus'),
      mistake: t('lackOfFocusMistake'),
      fix: t('lackOfFocusFix'),
      category: t('spirituality'),
      severity: 'Medium',
      tips: t('lackOfFocusTips')
    },
      {
      id: 4,
      title: t('notRecitingFatiha'),
      mistake: t('notRecitingFatihaMistake'),
      fix: t('notRecitingFatihaFix'),
      category: t('recitation'),
      severity: 'High',
      tips: t('notRecitingFatihaTips')
    },
    {
      id: 5,
      title: t('improperDress'),
      mistake: t('improperDressMistake'),
      fix: t('improperDressFix'),
      category: t('appearance'),
      severity: 'Medium',
      tips: t('improperDressTips')
    },
    {
      id: 6,
      title: t('notFacingQibla'),
      mistake: t('notFacingQiblaMistake'),
      fix: t('notFacingQiblaFix'),
      category: t('direction'),
      severity: 'High',
      tips: t('notFacingQiblaTips')
    },
    {
      id: 7,
      title: t('skippingTakbir'),
      mistake: t('skippingTakbirMistake'),
      fix: t('skippingTakbirFix'),
      category: t('ritual'),
      severity: 'Medium',
      tips: t('skippingTakbirTips')
    },
    {
      id: 8,
      title: t('notMaintainingWudu'),
      mistake: t('notMaintainingWuduMistake'),
      fix: t('notMaintainingWuduFix'),
      category: t('purification'),
      severity: 'High',
      tips: t('notMaintainingWuduTips')
    },
    {
      id: 9,
      title: t('rushingBetweenPositions'),
      mistake: t('rushingBetweenPositionsMistake'),
      fix: t('rushingBetweenPositionsFix'),
      category: t('tempo'),
      severity: 'Medium',
      tips: t('rushingBetweenPositionsTips')
    },
    {
      id: 10,
      title: t('notCompletingPrayer'),
      mistake: t('notCompletingPrayerMistake'),
      fix: t('notCompletingPrayerFix'),
      category: t('completion'),
      severity: 'High',
      tips: t('notCompletingPrayerTips')
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
    <MotionDiv 
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative"
      {...pageTransition}
    >
      {/* Floating Islamic Calligraphy - Perfectly Positioned */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-30">
        <GlowCard className="group islamic-calligraphy bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-2xl p-3 sm:p-4 border border-brass/30 shadow-2xl backdrop-blur-sm hover:shadow-3xl hover:scale-105 transition-all duration-500 max-w-[140px] sm:max-w-[160px] md:max-w-[180px]">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-arabic text-brass mb-1 group-hover:text-amber-600 transition-colors duration-300">⚠️</div>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-brass transition-colors duration-300">أخطاء</h2>
          </div>
        </GlowCard>
      </div>

      <div className="w-full max-w-7xl mx-auto py-8 px-4 pt-24 sm:pt-28">
        {/* Beautiful Calligraphy Header - Perfectly Centered */}
        <div className="text-center mb-16 flex flex-col items-center justify-center min-h-[40vh] px-4">
          {/* Arabic Calligraphy - Perfectly Centered */}
          <div className="mb-16 animate-fadeInScale text-center w-full max-w-5xl arabic-content">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-arabic text-brass mb-8 leading-none drop-shadow-2xl animate-pulse arabic-text-center font-bold tracking-wide">
              ⚠️ {t('commonMistakesInPrayer')}
            </div>
            <div className="text-sm md:text-base text-text dark:text-darktext opacity-80 italic text-center mx-auto max-w-2xl">
              {t('learnToAvoidCommonErrorsAndImproveYourPrayer')}
            </div>
          </div>

          {/* Enhanced Islamic Design - Perfectly Centered */}
          <div className="relative mb-16 animate-fadeInUp text-center w-full max-w-5xl arabic-content">
            {/* Decorative Islamic pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-brass to-transparent opacity-40 animate-shimmer"></div>
            </div>
            
            {/* Beautiful Arabic Calligraphy - Perfectly Centered */}
            <div className="mb-8 text-center w-full">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arabic text-brass mb-6 leading-relaxed drop-shadow-xl animate-float arabic-text-center font-bold tracking-wide">
                أخطاء الصلاة
              </div>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
                {t('avoidCommonPrayerMistakes')}
              </p>
            </div>

            {/* Enhanced Islamic quote with better styling - Perfectly Centered */}
            <GlowCard className="bg-gradient-to-r from-brass/15 to-wood/15 rounded-3xl p-8 sm:p-10 border border-brass/30 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl animate-pulse-glow text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-arabic text-brass mb-4 leading-relaxed arabic-text-center font-bold tracking-wide">
                "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلاً أَنْ يُتْقِنَهُ"
              </div>
              <div className="text-sm sm:text-base md:text-lg text-text dark:text-darktext opacity-90 italic text-center mx-auto">
                "Indeed, Allah loves that when one of you does something, he does it with excellence"
              </div>
              <div className="text-xs sm:text-sm text-text dark:text-darktext opacity-70 mt-4 font-semibold text-center mx-auto">
                Hadith
              </div>
            </GlowCard>
          </div>
        </div>

        {/* Priority Legend */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>{t('highPriority')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>{t('mediumPriority')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>{t('lowPriority')}</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              placeholder={t('searchMistakes')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/20 transition-all backdrop-blur-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/20 transition-all backdrop-blur-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? t('allCategories') : cat}
              </option>
            ))}
          </select>
          <MotionButton
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:border-brass transition-colors backdrop-blur-sm"
            {...buttonPress}
          >
            {viewMode === 'grid' ? '🔲' : '📋'}
          </MotionButton>
        </div>

        {/* Results Count and Random Button */}
        <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 mb-4">
          <span>{filteredMistakes.length} {t('mistakesFound')}</span>
          <div className="flex gap-2">
            <MotionButton
              onClick={getRandomMistake}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-brass to-wood text-white text-sm font-bold hover:from-wood hover:to-brass transition-all"
              {...buttonPress}
            >
              🎲 {t('randomMistake')}
            </MotionButton>
          </div>
        </div>

        {/* Mistakes Grid/List */}
        <MotionDiv className="w-full grid gap-4 grid-cols-1" {...staggerContainer}>
          {filteredMistakes.length === 0 ? (
            <MotionDiv className="text-center text-gray-600 dark:text-gray-400 text-lg py-8" {...fadeInUp}>
              <div className="text-4xl mb-4">🔍</div>
              <p>{t('noMistakesFound')}</p>
              <p className="text-sm mt-2">{t('tryDifferentKeywords')}</p>
            </MotionDiv>
          ) : (
            filteredMistakes.map((mistake, index) => (
              <MotionCard
                key={mistake.id}
                className="glassmorph-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-brass/20 hover:border-brass backdrop-blur-sm"
                onClick={() => setSelectedMistake(mistake)}
                {...staggerItem}
                style={{ animationDelay: `${index * 100}ms` }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-brass line-clamp-2">
                      {mistake.title}
                    </h3>
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(mistake.severity)}`}></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-semibold">{t('category')}:</span> {mistake.category}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                    {mistake.mistake}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {t('severity')}: {mistake.severity}
                  </span>
                  <MotionButton
                    className="px-3 py-1 bg-gradient-to-r from-brass to-wood text-white rounded-lg text-sm hover:from-wood hover:to-brass transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMistake(mistake);
                    }}
                    {...buttonPress}
                  >
                    {t('viewDetails')}
                  </MotionButton>
                </div>
              </MotionCard>
            ))
          )}
        </MotionDiv>

        {/* Mistake Details Modal */}
        {selectedMistake && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brass/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getSeverityColor(selectedMistake.severity)}`}></div>
                  <h2 className="text-2xl font-bold text-brass">{selectedMistake.title}</h2>
                </div>
                <MotionButton
                  onClick={() => setSelectedMistake(null)}
                  className="text-gray-500 hover:text-brass transition-colors"
                  {...buttonPress}
                >
                  ✕
                </MotionButton>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-brass mb-2">{t('theMistake')}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedMistake.mistake}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-brass mb-2">{t('howToFix')}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedMistake.fix}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-brass mb-2">{t('category')}</h3>
                  <span className="inline-block px-3 py-1 bg-brass/20 text-brass rounded-lg text-sm">
                    {selectedMistake.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-brass mb-2">{t('severity')}</h3>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm text-white ${
                    selectedMistake.severity === 'High' ? 'bg-red-500' :
                    selectedMistake.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`}>
                    {selectedMistake.severity}
                  </span>
                </div>

                {selectedMistake.tips && (
                  <div>
                    <h3 className="text-lg font-semibold text-brass mb-2">{t('helpfulTips')}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{selectedMistake.tips}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <MotionButton
                  onClick={() => setSelectedMistake(null)}
                  className="flex-1 bg-gradient-to-r from-brass to-wood text-white py-3 rounded-xl hover:from-wood hover:to-brass transition-all"
                  {...buttonPress}
                >
                  {t('close')}
                </MotionButton>
              </div>
            </GlowCard>
          </div>
        )}
      </div>
    </MotionDiv>
  );
} 