import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { progressTracker } from '../utils/progressTracker';
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

// Import JSZip for creating zip files
import JSZip from 'jszip';

// Generate a simple calendar for the current month
function getMonthDays(year, month) {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_TIMES = {
  'Fajr': '🌅',
  'Dhuhr': '☀️',
  'Asr': '🌤️',
  'Maghrib': '🌆',
  'Isha': '🌙'
};

// Notes Modal Component
function NotesModal({ isOpen, onClose, dateStr, note, onSave }) {
  const { t } = useTranslation();
  const [noteText, setNoteText] = useState(note || '');

  useEffect(() => {
    setNoteText(note || '');
  }, [note]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        className="bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-blue-400/30 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={transitions.spring}
      >
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white text-center">
          {t('notesFor')} {new Date(dateStr).toLocaleDateString()}
        </h3>
        </div>
        <div className="p-6">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={t('addYourPrayerNotesHere')}
            className="w-full h-32 p-4 border border-white/20 rounded-xl bg-white/5 text-white placeholder-gray-400 resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
        />
        <div className="flex gap-3 mt-6">
            <motion.button
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              onSave(dateStr, noteText);
              onClose();
            }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            {t('save')}
            </motion.button>
            <motion.button
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            {t('cancel')}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Quick Actions Component
function QuickActions({ onMarkAll, onMarkToday, onMarkWeek }) {
  const { t } = useTranslation();
  return (
    <GlowCard className="w-full bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 p-6 rounded-2xl shadow-xl border border-brass/30 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-brass mb-4 flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        {t('quickActions')}
      </h3>
      <div className="flex flex-wrap gap-3">
        <motion.button 
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkToday}
          {...buttonPress}
        >
          {t('markTodayComplete')}
        </motion.button>
        <motion.button 
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkWeek}
          {...buttonPress}
        >
          {t('markThisWeek')}
        </motion.button>
        <motion.button 
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkAll}
          {...buttonPress}
        >
          {t('markAllThisMonth')}
        </motion.button>
      </div>
    </GlowCard>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color, onClick }) {
  return (
    <motion.div
      className={`bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 p-6 rounded-2xl shadow-lg border border-brass/30 cursor-pointer hover:shadow-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 ${onClick ? 'hover:border-brass/50' : ''}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`text-4xl ${color}`}>{icon}</div>
      </div>
    </motion.div>
  );
}

export default function PrayerTrackerScreen() {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [noteDate, setNoteDate] = useState('');
  const [noteText, setNoteText] = useState('');
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard', 'calendar', 'analytics', 'goals'
  const [exportData, setExportData] = useState(null);
  const [prayerGoals, setPrayerGoals] = useState({
    daily: 5,
    weekly: 35,
    monthly: 150
  });
  const [achievements, setAchievements] = useState([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [insights, setInsights] = useState([]);

  // Get current month data
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = getMonthDays(year, month);

  // Get progress data for current month
  const monthProgress = progressTracker.getMonthProgress(year, month + 1);
  const totalPrayers = monthProgress.total;
  const completedPrayers = monthProgress.completed;
  const completionRate = totalPrayers > 0 ? Math.round((completedPrayers / totalPrayers) * 100) : 0;

  // Calculate streak
  const currentStreak = progressTracker.getCurrentStreak();
  const longestStreak = progressTracker.getLongestStreak();

  // Enhanced analytics
  const weeklyProgress = progressTracker.getWeekProgress();
  const monthlyProgress = progressTracker.getMonthProgress(year, month + 1);
  const yearlyProgress = progressTracker.getYearProgress(year);
  
  // Prayer patterns analysis
  const prayerPatterns = {
    bestDay: getBestPrayerDay(),
    worstDay: getWorstPrayerDay(),
    bestPrayer: getBestPrayer(),
    worstPrayer: getWorstPrayer(),
    averageDelay: getAveragePrayerDelay(),
    consistency: getPrayerConsistency()
  };

  // Generate insights
  useEffect(() => {
    generateInsights();
  }, [monthlyProgress, currentStreak]);

  function generateInsights() {
    const newInsights = [];
    
    if (completionRate >= 90) {
      newInsights.push({
        type: 'excellent',
        icon: '🌟',
        title: 'Excellent Consistency!',
        message: `You've maintained ${completionRate}% prayer completion this month. Keep up the great work!`
      });
    } else if (completionRate >= 70) {
      newInsights.push({
        type: 'good',
        icon: '👍',
        title: 'Good Progress',
        message: `You're at ${completionRate}% completion. Try to improve by praying on time consistently.`
      });
    } else {
      newInsights.push({
        type: 'improvement',
        icon: '📈',
        title: 'Room for Improvement',
        message: `You're at ${completionRate}% completion. Consider setting smaller daily goals to build consistency.`
      });
    }

    if (currentStreak >= 7) {
      newInsights.push({
        type: 'streak',
        icon: '🔥',
        title: 'Amazing Streak!',
        message: `You've maintained a ${currentStreak}-day prayer streak! This is wonderful consistency.`
      });
    }

    setInsights(newInsights);
  }

  function getBestPrayerDay() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Implementation for finding best prayer day
    return 'Friday';
  }

  function getWorstPrayerDay() {
    // Implementation for finding worst prayer day
    return 'Monday';
  }

  function getBestPrayer() {
    // Implementation for finding best performed prayer
    return 'Fajr';
  }

  function getWorstPrayer() {
    // Implementation for finding worst performed prayer
    return 'Asr';
  }

  function getAveragePrayerDelay() {
    // Implementation for calculating average delay
    return '15 minutes';
  }

  function getPrayerConsistency() {
    // Implementation for calculating consistency score
    return 85;
  }

  // Handle prayer toggle
  const togglePrayer = (date, prayer) => {
    const dateStr = date.toISOString().split('T')[0];
    progressTracker.togglePrayer(dateStr, prayer);
    // Force re-render
    setCurrentMonth(new Date(currentMonth));
  };

  // Handle note saving
  const saveNote = (dateStr, note) => {
    setNotes(prev => ({
      ...prev,
      [dateStr]: note
    }));
  };

  // Handle note editing
  const editNote = (dateStr) => {
    setNoteDate(dateStr);
    setNoteText(notes[dateStr] || '');
    setShowNotesModal(true);
  };

  // Quick actions
  const markTodayComplete = () => {
    const today = new Date();
    PRAYERS.forEach(prayer => {
      progressTracker.markPrayerComplete(today.toISOString().split('T')[0], prayer);
    });
    setCurrentMonth(new Date(currentMonth));
  };

  const markWeekComplete = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      PRAYERS.forEach(prayer => {
        progressTracker.markPrayerComplete(dateStr, prayer);
      });
    }
    setCurrentMonth(new Date(currentMonth));
  };

  const markMonthComplete = () => {
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      PRAYERS.forEach(prayer => {
        progressTracker.markPrayerComplete(dateStr, prayer);
      });
    });
    setCurrentMonth(new Date(currentMonth));
  };

  // Export data
  const handleExport = async () => {
    try {
      const data = progressTracker.exportData();
      const jsonString = JSON.stringify(data, null, 2);
      
      // Create zip file
      const zip = new JSZip();
      zip.file('prayer-tracker-data.json', jsonString);
      
      // Add notes
      if (Object.keys(notes).length > 0) {
        zip.file('notes.json', JSON.stringify(notes, null, 2));
      }
      
      // Generate and download zip
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prayer-tracker-${year}-${month + 1}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportData({ success: true, message: t('dataExportedSuccessfully') });
    } catch (error) {
      console.error('Export failed:', error);
      setExportData({ success: false, message: t('exportFailed') });
    }
  };

  // Import data
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.prayers) {
        progressTracker.importData(data);
        setCurrentMonth(new Date(currentMonth));
        setExportData({ success: true, message: t('dataImportedSuccessfully') });
      } else {
        setExportData({ success: false, message: t('invalidDataFormat') });
      }
    } catch (error) {
      console.error('Import failed:', error);
      setExportData({ success: false, message: t('importFailed') });
    }
  };

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
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

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12 py-6 sm:py-12 px-3 sm:px-4">
        {/* Header Section */}
        <motion.div 
          className="w-full text-center mb-8 sm:mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="relative">
            <motion.div 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
              variants={pulseAnimation}
              animate="animate"
            >
              📊 {t('prayerTracker')}
            </motion.div>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              {t('trackYourDailyPrayers')}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Navigation Tabs */}
        <motion.div 
          className="w-full max-w-4xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.smooth, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-1 sm:p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2">
              {[
                { id: 'dashboard', icon: '📊', label: 'Dashboard' },
                { id: 'calendar', icon: '📅', label: 'Calendar' },
                { id: 'analytics', icon: '📈', label: 'Analytics' },
                { id: 'goals', icon: '🎯', label: 'Goals' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                    viewMode === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
            </div>
        </motion.div>

        {/* Main Content Based on View Mode */}
        {viewMode === 'dashboard' && (
          <motion.div 
            className="w-full max-w-7xl"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              variants={staggerContainer}
            >
              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl text-center"
                variants={staggerItem}
              >
                <div className="text-4xl mb-3">📊</div>
                <div className="text-3xl font-bold text-white mb-2">{completionRate}%</div>
                <div className="text-gray-300">Completion Rate</div>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl text-center"
                variants={staggerItem}
              >
                <div className="text-4xl mb-3">🔥</div>
                <div className="text-3xl font-bold text-white mb-2">{currentStreak}</div>
                <div className="text-gray-300">Current Streak</div>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl text-center"
                variants={staggerItem}
              >
                <div className="text-4xl mb-3">✅</div>
                <div className="text-3xl font-bold text-white mb-2">{completedPrayers}</div>
                <div className="text-gray-300">Completed Prayers</div>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl text-center"
                variants={staggerItem}
              >
                <div className="text-4xl mb-3">🏆</div>
                <div className="text-3xl font-bold text-white mb-2">{longestStreak}</div>
                <div className="text-gray-300">Best Streak</div>
              </motion.div>
            </motion.div>

            {/* Insights */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              variants={staggerContainer}
            >
              {insights.map((insight, index) => (
                <motion.div 
                  key={index}
                  className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl"
                  variants={staggerItem}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{insight.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{insight.title}</h3>
          </div>
        </div>
                  <p className="text-gray-300 leading-relaxed">{insight.message}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Prayer Patterns */}
            <motion.div 
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl"
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Prayer Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-gray-300 mb-1">Best Day</div>
                  <div className="text-white font-bold">{prayerPatterns.bestDay}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🕌</div>
                  <div className="text-gray-300 mb-1">Best Prayer</div>
                  <div className="text-white font-bold">{prayerPatterns.bestPrayer}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-gray-300 mb-1">Consistency</div>
                  <div className="text-white font-bold">{prayerPatterns.consistency}%</div>
          </div>
        </div>
            </motion.div>
          </motion.div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <motion.div 
            className="w-full max-w-7xl"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Month Navigation */}
            <motion.div 
              className="flex items-center justify-between mb-8"
              variants={staggerItem}
            >
              <motion.button
                onClick={goToPreviousMonth}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Previous
              </motion.button>
              
              <h2 className="text-2xl font-bold text-white">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              
              <motion.button
                onClick={goToNextMonth}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next →
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="mb-8"
              variants={staggerItem}
            >
              <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <motion.button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={markTodayComplete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mark Today Complete
                  </motion.button>
                  <motion.button 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={markWeekComplete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mark This Week
                  </motion.button>
                  <motion.button 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={markMonthComplete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mark All This Month
                  </motion.button>
                      </div>
                    </div>
            </motion.div>
          </motion.div>
        )}

        {/* Analytics View */}
        {viewMode === 'analytics' && (
          <motion.div 
            className="w-full max-w-7xl"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl text-center"
              variants={staggerItem}
            >
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-300 mb-6">Detailed insights and prayer pattern analysis coming soon!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-gray-300">Trend Analysis</div>
                      </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-gray-300">Performance Metrics</div>
                        </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <div className="text-gray-300">Deep Insights</div>
                    </div>
                  </div>
            </motion.div>
          </motion.div>
        )}

        {/* Goals View */}
        {viewMode === 'goals' && (
          <motion.div 
            className="w-full max-w-7xl"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl text-center"
              variants={staggerItem}
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">Prayer Goals</h3>
              <p className="text-gray-300 mb-6">Set and track your prayer goals and achievements!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">📅</div>
                  <div className="text-gray-300">Daily Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="text-gray-300">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎖️</div>
                  <div className="text-gray-300">Badges</div>
              </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Notes Modal */}
      <NotesModal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        dateStr={noteDate}
        note={noteText}
        onSave={saveNote}
      />
    </div>
  );
} 