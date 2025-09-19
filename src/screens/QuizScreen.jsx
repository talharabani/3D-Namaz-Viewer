import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useTranslation } from '../utils/translations';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions,
  pulseAnimation,
  mosqueGlow
} from '../utils/animations';

// Enhanced achievement system

// Enhanced achievement system
const getTranslatedAchievements = (t) => ({
  firstQuiz: {
    id: 'firstQuiz',
    title: t('First Steps'),
    description: t('Complete Your First Quiz'),
    icon: '🎯',
    points: 50
  },
  perfectScore: {
    id: 'perfectScore',
    title: t('Perfect Scholar'),
    description: t('Get A Perfect Score In Any Quiz'),
    icon: '🏆',
    points: 100
  },
  streakMaster: {
    id: 'streakMaster',
    title: t('Streak Master'),
    description: t('Answer Questions Correctly In A Row'),
    icon: '🔥',
    points: 75
  },
  speedDemon: {
    id: 'speedDemon',
    title: t('Speed Demon'),
    description: t('Complete A Quiz In Under Minutes'),
    icon: '⚡',
    points: 50
  },
  categoryMaster: {
    id: 'categoryMaster',
    title: t('Category Master'),
    description: t('Complete All Questions In A Category'),
    icon: '👑',
    points: 150
  },
  dailyChampion: {
    id: 'dailyChampion',
    title: t('Daily Champion Achievement'),
    description: t('Complete Daily Challenges'),
    icon: '📅',
    points: 200
  }
});

// Get saved quiz progress
function getQuizProgress() {
  try {
    return JSON.parse(localStorage.getItem('quiz_progress')) || {
      completedCategories: [],
      totalScore: 0,
      achievements: [],
      bestScores: {},
      totalQuizzes: 0,
      totalTime: 0,
      dailyStreak: 0,
      lastQuizDate: null,
      categoryCompletions: {},
      perfectScores: 0
    };
  } catch {
    return {
      completedCategories: [],
      totalScore: 0,
      achievements: [],
      bestScores: {},
      totalQuizzes: 0,
      totalTime: 0,
      dailyStreak: 0,
      lastQuizDate: null,
      categoryCompletions: {},
      perfectScores: 0
    };
  }
}

export default function QuizScreen() {
  const { settings } = useSettings();
  const { t } = useTranslation();

  // Helper function to get translated quiz categories
  const getTranslatedQuizCategories = () => ({
  basics: {
      title: t('Basic Prayer Knowledge'),
      description: t('Fundamental Concepts Of Islamic Prayer'),
    icon: '📚',
      difficulty: t('Beginner'),
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
      },
      {
        q: 'What is the minimum age for obligatory prayer?',
        options: ['5 years', '7 years', '10 years', '12 years'],
        answer: 1,
        explanation: 'Children should be encouraged to pray from age 7, and it becomes obligatory at age 10.',
        points: 10
      },
      {
        q: 'What is the purpose of Wudu?',
        options: ['Decoration', 'Spiritual purification', 'Physical exercise', 'Social ritual'],
        answer: 1,
        explanation: 'Wudu is a spiritual purification ritual that prepares the body and mind for prayer.',
        points: 10
      }
    ]
  },
  steps: {
      title: t('Prayer Steps Actions'),
      description: t('Step By Step Prayer Guidance And Movements'),
    icon: '🕌',
      difficulty: t('Intermediate'),
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
      },
      {
        q: 'How many times do you say "Subhana Rabbiyal Adheem" in Rukoo?',
        options: ['1 time', '2 times', '3 times', '4 times'],
        answer: 2,
        explanation: 'You say "Subhana Rabbiyal Adheem" (Glory be to my Lord, the Most Great) 3 times in Rukoo.',
        points: 15
      },
      {
        q: 'What is the position called when you sit between two Sajdas?',
        options: ['Qiyam', 'Rukoo', 'Jalsa', 'Sajda'],
        answer: 2,
        explanation: 'Jalsa is the sitting position between the two prostrations (Sajdas).',
        points: 15
      },
      {
        q: 'How many Sajdas are there in each Rakat?',
        options: ['1', '2', '3', '4'],
        answer: 1,
        explanation: 'There are 2 Sajdas (prostrations) in each Rakat of prayer.',
        points: 15
      }
    ]
  },
  wudu: {
      title: t('Wudu Purification'),
      description: t('Ritual Purification And Ablution'),
    icon: '💧',
      difficulty: t('Beginner'),
    questions: [
      {
        q: 'What is the first step of Wudu?',
        options: ['Washing hands', 'Making intention', 'Washing face', 'Washing feet'],
        answer: 1,
        explanation: 'The first step is making the intention (Niyyah) in your heart to perform Wudu.',
        points: 10
      },
      {
        q: 'How many times should you wash each part in Wudu?',
        options: ['1 time', '2 times', '3 times', '4 times'],
        answer: 2,
        explanation: 'Each part should be washed 3 times in Wudu, except for wiping the head.',
        points: 10
      },
      {
        q: 'Which part is wiped instead of washed in Wudu?',
        options: ['Face', 'Arms', 'Head', 'Feet'],
        answer: 2,
        explanation: 'The head is wiped with wet hands, not washed like other parts.',
        points: 10
      },
      {
        q: 'What invalidates Wudu?',
        options: ['Sleeping', 'Eating', 'Drinking water', 'All of the above'],
        answer: 3,
        explanation: 'Sleeping, using the bathroom, passing gas, and other bodily functions invalidate Wudu.',
        points: 10
      },
      {
        q: 'How far up should you wash your arms in Wudu?',
        options: ['Wrists only', 'Elbows', 'Shoulders', 'Upper arms'],
        answer: 1,
        explanation: 'You should wash your arms up to and including the elbows in Wudu.',
        points: 10
      }
    ]
  },
  times: {
      title: t('Prayer Times Qibla'),
      description: t('Prayer Timings And Direction'),
    icon: '🕐',
      difficulty: t('Intermediate'),
    questions: [
      {
        q: 'When does Fajr prayer time begin?',
        options: ['Sunrise', 'Dawn', 'Midnight', 'Sunset'],
        answer: 1,
        explanation: 'Fajr begins at dawn (Fajr Sadiq) when the first light appears on the horizon.',
        points: 15
      },
      {
        q: 'What is the middle prayer mentioned in the Quran?',
        options: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib'],
        answer: 2,
        explanation: 'Asr is referred to as the "middle prayer" in the Quran and is highly emphasized.',
        points: 15
      },
      {
        q: 'When does Maghrib prayer time begin?',
        options: ['Sunset', 'After sunset', 'Dusk', 'Night'],
        answer: 0,
        explanation: 'Maghrib prayer time begins immediately after the sun sets.',
        points: 15
      },
      {
        q: 'What is the recommended time for Isha prayer?',
        options: ['Immediately after Maghrib', 'After 1 hour', 'Before midnight', 'After midnight'],
        answer: 2,
        explanation: 'Isha should be prayed before midnight, though it can be delayed if necessary.',
        points: 15
      },
      {
        q: 'How do you determine Qibla direction?',
        options: ['Always face North', 'Use a compass', 'Face the Kaaba', 'Face East'],
        answer: 2,
        explanation: 'Qibla is the direction of the Kaaba in Mecca, which can be determined using a compass or prayer apps.',
        points: 15
      }
    ]
  },
  advanced: {
      title: t('Advanced Prayer Knowledge'),
      description: t('Complex Prayer Scenarios And Rulings'),
    icon: '🎯',
      difficulty: t('Advanced'),
    questions: [
      {
        q: 'What should you do if you miss a prayer?',
        options: ['Skip it', 'Pray it later', 'Pray double next time', 'Make up with extra prayers'],
        answer: 1,
        explanation: 'Missed prayers should be made up (Qada) as soon as possible.',
        points: 20
      },
      {
        q: 'What is the ruling on praying while traveling?',
        options: ['Pray normally', 'Shorten prayers', 'Skip prayers', 'Pray only once a day'],
        answer: 1,
        explanation: 'Travelers can shorten 4-rakat prayers to 2 rakats and combine prayers.',
        points: 20
      },
      {
        q: 'What breaks your prayer?',
        options: ['Coughing', 'Moving slightly', 'Talking intentionally', 'Blinking'],
        answer: 2,
        explanation: 'Intentionally talking, eating, drinking, or laughing breaks the prayer.',
        points: 20
      },
      {
        q: 'What is the minimum number of people needed for Jumuah prayer?',
        options: ['2', '3', '4', '5'],
        answer: 1,
        explanation: 'Jumuah prayer requires a minimum of 3 people: an Imam and 2 followers.',
        points: 20
      },
      {
        q: 'What is the ruling on praying in a moving vehicle?',
        options: ['Always allowed', 'Never allowed', 'Allowed if necessary', 'Only for travelers'],
        answer: 2,
        explanation: 'Praying in a moving vehicle is allowed if necessary, but should be avoided when possible.',
        points: 20
      }
    ]
  },
  daily: {
      title: t('Daily Challenges'),
      description: t('Daily Rotating Questions To Test Your Knowledge'),
    icon: '🌟',
      difficulty: t('Mixed'),
    questions: [
      {
        q: 'What is the meaning of "Salah"?',
        options: ['Prayer', 'Worship', 'Connection', 'All of the above'],
        answer: 3,
        explanation: 'Salah means prayer, worship, and connection with Allah.',
        points: 25
      },
      {
        q: 'Which prayer is known as the "coolness of the eyes"?',
        options: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib'],
        answer: 0,
        explanation: 'Fajr prayer is called the "coolness of the eyes" in Islamic tradition.',
        points: 25
      },
      {
        q: 'What is the significance of the first Takbir?',
        options: ['Marks the start', 'Purifies intention', 'Connects with Allah', 'All of the above'],
        answer: 3,
        explanation: 'The first Takbir marks the start of prayer, purifies intention, and connects with Allah.',
        points: 25
      },
      {
        q: 'How many times do you say "Allahu Akbar" in a complete prayer cycle?',
        options: ['5 times', '7 times', '9 times', '11 times'],
        answer: 1,
        explanation: 'You say "Allahu Akbar" 7 times in a complete 2-rakat prayer cycle.',
        points: 25
      },
      {
        q: 'What is the purpose of the Tashahhud?',
        options: ['Rest period', 'Testimony of faith', 'Ending prayer', 'All of the above'],
        answer: 3,
        explanation: 'Tashahhud serves as a rest period, testimony of faith, and preparation for ending the prayer.',
        points: 25
      }
    ]
  }
  });

  // Get translated quiz categories and achievements
  const quizCategories = getTranslatedQuizCategories();
  const achievements = getTranslatedAchievements(t);
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
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const certRef = useRef();

  // Generate daily questions
  useEffect(() => {
    const today = new Date().toDateString();
    if (quizProgress.lastQuizDate !== today) {
      generateDailyQuestions();
    } else {
      // Load existing daily questions if they exist
      const existingQuestions = localStorage.getItem('daily_questions');
      if (existingQuestions) {
        try {
          setDailyQuestions(JSON.parse(existingQuestions));
        } catch {
          generateDailyQuestions();
        }
      } else {
        generateDailyQuestions();
      }
    }
  }, [quizProgress.lastQuizDate]);

  const generateDailyQuestions = () => {
    const allQuestions = [];
    Object.values(quizCategories).forEach(category => {
      if (category.questions) {
        allQuestions.push(...category.questions);
      }
    });
    
    // Shuffle and select 5 random questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 5);
    setDailyQuestions(selectedQuestions);
    localStorage.setItem('daily_questions', JSON.stringify(selectedQuestions));
  };

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

  const handleDailyChallenge = () => {
    if (dailyQuestions.length === 0) {
      generateDailyQuestions();
    }
    setSelectedCategory('daily');
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setStreak(0);
    setQuizTime(0);
    setQuizStartTime(Date.now());
    setShowDailyChallenge(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const questions = selectedCategory === 'daily' 
      ? dailyQuestions 
      : quizCategories[selectedCategory].questions;
    const currentQ = questions[currentQuestion];
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
    const questions = selectedCategory === 'daily' 
      ? dailyQuestions 
      : quizCategories[selectedCategory].questions;
    const totalQuestions = questions.length;
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const category = selectedCategory;
    const questions = selectedCategory === 'daily' 
      ? dailyQuestions 
      : quizCategories[selectedCategory].questions;
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
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
      },
      categoryCompletions: {
        ...quizProgress.categoryCompletions,
        [category]: (quizProgress.categoryCompletions[category] || 0) + 1
      },
      lastQuizDate: new Date().toDateString()
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
      newProgress.perfectScores = quizProgress.perfectScores + 1;
    }

    // Streak master achievement
    if (streak >= 5) {
      newAchievements.push(achievements.streakMaster);
    }

    // Speed demon achievement
    if (quizDuration < 120) {
      newAchievements.push(achievements.speedDemon);
    }

    // Category master achievement
    if (newProgress.categoryCompletions[category] >= 3) {
      newAchievements.push(achievements.categoryMaster);
    }

    // Daily champion achievement
    if (category === 'daily' && newProgress.categoryCompletions[category] >= 7) {
      newAchievements.push(achievements.dailyChampion);
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
    const questions = selectedCategory === 'daily' 
      ? dailyQuestions 
      : quizCategories[selectedCategory].questions;
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const isPerfect = percentage === 100;
    const quizDuration = Math.round((Date.now() - quizStartTime) / 1000);
    const categoryTitle = selectedCategory === 'daily' 
      ? 'Daily Challenge' 
      : quizCategories[selectedCategory]?.title;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-6xl mx-auto py-8 px-2 md:px-4 relative">
          {/* Decorative pattern */}
          <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none select-none">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4 drop-shadow">
              🎉 {t('Quiz Complete')}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {categoryTitle}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-xl border border-amber-200 dark:border-amber-700">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {isPerfect ? '🏆' : '🌟'}
                </div>
                <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                  {isPerfect ? t('Perfect Score') : t('Great Job')}
                </h2>
                <div className="text-3xl font-bold text-amber-800 dark:text-amber-200 mb-4">
                  {score} / {totalPoints} {t('Points')}
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  {percentage}% - {isPerfect ? t('Outstanding') : t('WellDone')}
                </div>
                
                {/* Quiz Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-amber-700 shadow-lg">
                    <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">{formatTime(quizDuration)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('timeTaken')}</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-amber-700 shadow-lg">
                    <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">{streak}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('bestStreak')}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-lg font-semibold bg-amber-600 text-white hover:bg-amber-700 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  🔄 {t('Try Again')}
                </button>
                <button
                  onClick={handleBackToCategories}
                  className="px-6 py-3 rounded-lg font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600 transition-all duration-300 shadow-lg"
                >
                  📚 {t('Other Categories')}
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
                <p className="text-gray-900 dark:text-gray-100 mb-4">{showAchievement.description}</p>
                <div className="text-lg font-bold text-wood">+{showAchievement.points} points</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (selectedCategory) {
    const questions = selectedCategory === 'daily' 
      ? dailyQuestions 
      : quizCategories[selectedCategory].questions;
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const categoryTitle = selectedCategory === 'daily' 
      ? t('Daily Challenge') 
      : quizCategories[selectedCategory].title;
    const categoryIcon = selectedCategory === 'daily' 
      ? '🌟' 
      : quizCategories[selectedCategory].icon;
    const categoryDescription = selectedCategory === 'daily' 
      ? t('Daily Rotating Questions To Test Your Knowledge') 
      : quizCategories[selectedCategory].description;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-6xl mx-auto py-8 px-2 md:px-4 relative">
          {/* Decorative pattern */}
          <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none select-none">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4 drop-shadow">
              {categoryIcon} {categoryTitle}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {categoryDescription}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress and Stats Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t('Question')} {currentQuestion + 1} {t('Of')} {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {t('Score')}: {score} {t('Points')}
                  </span>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {t('Streak')}: {streak}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Time')}: {formatTime(quizTime)}
                </div>
              </div>
              <div className="w-full bg-amber-200 dark:bg-amber-800/30 rounded-full h-3">
                <div 
                  className="bg-amber-600 dark:bg-amber-400 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              </div>
            </div>

            {/* Question Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
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
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border-amber-300 dark:border-amber-600'
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
                    {isCorrect ? `✅ ${t('Correct')}` : `❌ ${t('Incorrect')}`}
                  </div>
                  <div className="text-sm">{currentQ.explanation}</div>
                </div>
              )}

              {/* Next Button */}
              {selectedAnswer !== null && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full px-6 py-3 rounded-lg font-semibold bg-amber-600 text-white hover:bg-amber-700 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {currentQuestion === questions.length - 1 ? t('Finish Quiz') : t('Next Question')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto py-6 sm:py-8 px-3 sm:px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              🏆 {t('Namaz Quiz')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
              {t('Test Your Knowledge Of Islamic Prayer')}
            </p>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="w-full max-w-6xl mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={staggerContainer}
          >
            <motion.div 
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-center shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3">📊</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">{quizProgress.totalQuizzes || 0}</div>
              <div className="text-slate-600 dark:text-slate-300 font-semibold">{t('quizzesTaken')}</div>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-center shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3">⭐</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">{quizProgress.totalScore || 0}</div>
              <div className="text-slate-600 dark:text-slate-300 font-semibold">{t('totalPoints')}</div>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-center shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">{quizProgress.completedCategories ? quizProgress.completedCategories.length : 0}</div>
              <div className="text-slate-600 dark:text-slate-300 font-semibold">{t('Categories Completed')}</div>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-center shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-3">🎖️</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">{quizProgress.achievements ? quizProgress.achievements.length : 0}</div>
              <div className="text-slate-600 dark:text-slate-300 font-semibold">{t('Achievements')}</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Daily Challenge Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">🌟 {t('Daily Challenge')}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">{t('Test Your Knowledge With Random Questions')}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  {t('completed')}: {(quizProgress.categoryCompletions && quizProgress.categoryCompletions['daily']) || 0} {t('Times')}
                </span>
                {(quizProgress.categoryCompletions && quizProgress.categoryCompletions['daily'] >= 7) && (
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    🏆 {t('dailyChampion')}
                  </span>
                )}
              </div>
            </div>
            <motion.button
              onClick={handleDailyChallenge}
              className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('Start Challenge')}
            </motion.button>
          </div>
        </motion.div>

        {/* Quiz Categories */}
        <motion.div 
          className="w-full max-w-6xl mx-auto mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-8 text-center">
            {t('Quiz Categories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Object.entries(quizCategories).map(([key, category]) => {
              const isCompleted = quizProgress.completedCategories && quizProgress.completedCategories.includes(key);
              const bestScore = quizProgress.bestScores && quizProgress.bestScores[key] || 0;
              const totalPoints = category.questions.reduce((sum, q) => sum + q.points, 0);
              const percentage = totalPoints > 0 ? Math.round((bestScore / totalPoints) * 100) : 0;
              const completions = (quizProgress.categoryCompletions && quizProgress.categoryCompletions[key]) || 0;

              return (
                <motion.div
                  key={key}
                  className={`bg-white/10 backdrop-blur-lg text-center transition-all duration-300 cursor-pointer rounded-2xl sm:rounded-3xl group hover:shadow-2xl focus:shadow-2xl border relative overflow-hidden hover:bg-white/20 ${
                    isCompleted 
                      ? 'border-emerald-400/50 bg-emerald-500/20' 
                      : 'border-white/20 hover:border-emerald-400/50'
                  }`}
                  onClick={() => handleCategorySelect(key)}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Category Icon */}
                  <div className="text-5xl mb-4 mt-6">
                    {category.icon}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 text-center">{category.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">{category.description}</p>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                      <span className="font-semibold">{category.questions.length} {t('Questions')}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{totalPoints} {t('Points')}</span>
                    </div>
                    
                    {/* Difficulty */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold">
                        {category.difficulty}
                      </span>
                      {bestScore > 0 && (
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {percentage}%
                        </span>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    {bestScore > 0 && (
                      <div className="mb-4">
                        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Completion Status */}
                    <div className="flex items-center justify-center gap-2">
                      {isCompleted && (
                        <div className="text-green-500 text-2xl">✅</div>
                      )}
                      {completions > 0 && (
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          {completions}x {t('Completed')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-100/20 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
            );
          })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <motion.button
            onClick={() => setShowStats(true)}
            className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 {t('View Statistics')}
          </motion.button>
        </motion.div>

        {/* Statistics Modal */}
        {showStats && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="card p-8 max-w-2xl w-full relative bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
              <button className="absolute top-4 right-4 text-2xl text-brass hover:text-wood transition-all duration-300" onClick={() => setShowStats(false)}>✕</button>
              <div className="text-2xl font-heading text-brass font-bold mb-6 text-center">📊 {t('Quiz Statistics')}</div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{quizProgress.totalQuizzes || 0}</div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">{t('Total Quizzes')}</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{quizProgress.totalScore || 0}</div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">{t('Total Points')}</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{formatTime(quizProgress.totalTime || 0)}</div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">{t('Total Time')}</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                  <div className="text-2xl font-bold text-brass">{quizProgress.achievements ? quizProgress.achievements.length : 0}</div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">{t('Achievements')}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-brass">{t('Best Scores By Category')}</h3>
                {Object.entries(quizCategories).map(([key, category]) => {
                  const bestScore = (quizProgress.bestScores && quizProgress.bestScores[key]) || 0;
                  const totalPoints = category.questions.reduce((sum, q) => sum + q.points, 0);
                  const percentage = totalPoints > 0 ? Math.round((bestScore / totalPoints) * 100) : 0;
                  
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <div className="font-semibold text-brass">{category.title}</div>
                          <div className="text-sm text-gray-900 dark:text-gray-100">{bestScore}/{totalPoints} {t('Points')}</div>
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

        {/* Daily Challenge Modal */}
        {showDailyChallenge && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="card p-8 max-w-4xl w-full relative bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-sm border border-brass/20">
              <button className="absolute top-4 right-4 text-2xl text-brass hover:text-wood transition-all duration-300" onClick={() => setShowDailyChallenge(false)}>✕</button>
              <div className="text-2xl font-heading text-brass font-bold mb-6 text-center">🌟 {t('Daily Challenge')}</div>
              
              <div className="space-y-6">
                {dailyQuestions.map((question, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                    <h4 className="font-bold text-brass mb-3">{t('question')} {index + 1}: {question.q}</h4>
                    <div className="grid gap-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="p-2 bg-gray-100 dark:bg-gray-900card rounded border border-brass/20">
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
