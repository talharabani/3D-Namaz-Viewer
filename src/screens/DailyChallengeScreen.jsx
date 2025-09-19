import { useState, useEffect } from 'react';
import { progressTracker } from '../utils/progressTracker';
import { useTranslation } from '../utils/translations';
import { motion } from 'framer-motion';
import { GlowCard } from '../components/nurui/spotlight-card';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions
} from '../utils/animations';

// Category colors and icons
const categoryColors = {
  prayer: 'from-blue-500 to-blue-600',
  worship: 'from-purple-500 to-purple-600',
  quran: 'from-green-500 to-green-600',
  learning: 'from-orange-500 to-orange-600',
  good_deeds: 'from-pink-500 to-pink-600'
};

const categoryIcons = {
  prayer: '🕌',
  worship: '🙏',
  quran: '📖',
  learning: '📚',
  good_deeds: '🤝'
};

export default function DailyChallengeScreen() {
  const { t } = useTranslation();

  // Helper function to get translated daily challenges
  const getTranslatedDailyChallenges = () => [
    {
      id: 'pray_tahajjud',
      title: t('Pray Tahajjud'),
      description: t('Pray Tahajjud Desc'),
      icon: '🌙',
      reward: 15,
      category: 'prayer',
      details: 'Tahajjud is a voluntary night prayer that holds great spiritual significance. It is performed after Isha prayer and before Fajr, preferably in the last third of the night. This prayer helps strengthen your connection with Allah and brings inner peace.',
      instructions: [
        'Wake up in the last third of the night (around 2-3 AM)',
        'Perform ablution (wudu)',
        'Pray 2-8 rakats of Tahajjud',
        'Make sincere dua during sujood',
        'Recite Quran with understanding'
      ]
    },
    {
      id: 'do_dhikr',
      title: t('Do Dhikr'),
      description: t('Do Dhikr Desc'),
      icon: '📿',
      reward: 10,
      category: 'worship',
      details: 'Dhikr is the remembrance of Allah through specific phrases and supplications. It purifies the heart, brings tranquility, and strengthens your faith. Regular dhikr helps maintain a constant connection with Allah throughout the day.',
      instructions: [
        'Find a quiet place to sit comfortably',
        'Start with "SubhanAllah" (Glory be to Allah) - 33 times',
        'Continue with "Alhamdulillah" (Praise be to Allah) - 33 times',
        'Finish with "Allahu Akbar" (Allah is the Greatest) - 33 times',
        'Make personal dua and supplications'
      ]
    },
    {
      id: 'read_quran',
      title: t('Read Quran'),
      description: t('Read Quran Desc'),
      icon: '📖',
      reward: 8,
      category: 'quran',
      details: 'Reading the Quran with understanding is one of the most rewarding acts of worship. It provides guidance, wisdom, and spiritual nourishment. Regular Quran reading helps you understand Allah\'s message and apply it in your daily life.',
      instructions: [
        'Choose a quiet time and place',
        'Begin with "Bismillah" (In the name of Allah)',
        'Read slowly and with proper tajweed',
        'Reflect on the meaning of verses',
        'Try to understand the context and message'
      ]
    },
    {
      id: 'perfect_sajda',
      title: t('Perfect Sajda'),
      description: t('Perfect Sajda Desc'),
      icon: '🤲',
      reward: 5,
      category: 'prayer',
      details: 'Sajda (prostration) is the closest position to Allah during prayer. Perfecting your sajda involves proper form, staying longer in this position, and making sincere dua. This helps develop humility and strengthens your connection with Allah.',
      instructions: [
        'Ensure proper form - forehead, nose, hands, knees, and toes touching the ground',
        'Stay in sajda longer than usual',
        'Make sincere dua during prostration',
        'Recite "Subhana Rabbiyal A\'la" (Glory be to my Lord, the Most High)',
        'Feel the humility and closeness to Allah'
      ]
    },
    {
      id: 'recite_fatiha',
      title: t('Recite Fatiha'),
      description: t('Recite Fatiha Desc'),
      icon: '🎯',
      reward: 3,
      category: 'quran',
      details: 'Surah Al-Fatiha is the opening chapter of the Quran and is recited in every prayer. Reciting it with full concentration and understanding helps you connect deeply with Allah\'s message and strengthens your prayer experience.',
      instructions: [
        'Understand the meaning of each verse',
        'Recite slowly and with proper tajweed',
        'Focus on the words and their significance',
        'Feel the connection with Allah while reciting',
        'Reflect on the message of guidance and mercy'
      ]
    },
    {
      id: 'reflect_takbir',
      title: t('Reflect Takbir'),
      description: t('Reflect Takbir Desc'),
      icon: '🕌',
      reward: 4,
      category: 'prayer',
      details: '"Allahu Akbar" means "Allah is the Greatest" and is recited at the beginning of prayer and during transitions. Reflecting on its meaning helps you understand Allah\'s greatness and your position as His servant.',
      instructions: [
        'Understand that "Allahu Akbar" means "Allah is the Greatest"',
        'Reflect on Allah\'s greatness and your humility',
        'Feel the transition from worldly matters to prayer',
        'Focus on the meaning while reciting',
        'Let it remind you of Allah\'s power and your dependence on Him'
      ]
    },
    {
      id: 'mindful_qiyam',
      title: t('Mindful Qiyam'),
      description: t('Mindful Qiyam Desc'),
      icon: '🧘',
      reward: 3,
      category: 'prayer',
      details: 'Qiyam is the standing position in prayer. Practicing mindful qiyam involves being fully present, maintaining proper posture, and focusing on the recitation. This helps develop concentration and spiritual awareness.',
      instructions: [
        'Stand with proper posture - feet shoulder-width apart',
        'Keep your gaze on the place of prostration',
        'Focus on the recitation and its meaning',
        'Avoid fidgeting or unnecessary movements',
        'Feel the connection with Allah in this position'
      ]
    },
    {
      id: 'humble_rukoo',
      title: t('Humble Rukoo'),
      description: t('Humble Rukoo Desc'),
      icon: '🙇',
      reward: 4,
      category: 'prayer',
      details: 'Rukoo is the bowing position in prayer. Practicing humble rukoo involves proper form, staying in the position longer, and reflecting on the meaning of the dhikr recited during this position.',
      instructions: [
        'Bend at the waist with proper form',
        'Keep your back straight and parallel to the ground',
        'Hold your knees with your hands',
        'Recite "Subhana Rabbiyal Adheem" (Glory be to my Lord, the Most Great)',
        'Stay in the position longer and reflect on its meaning'
      ]
    },
    {
      id: 'add_notes',
      title: t('Add Notes'),
      description: t('Add Notes Desc'),
      icon: '📝',
      reward: 2,
      category: 'learning',
      details: 'Taking notes helps you remember important points about prayer and Islamic practices. Adding notes to your favorite prayer steps helps you track your progress and remember key details for improvement.',
      instructions: [
        'Choose a prayer step you want to improve',
        'Reflect on what you learned about it',
        'Write down key points or reminders',
        'Include personal insights or experiences',
        'Review your notes regularly for improvement'
      ]
    },
    {
      id: 'complete_quiz',
      title: t('Complete Quiz'),
      description: t('Complete Quiz Desc'),
      icon: '🏆',
      reward: 10,
      category: 'learning',
      details: 'Taking quizzes helps you test your knowledge about prayer and Islamic practices. It reinforces what you\'ve learned and identifies areas for improvement. Regular quizzes help you stay engaged and motivated in your learning journey.',
      instructions: [
        'Go to the Learn screen',
        'Click on "Take Namaz Quiz"',
        'Answer all questions carefully',
        'Review your results and learn from mistakes',
        'Try to improve your score in future attempts'
      ]
    },
    {
      id: 'pray_sunnah',
      title: t('Pray Sunnah'),
      description: t('Pray Sunnah Desc'),
      icon: '☀️',
      reward: 6,
      category: 'prayer',
      details: 'Sunnah prayers are additional prayers that the Prophet Muhammad (PBUH) regularly performed. They bring extra rewards and help you develop a stronger connection with Allah. They also help you prepare for or extend your obligatory prayers.',
      instructions: [
        'Learn about the Sunnah prayers for each obligatory prayer',
        'Pray 2 rakats before Fajr (Sunnah of Fajr)',
        'Pray 4 rakats before Dhuhr (Sunnah of Dhuhr)',
        'Pray 2 rakats after Dhuhr (Sunnah of Dhuhr)',
        'Pray 2 rakats after Maghrib (Sunnah of Maghrib)'
      ]
    },
    {
      id: 'make_dua',
      title: t('Make Dua'),
      description: t('Make Dua Desc'),
      icon: '🙏',
      reward: 5,
      category: 'worship',
      details: 'Dua is a direct conversation with Allah. Making sincere dua helps you express your needs, gratitude, and desires to Allah. It strengthens your faith and helps you develop a personal relationship with Allah.',
      instructions: [
        'Find a quiet place to sit comfortably',
        'Raise your hands in supplication',
        'Start with praising Allah and sending blessings on the Prophet',
        'Make your personal dua with sincerity',
        'End with "Ameen" and wipe your face with your hands'
      ]
    },
    {
      id: 'learn_hadith',
      title: t('Learn Hadith'),
      description: t('Learn Hadith Desc'),
      icon: '📚',
      reward: 4,
      category: 'learning',
      details: 'Hadith are the sayings and actions of Prophet Muhammad (PBUH). Learning hadith about prayer and good deeds helps you understand the proper way to worship and live according to Islamic teachings.',
      instructions: [
        'Choose a hadith about prayer or good deeds',
        'Read the hadith and its translation',
        'Understand the context and meaning',
        'Reflect on how to apply it in your life',
        'Share the knowledge with others if possible'
      ]
    },
    {
      id: 'help_others',
      title: t('Help Others'),
      description: t('Help Others Desc'),
      icon: '🤝',
      reward: 7,
      category: 'good_deeds',
      details: 'Helping others with their prayer or Islamic knowledge is a great act of charity. It not only benefits the person you help but also strengthens your own understanding and brings great rewards from Allah.',
      instructions: [
        'Identify someone who needs help with prayer or Islamic knowledge',
        'Approach them with kindness and patience',
        'Share your knowledge in a gentle and respectful way',
        'Be patient and understanding of their level',
        'Encourage them to continue learning and practicing'
      ]
    }
  ];

  // Get translated daily challenges
  const translatedDailyChallenges = getTranslatedDailyChallenges();

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [points, setPoints] = useState(0);
  const [challengeStreak, setChallengeStreak] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = () => {
    const pointsSummary = progressTracker.getPointsSummary();
    setPoints(pointsSummary.total);
    setChallengeStreak(progressTracker.getChallengeStreak());
    setCompletedToday(progressTracker.getCompletedChallengesToday().length);
  };

  const completeChallenge = (challenge) => {
    if (progressTracker.isChallengeCompletedToday(challenge.id)) {
      // Already completed
      const alreadyDiv = document.createElement('div');
      alreadyDiv.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      alreadyDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-2xl">✅</span>
          <div>
            <div class="font-bold">${t('Already Completed')}</div>
            <div class="text-sm">${t('Already Completed Today')}</div>
          </div>
        </div>
      `;
      document.body.appendChild(alreadyDiv);
      setTimeout(() => document.body.removeChild(alreadyDiv), 3000);
      return;
    }

    const success = progressTracker.completeChallenge(
      challenge.id,
      challenge.reward,
      challenge.title
    );

    if (success) {
      // Show success notification
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-2xl">🎉</span>
          <div>
            <div class="font-bold">${t('Challenge Completed')}</div>
            <div class="text-sm">+${challenge.reward} ${t('Points Earned')}</div>
          </div>
        </div>
      `;
      document.body.appendChild(successDiv);
      setTimeout(() => document.body.removeChild(successDiv), 3000);

      // Reload points
      loadPoints();
    }
  };

  const showChallengeDetails = (challenge) => {
    setSelectedChallenge(challenge);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedChallenge(null);
  };

  const getChallengesByCategory = () => {
    const categories = {};
    translatedDailyChallenges.forEach(challenge => {
      if (!categories[challenge.category]) {
        categories[challenge.category] = [];
      }
      categories[challenge.category].push(challenge);
    });
    return categories;
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
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-6 sm:gap-8 py-6 sm:py-8 px-3 sm:px-4">
        {/* Header Section */}
        <div className="w-full text-center mb-6 sm:mb-8">
          <div className="text-3xl sm:text-4xl md:text-5xl font-heading text-white font-bold drop-shadow-2xl mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            {t('Daily Challenges')}
          </div>
          <div className="text-base sm:text-lg text-gray-300 opacity-90 max-w-2xl mx-auto px-2">
            {t('Complete Daily Challenges To Earn Points')}
          </div>
        </div>

        {/* Points Summary */}
        <div className="w-full max-w-4xl">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
              <div className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
                <div className="text-3xl text-emerald-400 font-bold">{points}</div>
                <div className="text-sm text-gray-300">{t('Total Points')}</div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
                <div className="text-3xl text-emerald-400 font-bold">{challengeStreak}</div>
                <div className="text-sm text-gray-300">{t('Challenge Streak')}</div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
                <div className="text-3xl text-emerald-400 font-bold">{completedToday}</div>
                <div className="text-sm text-gray-300">{t('Completed Today')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenges by Category */}
        <div className="w-full max-w-6xl">
          {Object.entries(getChallengesByCategory()).map(([category, challenges]) => {
            // Get translated category name
            const getCategoryName = (cat) => {
              switch (cat) {
                case 'prayer': return t('Prayer Challenges');
                case 'worship': return t('Worship Challenges');
                case 'quran': return t('Quran Challenges');
                case 'learning': return t('Learning Challenges');
                case 'good_deeds': return t('Good Deeds Challenges');
                default: return cat.replace('_', ' ');
              }
            };
            return (
              <div key={category} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{categoryIcons[category]}</span>
                  <h2 className="text-2xl font-heading text-white font-bold capitalize">
                    {getCategoryName(category)}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {challenges.map((challenge) => {
                    const isCompleted = progressTracker.isChallengeCompletedToday(challenge.id);
                    return (
                      <div 
                        key={challenge.id}
                        className={`bg-white/10 backdrop-blur-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/20 rounded-3xl border ${
                          isCompleted 
                            ? 'border-emerald-400/50 bg-emerald-500/20' 
                            : 'border-white/20'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{challenge.icon}</div>
                            <div>
                              <h3 className="text-lg font-bold text-brass">{challenge.title}</h3>
                              <div className="text-sm text-text dark:text-darktext">{challenge.reward} {t('points')}</div>
                            </div>
                          </div>
                          {isCompleted && (
                            <div className="text-2xl text-green-500">✅</div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-text dark:text-darktext mb-4 leading-relaxed">
                          {challenge.description}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <button
                            className="flex-1 px-4 py-2 rounded-lg font-semibold text-sm bg-brass text-white hover:bg-wood hover:scale-102 transition-all duration-300"
                            onClick={() => showChallengeDetails(challenge)}
                          >
                            📋 {t('details')}
                          </button>
                          <button
                            className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                              isCompleted
                                ? 'bg-green-500 text-white cursor-not-allowed'
                                : 'bg-wood text-white hover:scale-102'
                            }`}
                            onClick={() => completeChallenge(challenge)}
                            disabled={isCompleted}
                          >
                            {isCompleted ? `✅ ${t('Completed')}` : `🎯 ${t('Complete')}`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Challenge Details Modal */}
        {showDetails && selectedChallenge && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedChallenge.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-brass">{selectedChallenge.title}</h2>
                    <div className="text-sm text-text dark:text-darktext">{selectedChallenge.reward} {t('points')}</div>
                  </div>
                </div>
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
                  <h3 className="text-xl font-bold text-brass mb-3">📝 {t('description')}</h3>
                  <p className="text-lg leading-relaxed text-text dark:text-darktext">{selectedChallenge.description}</p>
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📖 {t('detailedInformation')}</h3>
                  <p className="text-text dark:text-darktext leading-relaxed">{selectedChallenge.details}</p>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📋 {t('instructions')}</h3>
                  <div className="space-y-2">
                    {selectedChallenge.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                        <span className="text-brass font-bold text-lg mt-1">{index + 1}.</span>
                        <span className="text-text dark:text-darktext leading-relaxed">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete Button */}
                <div className="pt-4">
                  <button
                    className={`w-full px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      progressTracker.isChallengeCompletedToday(selectedChallenge.id)
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-brass text-white hover:bg-wood hover:scale-105'
                    }`}
                    onClick={() => completeChallenge(selectedChallenge)}
                    disabled={progressTracker.isChallengeCompletedToday(selectedChallenge.id)}
                  >
                    {progressTracker.isChallengeCompletedToday(selectedChallenge.id) 
                      ? `✅ ${t('Challenge Completed Today')}` 
                      : `🎯 ${t('Complete Challenge')} (+${selectedChallenge.reward} ${t('Points')})`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 