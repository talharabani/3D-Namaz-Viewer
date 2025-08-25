import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import duaCategories, { duasByCategory } from '../data/duas';
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

export default function DuaScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDailySuggestion, setShowDailySuggestion] = useState(true);
  const [bookmarkedDuas, setBookmarkedDuas] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Helper function to get translated title and description
  const getTranslatedCategory = (catKey) => {
    const titleMap = {
      'daily': 'dailyDuas',
      'prayer': 'prayerDuas',
      'protection': 'protectionDuas',
      'hardship': 'hardshipForgiveness',
      'relationship': 'relationshipFamilyDuas',
      'general': 'generalMiscellaneous',
      'hajj': 'hajjUmrahDuas',
      'ramadan': 'ramadanSpecialDuas',
      'weather': 'weatherNature',
      'sickness': 'sicknessDeath',
      'social': 'socialCommunity',
      'rizq': 'rizqWork',
      'repentance': 'repentanceSelfImprovement',
      'enemy': 'enemyDanger',
      'business': 'businessDuas',
      'success': 'successGuidance',
      'love': 'loveAllah',
      'prophetlove': 'prophetLove',
      'imaan': 'strengthenImaan',
      'dailybooster': 'dailyBooster',
      'consistency': 'consistencyWorship',
      'beforesalah': 'beforeSalah',
      'aftersalah': 'afterSalah'
    };

    const descMap = {
      'daily': 'dailyDuasDesc',
      'prayer': 'prayerDuasDesc',
      'protection': 'protectionDuasDesc',
      'hardship': 'hardshipForgivenessDesc',
      'relationship': 'relationshipFamilyDuasDesc',
      'general': 'generalMiscellaneousDesc',
      'hajj': 'hajjUmrahDuasDesc',
      'ramadan': 'ramadanSpecialDuasDesc',
      'weather': 'weatherNatureDesc',
      'sickness': 'sicknessDeathDesc',
      'social': 'socialCommunityDesc',
      'rizq': 'rizqWorkDesc',
      'repentance': 'repentanceSelfImprovementDesc',
      'enemy': 'enemyDangerDesc',
      'business': 'businessDuasDesc',
      'success': 'successGuidanceDesc',
      'love': 'loveAllahDesc',
      'prophetlove': 'prophetLoveDesc',
      'imaan': 'strengthenImaanDesc',
      'dailybooster': 'dailyBoosterDesc',
      'consistency': 'consistencyWorshipDesc',
      'beforesalah': 'beforeSalahDesc',
      'aftersalah': 'afterSalahDesc'
    };

    return {
      title: t(titleMap[catKey] || 'duas'),
      description: t(descMap[catKey] || 'duas')
    };
  };

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedDuas');
    if (saved) {
      setBookmarkedDuas(JSON.parse(saved));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarkedDuas', JSON.stringify(bookmarkedDuas));
  }, [bookmarkedDuas]);

  const filteredCategories = duaCategories.filter(cat => {
    const { title, description } = getTranslatedCategory(cat.key);
    return title.toLowerCase().includes(search.toLowerCase()) ||
           description.toLowerCase().includes(search.toLowerCase());
  });

  const toggleBookmark = (duaId) => {
    setBookmarkedDuas(prev => 
      prev.includes(duaId) 
        ? prev.filter(id => id !== duaId)
        : [...prev, duaId]
    );
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
      toast.textContent = t('copiedToClipboard');
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareDua = async (dua) => {
    const text = `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('duaFromNamazLearning'),
          text: text,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const getDailySuggestion = () => {
    const today = new Date().getDate();
    const dailyDuas = duasByCategory.daily || [];
    return dailyDuas[today % dailyDuas.length] || dailyDuas[0];
  };

  const dailyDua = getDailySuggestion();

  // Calculate total bookmarked duas across all categories
  const getTotalBookmarkedCount = () => {
    return bookmarkedDuas.length;
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
            <div className="text-xs sm:text-sm font-arabic text-brass mb-1 group-hover:text-amber-600 transition-colors duration-300">📿</div>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-brass transition-colors duration-300">دعا</h2>
          </div>
        </GlowCard>
      </div>

      <div className="w-full max-w-7xl mx-auto py-8 px-4 pt-24 sm:pt-28">
        {/* Beautiful Calligraphy Header - Perfectly Centered */}
        <div className="text-center mb-16 flex flex-col items-center justify-center min-h-[40vh] px-4">
          {/* Arabic Calligraphy - Perfectly Centered */}
          <div className="mb-16 animate-fadeInScale text-center w-full max-w-5xl arabic-content">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-arabic text-brass mb-8 leading-none drop-shadow-2xl animate-pulse arabic-text-center font-bold tracking-wide">
              📿 {t('duaCollection')}
            </div>
            <div className="text-sm md:text-base text-text dark:text-darktext opacity-80 italic text-center mx-auto max-w-2xl">
              {t('discoverAndMemorize')}
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
                دعاء
              </div>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
                {t('collectionOfIslamicDuas')}
              </p>
            </div>

            {/* Enhanced Islamic quote with better styling - Perfectly Centered */}
            <GlowCard className="bg-gradient-to-r from-brass/15 to-wood/15 rounded-3xl p-8 sm:p-10 border border-brass/30 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl animate-pulse-glow text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-arabic text-brass mb-4 leading-relaxed arabic-text-center font-bold tracking-wide">
                "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ"
              </div>
              <div className="text-sm sm:text-base md:text-lg text-text dark:text-darktext opacity-90 italic text-center mx-auto">
                "Indeed, Allah is with the patient"
              </div>
              <div className="text-xs sm:text-sm text-text dark:text-darktext opacity-70 mt-4 font-semibold text-center mx-auto">
                Quran 2:153
              </div>
            </GlowCard>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchDuasOrCategories')}
              className="w-full rounded-xl border border-brass/30 dark:border-brass/60 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass dark:focus:ring-brass/40 dark:focus:border-brass/40 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-lg backdrop-blur-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <MotionButton
              onClick={() => setShowBookmarks(!showBookmarks)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${
                showBookmarks 
                  ? 'bg-gradient-to-r from-brass to-wood text-white shadow-lg' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-brass/30 dark:border-brass/60 backdrop-blur-sm'
              }`}
              {...buttonPress}
            >
              {t('bookmarks')} ({getTotalBookmarkedCount()})
            </MotionButton>
            
            <MotionButton
              onClick={() => setShowDailySuggestion(!showDailySuggestion)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${
                showDailySuggestion 
                  ? 'bg-gradient-to-r from-brass to-wood text-white shadow-lg' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-brass/30 dark:border-brass/60 backdrop-blur-sm'
              }`}
              {...buttonPress}
            >
              {t('dailyDua')}
            </MotionButton>
          </div>
        </div>

        {/* Daily Suggestion */}
        {showDailySuggestion && dailyDua && (
          <MotionDiv className="mb-8" {...fadeInUp}>
            <GlowCard className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-xl border border-brass/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-brass dark:text-amber-200">{t('todaysDua')}</h3>
                <button
                  onClick={() => setShowDailySuggestion(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-brass dark:hover:text-amber-400 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-right">
                  <p className="text-2xl font-arabic text-brass dark:text-amber-200 leading-loose">{dailyDua.arabic}</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 italic">{dailyDua.transliteration}</div>
                <div className="text-base text-gray-700 dark:text-gray-300">{dailyDua.translation}</div>
                
                <div className="flex gap-2 pt-2">
                  <MotionButton
                    onClick={() => copyToClipboard(dailyDua.arabic)}
                    className="px-3 py-1 bg-gradient-to-r from-brass to-wood text-white rounded-lg text-sm hover:from-wood hover:to-brass transition-all font-medium"
                    {...buttonPress}
                  >
                    {t('copy')}
                  </MotionButton>
                  <MotionButton
                    onClick={() => shareDua(dailyDua)}
                    className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm hover:from-green-700 hover:to-green-800 transition-all font-medium"
                    {...buttonPress}
                  >
                    {t('share')}
                  </MotionButton>
                </div>
              </div>
            </GlowCard>
          </MotionDiv>
        )}

        {/* Categories Grid */}
        <MotionDiv className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" {...staggerContainer}>
          {filteredCategories.length === 0 ? (
            <MotionDiv className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg py-8" {...fadeInUp}>
              <div className="text-4xl mb-4">🔍</div>
              <p>{t('noCategoriesFound')}</p>
              <p className="text-sm mt-2">{t('tryDifferentKeywords')}</p>
            </MotionDiv>
          ) : (
            filteredCategories.map((cat, index) => {
              const categoryDuas = duasByCategory[cat.key] || [];
              const bookmarkedCount = categoryDuas.filter(dua => 
                bookmarkedDuas.includes(`${cat.key}-${dua.arabic}`)
              ).length;
              
              return (
                <MotionCard
                  key={cat.key}
                  className="group relative bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-2xl p-6 border border-brass/30 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer backdrop-blur-sm hover:scale-105 transform"
                  onClick={() => navigate(`/duas/${encodeURIComponent(cat.key)}`)}
                  {...staggerItem}
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* Enhanced decorative corner elements */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-brass/40 rounded-tl-xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-brass/40 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-brass/40 rounded-bl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-brass/40 rounded-br-xl"></div>

                  <div className="text-center relative z-10">
                    {/* Category Icon */}
                    <div className="text-4xl mb-3 mt-2 group-hover:scale-125 transition-transform duration-500">
                      {cat.key === 'daily' && '📅'}
                      {cat.key === 'prayer' && '🕌'}
                      {cat.key === 'protection' && '🛡️'}
                      {cat.key === 'hardship' && '💪'}
                      {cat.key === 'relationship' && '👨‍👩‍👧‍👦'}
                      {cat.key === 'general' && '📚'}
                      {cat.key === 'hajj' && '🕋'}
                      {cat.key === 'ramadan' && '🌙'}
                      {cat.key === 'weather' && '🌧️'}
                      {cat.key === 'sickness' && '🏥'}
                      {cat.key === 'social' && '🤝'}
                      {cat.key === 'rizq' && '💰'}
                      {cat.key === 'repentance' && '🙏'}
                      {cat.key === 'enemy' && '⚔️'}
                      {cat.key === 'business' && '💼'}
                      {cat.key === 'success' && '🎯'}
                      {cat.key === 'love' && '❤️'}
                      {cat.key === 'prophetlove' && '🌹'}
                      {cat.key === 'imaan' && '🕯️'}
                      {cat.key === 'dailybooster' && '⚡'}
                      {cat.key === 'consistency' && '🔄'}
                      {cat.key === 'beforesalah' && '🕌'}
                      {cat.key === 'aftersalah' && '🕌'}
                      {!['daily', 'prayer', 'protection', 'hardship', 'relationship', 'general', 'hajj', 'ramadan', 'weather', 'sickness', 'social', 'rizq', 'repentance', 'enemy', 'business', 'success', 'love', 'prophetlove', 'imaan', 'dailybooster', 'consistency', 'beforesalah', 'aftersalah'].includes(cat.key) && '📿'}
                    </div>
                    
                    <h3 className="text-lg font-bold text-brass dark:text-amber-200 mb-2 text-center drop-shadow group-hover:text-amber-600 transition-colors duration-300">
                      {getTranslatedCategory(cat.key).title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 opacity-80 mb-3 line-clamp-2">
                      {getTranslatedCategory(cat.key).description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{categoryDuas.length} {t('duas')}</span>
                      {bookmarkedCount > 0 && (
                        <span className="text-amber-600 dark:text-amber-400">⭐ {bookmarkedCount}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brass/10 to-wood/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </MotionCard>
              );
            })
          )}
        </MotionDiv>

        {/* Quick Stats */}
        <MotionDiv className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4" {...fadeInUp}>
          <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-xl p-4 text-center border border-brass/30 shadow-lg backdrop-blur-sm">
            <div className="text-2xl font-bold text-brass dark:text-amber-200">{duaCategories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('categories')}</div>
          </GlowCard>
          <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-xl p-4 text-center border border-brass/30 shadow-lg backdrop-blur-sm">
            <div className="text-2xl font-bold text-brass dark:text-amber-200">
              {Object.values(duasByCategory).reduce((total, duas) => total + duas.length, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('totalDuas')}</div>
          </GlowCard>
          <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-xl p-4 text-center border border-brass/30 shadow-lg backdrop-blur-sm">
            <div className="text-2xl font-bold text-brass dark:text-amber-200">{getTotalBookmarkedCount()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('bookmarked')}</div>
          </GlowCard>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
} 