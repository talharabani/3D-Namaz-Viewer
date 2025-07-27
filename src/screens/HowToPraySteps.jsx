import { useState, useRef, useEffect } from 'react';
import niyyahIcon from '../assets/icons/niyyah.svg';
import { progressTracker } from '../utils/progressTracker';

const steps = [
  { title: 'Niyyah', desc: 'Intention in the heart.', icon: '🕋',
    audio: 'https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001001.mp3',
    img: niyyahIcon,
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
  { title: 'Takbir', desc: 'Raise hands and say Allahu Akbar.', icon: '🤲',
    audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/001.mp3',
    img: 'https://cdn.jsdelivr.net/gh/ahmadawais/prayer-illustrations/takbir.svg',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
  { title: 'Qiyam', desc: 'Standing and reciting Surah Al-Fatiha.', icon: '🧎‍♂️',
    audio: 'https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001001.mp3',
    img: 'https://cdn.jsdelivr.net/gh/ahmadawais/prayer-illustrations/qiyam.svg',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
  { title: 'Rukoo', desc: 'Bowing and saying Subhana Rabbiyal Adheem.', icon: '🙏',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    img: 'https://cdn.jsdelivr.net/gh/ahmadawais/prayer-illustrations/rukoo.svg',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
  { title: 'Sajda', desc: 'Prostration and saying Subhana Rabbiyal A’la.', icon: '🛐',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    img: 'https://cdn.jsdelivr.net/gh/ahmadawais/prayer-illustrations/sajda.svg',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
  { title: 'Jalsa', desc: 'Sitting between prostrations.', icon: '🪑',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    img: 'https://cdn.jsdelivr.net/gh/ahmadawais/prayer-illustrations/jalsa.svg',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
  { title: 'Tashahhud', desc: 'Testification while sitting.', icon: '☝️',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    img: 'https://cdn.jsdelivr.net/gh/ahmadawais/prayer-illustrations/tashahhud.svg',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
  { title: 'Salam', desc: 'Turning head right and left, saying Salam.', icon: '👋',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    img: 'https://cdn.jsdelivr.net/gh/ahmadawais/prayer-illustrations/salam.svg',
    video: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2J2d3F0b2J0d3B2d2J2d3F0b2J0d3B2d2J2d3F0b2J0/giphy.gif/giphy.gif',
  },
];

const quotes = [
  '“The closest a servant comes to his Lord is when he is prostrating.” (Muslim)',
  '“Pray as you have seen me praying.” (Bukhari)',
  '“Indeed, prayer prohibits immorality and wrongdoing.” (Quran 29:45)',
  '“Between a man and disbelief is the abandonment of prayer.” (Muslim)',
  '“Establish prayer for My remembrance.” (Quran 20:14)',
  '“The key to Paradise is prayer.” (Tirmidhi)',
  '“The coolness of my eyes is in prayer.” (Ahmad)',
  '“Successful indeed are the believers, those who humble themselves in prayer.” (Quran 23:1-2)',
];

const completionDua = 'O Allah, help me to establish prayer perfectly and accept it from me.';
const chimeUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';

function getSavedNotes() {
  try {
    return JSON.parse(localStorage.getItem('learn_notes')) || Array(steps.length).fill('');
  } catch { return Array(steps.length).fill(''); }
}

export default function HowToPraySteps() {
  const [current, setCurrent] = useState(0);
  const [notes, setNotes] = useState(getSavedNotes());
  const [slideDir, setSlideDir] = useState('');
  const [unlockedQuotes, setUnlockedQuotes] = useState([0]);
  const step = steps[current];
  const audioRef = useRef();
  const chimeRef = useRef();
  const videoRef = useRef();
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    if (!unlockedQuotes.includes(current)) {
      setUnlockedQuotes(uq => [...uq, current]);
    }
  }, [current]);

  // Automatic study time tracking
  useEffect(() => {
    let start = Date.now();
    let interval = setInterval(() => {
      const minutes = (Date.now() - start) / 60000;
      if (minutes >= 1) {
        progressTracker.addStudyTime(1);
        start = Date.now();
      }
    }, 60000);
    return () => {
      // Add any remaining time on unmount
      const minutes = (Date.now() - start) / 60000;
      if (minutes > 0.1) {
        progressTracker.addStudyTime(Math.round(minutes));
      }
      clearInterval(interval);
    };
  }, []);

  function playAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  function handleNext() {
    setSlideDir('right');
    setTimeout(() => {
      setCurrent(c => Math.min(steps.length, c + 1));
      setSlideDir('');
    }, 350);
    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current.play();
    }
  }

  function handlePrev() {
    setSlideDir('left');
    setTimeout(() => {
      setCurrent(c => Math.max(0, c - 1));
      setSlideDir('');
    }, 350);
    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current.play();
    }
  }

  function handleNoteChange(e) {
    const updated = [...notes];
    const wasEmpty = !updated[current];
    updated[current] = e.target.value;
    setNotes(updated);
    localStorage.setItem('learn_notes', JSON.stringify(updated));
    // If adding a new note (was empty, now not empty), update progressTracker
    if (wasEmpty && e.target.value.trim() !== '') {
      progressTracker.addNote();
    }
  }

  function handleVideoPlayPause() {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  }

  if (current === steps.length) {
    return (
      <div className="w-full max-w-xl flex flex-col items-center gap-6 mt-4 animate-fadeIn">
        <div className="w-full relative rounded-3xl p-8 shadow-xl border-2 flex flex-col items-center bg-white/40 dark:bg-mocha/80 border-brass/30 backdrop-blur-lg glassmorph-card">
          <div className="text-4xl mb-2 text-emerald-900 font-bold">Congratulations!</div>
          <div className="text-xl text-brass mb-4">You have completed all steps of Salah.</div>
          <div className="italic text-center text-brass/80 text-lg mb-4">{completionDua}</div>
          <button
            className="px-6 py-2 rounded-lg bg-brass text-mocha font-bold mt-2 shadow hover:bg-brass/80 transition"
            onClick={() => setCurrent(0)}
          >
            Start Again
          </button>
        </div>
        <audio ref={chimeRef} src={chimeUrl} preload="auto" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-6 mt-4">
      <div
        className={`w-full relative card flex flex-col items-center ${current === 0 ? 'ring-2 ring-brass' : ''}`}
        style={{
          overflow: 'hidden',
        }}
      >
        {/* Calligraphy watermark */}
        <svg
          className="absolute left-1/2 top-1/2 -z-10 opacity-10 pointer-events-none select-none"
          style={{ transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }}
          viewBox="0 0 200 80"
          fill="none"
        >
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="48" fontFamily="serif" fill="#B5A642" opacity="0.2">
            ﷽
          </text>
        </svg>
        {/* Step animation/video */}
        <div className="mb-2 w-32 h-32 flex items-center justify-center relative">
          <video
            ref={videoRef}
            src={step.video}
            width={128}
            height={128}
            className="rounded-xl bg-white/60 dark:bg-darkcard/60 object-contain drop-shadow-lg"
            style={{ background: 'rgba(255,255,255,0.5)' }}
            loop
            controls={false}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
          />
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-brass text-white rounded-full p-2 shadow-button border-2 border-brass hover:scale-110 transition"
            onClick={handleVideoPlayPause}
            style={{ zIndex: 2 }}
          >
            {videoPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
        <img
          src={step.img}
          alt={step.title + ' illustration'}
          className="mb-2 w-32 h-32 object-contain drop-shadow-lg rounded-xl bg-white/60 dark:bg-darkcard/60"
          style={{ background: 'rgba(255,255,255,0.5)' }}
        />
        <div className="text-5xl mb-3 animate-bounce-slow">{step.icon}</div>
        <div className="text-2xl font-bold text-brass mb-1">{step.title}</div>
        <div className="text-text dark:text-darktext text-center text-lg mb-4">{step.desc}</div>
        <button
          className="btn mb-4 flex items-center gap-2"
          onClick={playAudio}
        >
          <span role="img" aria-label="audio">🔊</span> Play Recitation
        </button>
        <audio ref={audioRef} src={step.audio} preload="auto" />
        <div className="italic text-center text-text dark:text-darktext text-base mb-2" style={{ minHeight: 32 }}>
          {unlockedQuotes.includes(current) && quotes[current % quotes.length]}
        </div>
        {/* User notes */}
        <textarea
          className="w-full min-h-[48px] rounded-xl border border-border dark:border-darkborder bg-card dark:bg-darkcard p-2 text-text dark:text-darktext mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-brass transition"
          placeholder="Your notes for this step..."
          value={notes[current]}
          onChange={handleNoteChange}
        />
        <div className="flex gap-4 mt-2">
          <button
            className="btn disabled:opacity-40"
            onClick={handlePrev}
            disabled={current === 0}
          >
            Previous
          </button>
          <button
            className="btn disabled:opacity-40"
            onClick={handleNext}
            disabled={current === steps.length}
          >
            {current === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${i === current ? 'bg-brass' : 'bg-border dark:bg-darkborder'} transition`}
            />
          ))}
        </div>
        <audio ref={chimeRef} src={chimeUrl} preload="auto" />
        <style>{`
          @keyframes slide-right {
            0% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(-60px); }
          }
          @keyframes slide-left {
            0% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(60px); }
          }
          .animate-slide-right {
            animation: slide-right 0.35s cubic-bezier(.4,2,.6,1) both;
          }
          .animate-slide-left {
            animation: slide-left 0.35s cubic-bezier(.4,2,.6,1) both;
          }
          @keyframes slideIn {
            0% { opacity: 0; transform: translateX(60px); }
            100% { opacity: 1; transform: none; }
          }
          .animate-slideIn {
            animation: slideIn 0.7s cubic-bezier(.4,2,.6,1) both;
          }
          .glassmorph-card {
            background: rgba(255,255,255,0.35);
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15);
            backdrop-filter: blur(8px);
            border-radius: 1.5rem;
            border: 1.5px solid rgba(181,166,66,0.2);
          }
          .glow-step {
            box-shadow: 0 0 0 4px #B5A64266, 0 8px 32px #0002;
            border-color: #B5A642;
          }
        `}</style>
      </div>
    </div>
  );
} 