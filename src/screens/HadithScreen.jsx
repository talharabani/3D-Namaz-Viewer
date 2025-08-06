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
              <div className="text-brass font-bold mb-2">Something went wrong</div>
              <div className="text-mocha">Please refresh the page to try again.</div>
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
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-8">
          {/* Header */}
          <div className="w-full text-center">
            <h1 className="text-3xl font-heading text-brass font-bold mb-2 drop-shadow-lg">
              📖 Hadith Collection
            </h1>
            <p className="text-mocha font-body mb-4">
              Search through Sahih Bukhari, Sahih Muslim, and other authentic hadith collections
            </p>
          
          {/* Import Data Button - Only show if no hadiths are loaded and database is not empty */}
          {!loading && !error && hadiths.length === 0 && !isDatabaseEmpty && (
            <div className="mb-4">
              <button
                onClick={handleImportData}
                className="px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent2 transition shadow-lg"
              >
                📥 Import Hadith Data to Firestore
              </button>
              <p className="text-sm text-accent4 mt-2">
                Click to import hadiths from JSON files to your Firestore database
              </p>
            </div>
          )}
          
          {/* Debug buttons for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 flex gap-2 justify-center">
              <button
                onClick={async () => {
                  const { clearHadithCache } = await import('../utils/hadithService');
                  clearHadithCache();
                  await loadInitialData();
                  alert('Cache cleared and data reloaded!');
                }}
                className="px-4 py-2 rounded-lg bg-glass text-mocha font-bold hover:bg-brass hover:text-white transition"
              >
                🗑️ Clear Cache & Reload
              </button>
              <button
                onClick={handleImportData}
                className="px-4 py-2 rounded-lg bg-glass text-mocha font-bold hover:bg-brass hover:text-white transition"
              >
                📥 Re-import Data
              </button>
              <button
                onClick={handleResetAndReimport}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
              >
                🔄 Reset & Reimport
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="w-full glassmorph-card p-6">
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
                className="w-full px-4 py-3 rounded-xl border-2 border-brass bg-glass text-mocha font-body focus:ring-2 focus:ring-accent2 focus:border-transparent"
              />
              {searching && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brass"></div>
                </div>
              )}
              {searchQuery && !searching && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleSearch('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-3 text-mocha hover:text-brass transition"
                >
                  ✕
                </button>
              )}
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-darkcard border-2 border-brass rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                  {suggestionsLoading ? (
                    <div className="px-4 py-3 text-center text-mocha">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brass mx-auto"></div>
                      <span className="ml-2 text-sm">Loading suggestions...</span>
                    </div>
                  ) : searchSuggestions.length > 0 ? (
                    searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left transition-colors first:rounded-t-xl last:rounded-b-xl focus:outline-none ${
                          index === selectedSuggestionIndex
                            ? 'bg-brass text-white'
                            : 'text-mocha hover:bg-brass hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={index === selectedSuggestionIndex ? 'text-white' : 'text-accent4'}>🔍</span>
                          <span className="font-medium">{suggestion}</span>
                        </div>
                      </button>
                    ))
                  ) : searchQuery.length >= 2 ? (
                    <div className="px-4 py-3 text-center text-mocha text-sm">
                      No suggestions found
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-xl bg-brass text-white font-bold hover:bg-wood transition"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
            <button
              onClick={handleRandom}
              className="px-4 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent2 transition"
            >
              Random
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Book Filter */}
              <div>
                <label className="block text-brass font-bold mb-2">Book</label>
                <select
                  value={selectedBook}
                  onChange={(e) => handleFilterChange('book', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brass bg-glass text-mocha focus:ring-2 focus:ring-accent2"
                >
                  <option value="all">All Books</option>
                  {Object.entries(HADITH_BOOKS).map(([id, book]) => (
                    <option key={id} value={id}>{book.name}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-brass font-bold mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brass bg-glass text-mocha focus:ring-2 focus:ring-accent2"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Narrator Filter */}
              <div>
                <label className="block text-brass font-bold mb-2">Narrator</label>
                <select
                  value={selectedNarrator}
                  onChange={(e) => handleFilterChange('narrator', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brass bg-glass text-mocha focus:ring-2 focus:ring-accent2"
                >
                  <option value="all">All Narrators</option>
                  {narrators.map(narrator => (
                    <option key={narrator} value={narrator}>{narrator}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-brass font-bold mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    handleSearch();
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-brass bg-glass text-mocha focus:ring-2 focus:ring-accent2"
                >
                  <option value="relevance">Relevance</option>
                  <option value="book">Book</option>
                  <option value="narrator">Narrator</option>
                  <option value="category">Category</option>
                  <option value="hadithNumber">Hadith Number</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Clear Filters Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-lg bg-glass text-mocha font-bold hover:bg-brass hover:text-white transition"
            >
              🗑️ Clear All Filters
            </button>
          </div>

          {/* Quick Book Selection */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBookSelect('all')}
              className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
                selectedBook === 'all'
                  ? 'bg-brass text-white'
                  : 'bg-glass text-mocha hover:bg-brass hover:text-white'
              }`}
            >
              All Books
            </button>
            {Object.entries(HADITH_BOOKS).map(([id, book]) => (
              <button
                key={id}
                onClick={() => handleBookSelect(id)}
                className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
                  selectedBook === id
                    ? 'bg-brass text-white'
                    : 'bg-glass text-mocha hover:bg-brass hover:text-white'
                }`}
                style={{ borderColor: book.color }}
              >
                {book.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="w-full text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
            <p className="text-mocha font-body">Loading hadith collection...</p>
          </div>
        )}

        {/* Empty Database State */}
        {!loading && isDatabaseEmpty && (
          <div className="w-full text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-brass mb-2">Database is Empty</h3>
            <p className="text-mocha mb-4">No hadiths found in the database. Please import data first.</p>
            <button
              onClick={handleImportData}
              className="px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent2 transition shadow-lg"
            >
              📥 Import Hadith Data
            </button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full glassmorph-card p-6 text-center">
            <div className="text-2xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-error mb-2">Error Loading Hadiths</h3>
            <p className="text-mocha mb-4">{error}</p>
            <button
              onClick={loadInitialData}
              className="px-4 py-2 rounded-lg bg-brass text-white font-bold hover:bg-wood transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && !isDatabaseEmpty && (
          <div className="w-full text-center">
            <p className="text-mocha font-body">
              Found {hadiths.length} hadith{hadiths.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedBook !== 'all' && ` in ${HADITH_BOOKS[selectedBook]?.name || selectedBook}`}
              {stats && (
                <span className="text-accent4 ml-2">
                  (Total in database: {stats.totalHadiths})
                </span>
              )}
            </p>
            {/* Debug Info */}
            {process.env.NODE_ENV === 'development' && (
              <p className="text-xs text-accent4 mt-2">
                Debug: Book={selectedBook}, Category={selectedCategory}, Narrator={selectedNarrator}
              </p>
            )}
          </div>
        )}

        {/* View Mode Toggle */}
        {!loading && !error && !isDatabaseEmpty && (
          <div className="w-full flex justify-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              viewMode === 'grid'
                ? 'bg-brass text-white'
                : 'bg-glass text-mocha hover:bg-brass hover:text-white'
            }`}
          >
            Grid View
          </button>
                      <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                viewMode === 'list'
                  ? 'bg-brass text-white'
                  : 'bg-glass text-mocha hover:bg-brass hover:text-white'
              }`}
            >
              List View
            </button>
          </div>
        )}

        {/* Hadith Grid/List */}
        {!loading && !error && !isDatabaseEmpty && (
          <div className={`w-full ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}>
            {hadiths.map((hadith) => (
            <div
              key={hadith.id}
              className="glassmorph-card p-6 hover:shadow-lg transition-all cursor-pointer animate-fadeIn"
              onClick={() => {
                setSelectedHadith(hadith);
                setShowModal(true);
              }}
            >
              {/* Book Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 rounded text-xs font-bold text-white"
                      style={{ backgroundColor: '#8B4513' }}>
                  {hadith.collection}
                </span>
                <span className="text-xs text-accent4">#{hadith.hadith_number}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-brass mb-2 line-clamp-2">
                {hadith.book_name ? `${hadith.book_name} - Book ${hadith.book_number}` : `Hadith #${hadith.hadith_number} - Book ${hadith.book_number}`}
              </h3>

              {/* Chapter Name */}
              {hadith.chapter_name && (
                <p className="text-sm text-accent4 mb-2 italic">
                  {hadith.chapter_name}
                </p>
              )}

              {/* Preview Text */}
              <p className="text-mocha text-sm mb-3 line-clamp-3">
                {hadith.translation_en && hadith.translation_en.length > 0 
                  ? hadith.translation_en.substring(0, 150) + '...' 
                  : hadith.text_arabic && hadith.text_arabic.length > 0
                    ? hadith.text_arabic.substring(0, 100) + '...'
                    : `Hadith #${hadith.hadith_number} from ${hadith.collection} narrated by ${hadith.narrator}`
                }
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-accent4 mb-2">
                <span>By: {hadith.narrator}</span>
                <span>Grade: {hadith.grade}</span>
              </div>

              {/* Tags */}
              {hadith.tags && hadith.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {hadith.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs bg-glass text-mocha"
                    >
                      {tag}
                    </span>
                  ))}
                  {hadith.tags.length > 3 && (
                    <span className="px-2 py-1 rounded text-xs bg-glass text-accent4">
                      +{hadith.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(hadith);
                  }}
                  className={`p-2 rounded-lg transition ${
                    favorites.includes(hadith.id)
                      ? 'bg-warning text-white'
                      : 'bg-glass text-mocha hover:bg-brass hover:text-white'
                  }`}
                >
                  {favorites.includes(hadith.id) ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(hadith);
                  }}
                  className="p-2 rounded-lg bg-glass text-mocha hover:bg-brass hover:text-white transition"
                >
                  📤
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* No Results */}
        {!loading && !error && !isDatabaseEmpty && hadiths.length === 0 && !searching && (
          <div className="w-full text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-bold text-brass mb-2">No Hadiths Found</h3>
            <p className="text-mocha">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Hadith Modal */}
        {showModal && selectedHadith && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-darkcard rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded text-sm font-bold text-white"
                          style={{ backgroundColor: '#8B4513' }}>
                      {selectedHadith.collection}
                    </span>
                    <span className="text-sm text-accent4">#{selectedHadith.hadith_number}</span>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-2xl text-mocha hover:text-brass transition"
                  >
                    ×
                  </button>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-brass mb-4">
                  Hadith #{selectedHadith.hadith_number} - Book {selectedHadith.book_number}
                </h2>

                {/* Arabic Text */}
                {selectedHadith.text_arabic && (
                  <div className="mb-4 p-4 bg-glass rounded-lg">
                    <p className="text-right text-lg leading-relaxed" dir="rtl">
                      {selectedHadith.text_arabic}
                    </p>
                  </div>
                )}

                {/* English Text */}
                <div className="mb-6">
                  <p className="text-mocha text-lg leading-relaxed">
                    {selectedHadith.translation_en}
                  </p>
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-glass rounded-lg">
                  <div>
                    <span className="font-bold text-brass">Narrator:</span>
                    <span className="text-mocha ml-2">{selectedHadith.narrator}</span>
                  </div>
                  <div>
                    <span className="font-bold text-brass">Collection:</span>
                    <span className="text-mocha ml-2">{selectedHadith.collection}</span>
                  </div>
                  <div>
                    <span className="font-bold text-brass">Book Number:</span>
                    <span className="text-mocha ml-2">{selectedHadith.book_number}</span>
                  </div>
                  <div>
                    <span className="font-bold text-brass">Grade:</span>
                    <span className="text-mocha ml-2">{selectedHadith.grade}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFavorite(selectedHadith)}
                    className={`px-4 py-2 rounded-lg font-bold transition ${
                      favorites.includes(selectedHadith.id)
                        ? 'bg-warning text-white'
                        : 'bg-brass text-white hover:bg-wood'
                    }`}
                  >
                    {favorites.includes(selectedHadith.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                  </button>
                  <button
                    onClick={() => handleShare(selectedHadith)}
                    className="px-4 py-2 rounded-lg bg-accent text-white font-bold hover:bg-accent2 transition"
                  >
                    📤 Share
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-glass text-mocha font-bold hover:bg-brass hover:text-white transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
} 