import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import duaCategories, { duasByCategory } from '../data/duas';

export default function DuaScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDailySuggestion, setShowDailySuggestion] = useState(true);
  const [bookmarkedDuas, setBookmarkedDuas] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

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

  const filteredCategories = duaCategories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(search.toLowerCase()))
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
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
      toast.textContent = 'Copied to clipboard!';
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
          title: 'Dua from Namaz Learning',
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-6xl mx-auto py-8 px-2 md:px-4 relative">
        {/* Decorative pattern */}
        <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none select-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4 drop-shadow">
            📿 Dua Collection
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover and memorize authentic duas from the Quran and Sunnah
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search duas or categories..."
              className="w-full rounded-xl border border-amber-300 dark:border-amber-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-lg"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                showBookmarks 
                  ? 'bg-amber-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
              }`}
            >
              ⭐ Bookmarks ({getTotalBookmarkedCount()})
            </button>
            
            <button
              onClick={() => setShowDailySuggestion(!showDailySuggestion)}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                showDailySuggestion 
                  ? 'bg-amber-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
              }`}
            >
              🌟 Daily Dua
            </button>
          </div>
        </div>

        {/* Daily Suggestion */}
        {showDailySuggestion && dailyDua && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">🌟 Today's Dua</h3>
                <button
                  onClick={() => setShowDailySuggestion(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-right">
                  <p className="text-2xl font-arabic text-amber-800 dark:text-amber-200 leading-loose">{dailyDua.arabic}</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 italic">{dailyDua.transliteration}</div>
                <div className="text-base text-gray-700 dark:text-gray-300">{dailyDua.translation}</div>
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => copyToClipboard(dailyDua.arabic)}
                    className="px-3 py-1 bg-amber-700 text-white rounded-lg text-sm hover:bg-amber-800 transition-colors font-medium"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => shareDua(dailyDua)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors font-medium"
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg py-8">
              <div className="text-4xl mb-4">🔍</div>
              <p>No categories found matching your search.</p>
              <p className="text-sm mt-2">Try different keywords or browse all categories.</p>
            </div>
          ) : (
            filteredCategories.map((cat) => {
              const categoryDuas = duasByCategory[cat.key] || [];
              const bookmarkedCount = categoryDuas.filter(dua => 
                bookmarkedDuas.includes(`${cat.key}-${dua.arabic}`)
              ).length;
              
              return (
                <div
                  key={cat.key}
                  className="bg-white dark:bg-gray-800 text-center transition-all duration-300 cursor-pointer rounded-2xl group hover:bg-amber-50 dark:hover:bg-gray-700 active:bg-amber-100 dark:active:bg-gray-600 focus:bg-amber-50 dark:focus:bg-gray-700 hover:scale-105 active:scale-100 hover:border-amber-300 dark:hover:border-amber-600 focus:border-amber-300 dark:focus:border-amber-600 hover:shadow-2xl focus:shadow-2xl active:shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                  onClick={() => navigate(`/duas/${encodeURIComponent(cat.key)}`)}
                >
                  {/* Category Icon */}
                  <div className="text-4xl mb-3 mt-4">
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
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2 text-center drop-shadow">{cat.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 opacity-80 mb-3 line-clamp-2">{cat.description}</p>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{categoryDuas.length} duas</span>
                      {bookmarkedCount > 0 && (
                        <span className="text-amber-600 dark:text-amber-400">⭐ {bookmarkedCount}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-100/20 dark:from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">{duaCategories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">
              {Object.values(duasByCategory).reduce((total, duas) => total + duas.length, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Duas</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">{getTotalBookmarkedCount()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Bookmarked</div>
          </div>
        </div>
      </div>
    </div>
  );
} 