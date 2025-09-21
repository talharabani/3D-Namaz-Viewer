import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import duaCategories, { duasByCategory } from '../data/duasData.js';
import { useTranslation } from '../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowCard } from '../components/nurui/spotlight-card';
import NotificationSettings from '../components/NotificationSettings';
import authService from '../utils/authService';
import ParticleBackground from '../components/ParticleBackground';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions,
  pulseAnimation
} from '../utils/animations';

export default function DuaScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDailySuggestion, setShowDailySuggestion] = useState(true);
  const [bookmarkedDuas, setBookmarkedDuas] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [favoriteDuas, setFavoriteDuas] = useState([]);
  const [recentDuas, setRecentDuas] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // 'name', 'category', 'recent'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'

  // Get current user from authService
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Helper function to get translated title and description
  const getTranslatedCategory = (catKey) => {
    const titleMap = {
      'daily': 'Daily Life Duas',
      'prayer': 'Salah & Prayer Duas',
      'protection': 'Protection & Safety',
      'hardship': 'Hardship & Forgiveness',
      'relationship': 'Family & Relationships',
      'general': 'General Supplications',
      'hajj': 'Hajj & Umrah Duas',
      'ramadan': 'Ramadan Special',
      'weather': 'Weather & Nature',
      'sickness': 'Health & Healing',
      'social': 'Community & Society',
      'rizq': 'Sustenance & Work',
      'repentance': 'Repentance & Growth',
      'enemy': 'Protection from Enemies',
      'business': 'Business & Success',
      'success': 'Guidance & Success',
      'love': 'Love of Allah',
      'prophetlove': 'Love of Prophet ﷺ',
      'imaan': 'Strengthen Faith',
      'dailybooster': 'Daily Imaan Booster',
      'consistency': 'Consistency in Worship',
      'beforesalah': 'Before Salah',
      'aftersalah': 'After Salah'
    };

    const descMap = {
      'daily': 'Supplications for daily routines and life',
      'prayer': 'Duas to recite during and around prayer',
      'protection': 'Seeking Allah\'s protection from harm',
      'hardship': 'Duas for difficult times and seeking forgiveness',
      'relationship': 'Supplications for family and relationships',
      'general': 'Various beneficial supplications',
      'hajj': 'Special duas for pilgrimage and Umrah',
      'ramadan': 'Duas specific to the blessed month',
      'weather': 'Supplications for natural events and weather',
      'sickness': 'Duas for health, healing, and the deceased',
      'social': 'Prayers for community and social well-being',
      'rizq': 'Supplications for provision and livelihood',
      'repentance': 'Seeking forgiveness and self-improvement',
      'enemy': 'Protection from enemies and danger',
      'business': 'Duas for business success and prosperity',
      'success': 'Prayers for guidance and success in all matters',
      'love': 'Supplications to earn Allah\'s love and nearness',
      'prophetlove': 'Duas to express love for Prophet Muhammad ﷺ',
      'imaan': 'Prayers to strengthen faith and belief',
      'dailybooster': 'Daily routine to boost your faith',
      'consistency': 'Duas for steadfastness in worship',
      'beforesalah': 'Supplications before or during prayer',
      'aftersalah': 'Dhikr and duas after completing prayer'
    };

    return {
      title: titleMap[catKey] || 'Islamic Duas',
      description: descMap[catKey] || 'Beneficial supplications'
    };
  };

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('Bookmarked Duas');
    if (saved) {
      setBookmarkedDuas(JSON.parse(saved));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('Bookmarked Duas', JSON.stringify(bookmarkedDuas));
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
      toast.textContent = t('Copied To Clipboard');
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 2000);
    } catch (err) {
      console.error('Failed To Copy: ', err);
    }
  };

  const shareDua = async (dua) => {
    const text = `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('Dua From Namaz Learning'),
          text: text,
        });
      } catch (err) {
        console.error('Error Sharing:', err);
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
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden"
      {...pageTransition}
    >
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>
      {/* Floating Islamic Calligraphy - Perfectly Positioned */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-30">
        <GlowCard className="group islamic-calligraphy bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-2xl p-3 sm:p-4 border border-brass/30 shadow-2xl backdrop-blur-sm hover:shadow-3xl hover:scale-105 transition-all duration-500 max-w-[140px] sm:max-w-[160px] md:max-w-[180px]">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-arabic text-brass mb-1 group-hover:text-amber-600 transition-colors duration-300">📿</div>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-brass transition-colors duration-300">دعا</h2>
          </div>
        </GlowCard>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-8 px-4 pt-24 sm:pt-28">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>
            <motion.div 
              className="absolute -top-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>
            <motion.div 
              className="absolute -bottom-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>
            
            <div className="relative">
              <motion.div 
                className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-6 animate-text-shimmer"
                variants={pulseAnimation}
                animate="animate"
              >
                📿 {t('Dua Collection')}
              </motion.div>
              <motion.div 
                className="text-xl md:text-2xl text-emerald-200 max-w-4xl mx-auto leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('Discover And Memorize')}
              </motion.div>
              
              {/* Arabic Calligraphy */}
              <motion.div 
                className="text-2xl md:text-3xl font-arabic text-white mb-4 leading-relaxed font-bold animate-text-shimmer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                دعاء
              </motion.div>
              <motion.div 
                className="text-lg text-emerald-200 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {t('Collection Of Islamic Duas')}
              </motion.div>
              
              {/* Islamic Quote */}
              <motion.div 
                className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-6 max-w-3xl mx-auto border border-emerald-400/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="text-lg md:text-xl font-arabic text-white mb-3 leading-relaxed font-bold">
                  "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ"
                </div>
                <div className="text-sm md:text-base text-emerald-200 italic mb-2">
                  "And your Lord says, 'Call upon Me; I will respond to you'"
                </div>
                <div className="text-xs text-emerald-400 font-semibold">
                  Quran 40:60
                </div>
              </motion.div>
              
              {/* Stats */}
              <motion.div 
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-emerald-400">{Object.values(duasByCategory).reduce((total, duas) => total + duas.length, 0)}</div>
                  <div className="text-sm text-emerald-200">Categories</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-emerald-400">{getTotalBookmarkedCount()}</div>
                  <div className="text-sm text-emerald-200">Bookmarked</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-emerald-400">{favoriteDuas.length}</div>
                  <div className="text-sm text-emerald-200">Favorites</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('Search Duas Or Categories')}
                  className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-gray-400 transition-all"
                />
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className={`px-6 py-3 rounded-xl transition-all font-medium ${
                    showBookmarks 
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20'
                  }`}
                  {...buttonPress}
                >
                  {t('Bookmarks')} ({getTotalBookmarkedCount()})
                </motion.button>
                
                <motion.button
                  onClick={() => setShowDailySuggestion(!showDailySuggestion)}
                  className={`px-6 py-3 rounded-xl transition-all font-medium ${
                    showDailySuggestion 
                      ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20'
                  }`}
                  {...buttonPress}
                >
                  {t('Daily Dua')}
                </motion.button>

                {user && (
                  <motion.button
                    onClick={() => setShowNotificationSettings(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                    {...buttonPress}
                  >
                    🔔 {t('Notifications')}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Suggestion */}
        {showDailySuggestion && dailyDua && (
          <motion.div 
            className="mb-8" 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{t('todaysDua')}</h3>
                <button
                  onClick={() => setShowDailySuggestion(false)}
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-right">
                  <p className="text-2xl font-arabic text-white leading-loose">{dailyDua.arabic}</p>
                </div>
                <div className="text-sm text-gray-300 italic">{dailyDua.transliteration}</div>
                <div className="text-base text-gray-300">{dailyDua.translation}</div>
                
                <div className="flex gap-2 pt-2">
                  <motion.button
                    onClick={() => copyToClipboard(dailyDua.arabic)}
                    className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg text-sm hover:from-emerald-500 hover:to-green-500 transition-all font-medium"
                    {...buttonPress}
                  >
                    {t('Copy')}
                  </motion.button>
                  <motion.button
                    onClick={() => shareDua(dailyDua)}
                    className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg text-sm hover:from-teal-500 hover:to-green-500 transition-all font-medium"
                    {...buttonPress}
                  >
                    {t('Share')}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" {...staggerContainer}>
          {filteredCategories.length === 0 ? (
            <motion.div className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg py-8" {...fadeInUp}>
              <div className="text-4xl mb-4">🔍</div>
              <p>{t('No Categories Found')}</p>
              <p className="text-sm mt-2">{t('Try Different Keywords')}</p>
            </motion.div>
          ) : (
            filteredCategories.map((cat, index) => {
              const categoryDuas = duasByCategory[cat.key] || [];
              const bookmarkedCount = categoryDuas.filter(dua => 
                bookmarkedDuas.includes(`${cat.key}-${dua.arabic}`)
              ).length;
              
              return (
                <motion.div
                  key={cat.key}
                  className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 transform hover:bg-white/20"
                  onClick={() => navigate(`/duas/${encodeURIComponent(cat.key)}`)}
                  {...staggerItem}
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* Enhanced decorative corner elements */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-emerald-400/40 rounded-tl-xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-emerald-400/40 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-emerald-400/40 rounded-bl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-emerald-400/40 rounded-br-xl"></div>

                  <div className="text-center relative z-10">
                    {/* Category Icon */}
                    <div className="text-4xl mb-3 mt-2 group-hover:scale-125 transition-transform duration-500">
                      {cat.key === 'daily' && '🌅'}
                      {cat.key === 'prayer' && '🕌'}
                      {cat.key === 'protection' && '🛡️'}
                      {cat.key === 'hardship' && '💪'}
                      {cat.key === 'relationship' && '👨‍👩‍👧‍👦'}
                      {cat.key === 'general' && '📚'}
                      {cat.key === 'hajj' && '🕋'}
                      {cat.key === 'ramadan' && '🌙'}
                      {cat.key === 'weather' && '⛈️'}
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
                    
                    <h3 className="text-lg font-bold text-white mb-2 text-center drop-shadow group-hover:text-emerald-300 transition-colors duration-300">
                      {getTranslatedCategory(cat.key).title}
                    </h3>
                    <p className="text-sm text-gray-300 opacity-80 mb-3 line-clamp-2 group-hover:text-white transition-colors duration-300">
                      {getTranslatedCategory(cat.key).description}
                    </p>
                    
                    {/* Sample Dua Preview */}
                    {categoryDuas.length > 0 && (
                      <div className="mb-3 p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg border border-emerald-400/30">
                        <div className="text-right mb-2">
                          <p className="text-sm font-arabic text-white leading-relaxed">
                            {categoryDuas[0].arabic.substring(0, 60)}...
                          </p>
                        </div>
                        <p className="text-xs text-gray-300 italic line-clamp-2">
                          "{categoryDuas[0].translation.substring(0, 70)}..."
                        </p>
                      </div>
                    )}
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="text-emerald-400">📿</span>
                        {categoryDuas.length} {categoryDuas.length === 1 ? 'Dua' : 'Duas'}
                      </span>
                      {bookmarkedCount > 0 && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span>⭐</span>
                          {bookmarkedCount}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/50 rounded-3xl transition-colors duration-500"></div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4" 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-white">{Object.values(duasByCategory).reduce((total, duas) => total + duas.length, 0)}</div>
            <div className="text-sm text-gray-300">Dua Categories</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
            <div className="text-3xl mb-2">📿</div>
            <div className="text-2xl font-bold text-white">
              {Object.values(duasByCategory).reduce((total, duas) => total + duas.length, 0)}
            </div>
            <div className="text-sm text-gray-300">Total Duas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-white">{getTotalBookmarkedCount()}</div>
            <div className="text-sm text-gray-300">Bookmarked</div>
          </div>
        </motion.div>
      </div>

      {/* Notification Settings Modal */}
      <NotificationSettings 
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />
    </motion.div>
  );
} 
