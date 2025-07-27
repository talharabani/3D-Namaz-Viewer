import { useState, useEffect, useRef } from 'react';
import HowToPraySteps from './HowToPraySteps';
import { progressTracker } from '../utils/progressTracker';

const steps = [
  'Niyyah', 'Takbir', 'Qiyam', 'Rukoo', 'Sajda', 'Jalsa', 'Tashahhud', 'Salam'
];
const dailyChallenges = [
  'Focus on perfecting your Sajda today!',
  'Recite Surah Al-Fatiha with full concentration.',
  'Reflect on the meaning of Takbir.',
  'Try to keep your mind present during Qiyam.',
  'Practice a slow, humble Rukoo.',
  'Add a new note to your favorite step.',
  'Complete the Namaz quiz for a reward!',
];
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
  '“The coolness of my eyes is in prayer.” (Ahmad)',
  '“Successful indeed are the believers, those who humble themselves in prayer.” (Quran 23:1-2)',
  '“Establish prayer for My remembrance.” (Quran 20:14)',
  '“The key to Paradise is prayer.” (Tirmidhi)',
  '“Between a man and disbelief is the abandonment of prayer.” (Muslim)',
  '“Indeed, prayer prohibits immorality and wrongdoing.” (Quran 29:45)',
  '“Pray as you have seen me praying.” (Bukhari)',
  '“The closest a servant comes to his Lord is when he is prostrating.” (Muslim)',
];

function getSavedProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('learn_progress'));
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
}
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
  const [progress, setProgress] = useState(getSavedProgress());
  const [bookmarks, setBookmarks] = useState(getSavedBookmarks());
  const [challenge, setChallenge] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(getQuizComplete());
  const [quizFeedback, setQuizFeedback] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const certRef = useRef();
  const [rewardIdx, setRewardIdx] = useState(0);

  useEffect(() => {
    setChallenge(dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)]);
  }, []);

  useEffect(() => {
    if (quizDone) {
      setRewardIdx(i => (i + 1) % rewardQuotes.length);
    }
  }, [quizDone]);
  useEffect(() => {
    if (progress.length > 0 && progress.length % 2 === 0) {
      setRewardIdx(i => (i + 1) % rewardQuotes.length);
    }
  }, [progress]);

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

  function toggleStep(idx) {
    let updated = progress.includes(idx)
      ? progress.filter(i => i !== idx)
      : [...progress, idx];
    setProgress(updated);
    localStorage.setItem('learn_progress', JSON.stringify(updated));
    
    // Update progress tracker
    if (updated.includes(idx)) {
      progressTracker.completeStep(idx);
    }
  }
  function toggleBookmark(idx) {
    let updated = bookmarks.includes(idx)
      ? bookmarks.filter(i => i !== idx)
      : [...bookmarks, idx];
    setBookmarks(updated);
    localStorage.setItem('learn_bookmarks', JSON.stringify(updated));
  }

  function handleQuizAnswer(optIdx) {
    if (quizDone) return;
    const correct = quizQuestions[quizIdx].answer === optIdx;
    setQuizFeedback(correct ? 'Correct!' : 'Incorrect');
    if (correct) setQuizScore(s => s + 1);
    setTimeout(() => {
      setQuizFeedback('');
      if (quizIdx < quizQuestions.length - 1) {
        setQuizIdx(i => i + 1);
      } else {
        setQuizDone(true);
        localStorage.setItem('learn_quiz_complete', 'true');
        
        // Update progress tracker with quiz score
        progressTracker.addQuizScore(quizScore + (correct ? 1 : 0), quizQuestions.length);
        
        setShowCertificate(true);
      }
    }, 900);
  }
  function handleQuizRestart() {
    setQuizIdx(0);
    setQuizScore(0);
    setQuizDone(false);
    setQuizFeedback('');
    localStorage.removeItem('learn_quiz_complete');
  }
  function handleDownloadCert() {
    if (!certRef.current) return;
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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-8">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <div className="text-3xl font-heading text-brass font-bold drop-shadow-lg">Learn Namaz</div>
        <button
          className="btn"
          onClick={() => setShowQuiz(true)}
        >Take Quiz</button>
      </div>
      <div className="w-full card flex flex-col items-center">
        <div className="text-lg text-brass font-bold mb-1">Daily Challenge</div>
        <div className="text-text dark:text-darktext text-center font-body">{challenge}</div>
      </div>
      <div className="w-full flex flex-col gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center justify-between card px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                className={`w-6 h-6 rounded-full border-2 ${progress.includes(idx) ? 'bg-wood border-brass' : 'bg-card dark:bg-darkcard border-border dark:border-darkborder'}`}
                onClick={() => toggleStep(idx)}
                aria-label={`Mark ${step} as complete`}
              />
              <span className={`text-lg font-bold font-body ${progress.includes(idx) ? 'text-brass' : 'text-text dark:text-darktext'}`}>{step}</span>
            </div>
            <button
              className={`text-xl ${bookmarks.includes(idx) ? 'text-brass' : 'text-text dark:text-darktext'} transition`}
              onClick={() => toggleBookmark(idx)}
              aria-label={`Bookmark ${step}`}
            >{bookmarks.includes(idx) ? '★' : '☆'}</button>
          </div>
        ))}
      </div>
      <div className="w-full mt-6">
        <HowToPraySteps />
      </div>
      {/* Motivational Reward */}
      <div className="w-full flex flex-col items-center mt-4">
        <div className="text-lg text-brass font-bold mb-1">Motivational Reward</div>
        <div className="italic text-brass text-center max-w-xl font-body">{rewardQuotes[rewardIdx]}</div>
      </div>
      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="card p-6 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-xl text-brass" onClick={() => setShowQuiz(false)}>✕</button>
            <div className="text-xl font-heading text-brass font-bold mb-2">Namaz Quiz</div>
            {quizDone ? (
              <div className="flex flex-col items-center gap-4">
                <div className="text-2xl font-bold text-brass">Your Score: {quizScore} / {quizQuestions.length}</div>
                {quizScore === quizQuestions.length ? (
                  <>
                    <div className="text-brass font-bold text-lg flex flex-col items-center">
                      <span>🏅 Perfect! You unlocked a badge!</span>
                      <span className="mt-2 text-4xl">🌟</span>
                    </div>
                    <button className="mt-2 btn" onClick={() => setShowCertificate(true)}>View Certificate</button>
                  </>
                ) : null}
                <button className="btn" onClick={handleQuizRestart}>Try Again</button>
              </div>
            ) : (
              <div>
                <div className="text-lg font-bold mb-3 font-heading text-text dark:text-darktext">{quizQuestions[quizIdx].q}</div>
                <div className="flex flex-col gap-2">
                  {quizQuestions[quizIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      className="btn text-base"
                      onClick={() => handleQuizAnswer(i)}
                      disabled={!!quizFeedback}
                    >{opt}</button>
                  ))}
                </div>
                {quizFeedback && <div className={`mt-3 text-lg font-bold ${quizFeedback === 'Correct!' ? 'text-brass' : 'text-red-600'}`}>{quizFeedback}</div>}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="card p-6 max-w-lg w-full relative flex flex-col items-center">
            <button className="absolute top-2 right-2 text-xl text-brass" onClick={() => setShowCertificate(false)}>✕</button>
            <div className="text-2xl font-heading text-brass font-bold mb-2">Namaz Learning Certificate</div>
            <svg ref={certRef} width="320" height="180" viewBox="0 0 320 180" className="mb-4 rounded-xl border-2 border-brass shadow-lg">
              <rect x="0" y="0" width="320" height="180" rx="18" fill="#fffbe6" stroke="#B5A642" strokeWidth="4" />
              <text x="50%" y="40" textAnchor="middle" fontSize="22" fill="#B5A642" fontWeight="bold">Certificate of Completion</text>
              <text x="50%" y="80" textAnchor="middle" fontSize="16" fill="#3B2F2F">This certifies you have completed</text>
              <text x="50%" y="110" textAnchor="middle" fontSize="18" fill="#8B6F4E" fontWeight="bold">Namaz Learning Quiz</text>
              <text x="50%" y="145" textAnchor="middle" fontSize="14" fill="#B5A642">"{rewardQuotes[rewardIdx]}"</text>
              <text x="50%" y="170" textAnchor="middle" fontSize="12" fill="#B5A642">{new Date().toLocaleDateString()}</text>
            </svg>
            <button className="btn" onClick={handleDownloadCert}>Download Certificate</button>
          </div>
        </div>
      )}
    </div>
  );
} 