import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '$2y$10$KwWKqh9ky2wvjKPLtRgXJOKlVm5Sn1HbvBZp87kSVpZexB7xZhyO';
const API_URL = 'https://hadithapi.com/api/hadiths';

const CALLIGRAPHY = (
  <svg className="absolute left-1/2 top-1/2 -z-10 opacity-0 pointer-events-none select-none fade-in-out" style={{ transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }} viewBox="0 0 200 80" fill="none">
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="48" fontFamily="serif" fill="#B5A642" opacity="0.2">﷽</text>
  </svg>
);

function useTypingEffect(text, speed = 30) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    if (!text) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(t => t + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

function getSaved(type) {
  try {
    return JSON.parse(localStorage.getItem('fav_' + type)) || [];
  } catch { return []; }
}

export default function HadithScreen() {
  const [hadith, setHadith] = useState(null);
  const [ayat, setAyat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAyat, setShowAyat] = useState(false);
  const [favorites, setFavorites] = useState({ hadith: getSaved('hadith'), ayat: getSaved('ayat') });
  const [showFavs, setShowFavs] = useState(false);
  const [randomizing, setRandomizing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Try to fetch hadith with API key
        try {
          const hadithRes = await axios.get(API_URL, {
            headers: { Authorization: API_KEY }
          });
          let hadithData = hadithRes.data;
          if (hadithData.success && hadithData.data && hadithData.data.length > 0) {
            // Pick a random hadith for daily display
            const randomIdx = Math.floor(Math.random() * hadithData.data.length);
            setHadith(hadithData.data[randomIdx]);
          }
        } catch (hadithError) {
          console.warn('Hadith API failed, using fallback:', hadithError);
          // Use fallback hadith data
          setHadith({
            text: "The Prophet Muhammad ﷺ said: 'The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets.' (Muslim)",
            narrator: "Abu Huraira",
            book: "Sahih Muslim"
          });
        }
        
        // Try to fetch ayat
        try {
          const ayatRes = await fetch('https://api.aladhan.com/v1/ayah');
          const ayatData = await ayatRes.json();
          if (ayatData.code === 200 && ayatData.data && ayatData.data.text) {
            setAyat(ayatData.data);
          }
        } catch (ayatError) {
          console.warn('Ayat API failed, using fallback:', ayatError);
          // Use fallback ayat data
          setAyat({
            text: "Indeed, Allah is with those who are patient. (Quran 2:153)",
            reference: "Surah Al-Baqarah, Verse 153"
          });
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        setError('Unable to fetch content. Please try again later.');
      }
      setLoading(false);
    }
    fetchData();
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const text = showAyat && ayat ? ayat.text : hadith ? (hadith.text || hadith.hadith) : '';
  const typing = useTypingEffect(text, 22);
  const isFav = showAyat
    ? favorites.ayat.some(a => a.text === (ayat && ayat.text))
    : favorites.hadith.some(h => h.text === (hadith && (hadith.text || hadith.hadith)));

  function handleShare() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  }

  function handleFavorite() {
    const type = showAyat ? 'ayat' : 'hadith';
    const item = showAyat ? ayat : hadith;
    if (!item) return;
    let updated = [...favorites[type]];
    if (isFav) {
      updated = updated.filter(f => f.text !== (item.text || item.hadith));
    } else {
      updated.push(item);
    }
    setFavorites(favs => ({ ...favs, [type]: updated }));
    localStorage.setItem('fav_' + type, JSON.stringify(updated));
  }

  function handleRandom() {
    setRandomizing(true);
    setTimeout(() => {
      const type = showAyat ? 'ayat' : 'hadith';
      const favs = favorites[type];
      if (favs.length > 0) {
        const idx = Math.floor(Math.random() * favs.length);
        if (showAyat) setAyat(favs[idx]);
        else setHadith(favs[idx]);
      }
      setRandomizing(false);
    }, 400);
  }

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const now = new Date();
      const millisTill9 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0) - now;
      if (millisTill9 > 0) {
        setTimeout(() => {
          new Notification('Daily Reminder', { body: text.slice(0, 100) + '...' });
        }, millisTill9);
      }
    }
    // eslint-disable-next-line
  }, [text]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">
      <div className="w-full relative glassmorph-card min-h-[220px] flex flex-col items-center">
        {CALLIGRAPHY}
        <div className="flex w-full justify-between items-center mb-2">
          <div className="text-2xl font-heading text-brass font-bold">{showAyat ? 'Daily Ayat' : 'Daily Hadith'}</div>
          <div className="flex gap-2">
            <button
              className={`btn text-sm ${showAyat ? 'from-accent2 to-accent3' : 'from-accent to-accent2'}`}
              onClick={() => setShowAyat(true)}
            >Ayat</button>
            <button
              className={`btn text-sm ${!showAyat ? 'from-accent2 to-accent3' : 'from-accent to-accent2'}`}
              onClick={() => setShowAyat(false)}
            >Hadith</button>
          </div>
        </div>
        {loading ? (
          <div className="text-mocha text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-lg">{error}</div>
        ) : (
          <div className="text-center text-lg text-ivory font-body mt-4 animate-fadeIn">
            {showAyat ? ayat : hadith}
          </div>
        )}
      </div>
      {/* Favorites Modal */}
      {showFavs && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-xl text-brass" onClick={() => setShowFavs(false)}>✕</button>
            <div className="text-xl font-bold text-emerald-900 mb-2">Your Favorites</div>
            <div className="flex gap-2 mb-4">
              <button
                className={`px-3 py-1 rounded-lg text-sm font-bold ${showAyat ? 'bg-brass text-mocha' : 'bg-white/70 text-brass'} transition`}
                onClick={() => setShowAyat(true)}
              >Ayat</button>
              <button
                className={`px-3 py-1 rounded-lg text-sm font-bold ${!showAyat ? 'bg-brass text-mocha' : 'bg-white/70 text-brass'} transition`}
                onClick={() => setShowAyat(false)}
              >Hadith</button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {favorites[showAyat ? 'ayat' : 'hadith'].length === 0 ? (
                <div className="text-mocha text-center">No favorites yet.</div>
              ) : (
                favorites[showAyat ? 'ayat' : 'hadith'].map((item, i) => (
                  <div key={i} className="mb-4 p-3 rounded-lg bg-emerald-50 border-l-4 border-brass">
                    <div className="text-mocha text-base font-serif mb-1">{item.text || item.hadith}</div>
                  </div>
                ))
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
        @keyframes typing {
          from { border-right: 2px solid #B5A642; }
          to { border-right: 2px solid transparent; }
        }
        .animate-typing {
          animation: typing 1s steps(1) infinite alternate;
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
  );
} 