import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { duasByCategory, duaCategories } from '../data/duasData.js';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowCard } from '../components/nurui/spotlight-card';
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

export default function DuaListScreen() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [bookmarkedDuas, setBookmarkedDuas] = useState([]);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedDua, setSelectedDua] = useState(null);
  const [showDuaModal, setShowDuaModal] = useState(false);

  const categoryInfo = duaCategories.find(cat => cat.key === category);
  const allDuas = duasByCategory[category] || [];

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

  const filteredDuas = allDuas.filter(dua =>
    dua.arabic.toLowerCase().includes(search.toLowerCase()) ||
    dua.transliteration.toLowerCase().includes(search.toLowerCase()) ||
    dua.translation.toLowerCase().includes(search.toLowerCase())
  );

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
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      showToast('Failed to copy', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg z-50 text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 2000);
  };

  const shareDua = async (dua) => {
    const text = `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${categoryInfo?.title || 'Dua'} from Namaz Learning`,
          text: text,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const openDuaModal = (dua) => {
    setSelectedDua(dua);
    setShowDuaModal(true);
  };

  const closeDuaModal = () => {
    setShowDuaModal(false);
    setSelectedDua(null);
  };

  const getBookmarkedCount = () => {
    return allDuas.filter(dua => 
      bookmarkedDuas.includes(`${category}-${dua.arabic}`)
    ).length;
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

      <div className="relative z-10 w-full max-w-4xl mx-auto py-8 px-2 md:px-4">

        {/* Header */}
        <motion.div 
          className="text-center mb-8"
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
          <div className="flex items-center justify-center gap-3 mb-4">
                <motion.button
              onClick={() => navigate('/duas')}
                  className="text-emerald-300 hover:text-emerald-200 transition-colors text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
            >
              ← Back
                </motion.button>
                <motion.h1 
                  className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent animate-text-shimmer"
                  variants={pulseAnimation}
                  animate="animate"
                >
              {categoryInfo ? categoryInfo.title : 'Duas'}
                </motion.h1>
              </div>
              <motion.p 
                className="text-xl text-emerald-200 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {categoryInfo?.description || 'Browse and memorize authentic duas'}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div 
          className="mb-8 space-y-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search within duas..."
                  className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-gray-400 transition-all"
              />
            </div>
            
            <div className="flex gap-2">
                <motion.button
                onClick={() => setShowTransliteration(!showTransliteration)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  showTransliteration 
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20'
                }`}
                  {...buttonPress}
              >
                📝 Transliteration
                </motion.button>
              
                <motion.button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  showTranslation 
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20'
                }`}
                  {...buttonPress}
              >
                🌐 Translation
                </motion.button>
            </div>
          </div>

          {/* Stats */}
            <div className="flex justify-between items-center text-sm text-emerald-200 mt-4">
            <span>{filteredDuas.length} of {allDuas.length} duas</span>
            {getBookmarkedCount() > 0 && (
                <span className="text-emerald-400">⭐ {getBookmarkedCount()} bookmarked</span>
            )}
          </div>
        </div>
        </motion.div>

        {/* Special Content for aftersalah */}
        {category === 'aftersalah' && (
          <motion.div 
            className="relative max-w-xl mx-auto mb-8 p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl group transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Decorative floating icon */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg border-4 border-white/20 z-10">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mt-8 text-xl md:text-2xl font-arabic text-white text-center font-bold tracking-wide drop-shadow-sm">
              Daily Dhikr After Salah
            </div>
            <div className="text-sm text-emerald-300 italic text-center mb-2">
              Summary Checklist
            </div>
            <ul className="text-base text-emerald-200 space-y-2 mt-2">
              {["Astaghfirullah ×3",
                "Allahumma Anta As-Salaam ×1",
                "SubhanAllah ×33",
                "Alhamdulillah ×33",
                "Allahu Akbar ×34",
                "Kalima Tawheed ×1–10",
                "Ayat-ul-Kursi ×1",
                "Ikhlas + Falaq + Nas ×1 each",
                "Allahumma Ajirni min an-Nar ×7 (Maghrib/Fajr)",
                "Dua for worship (O Allah help me...) ×1"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 pl-2">
                  <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs flex items-center justify-center shadow-sm">{idx+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Duas List */}
        <motion.div 
          className="space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredDuas.length === 0 ? (
            <motion.div 
              className="text-center text-emerald-300 text-lg py-12"
              variants={fadeInUp}
            >
              <div className="text-4xl mb-4">🔍</div>
              <p>No duas found matching your search.</p>
              <p className="text-sm mt-2">Try different keywords or browse all duas.</p>
            </motion.div>
          ) : (
            filteredDuas.map((dua, idx) => {
              const duaId = `${category}-${dua.arabic}`;
              const isBookmarked = bookmarkedDuas.includes(duaId);
              
              return (
                <motion.div 
                  key={idx} 
                  className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 transform hover:bg-white/20"
                  variants={staggerItem}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Enhanced decorative corner elements */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-emerald-400/40 rounded-tl-xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-emerald-400/40 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-emerald-400/40 rounded-bl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-emerald-400/40 rounded-br-xl"></div>

                  <div className="relative z-10">
                    {/* Arabic Text */}
                    <div className="text-right mb-4">
                      <p className="text-xl md:text-2xl font-arabic text-white leading-loose drop-shadow group-hover:text-emerald-300 transition-colors duration-300">{dua.arabic}</p>
                    </div>

                    {/* Transliteration */}
                    {showTransliteration && (
                      <div className="mb-3">
                        <p className="text-sm text-emerald-300 italic">{dua.transliteration}</p>
                      </div>
                    )}

                    {/* Translation */}
                    {showTranslation && (
                      <div className="mb-4">
                        <p className="text-base text-emerald-200">{dua.translation}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/20">
                      <motion.button
                        onClick={() => copyToClipboard(dua.arabic)}
                        className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg text-sm hover:from-emerald-500 hover:to-green-500 transition-all font-medium"
                        {...buttonPress}
                      >
                        📋 Copy Arabic
                      </motion.button>
                      
                      <motion.button
                        onClick={() => copyToClipboard(`${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`)}
                        className="px-3 py-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-sm hover:from-teal-500 hover:to-emerald-500 transition-all font-medium"
                        {...buttonPress}
                      >
                        📋 Copy All
                      </motion.button>
                      
                      <motion.button
                        onClick={() => shareDua(dua)}
                        className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg text-sm hover:from-teal-500 hover:to-green-500 transition-all font-medium"
                        {...buttonPress}
                      >
                        📤 Share
                      </motion.button>
                      
                      <motion.button
                        onClick={() => openDuaModal(dua)}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm hover:from-purple-500 hover:to-indigo-500 transition-all font-medium"
                        {...buttonPress}
                      >
                        👁️ View Full
                      </motion.button>
                      
                      <motion.button
                        onClick={() => toggleBookmark(duaId)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all font-medium ${
                          isBookmarked 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400' 
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }`}
                        {...buttonPress}
                      >
                        {isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
                      </motion.button>
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
            <div className="text-2xl font-bold text-emerald-400">{allDuas.length}</div>
            <div className="text-sm text-emerald-200">Total Duas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-emerald-400">{getBookmarkedCount()}</div>
            <div className="text-sm text-emerald-200">Bookmarked</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
            <div className="text-3xl mb-2">👁️</div>
            <div className="text-2xl font-bold text-emerald-400">{filteredDuas.length}</div>
            <div className="text-sm text-emerald-200">Showing</div>
          </div>
        </motion.div>
      </div>

      {/* Dua Modal */}
      <AnimatePresence>
      {showDuaModal && selectedDua && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
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
              
              <div className="p-6 relative z-10">
              <div className="flex justify-between items-center mb-6">
                  <motion.h3 
                    className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent animate-text-shimmer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Full Dua View
                  </motion.h3>
                  <motion.button
                  onClick={closeDuaModal}
                    className="text-emerald-300 hover:text-emerald-200 text-2xl transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>
                
                <div className="space-y-6">
                  <motion.div 
                    className="text-right"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <p className="text-3xl font-arabic text-white leading-loose drop-shadow">{selectedDua.arabic}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h4 className="font-bold text-emerald-300 mb-2">Transliteration:</h4>
                    <p className="text-lg text-emerald-200">{selectedDua.transliteration}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h4 className="font-bold text-emerald-300 mb-2">Translation:</h4>
                    <p className="text-lg text-emerald-200">{selectedDua.translation}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 pt-4 border-t border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.button
                      onClick={() => copyToClipboard(selectedDua.arabic)}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-500 hover:to-green-500 font-medium transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📋 Copy Arabic
                    </motion.button>
                    <motion.button
                      onClick={() => copyToClipboard(`${selectedDua.arabic}\n\n${selectedDua.transliteration}\n\n${selectedDua.translation}`)}
                      className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-500 hover:to-emerald-500 font-medium transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📋 Copy All
                    </motion.button>
                    <motion.button
                      onClick={() => shareDua(selectedDua)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-teal-500 hover:to-green-500 font-medium transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    📤 Share
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
} 
