import { useState, useEffect, useRef } from 'react';
import { prayerAudioUrls, prayerVideoUrls, prayerSteps, audioSequences } from '../data/prayerAudio';
import { prayerAudioPlayer } from '../utils/prayerAudioService';
import { progressTracker } from '../utils/progressTracker';

const steps = ['niyyah', 'takbir', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'tashahhud', 'salam'];

const quizQuestions = [
  {
    q: 'What is the first step of Salah?',
    options: ['Takbir', 'Niyyah', 'Qiyam', 'Sajda'],
    answer: 1,
  },
  {
    q: 'Which step involves bowing?',
    options: ['Qiyam', 'Rukoo', 'Jalsa', 'Salam'],
    answer: 1,
  },
  {
    q: 'What do you say in Takbir?',
    options: ['Subhana Rabbiyal Adheem', 'Allahu Akbar', 'Attahiyyat', 'Alhamdulillah'],
    answer: 1,
  },
  {
    q: 'Which is the correct order?',
    options: [
      'Niyyah → Takbir → Qiyam → Rukoo',
      'Takbir → Niyyah → Sajda → Salam',
      'Qiyam → Rukoo → Jalsa → Salam',
      'Takbir → Qiyam → Salam → Sajda',
    ],
    answer: 0,
  },
];

const rewardQuotes = [
  '"The coolness of my eyes is in prayer." (Ahmad)',
  '"Successful indeed are the believers, those who humble themselves in prayer." (Quran 23:1-2)',
  '"Establish prayer for My remembrance." (Quran 20:14)',
  '"The key to Paradise is prayer." (Tirmidhi)',
  '"Between a man and disbelief is the abandonment of prayer." (Muslim)',
  '"Indeed, prayer prohibits immorality and wrongdoing." (Quran 29:45)',
  '"Pray as you have seen me praying." (Bukhari)',
  '"The closest a servant comes to his Lord is when he is prostrating." (Muslim)',
];

function getSavedBookmarks() {
  try {
    const saved = JSON.parse(localStorage.getItem('learn_bookmarks'));
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
}

function getQuizComplete() {
  return localStorage.getItem('learn_quiz_complete') === 'true';
}

export default function LearnScreen() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [bookmarks, setBookmarks] = useState(getSavedBookmarks());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(getQuizComplete());
  const [quizFeedback, setQuizFeedback] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const certRef = useRef();
  const [rewardIdx, setRewardIdx] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentPlayingStep, setCurrentPlayingStep] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetailsStep, setSelectedDetailsStep] = useState(null);
  const [audioSequenceInfo, setAudioSequenceInfo] = useState(null);

  useEffect(() => {
    if (quizDone) {
      setRewardIdx(i => (i + 1) % rewardQuotes.length);
    }
  }, [quizDone]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioPlaying) {
        prayerAudioPlayer.stop();
      }
    };
  }, [audioPlaying]);

  // Monitor audio sequence progress
  useEffect(() => {
    let interval;
    if (audioPlaying && (currentPlayingStep === 'qiyam' || currentPlayingStep === 'tashahhud')) {
      interval = setInterval(() => {
        const sequenceInfo = prayerAudioPlayer.getCurrentSequenceInfo();
        if (sequenceInfo) {
          setAudioSequenceInfo(sequenceInfo);
        }
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [audioPlaying, currentPlayingStep]);

  function toggleBookmark(step) {
    const newBookmarks = bookmarks.includes(step)
      ? bookmarks.filter(b => b !== step)
      : [...bookmarks, step];
    setBookmarks(newBookmarks);
    localStorage.setItem('learn_bookmarks', JSON.stringify(newBookmarks));
  }

  async function playAudio(step) {
    try {
      // If same step is playing, stop it
      if (currentPlayingStep === step && audioPlaying) {
        prayerAudioPlayer.stop();
        setAudioPlaying(false);
        setCurrentPlayingStep(null);
        setAudioSequenceInfo(null);
        return;
      }

      // Stop any currently playing audio
      prayerAudioPlayer.stop();
      setAudioPlaying(false);
      setCurrentPlayingStep(null);
      setAudioSequenceInfo(null);

      setAudioPlaying(true);
      setCurrentPlayingStep(step);
      
      await prayerAudioPlayer.play(step);
      
      setAudioPlaying(false);
      setCurrentPlayingStep(null);
      setAudioSequenceInfo(null);
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioPlaying(false);
      setCurrentPlayingStep(null);
      setAudioSequenceInfo(null);
      
      // Show error notification
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = `Failed to play audio: ${error.message}`;
      document.body.appendChild(errorDiv);
      setTimeout(() => document.body.removeChild(errorDiv), 3000);
    }
  }

  function showStepDetails(step) {
    setSelectedDetailsStep(step);
    setShowDetails(true);
  }

  function closeDetails() {
    setShowDetails(false);
    setSelectedDetailsStep(null);
  }

  function playVideo(step) {
    setSelectedStep(step);
  }

  function stopVideo() {
    setSelectedStep(null);
  }

  function handleQuizAnswer(optIdx) {
    if (quizFeedback) return;
    
    const isCorrect = optIdx === quizQuestions[quizIdx].answer;
    const newScore = isCorrect ? quizScore + 1 : quizScore;
    
    setQuizScore(newScore);
    setQuizFeedback(isCorrect ? 'Correct!' : 'Incorrect!');
    
    setTimeout(() => {
      setQuizFeedback('');
      if (quizIdx < quizQuestions.length - 1) {
        setQuizIdx(quizIdx + 1);
      } else {
        setQuizDone(true);
        localStorage.setItem('learn_quiz_complete', 'true');
        
        // Award points for quiz completion
        const pointsEarned = Math.round((newScore / quizQuestions.length) * 10); // Max 10 points
        progressTracker.addPoints(pointsEarned, 'quiz', `Quiz completion - ${newScore}/${quizQuestions.length} correct`);
        
        // Show points notification
        const pointsDiv = document.createElement('div');
        pointsDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        pointsDiv.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="text-2xl">🏆</span>
            <div>
              <div class="font-bold">Quiz Completed!</div>
              <div class="text-sm">+${pointsEarned} points earned</div>
            </div>
          </div>
        `;
        document.body.appendChild(pointsDiv);
        setTimeout(() => document.body.removeChild(pointsDiv), 3000);
      }
    }, 1500);
  }

  function handleQuizRestart() {
    setQuizIdx(0);
    setQuizScore(0);
    setQuizDone(false);
    setQuizFeedback('');
    localStorage.removeItem('learn_quiz_complete');
  }

  function handleDownloadCert() {
    const svg = certRef.current.outerHTML;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'namaz-certificate.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 py-8 px-4">
        {/* Header Section */}
        <div className="w-full text-center mb-8">
          <div className="text-5xl font-heading text-brass font-bold drop-shadow-2xl mb-4 bg-gradient-to-r from-brass to-wood bg-clip-text text-transparent">
            Learn Namaz
          </div>
          <div className="text-lg text-text dark:text-darktext opacity-90 max-w-2xl mx-auto">
            Master the art of prayer with interactive audio and video guides
          </div>
        </div>

        {/* Quiz Section - Moved to Top */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-xl text-brass font-bold mb-4 text-center flex items-center justify-center gap-3">
              <span className="text-3xl">🏆</span>
              Take Namaz Quiz
              <span className="text-3xl">🏆</span>
            </div>
            <div className="text-text dark:text-darktext text-center mb-4">
              Test your knowledge and earn rewards!
            </div>
            <div className="text-center">
              <button 
                className="btn text-lg px-8 py-4 bg-gradient-to-r from-brass to-wood text-white font-bold hover:scale-105 transition-all duration-300 shadow-xl rounded-xl"
                onClick={() => setShowQuiz(true)}
              >
                {quizDone ? '🏅 Retake Quiz' : '🎯 Start Quiz'}
              </button>
            </div>
          </div>
        </div>

        {/* Motivational Reward - Moved from bottom */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-xl text-brass font-bold mb-4 text-center flex items-center justify-center gap-3">
              <span className="text-3xl">💫</span>
              Motivational Reward
              <span className="text-3xl">💫</span>
            </div>
            <div className="text-center">
              <div className="italic text-brass text-center text-lg leading-relaxed font-body">{rewardQuotes[rewardIdx]}</div>
            </div>
          </div>
        </div>

        {/* Prayer Steps Grid - Redesigned */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const stepData = prayerSteps[step];
            const audioData = prayerAudioUrls[step];
            const isBookmarked = bookmarks.includes(step);
            const isPlaying = currentPlayingStep === step;

            return (
              <div 
                key={step} 
                className="group relative card p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
                
                {/* Header */}
                <div className="relative flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brass to-wood flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-brass">{stepData.title}</h3>
                  </div>
                  <button
                    className={`text-2xl transition-all duration-300 hover:scale-110 ${isBookmarked ? 'text-brass animate-pulse' : 'text-text dark:text-darktext hover:text-brass'}`}
                    onClick={() => toggleBookmark(step)}
                    aria-label={`Bookmark ${stepData.title}`}
                  >
                    {isBookmarked ? '★' : '☆'}
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-text dark:text-darktext mb-6 leading-relaxed">{stepData.description}</p>

                {/* Details Button */}
                <button
                  className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-brass text-white hover:bg-wood hover:scale-102 transition-all duration-300"
                  onClick={() => showStepDetails(step)}
                  type="button"
                >
                  <span className="text-lg">📋</span>
                  View Details
                </button>
              </div>
            );
          })}
        </div>

        {/* Details Modal */}
        {showDetails && selectedDetailsStep && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">{prayerSteps[selectedDetailsStep].title}</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={closeDetails}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📝 Description</h3>
                  <p className="text-lg leading-relaxed text-text dark:text-darktext">{prayerSteps[selectedDetailsStep].description}</p>
                </div>

                {/* Arabic Text */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📖 Arabic Text</h3>
                  <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10 text-center">
                    <div className="text-2xl font-arabic text-brass mb-2 leading-relaxed">{prayerSteps[selectedDetailsStep].arabic}</div>
                    <div className="text-sm text-text dark:text-darktext italic mb-1">{prayerSteps[selectedDetailsStep].transliteration}</div>
                    <div className="text-sm text-text dark:text-darktext opacity-80">{prayerSteps[selectedDetailsStep].translation}</div>
                  </div>
                </div>

                {/* Audio Section */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">🔊 Audio Recitation</h3>
                  
                  {/* Audio Sequence Progress for qiyam and tashahhud */}
                  {(selectedDetailsStep === 'qiyam' || selectedDetailsStep === 'tashahhud') && audioSequenceInfo && audioSequenceInfo.step === selectedDetailsStep && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-brass">
                          Audio {audioSequenceInfo.currentIndex + 1} of {audioSequenceInfo.totalAudio}
                        </span>
                        <span className="text-xs text-text dark:text-darktext">
                          {Math.round(((audioSequenceInfo.currentIndex + 1) / audioSequenceInfo.totalAudio) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-brass/20 rounded-full h-2">
                        <div 
                          className="bg-brass h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((audioSequenceInfo.currentIndex + 1) / audioSequenceInfo.totalAudio) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-text dark:text-darktext mt-1">
                        {audioSequenceInfo.currentAudio?.description || 'Playing...'}
                      </div>
                    </div>
                  )}
                  
                  <button
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                      currentPlayingStep === selectedDetailsStep
                        ? 'bg-wood text-white shadow-lg scale-105' 
                        : 'bg-brass text-white hover:bg-wood hover:scale-102'
                    }`}
                    onClick={() => playAudio(selectedDetailsStep)}
                  >
                    <span className="text-lg">
                      {currentPlayingStep === selectedDetailsStep ? '⏸️' : '▶️'}
                    </span>
                    {currentPlayingStep === selectedDetailsStep 
                      ? (selectedDetailsStep === 'qiyam' || selectedDetailsStep === 'tashahhud') 
                        ? `Playing Sequence... (${audioSequenceInfo ? audioSequenceInfo.currentIndex + 1 : 1}/${audioSequenceInfo ? audioSequenceInfo.totalAudio : 3})`
                        : 'Playing...' 
                      : (selectedDetailsStep === 'qiyam' || selectedDetailsStep === 'tashahhud') 
                        ? `Play ${audioSequences[selectedDetailsStep]?.length || 3} Audio Sequence`
                        : prayerAudioUrls[selectedDetailsStep].description
                    }
                  </button>
                </div>

                {/* Video Section */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">🎥 Video Tutorial</h3>
                  <button
                    className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-brass text-white hover:bg-wood hover:scale-102 transition-all duration-300"
                    onClick={() => {
                      closeDetails();
                      playVideo(selectedDetailsStep);
                    }}
                  >
                    <span className="text-lg">▶️</span>
                    Watch Demo
                  </button>
                </div>

                {/* Complete Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📋 Complete Instructions</h3>
                  <div className="space-y-3">
                    {prayerSteps[selectedDetailsStep].instructions.map((instruction, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                        <span className="text-brass font-bold text-lg mt-1">{i + 1}.</span>
                        <span className="text-text dark:text-darktext leading-relaxed">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedStep && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">{prayerSteps[selectedStep].title}</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={stopVideo}
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video mb-6 bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={prayerVideoUrls[selectedStep].video}
                  title={prayerSteps[selectedStep].title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="text-text dark:text-darktext space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📖 Description</h3>
                  <p className="text-lg leading-relaxed">{prayerVideoUrls[selectedStep].description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📝 Step Details</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="font-semibold text-brass mb-2">Arabic:</div>
                      <div className="text-lg font-arabic text-text dark:text-darktext leading-relaxed">{prayerSteps[selectedStep].arabic}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="font-semibold text-brass mb-2">Transliteration:</div>
                      <div className="text-text dark:text-darktext leading-relaxed">{prayerSteps[selectedStep].transliteration}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="font-semibold text-brass mb-2">Translation:</div>
                      <div className="text-text dark:text-darktext leading-relaxed">{prayerSteps[selectedStep].translation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Modal */}
        {showQuiz && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="card p-8 max-w-2xl w-full relative bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
              <button className="absolute top-4 right-4 text-2xl text-brass hover:text-wood transition-all duration-300" onClick={() => setShowQuiz(false)}>✕</button>
              <div className="text-2xl font-heading text-brass font-bold mb-6 text-center">🏆 Namaz Quiz</div>
              {quizDone ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="text-3xl font-bold text-brass">Your Score: {quizScore} / {quizQuestions.length}</div>
                  {quizScore === quizQuestions.length ? (
                    <>
                      <div className="text-brass font-bold text-xl flex flex-col items-center">
                        <span>🏅 Perfect! You unlocked a badge!</span>
                        <span className="mt-4 text-6xl animate-bounce">🌟</span>
                      </div>
                      <button className="mt-4 btn bg-gradient-to-r from-brass to-wood text-white font-bold hover:scale-105 transition-all duration-300" onClick={() => setShowCertificate(true)}>View Certificate</button>
                    </>
                  ) : null}
                  <button className="btn bg-gradient-to-r from-brass to-wood text-white font-bold hover:scale-105 transition-all duration-300" onClick={handleQuizRestart}>Try Again</button>
                </div>
              ) : (
                <div>
                  <div className="text-xl font-bold mb-6 font-heading text-text dark:text-darktext leading-relaxed">{quizQuestions[quizIdx].q}</div>
                  <div className="grid gap-3">
                    {quizQuestions[quizIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        className="btn text-base text-left p-4 hover:bg-brass hover:text-white transition-all duration-300 border border-brass/20"
                        onClick={() => handleQuizAnswer(i)}
                        disabled={!!quizFeedback}
                      >{opt}</button>
                    ))}
                  </div>
                  {quizFeedback && (
                    <div className={`mt-4 text-xl font-bold text-center p-4 rounded-lg ${
                      quizFeedback === 'Correct!' 
                        ? 'text-brass bg-brass/10 border border-brass/20' 
                        : 'text-red-600 bg-red-100 border border-red-200'
                    }`}>
                      {quizFeedback}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="card p-8 max-w-lg w-full relative flex flex-col items-center bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
              <button className="absolute top-4 right-4 text-2xl text-brass hover:text-wood transition-all duration-300" onClick={() => setShowCertificate(false)}>✕</button>
              <div className="text-3xl font-heading text-brass font-bold mb-6 text-center">🏆 Namaz Learning Certificate</div>
              <svg ref={certRef} width="400" height="250" viewBox="0 0 400 250" className="mb-6 rounded-2xl border-4 border-brass shadow-2xl bg-gradient-to-br from-white to-brass/5">
                <rect x="0" y="0" width="400" height="250" rx="20" fill="url(#gradient)" stroke="#B5A642" strokeWidth="4" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fffbe6" />
                    <stop offset="100%" stopColor="#f5f5dc" />
                  </linearGradient>
                </defs>
                <text x="50%" y="50" textAnchor="middle" fontSize="28" fill="#B5A642" fontWeight="bold">Certificate of Completion</text>
                <text x="50%" y="100" textAnchor="middle" fontSize="18" fill="#3B2F2F">This certifies you have completed</text>
                <text x="50%" y="140" textAnchor="middle" fontSize="22" fill="#8B6F4E" fontWeight="bold">Namaz Learning Quiz</text>
                <text x="50%" y="180" textAnchor="middle" fontSize="16" fill="#B5A642">"{rewardQuotes[rewardIdx]}"</text>
                <text x="50%" y="220" textAnchor="middle" fontSize="14" fill="#B5A642">{new Date().toLocaleDateString()}</text>
              </svg>
              <button className="btn bg-gradient-to-r from-brass to-wood text-white font-bold hover:scale-105 transition-all duration-300" onClick={handleDownloadCert}>Download Certificate</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 