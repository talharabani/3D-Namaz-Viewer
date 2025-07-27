import { useEffect, useState, useRef } from 'react';

const PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const AZAN_AUDIO = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
const METHODS = [
  { id: 2, name: 'ISNA' },
  { id: 3, name: 'MWL' },
  { id: 4, name: 'Umm Al-Qura' },
  { id: 5, name: 'Egyptian' },
  { id: 12, name: 'Dubai' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
];
const FIQHS = [
  { id: 'shafi', name: 'Shafi' },
  { id: 'hanafi', name: 'Hanafi' },
];

function getTimeDiff(target) {
  const now = new Date();
  let diff = (target - now) / 1000;
  if (diff < 0) diff += 24 * 3600; // next day
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = Math.floor(diff % 60);
  return { h, m, s, total: diff };
}

export default function PrayerTimesScreen() {
  const [times, setTimes] = useState(null);
  const [hijri, setHijri] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextIdx, setNextIdx] = useState(0);
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0, total: 0 });
  const [method, setMethod] = useState(2);
  const [fiqh, setFiqh] = useState('shafi');
  const azanRef = useRef();
  const [coords, setCoords] = useState(null);

  // Get user location and fetch prayer times
  useEffect(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      setCoords({ latitude, longitude });
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${fiqh === 'hanafi' ? 1 : 0}`);
        const data = await res.json();
        if (data.code === 200) {
          setTimes(data.data.timings);
          setHijri(`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year} AH`);
        } else {
          setError('Failed to fetch prayer times.');
        }
      } catch {
        setError('Failed to fetch prayer times.');
      }
      setLoading(false);
    }, () => {
      setError('Location denied or unavailable.');
      setLoading(false);
    });
  }, [method, fiqh]);

  // Find next prayer and update countdown
  useEffect(() => {
    if (!times) return;
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const prayerTimes = PRAYERS.map(p => {
      const [h, m] = times[p].split(':').map(Number);
      const t = new Date(today + 'T' + times[p].padStart(5, '0'));
      t.setHours(h, m, 0, 0);
      return t;
    });
    let idx = prayerTimes.findIndex((t, i) => t > now && p !== 'Sunrise');
    if (idx === -1) idx = 0; // next day
    setNextIdx(idx);
    const diff = getTimeDiff(prayerTimes[idx]);
    setCountdown(diff);
    // Azan sound when time is up
    if (diff.total < 1 && azanRef.current) {
      azanRef.current.currentTime = 0;
      azanRef.current.play();
    }
    const interval = setInterval(() => {
      const now2 = new Date();
      const diff2 = getTimeDiff(prayerTimes[idx]);
      setCountdown(diff2);
    }, 1000);
    return () => clearInterval(interval);
  }, [times]);

  if (loading) return <div className="text-center py-12">Loading prayer times...</div>;
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>;
  if (!times) return null;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-8">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <div className="text-3xl font-heading text-brass font-bold drop-shadow-lg">Prayer Times</div>
        <div className="flex gap-2">
          <select
            className="rounded-xl border-2 border-brass px-3 py-1 bg-glass text-mocha font-bold focus:ring-2 focus:ring-accent2"
            value={method}
            onChange={e => setMethod(Number(e.target.value))}
          >
            {METHODS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <select
            className="rounded-xl border-2 border-brass px-3 py-1 bg-glass text-mocha font-bold focus:ring-2 focus:ring-accent2"
            value={fiqh}
            onChange={e => setFiqh(e.target.value)}
          >
            {FIQHS.map(f => (
              <option key={f.id} value={f.id}>{f.name} Fiqh</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full text-right text-brass font-bold mb-2 font-body">{hijri}</div>
      <div className="w-full flex flex-col gap-6">
        {PRAYERS.map((p, i) => (
          <div
            key={p}
            className={`relative flex items-center justify-between glassmorph-card animate-fadeIn ${i === nextIdx ? 'border-4 border-accent2 shadow-vibrant' : 'border border-brass/20'}`}
            style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
          >
            <div className="flex flex-col">
              <span className="text-xl font-heading text-brass font-bold">{p}</span>
              <span className="text-lg text-ivory font-body">{times[p]}</span>
            </div>
            {i === nextIdx && p !== 'Sunrise' ? (
              <div className="flex items-center gap-3">
                {/* Countdown ring */}
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#B5A64222" strokeWidth="6" />
                  <circle
                    cx="24" cy="24" r="20"
                    fill="none"
                    stroke="#00C9A7"
                    strokeWidth="6"
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={(2 * Math.PI * 20) * (1 - countdown.total / (60 * 60))}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                  <text x="24" y="28" textAnchor="middle" fontSize="14" fill="#00C9A7">{`${countdown.h}:${String(countdown.m).padStart(2, '0')}`}</text>
                </svg>
                {/* Azan icon pulse */}
                <span className={`text-3xl text-accent2 ${countdown.total < 60 ? 'animate-azan-pulse' : ''}`}>🔊</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <audio ref={azanRef} src={AZAN_AUDIO} preload="auto" />
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: none; }
        }
        .animate-fadeUp {
          animation: fadeUp 0.7s cubic-bezier(.4,2,.6,1) both;
        }
        @keyframes azan-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 #B5A642); }
          50% { transform: scale(1.2); filter: drop-shadow(0 0 12px #B5A642); }
        }
        .animate-azan-pulse {
          animation: azan-pulse 1s infinite;
        }
      `}</style>
    </div>
  );
} 