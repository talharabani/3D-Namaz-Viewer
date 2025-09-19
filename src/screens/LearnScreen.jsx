import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../utils/translations';

// Prayer Steps Data
const prayerSteps = {
  niyyah: {
    title: "Niyyah (Intention)",
    arabic: "نِيَّة",
    transliteration: "Niyyah",
    description: "Make the intention in your heart to perform the prayer.",
    instruction: "Stand facing the Qibla and make the intention to perform the specific prayer.",
    tips: ["Be sincere in your intention", "Focus your mind on worship"],
    images: ["/src/assets/niyyah1.jpg"],
    audio: "/audio/niyyah.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Learn More About Niyyah", url: "https://islamqa.info/en/answers/20070" },
      { title: "Importance of Intention", url: "https://islamqa.info/en/answers/20071" }
    ]
  },
  takbir: {
    title: "Takbir (Opening)",
    arabic: "الله أكبر",
    transliteration: "Allahu Akbar",
    description: "Raise your hands and say 'Allah is the Greatest'.",
    instruction: "Raise your hands to your ears and say 'Allahu Akbar'.",
    tips: ["Keep your fingers together", "Raise hands to ear level"],
    images: ["/src/assets/takbir1.jpg", "/src/assets/takbir2.jpg", "/src/assets/takbir3.jpg"],
    audio: "/audio/takbir.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Takbir Rules", url: "https://islamqa.info/en/answers/20072" },
      { title: "Hand Position", url: "https://islamqa.info/en/answers/20073" }
    ]
  },
  qiyam: {
    title: "Qiyam (Standing)",
    arabic: "قيام",
    transliteration: "Qiyam",
    description: "Stand upright and recite the Quran.",
    instruction: "Stand straight with feet shoulder-width apart and recite Al-Fatiha.",
    tips: ["Keep your back straight", "Focus on the recitation"],
    images: ["/src/assets/qiyam1.jpg"],
    audio: "/audio/qiyam.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Qiyam Position", url: "https://islamqa.info/en/answers/20074" },
      { title: "Recitation Rules", url: "https://islamqa.info/en/answers/20075" }
    ]
  },
  ruku: {
    title: "Ruku (Bowing)",
    arabic: "ركوع",
    transliteration: "Ruku",
    description: "Bow down with your hands on your knees.",
    instruction: "Bend forward from the waist with hands on knees, back parallel to ground.",
    tips: ["Keep your back straight", "Say 'Subhana Rabbi al-Azeem' 3 times"],
    images: ["/src/assets/raku1.jpg", "/src/assets/raku2.jpg"],
    audio: "/audio/rukoo.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Ruku Position", url: "https://islamqa.info/en/answers/20076" },
      { title: "Ruku Dua", url: "https://islamqa.info/en/answers/20077" }
    ]
  },
  sujud: {
    title: "Sujud (Prostration)",
    arabic: "سجود",
    transliteration: "Sujud",
    description: "Prostrate with forehead, nose, hands, knees, and toes touching the ground.",
    instruction: "Place forehead, nose, both hands, both knees, and toes on the ground.",
    tips: ["Keep your fingers together", "Say 'Subhana Rabbi al-A'la' 3 times"],
    images: ["/src/assets/sajjda1.jpg", "/src/assets/sajjda2.jpg", "/src/assets/sajjda3.jpg"],
    audio: "/audio/sajda.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Sujud Position", url: "https://islamqa.info/en/answers/20078" },
      { title: "Sujud Dua", url: "https://islamqa.info/en/answers/20079" }
    ]
  },
  jalsa: {
    title: "Jalsa (Sitting)",
    arabic: "جلسة",
    transliteration: "Jalsa",
    description: "Sit between the two prostrations.",
    instruction: "Sit on your left foot with right foot upright, hands on thighs.",
    tips: ["Keep your back straight", "Say 'Rabbighfir li' between sujuds"],
    images: ["/src/assets/jalsa1.jpg", "/src/assets/jalsa2.jpg"],
    audio: "/audio/jalsa.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Jalsa Position", url: "https://islamqa.info/en/answers/20080" },
      { title: "Between Sujuds", url: "https://islamqa.info/en/answers/20081" }
    ]
  },
  tashahhud: {
    title: "Tashahhud (Testimony)",
    arabic: "تشهد",
    transliteration: "Tashahhud",
    description: "Sit and recite the testimony of faith.",
    instruction: "Sit and recite the Tashahhud with right index finger raised.",
    tips: ["Raise index finger while reciting", "Keep other fingers closed"],
    images: ["/src/assets/Tashahhud1.jpg", "/src/assets/Tashahhud2.jpg", "/src/assets/Tashahhud3.jpg"],
    audio: "/audio/tashahhud.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Tashahhud Text", url: "https://islamqa.info/en/answers/20082" },
      { title: "Finger Position", url: "https://islamqa.info/en/answers/20083" }
    ]
  },
  salam: {
    title: "Salam (Peace)",
    arabic: "سلام",
    transliteration: "Salam",
    description: "Turn your head right and left saying 'Peace be upon you'.",
    instruction: "Turn your head to the right saying 'Assalamu alaikum wa rahmatullah', then to the left.",
    tips: ["Complete the turn", "Say the full greeting"],
    images: ["/src/assets/salam1.jpg"],
    audio: "/audio/salam.mp3",
    video: "https://www.youtube.com/embed/-QSyc4uDXVM",
    links: [
      { title: "Salam Greeting", url: "https://islamqa.info/en/answers/20084" },
      { title: "Prayer Completion", url: "https://islamqa.info/en/answers/20085" }
    ]
  }
};

const steps = Object.keys(prayerSteps);

// Media Components
const ImageGallery = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
          <span className="text-white text-xl">🖼️</span>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Visual Guide for {title}</h4>
          <p className="text-slate-600 dark:text-slate-400">{images.length} images available</p>
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 overflow-hidden">
        <div className="relative aspect-video w-full mb-6 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={images[currentImageIndex]}
            alt={`${title} step ${currentImageIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
            onClick={() => setIsFullscreen(true)}
          />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AudioPlayer = ({ audioSrc, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  if (!audioSrc) return null;

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
          <span className="text-white text-xl">🎵</span>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Audio Guide for {title}</h4>
          <p className="text-slate-600 dark:text-slate-400">Listen to the pronunciation</p>
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-8 overflow-hidden">
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="text-white text-2xl">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>
          </div>
          <div className="space-y-2">
            <div
              className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-300"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}</span>
              <span>{Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoEmbed = ({ videoSrc, title }) => {
  if (!videoSrc) return null;

  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('/shorts/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoSrc);
  const isYouTubeShorts = videoSrc.includes('youtube.com/shorts/');

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4">
          <span className="text-white text-xl">🎥</span>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Video Guide for {title}</h4>
          <p className="text-slate-600 dark:text-slate-400">Watch the demonstration</p>
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 overflow-hidden">
        <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl ${
          isYouTubeShorts ? 'aspect-[9/16] max-w-md mx-auto' : 'aspect-video'
        }`}>
          <iframe
            src={embedUrl}
            title={`${title} tutorial`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const LinksSection = ({ links, title }) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4">
          <span className="text-white text-xl">🔗</span>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Additional Resources for {title}</h4>
          <p className="text-slate-600 dark:text-slate-400">{links.length} resources available</p>
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 overflow-hidden">
        <div className="space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all duration-300 border border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg transform hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">📖</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {link.title}
                    </h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      External resource
                    </p>
                  </div>
                </div>
                <div className="text-orange-500 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Card Details View Component
const CardDetailsView = ({ step, stepIndex, onClose, onMarkCompleted, completedSteps }) => {
  const [activeMediaTab, setActiveMediaTab] = useState('images');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{step.title}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-slate-600 dark:text-slate-400">✕</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {step.images && step.images.length > 0 && (
              <button
                onClick={() => setActiveMediaTab('images')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeMediaTab === 'images'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🖼️ Images ({step.images.length})
              </button>
            )}
            {step.audio && (
              <button
                onClick={() => setActiveMediaTab('audio')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeMediaTab === 'audio'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🎵 Audio
              </button>
            )}
            {step.video && (
              <button
                onClick={() => setActiveMediaTab('video')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeMediaTab === 'audio'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🎥 Video
              </button>
            )}
            {step.links && step.links.length > 0 && (
              <button
                onClick={() => setActiveMediaTab('links')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeMediaTab === 'links'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🔗 Links ({step.links.length})
              </button>
            )}
          </div>

          <div className="mb-8">
            {activeMediaTab === 'images' && <ImageGallery images={step.images} title={step.title} />}
            {activeMediaTab === 'audio' && <AudioPlayer audioSrc={step.audio} title={step.title} />}
            {activeMediaTab === 'video' && <VideoEmbed videoSrc={step.video} title={step.title} />}
            {activeMediaTab === 'links' && <LinksSection links={step.links} title={step.title} />}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Instructions</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step.instruction}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Tips</h3>
              <ul className="text-slate-700 dark:text-slate-300 space-y-2">
                {step.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => onMarkCompleted(steps[stepIndex])}
              disabled={completedSteps.includes(steps[stepIndex])}
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {completedSteps.includes(steps[stepIndex]) ? '✅ Already Learned' : '✅ Mark as Learned'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LearnScreen() {
  const { t } = useTranslation();
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('learned_steps');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCardStep, setSelectedCardStep] = useState(null);

  const handleCardClick = (stepKey, stepIndex) => {
    setSelectedCardStep({ key: stepKey, index: stepIndex });
    setShowCardDetails(true);
  };

  const closeCardDetails = () => {
    setShowCardDetails(false);
    setSelectedCardStep(null);
  };

  const markStepCompleted = (stepName) => {
    if (!completedSteps.includes(stepName)) {
      const newCompleted = [...completedSteps, stepName];
      setCompletedSteps(newCompleted);
      localStorage.setItem('learned_steps', JSON.stringify(newCompleted));
    }
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.length / steps.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-4 pt-20 sm:pt-24 md:pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              {t('learnToPray')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
              {t('stepByStepGuide')} - {t('masterEachStep')}
            </p>
              </div>
        </motion.div>

        {/* All Steps Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-7xl mx-auto"
        >
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
              All Prayer Steps
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
              Click any card to explore detailed learning content
            </p>
                  </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Complete Prayer Guide Card */}
            <motion.div
              className="group relative overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-600 rounded-3xl"
              onClick={() => window.open('https://www.youtube.com/shorts/-QSyc4uDXVM', '_blank')}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">🎬</span>
                  </div>
                  </div>
                <div className="relative mb-6">
                  <div className="relative w-full h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-3xl overflow-hidden shadow-lg">
                    <img 
                      src="/src/assets/detail.jpg" 
                      alt="Complete Prayer Guide" 
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500/20 to-emerald-500/20" style={{display: 'none'}}>
                      <div className="text-4xl">🎬</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                      <div className="text-white text-2xl">🕌</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 leading-tight">Complete Prayer Guide</h3>
                  <p className="text-sm opacity-90 mb-4 leading-relaxed">
                    Watch this comprehensive video to see all prayer positions in detail
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Video Guide</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <span className="text-xs font-medium">Watch Now</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                      </div>
                  </div>
                </div>
            </motion.div>

            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step);
              const stepData = prayerSteps[step];
              
              return (
                <motion.div
                  key={step}
                  className={`group relative overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl rounded-3xl ${
                    isCompleted
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                  onClick={() => handleCardClick(step, index)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="absolute top-4 right-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
                        isCompleted
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gradient-to-br from-slate-500 to-slate-600'
                      }`}>
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                    </div>

                    <div className="relative mb-6">
                      <div className="relative w-full h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden shadow-lg">
                        {stepData.images && stepData.images.length > 0 ? (
                          <>
                            <img
                              src={stepData.images[0]}
                              alt={`${stepData.title} preview`}
                              className="w-full h-full object-cover"
                            />
                            {stepData.images.length > 1 && (
                              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                                +{stepData.images.length - 1}
              </div>
                            )}
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-4xl opacity-50">
                              {step === 'niyyah' && '🤲'}
                              {step === 'takbir' && '🙏'}
                              {step === 'qiyam' && '🧍'}
                              {step === 'ruku' && '🤲'}
                              {step === 'sujud' && '🤲'}
                              {step === 'jalsa' && '🧎'}
                              {step === 'salam' && '🤲'}
                              {step === 'tashahhud' && '🤲'}
                    </div>
                    </div>
                  )}
                          </div>
                        </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 leading-tight">{stepData.title}</h3>
                      {stepData.arabic && (
                        <div className="text-2xl font-bold mb-2 text-center">{stepData.arabic}</div>
                      )}
                      <p className="text-sm opacity-90 mb-4 leading-relaxed">{stepData.description}</p>
                        </div>
            
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {stepData.images && stepData.images.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs font-medium">Images</span>
                          </div>
                        )}
                        {stepData.audio && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-xs font-medium">Audio</span>
                        </div>
                        )}
                        {stepData.video && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-xs font-medium">Video</span>
                          </div>
                        )}
                        {stepData.links && stepData.links.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-xs font-medium">Links</span>
                  </div>
                        )}
                  </div>
                      <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                        <span className="text-xs font-medium">Learn</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    </div>
                    </div>
                </motion.div>
                );
              })}
                    </div>
        </motion.div>

        {/* Card Details Modal */}
        {showCardDetails && selectedCardStep && (
          <CardDetailsView
            step={prayerSteps[selectedCardStep.key]}
            stepIndex={selectedCardStep.index}
            onClose={closeCardDetails}
            onMarkCompleted={markStepCompleted}
            completedSteps={completedSteps}
          />
        )}
                    </div>
      </div>
  );
} 
