import { useRef, useState } from 'react';
import { GlowCard } from '../components/nurui/spotlight-card';
import { motion } from 'framer-motion';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions
} from '../utils/animations';

const AUDIO_GUIDES = [
  {
    title: 'Takbir',
    desc: 'Allahu Akbar (Opening Takbir)',
    url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/001.mp3',
    transcript: 'Allahu Akbar (الله أكبر) - Allah is the Greatest.'
  },
  {
    title: 'Surah Al-Fatiha',
    desc: 'Recitation of Surah Al-Fatiha',
    url: 'https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001001.mp3',
    transcript: 'Bismillah ar-Rahman ar-Raheem... (Full Surah Al-Fatiha in Arabic and English)'
  },
  {
    title: 'Tashahhud',
    desc: 'Testification (Attahiyyat)',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    transcript: 'Attahiyyatu lillahi was-salawatu wat-tayyibat... (Full Tashahhud)'
  },
  {
    title: 'Salam',
    desc: 'Ending Salam',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    transcript: 'Assalamu Alaikum wa Rahmatullah (السلام عليكم ورحمة الله)'
  },
];

export default function AudioGuideScreen() {
  const [current, setCurrent] = useState(null);
  const [progress, setProgress] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef();

  function handlePlay(idx) {
    setCurrent(idx);
    setProgress(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 100);
  }

  function handlePause() {
    if (audioRef.current) audioRef.current.pause();
  }

  function handleTimeUpdate() {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime / audioRef.current.duration);
    }
  }

  function handleEnded() {
    if (repeat && current !== null) {
      handlePlay(current);
      return;
    }
    if (shuffle) {
      let next;
      do {
        next = Math.floor(Math.random() * AUDIO_GUIDES.length);
      } while (AUDIO_GUIDES.length > 1 && next === current);
      setCurrent(next);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }, 100);
      return;
    }
    setCurrent(null);
    setProgress(0);
  }

  function handleDownload(idx) {
    const a = document.createElement('a');
    a.href = AUDIO_GUIDES[idx].url;
    a.download = AUDIO_GUIDES[idx].title + '.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">
        <div className="text-3xl font-heading text-brass mb-4 drop-shadow-lg">Audio Guide</div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex gap-4 mb-2 items-center">
            <button
              className={`btn ${repeat ? 'from-accent2 to-accent3' : 'from-accent to-accent2'}`}
              onClick={() => setRepeat(r => !r)}
            >Repeat</button>
            <button
              className={`btn ${shuffle ? 'from-accent2 to-accent3' : 'from-accent to-accent2'}`}
              onClick={() => setShuffle(s => !s)}
            >Shuffle</button>
          </div>
          {AUDIO_GUIDES.map((g, i) => (
            <div
              key={g.title}
              className="relative flex flex-col md:flex-row items-center justify-between glassmorph-card animate-fadeIn"
              style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
            >
              <div className="flex flex-col flex-1">
                <span className="text-xl font-heading text-brass font-bold">{g.title}</span>
                <span className="text-lg text-ivory font-body">{g.desc}</span>
                {current === i && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-32 h-4 bg-accent4/20 rounded-full overflow-hidden relative">
                      <div
                        className="h-4 bg-accent4 rounded-full transition-all"
                        style={{ width: `${Math.round(progress * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-accent4">{Math.round(progress * 100)}%</span>
                  </div>
                )}
                <div className="mt-2 text-mocha text-base italic font-body">{g.transcript}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-accent to-accent2 shadow-vibrant border-2 border-accent transition hover:scale-105 ${current === i ? 'pulse-wave' : ''}`}
                  onClick={() => (current === i ? handlePause() : handlePlay(i))}
                >
                  <span className="text-3xl text-mocha">
                    {current === i ? '⏸️' : '▶️'}
                  </span>
                </button>
                <button
                  className="mt-1 btn text-sm"
                  onClick={() => handleDownload(i)}
                >Download</button>
              </div>
            </div>
          ))}
        </div>
        <audio
          ref={audioRef}
          src={current !== null ? AUDIO_GUIDES[current].url : undefined}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onPause={() => setCurrent(null)}
          hidden
          autoPlay
        />
        <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: none; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s cubic-bezier(.4,2,.6,1) both;
          }
          .glassmorph-card {
            background: rgba(255,255,255,0.35);
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15);
            backdrop-filter: blur(8px);
            border-radius: 1.5rem;
            border: 1.5px solid rgba(181,166,66,0.2);
          }
          @keyframes pulseWave {
            0%, 100% { box-shadow: 0 0 0 0 #B5A64244, 0 8px 32px #B5A64222; }
            50% { box-shadow: 0 0 0 12px #B5A64233, 0 8px 32px #B5A64222; }
          }
          .pulse-wave {
            animation: pulseWave 1.2s infinite;
          }
        `}</style>
      </div>
    </div>
  );
} 