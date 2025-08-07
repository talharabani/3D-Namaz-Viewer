import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { duasByCategory, duaCategories } from '../data/duas';

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl mx-auto py-8 px-2 md:px-4 relative">
        {/* Decorative pattern */}
        <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none select-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => navigate('/duas')}
              className="text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-2xl md:text-3xl font-heading text-amber-800 dark:text-amber-200 font-bold drop-shadow">
              {categoryInfo ? categoryInfo.title : 'Duas'}
            </h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {categoryInfo?.description || 'Browse and memorize authentic duas'}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search within duas..."
                className="w-full rounded-xl border border-amber-300 dark:border-amber-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-lg"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowTransliteration(!showTransliteration)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  showTransliteration 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
                }`}
              >
                📝 Transliteration
              </button>
              
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  showTranslation 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
                }`}
              >
                🌐 Translation
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>{filteredDuas.length} of {allDuas.length} duas</span>
            {getBookmarkedCount() > 0 && (
              <span className="text-amber-600 dark:text-amber-400">⭐ {getBookmarkedCount()} bookmarked</span>
            )}
          </div>
        </div>

        {/* Special Content for aftersalah */}
        {category === 'aftersalah' && (
          <div className="relative max-w-xl mx-auto mb-8 p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 shadow-xl border border-amber-200 dark:border-amber-700 group transition-all duration-200 hover:scale-105 hover:shadow-2xl">
            {/* Decorative floating icon */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-amber-600 shadow-lg border-4 border-amber-50 dark:border-gray-800 z-10">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mt-8 text-xl md:text-2xl font-arabic text-amber-800 dark:text-amber-200 text-center font-bold tracking-wide drop-shadow-sm">
              Daily Dhikr After Salah
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 italic text-center mb-2">
              Summary Checklist
            </div>
            <ul className="text-base text-gray-700 dark:text-gray-300 space-y-2 mt-2">
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
                  <span className="inline-block w-5 h-5 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center shadow-sm">{idx+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Duas List */}
        <div className="space-y-6">
          {filteredDuas.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400 text-lg py-12">
              <div className="text-4xl mb-4">🔍</div>
              <p>No duas found matching your search.</p>
              <p className="text-sm mt-2">Try different keywords or browse all duas.</p>
            </div>
          ) : (
            filteredDuas.map((dua, idx) => {
              const duaId = `${category}-${dua.arabic}`;
              const isBookmarked = bookmarkedDuas.includes(duaId);
              
              return (
                <div key={idx} className="bg-white dark:bg-gray-800 transition-all duration-300 rounded-2xl group hover:bg-amber-50 dark:hover:bg-gray-700 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
                  <div className="p-6">
                    {/* Arabic Text */}
                    <div className="text-right mb-4">
                      <p className="text-xl md:text-2xl font-arabic text-amber-800 dark:text-amber-200 leading-loose">{dua.arabic}</p>
                    </div>

                    {/* Transliteration */}
                    {showTransliteration && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">{dua.transliteration}</p>
                      </div>
                    )}

                    {/* Translation */}
                    {showTranslation && (
                      <div className="mb-4">
                        <p className="text-base text-gray-700 dark:text-gray-300">{dua.translation}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => copyToClipboard(dua.arabic)}
                        className="px-3 py-1 bg-amber-700 text-white rounded-lg text-sm hover:bg-amber-800 transition-colors font-medium"
                      >
                        📋 Copy Arabic
                      </button>
                      
                      <button
                        onClick={() => copyToClipboard(`${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`)}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors font-medium"
                      >
                        📋 Copy All
                      </button>
                      
                      <button
                        onClick={() => shareDua(dua)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors font-medium"
                      >
                        📤 Share
                      </button>
                      
                      <button
                        onClick={() => openDuaModal(dua)}
                        className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium"
                      >
                        👁️ View Full
                      </button>
                      
                      <button
                        onClick={() => toggleBookmark(duaId)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors font-medium ${
                          isBookmarked 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                      >
                        {isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">{allDuas.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Duas</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">{getBookmarkedCount()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Bookmarked</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">{filteredDuas.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Showing</div>
          </div>
        </div>
      </div>

      {/* Dua Modal */}
      {showDuaModal && selectedDua && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">Full Dua View</h3>
                <button
                  onClick={closeDuaModal}
                  className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-right">
                  <p className="text-3xl font-arabic text-amber-800 dark:text-amber-200 leading-loose">{selectedDua.arabic}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Transliteration:</h4>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{selectedDua.transliteration}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Translation:</h4>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{selectedDua.translation}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => copyToClipboard(selectedDua.arabic)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
                  >
                    📋 Copy Arabic
                  </button>
                  <button
                    onClick={() => copyToClipboard(`${selectedDua.arabic}\n\n${selectedDua.transliteration}\n\n${selectedDua.translation}`)}
                    className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 font-medium"
                  >
                    📋 Copy All
                  </button>
                  <button
                    onClick={() => shareDua(selectedDua)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 