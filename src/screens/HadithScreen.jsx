import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from '../utils/translations';
import { 
  searchHadiths, 
  getCategories, 
  getRandomHadith, 
  getHadithsByBook, 
  getHadithsByNarrator,
  getNarrators,
  getHadithStats,
  isDatabaseEmpty as checkDatabaseEmpty,
  HADITH_BOOKS
} from '../utils/hadithService';
import { runCompleteImport, resetAndReimport } from '../utils/importHadithData';
import { motion } from 'framer-motion';
import { GlowCard } from '../components/nurui/spotlight-card';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions,
  pulseAnimation
} from '../utils/animations';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Hadith Screen Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-12">
          <div className="w-full relative glassmorph-card min-h-[220px] flex flex-col items-center justify-center">
            <div className="text-center text-lg text-ivory font-body">
              <div className="text-2xl mb-4">📖</div>
              <div className="text-brass font-bold mb-2">{t('Something Went Wrong')}</div>
              <div className="text-mocha">{t('Please Refresh Page')}</div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function getSaved(type) {
  try {
    const saved = localStorage.getItem(`namaz_${type}`);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error(`Error loading ${type}:`, error);
    return [];
  }
}

export default function HadithScreen() {
  const { t } = useTranslation();
  const [hadiths, setHadiths] = useState([]);
  const [selectedHadith, setSelectedHadith] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(getSaved('favorites'));
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNarrator, setSelectedNarrator] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'book', 'narrator', 'category'
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [narrators, setNarrators] = useState([]);
  const [stats, setStats] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isDatabaseEmpty, setIsDatabaseEmpty] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  // Load initial hadiths and metadata
  useEffect(() => {
    loadInitialData();
    
    // Add debug functions to window for console access
    window.debugHadith = {
      clearCache: async () => {
        const { clearHadithCache } = await import('../utils/hadithService');
        clearHadithCache();
        console.log('Cache cleared');
      },
      reloadData: async () => {
        await loadInitialData();
        console.log('Data reloaded');
      },
      searchTest: async (query) => {
        const result = await searchHadiths(query);
        console.log(`Search for "${query}":`, result);
        return result;
      },
      getStats: async () => {
        const stats = await getHadithStats();
        console.log('Stats:', stats);
        return stats;
      }
    };

    // Expose search functions globally for testing
    window.searchHadiths = searchHadiths;
    window.clearHadithCache = async () => {
      const { clearHadithCache } = await import('../utils/hadithService');
      clearHadithCache();
    };
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if database is empty first
      const isEmpty = await checkDatabaseEmpty();
      setIsDatabaseEmpty(isEmpty);
      
      if (isEmpty) {
        console.log('📭 Database is empty. Please import data first.');
        setLoading(false);
        return;
      }
      
      // Load categories and narrators in parallel
      const [categoriesData, narratorsData, statsData] = await Promise.all([
        getCategories(),
        getNarrators(),
        getHadithStats()
      ]);
      
      setCategories(categoriesData);
      setNarrators(narratorsData);
      setStats(statsData);
      
      // Load initial hadiths
      await loadHadiths();
      
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError('Failed to load hadith data. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  // Load hadiths with current filters
  const loadHadiths = async (reset = true) => {
    try {
      setSearching(true);
      setError(null);
      
      const filters = {
        book: selectedBook,
        category: selectedCategory,
        narrator: selectedNarrator,
        sortBy: sortBy
      };
      
      const result = await searchHadiths(searchQuery, filters, 20, reset ? null : lastDoc);
      
      if (reset) {
        setHadiths(result.hadiths);
        setLastDoc(result.lastDoc);
      } else {
        setHadiths(prev => [...prev, ...result.hadiths]);
        setLastDoc(result.lastDoc);
      }
      
      setHasMore(result.hasMore);
      
      // Update stats with total database count
      if (result.totalDatabaseCount !== undefined) {
        setStats(prev => ({
          ...prev,
          totalHadiths: result.totalDatabaseCount
        }));
      }
    } catch (error) {
      console.error('Error loading hadiths:', error);
      setError('Failed to load hadiths. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  // Enhanced search function with filters
  const handleSearch = async (query = searchQuery) => {
    console.log('🔍 Starting search with query:', query);
    console.log('🔍 Current filters:', {
      book: selectedBook,
      category: selectedCategory,
      narrator: selectedNarrator,
      sortBy: sortBy
    });
    await loadHadiths(true);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Generate suggestions
    generateSuggestions(query);
    
    // Debounce search
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  // Search timeout ref
  const searchTimeout = React.useRef(null);

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query.trim() || query.length < 2) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setSuggestionsLoading(false);
      return;
    }

    setSuggestionsLoading(true);

    const suggestions = [];
    const queryLower = query.toLowerCase();

    // Add common Islamic terms
    const commonTerms = [
      'donation', 'charity', 'sadaqah', 'zakat', 'prayer', 'namaz', 'salah',
      'intention', 'niyyah', 'faith', 'iman', 'patience', 'sabr', 'gratitude', 'shukr',
      'forgiveness', 'istighfar', 'remembrance', 'dhikr', 'supplication', 'dua',
      'fasting', 'sawm', 'pilgrimage', 'hajj', 'umrah', 'mosque', 'masjid',
      'quran', 'hadith', 'sunna', 'halal', 'haram', 'jannah', 'paradise',
      'akhirah', 'hereafter', 'dunya', 'world', 'akhlaq', 'character', 'adab', 'manners'
    ];

    // Add narrator names
    const narratorNames = [
      'umar', 'ali', 'abu bakr', 'aisha', 'fatima', 'khadija', 'abu huraira',
      'ibn umar', 'ibn abbas', 'an-nu\'man ibn bashir', 'jabir ibn abdullah',
      'abdullah ibn mas\'ud', 'abu musa al-ash\'ari', 'mu\'adh ibn jabal'
    ];

    // Add book names
    const bookNames = [
      'bukhari', 'muslim', 'abu dawud', 'tirmidhi', 'nasai', 'ibn majah',
      'sahih', 'sunan', 'jami', 'musnad'
    ];

    // Filter and add suggestions
    [...commonTerms, ...narratorNames, ...bookNames].forEach(term => {
      if (term.toLowerCase().includes(queryLower) && !suggestions.includes(term)) {
        suggestions.push(term);
      }
    });

    // Add category-based suggestions if available
    if (categories.length > 0) {
      categories.forEach(category => {
        if (category.toLowerCase().includes(queryLower) && !suggestions.includes(category)) {
          suggestions.push(category);
        }
      });
    }

    // Add narrator-based suggestions if available
    if (narrators.length > 0) {
      narrators.slice(0, 10).forEach(narrator => {
        if (narrator.toLowerCase().includes(queryLower) && !suggestions.includes(narrator)) {
          suggestions.push(narrator);
        }
      });
    }

    // Limit suggestions to 8 items
    const limitedSuggestions = suggestions.slice(0, 8);
    setSearchSuggestions(limitedSuggestions);
    setShowSuggestions(limitedSuggestions.length > 0);
    setSelectedSuggestionIndex(-1); // Reset selection when new suggestions are generated
    setSuggestionsLoading(false);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    handleSearch(suggestion);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || searchSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < searchSuggestions.length) {
          handleSuggestionClick(searchSuggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'book') {
      setSelectedBook(value);
    } else if (filterType === 'category') {
      setSelectedCategory(value);
    } else if (filterType === 'narrator') {
      setSelectedNarrator(value);
    }
    
    // Re-search with new filters
    handleSearch();
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBook('all');
    setSelectedCategory('all');
    setSelectedNarrator('all');
    setSearchQuery('');
    setSortBy('relevance');
    handleSearch('');
  };

  // Handle random hadith
  const handleRandom = async () => {
    try {
      const randomHadith = await getRandomHadith();
      if (randomHadith) {
        setSelectedHadith(randomHadith);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error getting random hadith:', error);
      setError('Failed to get random hadith. Please try again.');
    }
  };

  // Handle book selection
  const handleBookSelect = async (bookId) => {
    setSelectedBook(bookId);
    await loadHadiths(true);
  };

  // Handle narrator search
  const handleNarratorSearch = async (narrator) => {
    setSelectedNarrator(narrator);
    setSearchQuery(narrator);
    await loadHadiths(true);
  };

  // Handle favorite toggle
  const handleFavorite = (hadith) => {
    const newFavorites = favorites.includes(hadith.id)
      ? favorites.filter(id => id !== hadith.id)
      : [...favorites, hadith.id];
    
    setFavorites(newFavorites);
    localStorage.setItem('namaz_favorites', JSON.stringify(newFavorites));
  };

  // Handle share
  const handleShare = (hadith) => {
    const text = `Hadith #${hadith.hadith_number} - Book ${hadith.book_number}\n\n${hadith.translation_en}\n\nNarrated by: ${hadith.narrator}\nCollection: ${hadith.collection} (${hadith.hadith_number})`;
    
    if (navigator.share) {
      navigator.share({
        title: hadith.title,
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      // Show toast or alert
      alert('Hadith copied to clipboard!');
    }
  };

  // Handle data import
  const handleImportData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await runCompleteImport();
      
      // Clear the hadith cache to force fresh data fetch
      const { clearHadithCache } = await import('../utils/hadithService');
      clearHadithCache();
      
      // Reload data after import
      await loadInitialData();
      
      alert(`Import completed!\n📚 Books: ${result.books.successCount}/${result.books.total}\n📖 Hadiths: ${result.hadiths.successCount}/${result.hadiths.total}`);
      
    } catch (error) {
      console.error('Import failed:', error);
      setError('Failed to import data. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndReimport = async () => {
    try {
      if (!confirm('This will delete all existing hadiths and reimport them. Are you sure?')) {
        return;
      }
      
      setLoading(true);
      setError(null);
      
      const result = await resetAndReimport();
      
      // Reload data after import
      await loadInitialData();
      
      alert(`Reset and reimport completed!\n📚 Books: ${result.books.successCount}/${result.books.total}\n📖 Hadiths: ${result.hadiths.successCount}/${result.hadiths.total}`);
      
    } catch (error) {
      console.error('Reset and reimport failed:', error);
      setError('Failed to reset and reimport data. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto py-8 px-4">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={transitions.smooth}
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <motion.div 
                className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-6"
                variants={pulseAnimation}
                animate="animate"
              >
                📖 {t('hadithCollection')}
              </motion.div>
              <div className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('Discover Wisdom')}
              </div>
            </div>
          </motion.div>
          
          {/* Import Data Button - Only show if no hadiths are loaded and database is not empty */}
          {!loading && !error && hadiths.length === 0 && !isDatabaseEmpty && (
            <motion.div 
              className="mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl text-center">
                <button
                  onClick={handleImportData}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  📥 Import Hadith Data to Firestore
                </button>
                <p className="text-sm text-gray-300 mt-3">
                  Click to import hadiths from JSON files to your Firestore database
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Debug buttons for development */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div 
              className="mb-8 flex flex-wrap gap-3 justify-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={async () => {
                  const { clearHadithCache } = await import('../utils/hadithService');
                  clearHadithCache();
                  await loadInitialData();
                  alert('Cache cleared and data reloaded!');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 border-2 border-white/20 transition-all"
              >
                🗑️ Clear Cache & Reload
              </button>
              <button
                onClick={handleImportData}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 border-2 border-white/20 transition-all"
              >
                📥 Re-import Data
              </button>
              <button
                onClick={handleResetAndReimport}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-500 transition-all shadow-lg"
              >
                🔄 Reset & Reimport
              </button>
            </motion.div>
          )}

        {/* Search and Filters */}
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search hadiths by title, content, narrator, or book..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchQuery.length >= 2) {
                    setShowSuggestions(searchSuggestions.length > 0);
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking on them
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-gray-400 transition-all"
              />
              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {searching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>

              {/* Clear Button */}
              {searchQuery && !searching && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleSearch('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                  {suggestionsLoading ? (
                    <div className="px-4 py-3 text-center text-gray-300">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent mx-auto"></div>
                      <span className="ml-2 text-sm">{t('loadingSuggestions')}</span>
                    </div>
                  ) : searchSuggestions.length > 0 ? (
                    searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl focus:outline-none ${
                          index === selectedSuggestionIndex
                            ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={index === selectedSuggestionIndex ? 'text-blue-600 dark:text-blue-400' : 'text-blue-500 dark:text-blue-400'}>🔍</span>
                          <span className="font-medium">{suggestion}</span>
                        </div>
                      </button>
                    ))
                  ) : searchQuery.length >= 2 ? (
                    <div className="px-4 py-3 text-center text-slate-500 dark:text-slate-400 text-sm">
                      No suggestions found
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
            <button
              onClick={handleRandom}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold hover:from-teal-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Random
            </button>
          </div>
          </div>
        </motion.div>

          {/* Filters */}
          {showFilters && (
            <motion.div 
              className="mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Book Filter */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">{t('book')}</label>
                    <select
                      value={selectedBook}
                      onChange={(e) => handleFilterChange('book', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="all">All Books</option>
                      {Object.entries(HADITH_BOOKS).map(([id, book]) => (
                        <option key={id} value={id}>{book.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">{t('category')}</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Narrator Filter */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">{t('narrator')}</label>
                    <select
                      value={selectedNarrator}
                      onChange={(e) => handleFilterChange('narrator', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="all">All Narrators</option>
                      {narrators.map(narrator => (
                        <option key={narrator} value={narrator}>{narrator}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">{t('sortBy')}</label>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        handleSearch();
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="book">Book</option>
                      <option value="narrator">Narrator</option>
                      <option value="category">Category</option>
                      <option value="hadithNumber">Hadith Number</option>
                    </select>
                  </div>
                </div>
                
                {/* Clear Filters Button */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    🗑️ Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Book Selection */}
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">Quick Book Selection</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleBookSelect('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    selectedBook === 'all'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600 border-2 border-slate-200/50 dark:border-slate-700/50'
                  }`}
                >
                  All Books
                </button>
                {Object.entries(HADITH_BOOKS).map(([id, book]) => (
                  <button
                    key={id}
                    onClick={() => handleBookSelect(id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      selectedBook === id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600 border-2 border-slate-200/50 dark:border-slate-700/50'
                    }`}
                    style={{ borderColor: selectedBook === id ? 'transparent' : book.color }}
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="w-full text-center py-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-slate-700 dark:text-slate-300 text-lg">{t('loadingHadithCollection')}</p>
            </div>
          </motion.div>
        )}

        {/* Empty Database State */}
        {!loading && isDatabaseEmpty && (
          <motion.div 
            className="w-full text-center py-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">{t('databaseIsEmpty')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{t('noHadithsInDatabase')}</p>
              <button
                onClick={handleImportData}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                📥 {t('importData')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className="w-full text-center py-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-2xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">{t('errorLoadingHadiths')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
              <button
                onClick={loadInitialData}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('retry')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        {!loading && !error && !isDatabaseEmpty && (
          <motion.div 
            className="w-full text-center mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.7 }}
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                Found {hadiths.length} hadith{hadiths.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedBook !== 'all' && ` in ${HADITH_BOOKS[selectedBook]?.name || selectedBook}`}
                {stats && (
                  <span className="text-blue-600 dark:text-blue-400 font-semibold ml-2">
                    (Total in database: {stats.totalHadiths})
                  </span>
                )}
              </p>
              {/* Debug Info */}
              {process.env.NODE_ENV === 'development' && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Debug: Book={selectedBook}, Category={selectedCategory}, Narrator={selectedNarrator}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* View Mode Toggle */}
        {!loading && !error && !isDatabaseEmpty && (
          <motion.div 
            className="w-full flex justify-center gap-2 mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.8 }}
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                }`}
              >
                {t('grid')} {t('viewMode')}
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                }`}
              >
                {t('list')} {t('viewMode')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Hadith Grid/List */}
        {!loading && !error && !isDatabaseEmpty && (
          <motion.div 
            className={`w-full ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {hadiths.map((hadith, index) => (
            <motion.div
              key={hadith.id}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setSelectedHadith(hadith);
                setShowModal(true);
              }}
              variants={staggerItem}
              whileHover={{ y: -5 }}
            >
              {/* Book Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                  {hadith.collection}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">#{hadith.hadith_number}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {hadith.book_name ? `${hadith.book_name} - Book ${hadith.book_number}` : `Hadith #${hadith.hadith_number} - Book ${hadith.book_number}`}
              </h3>

              {/* Chapter Name */}
              {hadith.chapter_name && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 italic">
                  {hadith.chapter_name}
                </p>
              )}

              {/* Preview Text */}
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {hadith.translation_en && hadith.translation_en.length > 0 
                  ? hadith.translation_en.substring(0, 150) + '...' 
                  : hadith.text_arabic && hadith.text_arabic.length > 0
                    ? hadith.text_arabic.substring(0, 100) + '...'
                    : `Hadith #${hadith.hadith_number} from ${hadith.collection} narrated by ${hadith.narrator}`
                }
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                <span className="flex items-center gap-1">
                  <span className="text-blue-500">👤</span>
                  {hadith.narrator}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-green-500">⭐</span>
                  {hadith.grade}
                </span>
              </div>

              {/* Tags */}
              {hadith.tags && hadith.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {hadith.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-lg text-xs bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {hadith.tags.length > 3 && (
                    <span className="px-2 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-400">
                      +{hadith.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(hadith);
                  }}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    favorites.includes(hadith.id)
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                  }`}
                >
                  {favorites.includes(hadith.id) ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(hadith);
                  }}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-all duration-300"
                >
                  📤
                </button>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {!loading && !error && !isDatabaseEmpty && hasMore && (
          <motion.div 
            className="w-full text-center mt-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => loadHadiths(false)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Load More Hadiths
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && !isDatabaseEmpty && hadiths.length === 0 && !searching && (
          <motion.div 
            className="w-full text-center py-12"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.0 }}
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">{t('noHadithsFound')}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t('tryAdjustingSearchTerms')}</p>
            </div>
          </motion.div>
        )}

        {/* Hadith Modal */}
        {showModal && selectedHadith && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200/50 dark:border-slate-700/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                      {selectedHadith.collection}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold">#{selectedHadith.hadith_number}</span>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-2xl text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    ×
                  </button>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                  Hadith #{selectedHadith.hadith_number} - Book {selectedHadith.book_number}
                </h2>

                {/* Arabic Text */}
                {selectedHadith.text_arabic && (
                  <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl border border-blue-200/50 dark:border-slate-600/50">
                    <p className="text-right text-xl leading-relaxed font-arabic text-slate-800 dark:text-slate-200" dir="rtl">
                      {selectedHadith.text_arabic}
                    </p>
                  </div>
                )}

                {/* English Text */}
                <div className="mb-8">
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                    {selectedHadith.translation_en}
                  </p>
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200/50 dark:border-slate-600/50">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">👤</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{t('narrator')}:</span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedHadith.narrator}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">📚</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{t('collection')}:</span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedHadith.collection}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">📖</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{t('bookNumber')}:</span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedHadith.book_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{t('grade')}:</span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedHadith.grade}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFavorite(selectedHadith)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                      favorites.includes(selectedHadith.id)
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {favorites.includes(selectedHadith.id) ? '❤️ ' + t('favorites') : '🤍 ' + t('addToFavorites')}
                  </button>
                  <button
                    onClick={() => handleShare(selectedHadith)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    📤 {t('share')}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </div>
      </div>
    </ErrorBoundary>
  );
} 