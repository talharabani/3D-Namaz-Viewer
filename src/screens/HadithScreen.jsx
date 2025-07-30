import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from '../utils/translations';

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

const API_KEY = '$2y$10$KwWKqh9ky2wvjKPLtRgXJOKlVm5Sn1HbvBZp87kSVpZexB7xZhyO';
const API_URL = 'https://hadithapi.com/api/hadiths';

// Comprehensive fallback hadith data with titles
const FALLBACK_HADITHS = [
  {
    id: 1,
    title: "The Most Beloved Places to Allah",
    text: "The Prophet Muhammad ﷺ said: 'The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets.'",
    narrator: "Abu Huraira",
    book: "Sahih Muslim",
    category: "Mosque"
  },
  {
    id: 2,
    title: "Actions Are by Intentions",
    text: "The Prophet Muhammad ﷺ said: 'Actions are by intentions, and every person will have what they intended.'",
    narrator: "Umar ibn Al-Khattab",
    book: "Sahih Bukhari",
    category: "Intentions"
  },
  {
    id: 3,
    title: "The Five Pillars of Islam",
    text: "The Prophet Muhammad ﷺ said: 'Islam is built upon five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing prayer, paying zakat, fasting Ramadan, and performing Hajj.'",
    narrator: "Abdullah ibn Umar",
    book: "Sahih Bukhari",
    category: "Pillars"
  },
  {
    id: 4,
    title: "Kindness to Parents",
    text: "The Prophet Muhammad ﷺ said: 'Paradise lies at the feet of your mother.'",
    narrator: "Anas ibn Malik",
    book: "Sunan An-Nasai",
    category: "Family"
  },
  {
    id: 5,
    title: "The Best of Deeds",
    text: "The Prophet Muhammad ﷺ said: 'The best of deeds is to believe in Allah and His Messenger, then jihad in the way of Allah.'",
    narrator: "Abu Huraira",
    book: "Sahih Bukhari",
    category: "Faith"
  },
  {
    id: 6,
    title: "Seeking Knowledge",
    text: "The Prophet Muhammad ﷺ said: 'Seeking knowledge is obligatory upon every Muslim.'",
    narrator: "Anas ibn Malik",
    book: "Sunan Ibn Majah",
    category: "Knowledge"
  },
  {
    id: 7,
    title: "Good Character",
    text: "The Prophet Muhammad ﷺ said: 'The most complete of believers in faith is the one with the best character.'",
    narrator: "Abu Huraira",
    book: "Sunan Abu Dawud",
    category: "Character"
  },
  {
    id: 8,
    title: "Helping Others",
    text: "The Prophet Muhammad ﷺ said: 'Whoever helps ease a difficulty in this world, Allah will help ease a difficulty for them in the Hereafter.'",
    narrator: "Abu Huraira",
    book: "Sahih Muslim",
    category: "Charity"
  },
  {
    id: 9,
    title: "Prayer on Time",
    text: "The Prophet Muhammad ﷺ said: 'The most beloved of deeds to Allah is prayer at its proper time, then being good to parents, then jihad in the way of Allah.'",
    narrator: "Abdullah ibn Mas'ud",
    book: "Sahih Bukhari",
    category: "Prayer"
  },
  {
    id: 10,
    title: "Truthfulness",
    text: "The Prophet Muhammad ﷺ said: 'Truthfulness leads to righteousness, and righteousness leads to Paradise. A man continues to be truthful until he becomes a truthful person.'",
    narrator: "Abdullah ibn Mas'ud",
    book: "Sahih Bukhari",
    category: "Character"
  },
  {
    id: 11,
    title: "Neighbor's Rights",
    text: "The Prophet Muhammad ﷺ said: 'Whoever believes in Allah and the Last Day, let him be good to his neighbor.'",
    narrator: "Abu Huraira",
    book: "Sahih Muslim",
    category: "Social"
  },
  {
    id: 12,
    title: "Smiling is Charity",
    text: "The Prophet Muhammad ﷺ said: 'Your smiling at your brother is charity, commanding good and forbidding evil is charity, giving directions to a man lost in the land is charity, and removing harmful things from the road is charity.'",
    narrator: "Abu Dharr",
    book: "Sunan At-Tirmidhi",
    category: "Charity"
  }
];

const CALLIGRAPHY = (
  <svg className="absolute left-1/2 top-1/2 -z-10 opacity-10 pointer-events-none select-none fade-in-out" style={{ transform: 'translate(-50%, -50%)', width: '60%', height: '60%' }} viewBox="0 0 200 80" fill="none">
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="48" fontFamily="serif" fill="#B5A642">﷽</text>
  </svg>
);

function getSaved(type) {
  try {
    return JSON.parse(localStorage.getItem('fav_' + type)) || [];
  } catch { return []; }
}

export default function HadithScreen() {
  const { t } = useTranslation();
  const [hadiths, setHadiths] = useState([]);
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [selectedHadith, setSelectedHadith] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('loading'); // 'loading', 'online', 'offline'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState({ hadith: getSaved('hadith') });
  const [showFavs, setShowFavs] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Get unique categories
  const categories = ['all', ...new Set(FALLBACK_HADITHS.map(h => h.category))];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
                 // Try to fetch hadith with API key using proper query parameters
         try {
           // Try different API endpoints to find the correct one
           let hadithData = null;
           
           // First try: Basic API call
           try {
             const hadithRes = await axios.get(`${API_URL}?apiKey=${API_KEY}&limit=50`, {
               timeout: 10000
             });
             if (hadithRes.data.success && hadithRes.data.data && hadithRes.data.data.length > 0) {
               hadithData = hadithRes.data;
             }
           } catch (error) {
             console.log('Basic API call failed, trying alternative endpoints');
           }

           // Second try: Try with different parameters
           if (!hadithData) {
             try {
               const hadithRes2 = await axios.get(`${API_URL}?apiKey=${API_KEY}&book=sahih-bukhari&limit=20`, {
                 timeout: 10000
               });
               if (hadithRes2.data.success && hadithRes2.data.data && hadithRes2.data.data.length > 0) {
                 hadithData = hadithRes2.data;
               }
             } catch (error) {
               console.log('Book-specific API call failed');
             }
           }

           if (hadithData && hadithData.data && hadithData.data.length > 0) {
             // Transform API data to match our format
             const transformedHadiths = hadithData.data.map((h, index) => ({
               id: h.id || index + 1,
               title: h.hadithEnglish ? h.hadithEnglish.substring(0, 100) + '...' : `Hadith ${index + 1}`,
               text: h.hadithEnglish || h.text || h.hadith || h.content,
               arabicText: h.hadithArabic || '',
               narrator: h.narrator || h.narratedBy || 'Unknown',
               book: h.book || h.collection || 'Unknown',
               category: h.chapter || h.category || 'General',
               hadithNumber: h.hadithNumber || '',
               grade: h.grade || ''
             }));
             setHadiths(transformedHadiths);
             setApiStatus('online');
           } else {
             throw new Error('No hadith data available');
           }
         } catch (hadithError) {
           console.warn('Hadith API failed, using fallback:', hadithError);
           setHadiths(FALLBACK_HADITHS);
           setApiStatus('offline');
         }
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError('Unable to fetch content. Please try again later.');
        setHadiths(FALLBACK_HADITHS);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filter hadiths based on search and category
  useEffect(() => {
    let filtered = hadiths;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(h => h.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(h => 
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.narrator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.book.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredHadiths(filtered);
  }, [hadiths, searchTerm, selectedCategory]);

  const isFav = selectedHadith ? favorites.hadith.some(h => h.id === selectedHadith.id) : false;

  function handleShare() {
    if (selectedHadith && navigator.clipboard) {
      const textToShare = `${selectedHadith.title}\n\n${selectedHadith.text}\n\n- Narrated by ${selectedHadith.narrator} (${selectedHadith.book})`;
      navigator.clipboard.writeText(textToShare);
      alert('Copied to clipboard!');
    }
  }

  function handleFavorite() {
    if (!selectedHadith) return;
    let updated = [...favorites.hadith];
    if (isFav) {
      updated = updated.filter(h => h.id !== selectedHadith.id);
    } else {
      updated.push(selectedHadith);
    }
    setFavorites(favs => ({ ...favs, hadith: updated }));
    localStorage.setItem('fav_hadith', JSON.stringify(updated));
  }

  function handleRandom() {
    if (filteredHadiths.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredHadiths.length);
      setSelectedHadith(filteredHadiths[randomIndex]);
    }
  }

  // Enhanced search function using API with correct parameters
  async function handleSearch(searchQuery) {
    if (!searchQuery.trim()) {
      // If search is empty, fetch all hadiths
      try {
        const response = await axios.get(`${API_URL}?apiKey=${API_KEY}&limit=50`);
        if (response.data.success && response.data.data) {
          const transformedHadiths = response.data.data.map((h, index) => ({
            id: h.id || index + 1,
            title: h.hadithEnglish ? h.hadithEnglish.substring(0, 100) + '...' : `Hadith ${index + 1}`,
            text: h.hadithEnglish || h.text || h.hadith || h.content,
            arabicText: h.hadithArabic || '',
            narrator: h.narrator || h.narratedBy || 'Unknown',
            book: h.book || h.collection || 'Unknown',
            category: h.chapter || h.category || 'General',
            hadithNumber: h.hadithNumber || '',
            grade: h.grade || ''
          }));
          setHadiths(transformedHadiths);
        }
      } catch (error) {
        console.warn('Failed to fetch all hadiths, using fallback:', error);
        setHadiths(FALLBACK_HADITHS);
      }
      return;
    }

    setSearching(true);
    try {
      // Try different search parameters based on the API documentation
      let searchResults = null;
      
      // First try: Search by English text
      try {
        const response = await axios.get(`${API_URL}?apiKey=${API_KEY}&hadithEnglish=${encodeURIComponent(searchQuery)}&limit=20`);
        if (response.data.success && response.data.data && response.data.data.length > 0) {
          searchResults = response.data.data;
        }
      } catch (error) {
        console.log('English search failed, trying alternative parameters');
      }

      // Second try: Search by Arabic text if English failed
      if (!searchResults) {
        try {
          const arabicResponse = await axios.get(`${API_URL}?apiKey=${API_KEY}&hadithArabic=${encodeURIComponent(searchQuery)}&limit=20`);
          if (arabicResponse.data.success && arabicResponse.data.data && arabicResponse.data.data.length > 0) {
            searchResults = arabicResponse.data.data;
          }
        } catch (error) {
          console.log('Arabic search failed, trying book search');
        }
      }

      // Third try: Search by book name
      if (!searchResults) {
        try {
          const bookResponse = await axios.get(`${API_URL}?apiKey=${API_KEY}&book=${encodeURIComponent(searchQuery)}&limit=20`);
          if (bookResponse.data.success && bookResponse.data.data && bookResponse.data.data.length > 0) {
            searchResults = bookResponse.data.data;
          }
        } catch (error) {
          console.log('Book search failed, using fallback');
        }
      }

      // Fourth try: Search by narrator
      if (!searchResults) {
        try {
          const narratorResponse = await axios.get(`${API_URL}?apiKey=${API_KEY}&narrator=${encodeURIComponent(searchQuery)}&limit=20`);
          if (narratorResponse.data.success && narratorResponse.data.data && narratorResponse.data.data.length > 0) {
            searchResults = narratorResponse.data.data;
          }
        } catch (error) {
          console.log('Narrator search failed, using fallback');
        }
      }

             if (searchResults) {
         const transformedHadiths = searchResults.map((h, index) => ({
           id: h.id || index + 1,
           title: h.hadithEnglish ? h.hadithEnglish.substring(0, 100) + '...' : `Hadith ${index + 1}`,
           text: h.hadithEnglish || h.text || h.hadith || h.content,
           arabicText: h.hadithArabic || '',
           narrator: h.narrator || h.narratedBy || 'Unknown',
           book: h.book || h.collection || 'Unknown',
           category: h.chapter || h.category || 'General',
           hadithNumber: h.hadithNumber || '',
           grade: h.grade || ''
         }));
         setHadiths(transformedHadiths);
         setApiStatus('online');
       } else {
        // If all searches fail, use fallback and filter by search term
        const filteredFallback = FALLBACK_HADITHS.filter(h => 
          h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.book.toLowerCase().includes(searchQuery.toLowerCase())
        );
                 setHadiths(filteredFallback.length > 0 ? filteredFallback : FALLBACK_HADITHS);
         setApiStatus('offline');
       }
     } catch (error) {
      console.error('Search error:', error);
      // Use fallback with local filtering
      const filteredFallback = FALLBACK_HADITHS.filter(h => 
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.book.toLowerCase().includes(searchQuery.toLowerCase())
      );
             setHadiths(filteredFallback.length > 0 ? filteredFallback : FALLBACK_HADITHS);
       setApiStatus('offline');
     }
     setSearching(false);
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-12">
        <div className="w-full relative glassmorph-card min-h-[400px] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">📖</div>
            <div className="text-brass font-bold text-xl">{t('loadingHadiths')}</div>
            <div className="text-mocha">{t('pleaseWait')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 py-8 px-4">
        {/* Header */}
        <div className="w-full relative glassmorph-card p-6">
          {CALLIGRAPHY}
                     <div className="text-center mb-6">
             <h1 className="text-3xl font-heading text-brass font-bold mb-2">{t('hadithCollection')}</h1>
             <p className="text-mocha">{t('discoverWisdom')}</p>
             <div className="mt-2 flex items-center justify-center gap-2">
               <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
               <span className="text-xs text-mocha">
                 {apiStatus === 'online' ? '🟢 Live API Connected' : apiStatus === 'offline' ? '🔴 Using Local Data' : '🟡 Connecting...'}
               </span>
             </div>
             {apiStatus === 'offline' && (
               <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                 <p className="text-xs text-yellow-800">
                   💡 <strong>Offline Mode:</strong> Using local hadith collection. Search will work with local data.
                 </p>
               </div>
             )}
           </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
                             <div className="flex-1 relative">
                 <input
                   type="text"
                   placeholder={t('searchHadiths')}
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                   className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-brass/30 bg-white/80 text-mocha placeholder-mocha/60 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/20"
                 />
                                    <button
                     onClick={() => handleSearch(searchTerm)}
                     disabled={searching}
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-brass text-white rounded-lg flex items-center justify-center hover:bg-wood transition-colors disabled:opacity-50"
                   >
                     {searching ? '⏳' : '🔍'}
                   </button>
               </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 text-mocha focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/20"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? t('allCategories') : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 text-mocha hover:border-brass transition-colors"
            >
              {viewMode === 'grid' ? '📋' : '🔲'}
            </button>
          </div>

                     {/* Quick Search Buttons */}
           <div className="mb-4">
             <p className="text-sm text-mocha mb-2">Quick Search:</p>
             <div className="flex flex-wrap gap-2">
               <button
                 onClick={() => handleSearch('prayer')}
                 className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold hover:from-blue-600 hover:to-blue-700 transition-all"
               >
                 🕌 Prayer
               </button>
               <button
                 onClick={() => handleSearch('charity')}
                 className="px-3 py-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold hover:from-green-600 hover:to-green-700 transition-all"
               >
                 💝 Charity
               </button>
               <button
                 onClick={() => handleSearch('knowledge')}
                 className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold hover:from-purple-600 hover:to-purple-700 transition-all"
               >
                 📚 Knowledge
               </button>
               <button
                 onClick={() => handleSearch('patience')}
                 className="px-3 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold hover:from-orange-600 hover:to-orange-700 transition-all"
               >
                 ⏳ Patience
               </button>
               <button
                 onClick={() => handleSearch('forgiveness')}
                 className="px-3 py-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold hover:from-red-600 hover:to-red-700 transition-all"
               >
                 🤝 Forgiveness
               </button>
             </div>
           </div>

           {/* Stats */}
           <div className="flex justify-between items-center text-sm text-mocha">
             <span>{filteredHadiths.length} {t('hadithsFound')}</span>
             <div className="flex gap-2">
               <button
                 onClick={handleRandom}
                 className="px-3 py-1 rounded-lg bg-gradient-to-r from-brass to-wood text-white text-sm font-bold hover:from-wood hover:to-brass transition-all"
               >
                 🎲 {t('random')}
               </button>
               <button
                 onClick={() => setShowFavs(true)}
                 className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all"
               >
                 ❤️ {t('favorites')} ({favorites.hadith.length})
               </button>
             </div>
           </div>
        </div>

        {/* Hadith Grid/List */}
        <div className={`w-full grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredHadiths.map((hadith) => (
            <div
              key={hadith.id}
              onClick={() => setSelectedHadith(hadith)}
              className={`glassmorph-card p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${
                selectedHadith?.id === hadith.id ? 'border-brass shadow-lg' : 'border-brass/20'
              }`}
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-brass mb-2 line-clamp-2">{hadith.title}</h3>
                <div className="text-xs text-mocha/70 mb-2">
                  <span className="bg-brass/20 px-2 py-1 rounded-full">{hadith.category}</span>
                </div>
              </div>
                             <p className="text-mocha text-sm line-clamp-3 mb-3">{hadith.text}</p>
               {hadith.arabicText && (
                 <div className="mb-3">
                   <p className="text-right text-sm text-brass font-arabic leading-relaxed line-clamp-2">
                     {hadith.arabicText}
                   </p>
                 </div>
               )}
               <div className="text-xs text-mocha/60">
                 <div>📖 {hadith.narrator}</div>
                 <div>📚 {hadith.book}</div>
                 {hadith.hadithNumber && <div>🔢 #{hadith.hadithNumber}</div>}
                 {hadith.grade && <div>⭐ {hadith.grade}</div>}
               </div>
            </div>
          ))}
        </div>

        {/* Selected Hadith Modal */}
        {selectedHadith && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-brass">{selectedHadith.title}</h2>
                  <button
                    onClick={() => setSelectedHadith(null)}
                    className="text-2xl text-mocha hover:text-brass transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-4">
                  <span className="bg-brass/20 px-3 py-1 rounded-full text-sm text-brass font-medium">
                    {selectedHadith.category}
                  </span>
                </div>
                
                                 <div className="text-mocha text-lg leading-relaxed mb-6 font-serif">
                   {selectedHadith.text}
                 </div>
                 
                 {selectedHadith.arabicText && (
                   <div className="mb-6">
                     <h3 className="text-brass font-bold mb-3">Arabic Text:</h3>
                     <div className="bg-sand/20 p-4 rounded-xl">
                       <p className="text-right text-lg text-brass font-arabic leading-relaxed">
                         {selectedHadith.arabicText}
                       </p>
                     </div>
                   </div>
                 )}
                
                <div className="bg-sand/30 p-4 rounded-xl mb-6">
                                     <div className="text-sm text-mocha/80">
                     <div><strong>Narrated by:</strong> {selectedHadith.narrator}</div>
                     <div><strong>Source:</strong> {selectedHadith.book}</div>
                     {selectedHadith.hadithNumber && <div><strong>Hadith Number:</strong> #{selectedHadith.hadithNumber}</div>}
                     {selectedHadith.grade && <div><strong>Grade:</strong> {selectedHadith.grade}</div>}
                     {selectedHadith.category && <div><strong>Chapter:</strong> {selectedHadith.category}</div>}
                   </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleFavorite}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                      isFav 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-brass text-white hover:bg-wood'
                    }`}
                  >
                    {isFav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all"
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Modal */}
        {showFavs && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-brass">Your Favorite Hadiths</h2>
                  <button
                    onClick={() => setShowFavs(false)}
                    className="text-2xl text-mocha hover:text-brass transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                {favorites.hadith.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">💔</div>
                    <div className="text-mocha text-lg">No favorite hadiths yet.</div>
                    <div className="text-mocha/60">Click the heart icon on any hadith to add it to your favorites.</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favorites.hadith.map((hadith) => (
                      <div
                        key={hadith.id}
                        className="p-4 border border-brass/20 rounded-xl hover:border-brass transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedHadith(hadith);
                          setShowFavs(false);
                        }}
                      >
                        <h3 className="font-bold text-brass mb-2">{hadith.title}</h3>
                        <p className="text-mocha text-sm line-clamp-2 mb-2">{hadith.text}</p>
                        <div className="text-xs text-mocha/60">
                          {hadith.narrator} • {hadith.book}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.25; }
          }
          .fade-in-out {
            animation: fadeInOut 6s ease-in-out infinite;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .glassmorph-card {
            background: rgba(255,255,255,0.35);
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15);
            backdrop-filter: blur(8px);
            border-radius: 1.5rem;
            border: 1.5px solid rgba(181,166,66,0.2);
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
} 