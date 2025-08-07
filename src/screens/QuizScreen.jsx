import { useState, useEffect, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';

// Enhanced quiz categories with detailed questions
const quizCategories = {
  basics: {
    title: 'Basic Prayer Knowledge',
    description: 'Fundamental concepts of Islamic prayer',
    icon: '📚',
    difficulty: 'Beginner',
    questions: [
      {
        q: 'What is the first step of Salah?',
        options: ['Takbir', 'Niyyah', 'Qiyam', 'Sajda'],
        answer: 1,
        explanation: 'Niyyah (intention) is the first step. You must make an intention in your heart before starting the prayer.',
        points: 10
      },
      {
        q: 'How many obligatory prayers are there in a day?',
        options: ['3', '4', '5', '6'],
        answer: 2,
        explanation: 'There are 5 obligatory prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha.',
        points: 10
      },
      {
        q: 'What direction should Muslims face during prayer?',
        options: ['North', 'South', 'East', 'Qibla'],
        answer: 3,
        explanation: 'Muslims should face the Qibla (direction of the Kaaba in Mecca) during prayer.',
        points: 10
      }
    ]
  },
  steps: {
    title: 'Prayer Steps & Actions',
    description: 'Step-by-step prayer guidance and movements',
    icon: '🕌',
    difficulty: 'Intermediate',
    questions: [
      {
        q: 'Which step involves bowing?',
        options: ['Qiyam', 'Rukoo', 'Jalsa', 'Salam'],
        answer: 1,
        explanation: 'Rukoo is the bowing position where you bend forward from the waist while keeping your back straight.',
        points: 15
      },
      {
        q: 'What do you say in Takbir?',
        options: ['Subhana Rabbiyal Adheem', 'Allahu Akbar', 'Attahiyyat', 'Alhamdulillah'],
        answer: 1,
        explanation: 'In Takbir, you say "Allahu Akbar" (Allah is the Greatest) while raising your hands to your ears.',
        points: 15
      }
    ]
  }
};

// Achievement system
const achievements = {
  firstQuiz: {
    id: 'firstQuiz',
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯',
    points: 50
  },
  perfectScore: {
    id: 'perfectScore',
    title: 'Perfect Scholar',
    description: 'Get a perfect score in any quiz',
    icon: '🏆',
    points: 100
  }
};

// Get saved quiz progress
function getQuizProgress() {
  try {
    return JSON.parse(localStorage.getItem('quiz_progress')) || {
      completedCategories: [],
      totalScore: 0,
      achievements: [],
      bestScores: {},
      totalQuizzes: 0,
      totalTime: 0
    };
  } catch {
    return {
      completedCategories: [],
      totalScore: 0,
      achievements: [],
      bestScores: {},
      totalQuizzes: 0,
      totalTime: 0
    };
  }
}

export default function QuizScreen() {
  const { settings } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizProgress, setQuizProgress] = useState(getQuizProgress());
  const [showAchievement, setShowAchievement] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizTime, setQuizTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const certRef = useRef();

  // Timer effect
  useEffect(() => {
    let interval;
    if (selectedCategory && !showResult) {
      interval = setInterval(() => {
        setQuizTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedCategory, showResult]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setStreak(0);
    setQuizTime(0);
    setQuizStartTime(Date.now());
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const currentQ = quizCategories[selectedCategory].questions[currentQuestion];
    const correct = answerIndex === currentQ.answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + currentQ.points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizCategories[selectedCategory].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const category = selectedCategory;
    const totalPoints = quizCategories[category].questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const quizDuration = Math.round((Date.now() - quizStartTime) / 1000);
    
    // Update progress
    const newProgress = {
      ...quizProgress,
      totalScore: quizProgress.totalScore + score,
      totalQuizzes: quizProgress.totalQuizzes + 1,
      totalTime: quizProgress.totalTime + quizDuration,
      bestScores: {
        ...quizProgress.bestScores,
        [category]: Math.max(quizProgress.bestScores[category] || 0, score)
      }
    };

    // Check for achievements
    const newAchievements = [];
    
    // First quiz achievement
    if (quizProgress.totalQuizzes === 0) {
      newAchievements.push(achievements.firstQuiz);
    }
    
    // Perfect score achievement
    if (percentage === 100) {
      newAchievements.push(achievements.perfectScore);
    }

    // Add new achievements
    newProgress.achievements = [...quizProgress.achievements, ...newAchievements.map(a => a.id)];
    
    setQuizProgress(newProgress);
    localStorage.setItem('quiz_progress', JSON.stringify(newProgress));
    
    // Show first achievement if any
    if (newAchievements.length > 0) {
      setShowAchievement(newAchievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
    
    setShowResult(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setStreak(0);
    setQuizTime(0);
    setQuizStartTime(Date.now());
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setStreak(0);
    setQuizTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const category = selectedCategory;
    const totalPoints = quizCategories[category].questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const isPerfect = percentage === 100;
    const quizDuration = Math.round((Date.now() - quizStartTime) / 1000);

    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
        <div className="w-full max-w-7xl mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading text-brass font-bold mb-4 drop-shadow">
              🎉 Quiz Complete!
            </h1>
            <p className="text-lg text-text dark:text-darktext">
              {quizCategories[selectedCategory]?.title}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card p-8 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {isPerfect ? '🏆' : '🌟'}
                </div>
                <h2 className="text-2xl font-bold text-brass mb-2">
                  {isPerfect ? 'Perfect Score!' : 'Great Job!'}
                </h2>
                <div className="text-3xl font-bold text-brass mb-4">
                  {score} / {totalPoints} points
                </div>
                <div className="text-lg text-text dark:text-darktext mb-4">
                  {percentage}% - {isPerfect ? 'Outstanding!' : 'Well done!'}
                </div>
                
                {/* Quiz Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                    <div className="text-2xl font-bold text-brass">{formatTime(quizDuration)}</div>
                    <div className="text-sm text-text dark:text-darktext">Time Taken</div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                    <div className="text-2xl font-bold text-brass">{streak}</div>
                    <div className="text-sm text-text dark:text-darktext">Best Streak</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-brass to-wood text-white hover:scale-105 transition-all duration-300"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={handleBackToCategories}
                  className="px-6 py-3 rounded-lg font-semibold bg-card dark:bg-darkcard text-text dark:text-darktext hover:bg-brass hover:text-white transition-all duration-300 border border-brass/20"
                >
                  📚 Other Categories
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Modal */}
        {showAchievement && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="card p-8 max-w-md w-full relative bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">{showAchievement.icon}</div>
                <h3 className="text-2xl font-bold text-brass mb-2">{showAchievement.title}</h3>
                <p className="text-text dark:text-darktext mb-4">{showAchievement.description}</p>
                <div className="text-lg font-bold text-wood">+{showAchievement.points} points</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (selectedCategory) {
    const currentQ = quizCategories[selectedCategory].questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizCategories[selectedCategory].questions.length) * 100;

    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
        <div className="w-full max-w-7xl mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading text-brass font-bold mb-4 drop-shadow">
              {quizCategories[selectedCategory].icon} {quizCategories[selectedCategory].title}
            </h1>
            <p className="text-lg text-text dark:text-darktext">
              {quizCategories[selectedCategory].description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress and Stats Bar */}
            <div className="card p-6 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20 shadow-xl mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text dark:text-darktext">
                    Question {currentQuestion + 1} of {quizCategories[selectedCategory].questions.length}
                  </span>
                  <span className="text-sm font-semibold text-brass">
                    Score: {score} points
                  </span>
                  <span className="text-sm font-semibold text-wood">
                    Streak: {streak}
                  </span>
                </div>
                <div className="text-sm text-text dark:text-darktext">
                  Time: {formatTime(quizTime)}
                </div>
              </div>
              <div className="w-full bg-brass/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-brass to-wood h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="card p-8 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20 shadow-2xl">
              <h2 className="text-xl font-bold text-text dark:text-darktext mb-6 leading-relaxed">
                {currentQ.q}
              </h2>
              
              <div className="grid gap-3 mb-6">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`p-4 rounded-lg text-left transition-all duration-300 border ${
                      selectedAnswer === i
                        ? isCorrect
                          ? 'bg-green-500 text-white border-green-600'
                          : 'bg-red-500 text-white border-red-600'
                        : 'bg-card dark:bg-darkcard text-text dark:text-darktext hover:bg-brass hover:text-white border-brass/20'
                    }`}
                    onClick={() => handleAnswerSelect(i)}
                    disabled={selectedAnswer !== null}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {selectedAnswer !== null && (
                <div className={`p-4 rounded-lg mb-6 ${
                  isCorrect 
                    ? 'bg-green-100 border border-green-200 text-green-800' 
                    : 'bg-red-100 border border-red-200 text-red-800'
                }`}>
                  <div className="font-bold mb-2">
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  <div className="text-sm">{currentQ.explanation}</div>
                </div>
              )}

              {/* Next Button */}
              {selectedAnswer !== null && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-brass to-wood text-white hover:scale-105 transition-all duration-300"
                >
                  {currentQuestion === quizCategories[selectedCategory].questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading text-brass font-bold mb-4 drop-shadow-2xl bg-gradient-to-r from-brass to-wood bg-clip-text text-transparent">
            🏆 Namaz Quiz Center
          </h1>
          <p className="text-lg text-text dark:text-darktext max-w-2xl mx-auto">
            Test your knowledge of Islamic prayer with comprehensive quizzes covering all aspects of Salah
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
            <div className="text-2xl font-bold text-brass">{quizProgress.totalQuizzes}</div>
            <div className="text-sm text-text dark:text-darktext">Quizzes Taken</div>
          </div>
          <div className="card p-4 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
            <div className="text-2xl font-bold text-brass">{quizProgress.totalScore}</div>
            <div className="text-sm text-text dark:text-darktext">Total Points</div>
          </div>
          <div className="card p-4 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
            <div className="text-2xl font-bold text-brass">{quizProgress.completedCategories.length}</div>
            <div className="text-sm text-text dark:text-darktext">Categories Completed</div>
          </div>
          <div className="card p-4 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
            <div className="text-2xl font-bold text-brass">{quizProgress.achievements.length}</div>
            <div className="text-sm text-text dark:text-darktext">Achievements</div>
          </div>
        </div>

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(quizCategories).map(([key, category]) => {
            const isCompleted = quizProgress.completedCategories.includes(key);
            const bestScore = quizProgress.bestScores[key] || 0;
            const totalPoints = category.questions.reduce((sum, q) => sum + q.points, 0);
            const percentage = totalPoints > 0 ? Math.round((bestScore / totalPoints) * 100) : 0;

            return (
              <div
                key={key}
                className={`card p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isCompleted 
                    ? 'bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30' 
                    : 'bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border-brass/20'
                }`}
                onClick={() => handleCategorySelect(key)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  {isCompleted && (
                    <div className="text-green-500 text-2xl">✅</div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-brass mb-2">{category.title}</h3>
                <p className="text-sm text-text dark:text-darktext mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-brass/20 text-brass">
                    {category.difficulty}
                  </span>
                  {bestScore > 0 && (
                    <span className="text-sm font-semibold text-brass">
                      {percentage}%
                    </span>
                  )}
                </div>
                {bestScore > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-brass/20 rounded-full h-2">
                      <div 
                        className="bg-brass h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setShowStats(true)}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-brass to-wood text-white hover:scale-105 transition-all duration-300"
          >
            📊 View Statistics
          </button>
        </div>

        {/* Statistics Modal */}
        {showStats && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="card p-8 max-w-2xl w-full relative bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
              <button className="absolute top-4 right-4 text-2xl text-brass hover:text-wood transition-all duration-300" onClick={() => setShowStats(false)}>✕</button>
              <div className="text-2xl font-heading text-brass font-bold mb-6 text-center">📊 Quiz Statistics</div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{quizProgress.totalQuizzes}</div>
                  <div className="text-sm text-text dark:text-darktext">Total Quizzes</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{quizProgress.totalScore}</div>
                  <div className="text-sm text-text dark:text-darktext">Total Points</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{formatTime(quizProgress.totalTime)}</div>
                  <div className="text-sm text-text dark:text-darktext">Total Time</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{quizProgress.achievements.length}</div>
                  <div className="text-sm text-text dark:text-darktext">Achievements</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-brass">Best Scores by Category</h3>
                {Object.entries(quizCategories).map(([key, category]) => {
                  const bestScore = quizProgress.bestScores[key] || 0;
                  const totalPoints = category.questions.reduce((sum, q) => sum + q.points, 0);
                  const percentage = totalPoints > 0 ? Math.round((bestScore / totalPoints) * 100) : 0;
                  
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <div className="font-semibold text-brass">{category.title}</div>
                          <div className="text-sm text-text dark:text-darktext">{bestScore}/{totalPoints} points</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-brass">{percentage}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
