import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { progressTracker } from '../utils/progressTracker';
import { ToggleLeft } from '../components/ToggleLeft';
import { BaseProgressDemo } from '../components/ProgressTracker';
import { useTranslation } from '../utils/translations';
import authService from '../utils/authService';
import ParticleBackground from '../components/ParticleBackground';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

function getNotesList() {
  try {
    return JSON.parse(localStorage.getItem('learn_notes')) || [];
  } catch { return []; }
}

function getNotesCount() {
  return getNotesList().filter(n => n && n.trim() !== '').length;
}

function setNotesList(notes) {
  localStorage.setItem('learn_notes', JSON.stringify(notes));
}

function getPrayerHistory() {
  try {
    const data = localStorage.getItem('prayer_tracker');
    return data ? JSON.parse(data).marked || {} : {};
  } catch { return {}; }
}

// PDF Export Function
function exportProgressToPDF(progress, achievements, notes, prayerHistory, t) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colors
  const primaryColor = [37, 99, 235]; // Blue
  const secondaryColor = [245, 158, 11]; // Amber
  const textColor = [31, 41, 55]; // Gray-800
  const lightGray = [243, 244, 246]; // Gray-100
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('📊 Islamic Learning Progress Report', 20, 25);
  
  // Date
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - 20, 25, { align: 'right' });
  
  // Reset text color
  doc.setTextColor(...textColor);
  
  let yPosition = 60;
  
  // Overall Progress Section
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Overall Progress', 20, yPosition);
  yPosition += 15;
  
  // Progress bar background
  doc.setFillColor(...lightGray);
  doc.rect(20, yPosition, 150, 8, 'F');
  
  // Progress bar fill
  doc.setFillColor(...secondaryColor);
  const progressWidth = (progress.completionPercentage / 100) * 150;
  doc.rect(20, yPosition, progressWidth, 8, 'F');
  
  yPosition += 20;
  
  // Progress details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Completion: ${progress.completionPercentage}%`, 20, yPosition);
  doc.text(`Current Step: ${progress.currentStep}/8`, 20, yPosition + 10);
  doc.text(`Learning Streak: ${progress.streakDays} days`, 20, yPosition + 20);
  doc.text(`Prayer Streak: ${progress.prayerStreak} days`, 20, yPosition + 30);
  
  yPosition += 50;
  
  // Points and Achievements Section
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Points & Achievements', 20, yPosition);
  yPosition += 15;
  
  // Points table
  const pointsData = [
    ['Total Points', progress.points?.total || 0],
    ['Today\'s Points', progress.points?.today || 0],
    ['This Week', progress.points?.thisWeek || 0],
    ['Challenge Streak', progress.challengeStreak || 0]
  ];
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Category', 'Value']],
    body: pointsData,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 }
  });
  
  yPosition += 60; // Approximate height for the table
  
  // Study Statistics
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Study Statistics', 20, yPosition);
  yPosition += 15;
  
  const studyData = [
    ['Study Hours', `${Math.round(progress.totalStudyTime / 60 * 10) / 10} hours`],
    ['Quizzes Taken', progress.quizStats.totalQuizzes],
    ['Notes Added', getNotesCount()],
    ['Full Prayer Days', progress.prayerFullDays]
  ];
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Metric', 'Value']],
    body: studyData,
    theme: 'grid',
    headStyles: { fillColor: secondaryColor, textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 }
  });
  
  yPosition += 60; // Approximate height for the table
  
  // Prayer History Section
  if (Object.keys(prayerHistory).length > 0) {
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Recent Prayer History', 20, yPosition);
    yPosition += 15;
    
    // Get last 10 prayer entries
    const prayerEntries = Object.entries(prayerHistory)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 10);
    
    const prayerTableData = prayerEntries.map(([date, prayers]) => {
      const prayerStatus = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer, index) => 
        prayers[index] ? '✓' : '✗'
      );
      return [date, ...prayerStatus];
    });
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Date', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']],
      body: prayerTableData,
      theme: 'grid',
      headStyles: { fillColor: primaryColor, textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
      margin: { left: 20, right: 20 }
    });
    
    yPosition += 60; // Approximate height for the table
  }
  
  // Notes Section
  if (notes.length > 0) {
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Notes', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    notes.forEach((note, index) => {
      if (note && note.trim() !== '') {
        const noteText = doc.splitTextToSize(`${index + 1}. ${note}`, pageWidth - 40);
        doc.text(noteText, 20, yPosition);
        yPosition += noteText.length * 5 + 5;
      }
    });
  }
  
  // Footer
  const footerY = pageHeight - 30;
  doc.setFillColor(...lightGray);
  doc.rect(0, footerY, pageWidth, 30, 'F');
  
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Generated by Namaz Web - Your Islamic Learning Companion', 20, footerY + 15);
  doc.text('Keep up the great work in your spiritual journey! 🌟', 20, footerY + 25);
  
  // Save the PDF
  doc.save(`islamic-progress-report-${new Date().toISOString().split('T')[0]}.pdf`);
}

export default function ProgressDashboardScreen() {
  const { t, isRTL } = useTranslation();
  const [progress, setProgress] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  // Prayer history filters
  const [prayerStart, setPrayerStart] = useState('');
  const [prayerEnd, setPrayerEnd] = useState('');
  const [showFullDaysOnly, setShowFullDaysOnly] = useState(false);
  
  // Enhanced user state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStats, setUserStats] = useState({
    totalPrayers: 0,
    totalDuas: 0,
    totalHadith: 0,
    learningStreak: 0,
    prayerStreak: 0,
    totalPoints: 0,
    level: 1,
    joinDate: null,
    lastActive: null,
    weeklyProgress: [],
    monthlyProgress: [],
    achievements: [],
    goals: []
  });
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', target: '', category: 'prayer' });
  const [selectedTimeframe, setSelectedTimeframe] = useState('week'); // week, month, year

  // Authentication effect
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
      loadUserStats(currentUser.uid);
    }

    const handleAuthChange = (user, authenticated) => {
      setIsAuthenticated(authenticated);
      setUser(user);
      if (user) {
        loadUserStats(user.uid);
      }
    };

    authService.addListener(handleAuthChange);

    return () => {
      authService.removeListener(handleAuthChange);
    };
  }, []);

  // Auto-refresh on focus
  useEffect(() => {
    function handleFocus() {
      loadProgress();
      if (user) {
        loadUserStats(user.uid);
      }
    }
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  useEffect(() => {
    loadProgress();
    // Check for new achievements
    const newAchievements = progressTracker.checkAchievements();
    if (newAchievements.length > 0) {
      setShowAchievement(newAchievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
  }, []);

  const loadProgress = () => {
    const summary = progressTracker.getProgressSummary();
    const allAchievements = progressTracker.getAchievements();
    setProgress(summary);
    setAchievements(allAchievements);
  };

  const loadUserStats = (userId) => {
    try {
      // Load user-specific stats from localStorage
      const userStatsKey = `user_stats_${userId}`;
      const savedStats = localStorage.getItem(userStatsKey);
      
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        setUserStats(parsedStats);
      } else {
        // Initialize new user stats
        const newStats = {
          totalPrayers: 0,
          totalDuas: 0,
          totalHadith: 0,
          learningStreak: 0,
          prayerStreak: 0,
          totalPoints: 0,
          level: 1,
          joinDate: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          weeklyProgress: [],
          monthlyProgress: [],
          achievements: [],
          goals: []
        };
        setUserStats(newStats);
        localStorage.setItem(userStatsKey, JSON.stringify(newStats));
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const updateUserStats = (updates) => {
    if (!user) return;
    
    const userStatsKey = `user_stats_${user.uid}`;
    const updatedStats = { ...userStats, ...updates, lastActive: new Date().toISOString() };
    setUserStats(updatedStats);
    localStorage.setItem(userStatsKey, JSON.stringify(updatedStats));
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    
    const goal = {
      id: Date.now(),
      ...newGoal,
      createdAt: new Date().toISOString(),
      completed: false,
      progress: 0
    };
    
    updateUserStats({
      goals: [...userStats.goals, goal]
    });
    
    setNewGoal({ title: '', description: '', target: '', category: 'prayer' });
    setShowGoalsModal(false);
  };

  const completeGoal = (goalId) => {
    const updatedGoals = userStats.goals.map(goal => 
      goal.id === goalId ? { ...goal, completed: true, progress: 100 } : goal
    );
    updateUserStats({ goals: updatedGoals });
  };

  const getLevelFromPoints = (points) => {
    return Math.floor(points / 100) + 1;
  };

  const getPointsToNextLevel = (points) => {
    const currentLevel = getLevelFromPoints(points);
    return (currentLevel * 100) - points;
  };

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-8 px-4">
          <div className="text-lg text-amber-800 dark:text-amber-200">Loading progress...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
        </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <motion.div 
            className="text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          >
            {/* Beautiful Progress Header Section */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -top-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -top-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              
          <div className="relative">
                {/* Progress Title */}
            <motion.div 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-relaxed animate-text-shimmer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
            >
              📊 {t('your Progress')}
            </motion.div>
                
                {/* Subtitle */}
                <motion.p 
                  className="text-xl sm:text-2xl text-emerald-200 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
              Track your learning journey and achievements
                </motion.p>
            </div>
            </motion.div>

            {/* User Info Section */}
            {isAuthenticated && user && (
              <motion.div 
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">{user.name || 'User'}</h3>
                    <p className="text-emerald-300 mb-2">{user.email}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>Level {getLevelFromPoints(userStats.totalPoints)}</span>
                      <span>•</span>
                      <span>{userStats.totalPoints} Points</span>
                      <span>•</span>
                      <span>Member since {new Date(userStats.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-emerald-400">{userStats.totalPoints}</div>
                      <div className="text-sm text-gray-300">Total Points</div>
                      <div className="text-xs text-emerald-300 mt-1">
                        {getPointsToNextLevel(userStats.totalPoints)} to next level
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                onClick={loadProgress}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">🔄</span>
                {t('Refresh')}
              </motion.button>
              
              <motion.button 
                className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                onClick={() => {
                  if (progress) {
                    exportProgressToPDF(progress, achievements, getNotesList(), getPrayerHistory(), t);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">📄</span>
                {t('Export Progress')}
              </motion.button>
              
              {isAuthenticated && (
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                  onClick={() => setShowGoalsModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">🎯</span>
                  Goals
                </motion.button>
              )}
            </motion.div>
          </motion.div>
            </div>
          </div>
      
      {/* Achievement Notification */}
      {showAchievement && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="font-bold">{showAchievement.title}</div>
            <div className="text-sm opacity-90">{showAchievement.description}</div>
          </div>
        </div>
      )}

      {/* Progress Overview Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-6 animate-text-shimmer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Progress Overview
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Track your learning journey and achievements
          </motion.p>
        </motion.div>

        {/* Progress Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Learning Progress Card */}
          <motion.div
            variants={fadeInUp}
            className="group"
          >
            <div className="feature-card group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-20 flex flex-col items-center text-center">
                <div className="card-icon bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                  📚
          </div>
                <h3 className="card-title">Learning Progress</h3>
                <p className="card-description">{progress.completionPercentage}% Complete</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
            <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
                <p className="text-sm text-gray-300 mt-2">Step {progress.currentStep} of 8</p>
          </div>
        </div>
          </motion.div>

          {/* Points Card */}
          <motion.div
            variants={fadeInUp}
            className="group"
          >
            <div className="feature-card group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-20 flex flex-col items-center text-center">
                <div className="card-icon bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
                  🏆
        </div>
                <h3 className="card-title">Points & Achievements</h3>
                <p className="card-description">{progress.points?.total || 0} Total Points</p>
                <div className="text-2xl font-bold text-yellow-400 mt-2">
                  {progress.points?.today || 0}
      </div>
                <p className="text-sm text-gray-300">Today's Points</p>
          </div>
          </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            variants={fadeInUp}
            className="group"
          >
            <div className="feature-card group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-20 flex flex-col items-center text-center">
                <div className="card-icon bg-gradient-to-br from-pink-500 to-red-600 text-white">
                  🔥
          </div>
                <h3 className="card-title">Learning Streak</h3>
                <p className="card-description">Keep it going!</p>
                <div className="text-2xl font-bold text-pink-400 mt-2">
                  {progress.streakDays}
          </div>
                <p className="text-sm text-gray-300">Days in a row</p>
        </div>
            </div>
          </motion.div>
        </motion.div>
            </div>

      {/* Progress Tracker Demo Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-6 animate-text-shimmer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Progress Tracker
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Visual representation of your learning progress
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Learning Statistics */}
            <div className="text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-2xl font-bold text-emerald-400">{progress.completionPercentage}%</div>
              <div className="text-sm text-gray-300">Learning Complete</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress.completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Streak Information */}
            <div className="text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-pink-400">{progress.streakDays}</div>
              <div className="text-sm text-gray-300">Day Streak</div>
              <div className="text-xs text-gray-400 mt-1">Keep it going!</div>
            </div>

            {/* Points Earned */}
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-yellow-400">{progress.points?.total || 0}</div>
              <div className="text-sm text-gray-300">Total Points</div>
              <div className="text-xs text-gray-400 mt-1">Great progress!</div>
            </div>
          </div>
        </motion.div>
      </div>


      {/* Islamic Quote Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.blockquote 
            className="text-2xl md:text-3xl font-medium text-white italic max-w-4xl mx-auto mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            "And whoever does righteous deeds - whether male or female - while being a believer, they will enter Paradise and will not be wronged by even the weight of a speck on a date seed."
          </motion.blockquote>
          <motion.p 
            className="text-lg text-emerald-200"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            - Quran 4:124
          </motion.p>
        </div>
      </div>




      {/* Enhanced User Stats Cards */}
      {isAuthenticated && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🤲</div>
            <div className="text-2xl font-bold text-emerald-400">{userStats.totalPrayers}</div>
            <div className="text-sm text-gray-300">Prayers Completed</div>
            </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📿</div>
            <div className="text-2xl font-bold text-emerald-400">{userStats.totalDuas}</div>
            <div className="text-sm text-gray-300">Duas Recited</div>
            </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-2xl font-bold text-emerald-400">{userStats.totalHadith}</div>
            <div className="text-sm text-gray-300">Hadith Read</div>
            </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-emerald-400">{userStats.learningStreak}</div>
            <div className="text-sm text-gray-300">Day Streak</div>
          </div>
        </motion.div>
      )}

      {/* Goals Section */}
      {isAuthenticated && userStats.goals.length > 0 && (
        <motion.div 
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🎯 Your Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userStats.goals.map((goal) => (
              <div key={goal.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{goal.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    goal.completed ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {goal.completed ? 'Completed' : 'In Progress'}
                  </span>
          </div>
                <p className="text-gray-300 text-sm mb-3">{goal.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-300">{goal.progress}%</span>
                </div>
                {!goal.completed && (
                  <button
                    onClick={() => completeGoal(goal.id)}
                    className="mt-3 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Goals Modal */}
      {showGoalsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Add New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Pray 5 times daily"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Describe your goal..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="prayer">Prayer</option>
                  <option value="learning">Learning</option>
                  <option value="duas">Duas</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addGoal}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all"
                >
                  Add Goal
                </button>
                <button
                  onClick={() => setShowGoalsModal(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reset Progress (for testing) */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Data Management</h2>
        <button
          className="btn w-full"
          onClick={() => {
            if (confirm('This will reset all your progress. Are you sure?')) {
              progressTracker.resetProgress();
              loadProgress();
            }
          }}
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
} 

// NoteItem component for editing/deleting notes
function NoteItem({ note, idx, refresh }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(note);

  function handleSave() {
    const notes = getNotesList();
    notes[idx] = value;
    setNotesList(notes);
    setEditing(false);
    refresh();
  }

  function handleDelete() {
    let notes = getNotesList();
    const wasNotEmpty = notes[idx] && notes[idx].trim() !== '';
    notes[idx] = '';
    setNotesList(notes);
    // Decrement notes count in progressTracker if it was not empty
    if (wasNotEmpty && progressTracker.progress.notesCount > 0) {
      progressTracker.progress.notesCount -= 1;
      progressTracker.saveProgress();
    }
    refresh();
  }

  if (editing) {
    return (
      <li className="flex items-center gap-2 bg-[#f5f5f5] rounded-lg px-3 py-2 mb-1 shadow-sm">
        <textarea
          className="flex-1 rounded border border-gray-300 p-1 text-gray-900"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className="btn text-xs px-2 py-1" onClick={handleSave} title="Save">💾</button>
        <button className="btn text-xs px-2 py-1" onClick={() => setEditing(false)} title="Cancel">✖️</button>
      </li>
    );
  }
  return (
    <li className="flex items-center gap-2 bg-[#f5f5f5] rounded-lg px-3 py-2 mb-1 shadow-sm">
      <span className="flex-1 text-gray-900 dark:text-gray-100">{note}</span>
      <button className="btn text-xs px-2 py-1" onClick={() => setEditing(true)} title="Edit">✏️</button>
      <button className="btn text-xs px-2 py-1" onClick={handleDelete} title="Delete">🗑️</button>
    </li>
  );
}
