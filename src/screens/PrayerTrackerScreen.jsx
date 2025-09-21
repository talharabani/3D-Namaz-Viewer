import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../utils/translations';
import ParticleBackground from '../components/ParticleBackground';
import authService from '../utils/authService';

// Enhanced Prayer Times (mock data - in real app, integrate with prayer times API)
const PRAYER_TIMES = {
  'Fajr': { time: '05:30', icon: '🌅', color: 'from-orange-400 to-yellow-500' },
  'Dhuhr': { time: '12:15', icon: '☀️', color: 'from-yellow-400 to-orange-500' },
  'Asr': { time: '15:45', icon: '🌤️', color: 'from-orange-400 to-red-500' },
  'Maghrib': { time: '18:20', icon: '🌆', color: 'from-red-400 to-pink-500' },
  'Isha': { time: '19:45', icon: '🌙', color: 'from-blue-400 to-purple-500' }
};

const PRAYERS = Object.keys(PRAYER_TIMES);

// Enhanced Progress Tracker
class EnhancedProgressTracker {
  constructor() {
    this.storageKey = 'enhanced_prayer_tracker';
    this.loadData();
  }

  loadData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      this.data = data ? JSON.parse(data) : {
        prayers: {},
        streaks: {},
        achievements: [],
        goals: {},
        statistics: {},
        notes: {}
      };
    } catch (error) {
      console.error('Error loading prayer data:', error);
      this.data = {
        prayers: {},
        streaks: {},
        achievements: [],
        goals: {},
        statistics: {},
        notes: {}
      };
    }
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving prayer data:', error);
    }
  }

  togglePrayer(date, prayer) {
    const dateStr = date.toISOString().split('T')[0];
    if (!this.data.prayers[dateStr]) {
      this.data.prayers[dateStr] = {};
    }
    
    const isCompleted = this.data.prayers[dateStr][prayer];
    this.data.prayers[dateStr][prayer] = !isCompleted;
    
    // Update streaks
    this.updateStreaks(dateStr);
    
    // Check achievements
    this.checkAchievements();
    
    this.saveData();
    return !isCompleted;
  }

  isPrayerCompleted(date, prayer) {
    const dateStr = date.toISOString().split('T')[0];
    return this.data.prayers[dateStr]?.[prayer] || false;
  }

  getDayProgress(date) {
    const dateStr = date.toISOString().split('T')[0];
    const dayPrayers = this.data.prayers[dateStr] || {};
    const completed = Object.values(dayPrayers).filter(Boolean).length;
    return { completed, total: PRAYERS.length, percentage: Math.round((completed / PRAYERS.length) * 100) };
  }

  getMonthProgress(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    let totalPrayers = 0;
    let completedPrayers = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayProgress = this.getDayProgress(date);
      totalPrayers += dayProgress.total;
      completedPrayers += dayProgress.completed;
    }
    
    return {
      total: totalPrayers,
      completed: completedPrayers,
      percentage: totalPrayers > 0 ? Math.round((completedPrayers / totalPrayers) * 100) : 0
    };
  }

  getCurrentStreak() {
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayProgress = this.getDayProgress(date);
      
      if (dayProgress.completed === dayProgress.total && dayProgress.total > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  getLongestStreak() {
    return this.data.streaks.longest || 0;
  }

  updateStreaks(dateStr) {
    const currentStreak = this.getCurrentStreak();
    if (currentStreak > (this.data.streaks.longest || 0)) {
      this.data.streaks.longest = currentStreak;
    }
    this.data.streaks.current = currentStreak;
  }

  checkAchievements() {
    const achievements = this.data.achievements || [];
    const currentStreak = this.getCurrentStreak();
    const monthProgress = this.getMonthProgress(new Date().getFullYear(), new Date().getMonth() + 1);
    
    // First Prayer Achievement
    if (!achievements.includes('first_prayer')) {
      const totalCompleted = Object.values(this.data.prayers).reduce((sum, day) => 
        sum + Object.values(day).filter(Boolean).length, 0
      );
      if (totalCompleted >= 1) {
        achievements.push('first_prayer');
      }
    }
    
    // 7 Day Streak
    if (!achievements.includes('week_streak') && currentStreak >= 7) {
      achievements.push('week_streak');
    }
    
    // 30 Day Streak
    if (!achievements.includes('month_streak') && currentStreak >= 30) {
      achievements.push('month_streak');
    }
    
    // Perfect Month
    if (!achievements.includes('perfect_month') && monthProgress.percentage === 100) {
      achievements.push('perfect_month');
    }
    
    this.data.achievements = achievements;
  }

  getStatistics() {
    const totalDays = Object.keys(this.data.prayers).length;
    const totalPrayers = totalDays * PRAYERS.length;
    const completedPrayers = Object.values(this.data.prayers).reduce((sum, day) => 
      sum + Object.values(day).filter(Boolean).length, 0
    );
    
    return {
      totalDays,
      totalPrayers,
      completedPrayers,
      completionRate: totalPrayers > 0 ? Math.round((completedPrayers / totalPrayers) * 100) : 0,
      currentStreak: this.getCurrentStreak(),
      longestStreak: this.getLongestStreak(),
      achievements: this.data.achievements.length
    };
  }

  setGoal(type, value) {
    this.data.goals[type] = value;
    this.saveData();
  }

  getGoal(type) {
    return this.data.goals[type] || 0;
  }

  addNote(date, note) {
    const dateStr = date.toISOString().split('T')[0];
    this.data.notes[dateStr] = note;
    this.saveData();
  }

  getNote(date) {
    const dateStr = date.toISOString().split('T')[0];
    return this.data.notes[dateStr] || '';
  }
}

// Initialize progress tracker
const progressTracker = new EnhancedProgressTracker();

// Prayer Card Component
function PrayerCard({ prayer, time, icon, color, isCompleted, onToggle, isNext }) {
  const { t } = useTranslation();

  return (
      <motion.div 
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
        isCompleted 
          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-lg shadow-green-500/20' 
          : 'bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40'
      } ${isNext ? 'ring-2 ring-yellow-400/50 shadow-lg shadow-yellow-400/20' : ''}`}
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isNext && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold animate-pulse">
          !
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`text-3xl p-3 rounded-xl bg-gradient-to-r ${color}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{prayer}</h3>
            <p className="text-gray-300">{time}</p>
          </div>
        </div>
        
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
          isCompleted 
            ? 'bg-green-500 border-green-500' 
            : 'border-white/40 hover:border-white/60'
        }`}>
          {isCompleted && <span className="text-white text-lg">✓</span>}
        </div>
      </div>
      
      <div className="text-center">
        <div className={`text-sm font-medium ${
          isCompleted ? 'text-green-300' : 'text-gray-400'
        }`}>
          {isCompleted ? 'Completed' : 'Tap to mark complete'}
        </div>
      </div>
    </motion.div>
  );
}

// Statistics Card Component
function StatCard({ title, value, icon, color, subtitle, onClick }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/15 transition-all duration-300"
      onClick={onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
      <div className={`text-4xl mb-3 ${color}`}>{icon}</div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-300 text-sm mb-1">{title}</div>
      {subtitle && <div className="text-gray-400 text-xs">{subtitle}</div>}
      </motion.div>
  );
}

// Achievement Modal Component
function AchievementModal({ isOpen, onClose, achievement }) {
  if (!isOpen || !achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-white mb-4">Achievement Unlocked!</h3>
          <div className="text-xl text-yellow-300 mb-4">{achievement.title}</div>
          <div className="text-gray-300 mb-6">{achievement.description}</div>
        <motion.button 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Awesome!
        </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Goals Modal Component
function GoalsModal({ isOpen, onClose, goals, onUpdate }) {
  const [localGoals, setLocalGoals] = useState(goals);

  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const handleSave = () => {
    onUpdate(localGoals);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
    <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-md w-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Set Your Goals</h3>
          
          <div className="space-y-6">
        <div>
              <label className="block text-white mb-2">Daily Prayer Goal</label>
              <input
                type="number"
                min="1"
                max="5"
                value={localGoals.daily}
                onChange={(e) => setLocalGoals({...localGoals, daily: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
        </div>
            
            <div>
              <label className="block text-white mb-2">Weekly Streak Goal</label>
              <input
                type="number"
                min="1"
                max="7"
                value={localGoals.weekly}
                onChange={(e) => setLocalGoals({...localGoals, weekly: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Monthly Completion %</label>
              <input
                type="number"
                min="50"
                max="100"
                value={localGoals.monthly}
                onChange={(e) => setLocalGoals({...localGoals, monthly: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <motion.button
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Goals
            </motion.button>
            <motion.button
              className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-all duration-300"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
      </div>
    </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PrayerTrackerScreen() {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('today'); // 'today', 'calendar', 'analytics', 'goals'
  const [showAchievement, setShowAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [goals, setGoals] = useState({
    daily: 5,
    weekly: 7,
    monthly: 90
  });
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
    }

    const handleAuthChange = (user, authenticated) => {
      setIsAuthenticated(authenticated);
      setUser(user);
    };

    authService.addListener(handleAuthChange);

    return () => {
      authService.removeListener(handleAuthChange);
    };
  }, []);

  // Load goals
  useEffect(() => {
    const savedGoals = {
      daily: progressTracker.getGoal('daily') || 5,
      weekly: progressTracker.getGoal('weekly') || 7,
      monthly: progressTracker.getGoal('monthly') || 90
    };
    setGoals(savedGoals);
  }, []);

  // Get current prayer times and next prayer
  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const getNextPrayer = () => {
    const currentTime = getCurrentTime();
    const prayerTimes = Object.entries(PRAYER_TIMES);
    
    for (const [prayer, data] of prayerTimes) {
      const [hours, minutes] = data.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      
      if (prayerTime > currentTime) {
        return { prayer, ...data };
      }
    }
    
    // If no prayer found for today, return first prayer of next day
    return { prayer: 'Fajr', ...PRAYER_TIMES['Fajr'] };
  };

  const nextPrayer = getNextPrayer();

  // Get today's progress
  const todayProgress = progressTracker.getDayProgress(currentDate);
  const statistics = progressTracker.getStatistics();

  // Handle prayer toggle
  const togglePrayer = (prayer) => {
    const wasCompleted = progressTracker.togglePrayer(currentDate, prayer);
    
    // Check for achievements
    const achievements = progressTracker.data.achievements;
    const newAchievements = achievements.filter(achievement => 
      !statistics.achievements || !statistics.achievements.includes(achievement)
    );
    
    if (newAchievements.length > 0) {
      const achievement = newAchievements[0];
      const achievementData = {
        first_prayer: { title: 'First Prayer!', description: 'You completed your first prayer. May Allah accept it!' },
        week_streak: { title: 'Week Warrior!', description: 'Amazing! You maintained a 7-day prayer streak!' },
        month_streak: { title: 'Month Master!', description: 'Incredible! You maintained a 30-day prayer streak!' },
        perfect_month: { title: 'Perfect Month!', description: 'Outstanding! You completed all prayers for an entire month!' }
      };
      
      setNewAchievement(achievementData[achievement]);
      setShowAchievement(true);
    }
  };

  // Update goals
  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    progressTracker.setGoal('daily', newGoals.daily);
    progressTracker.setGoal('weekly', newGoals.weekly);
    progressTracker.setGoal('monthly', newGoals.monthly);
  };

  // Calendar navigation
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-6xl animate-bounce">🤲</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent animate-text-shimmer">
                Prayer Tracker
              </h1>
              <p className="text-gray-300 text-lg">Track your daily prayers and spiritual journey</p>
            </div>
          </div>
        </motion.div>

        {/* User Info */}
        {isAuthenticated && user && (
            <motion.div 
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{user.name || 'User'}</h3>
                <p className="text-emerald-300">Keep up your spiritual journey!</p>
            </div>
          </div>
        </motion.div>
        )}

        {/* Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2">
            <div className="flex gap-2">
              {[
                { id: 'today', label: 'Today', icon: '📅' },
                { id: 'calendar', label: 'Calendar', icon: '📆' },
                { id: 'analytics', label: 'Analytics', icon: '📊' },
                { id: 'goals', label: 'Goals', icon: '🎯' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    viewMode === tab.id
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
            </div>
        </motion.div>

        {/* Today's View */}
        {viewMode === 'today' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Today's Progress"
                value={`${todayProgress.completed}/${todayProgress.total}`}
                icon="📈"
                color="text-emerald-400"
                subtitle={`${todayProgress.percentage}% Complete`}
              />
              <StatCard
                title="Current Streak"
                value={statistics.currentStreak}
                icon="🔥"
                color="text-orange-400"
                subtitle="Days in a row"
              />
              <StatCard
                title="Best Streak"
                value={statistics.longestStreak}
                icon="🏆"
                color="text-yellow-400"
                subtitle="Personal best"
              />
              <StatCard
                title="Achievements"
                value={statistics.achievements}
                icon="🎖️"
                color="text-purple-400"
                subtitle="Unlocked badges"
              />
            </div>

            {/* Next Prayer Alert */}
              <motion.div 
              className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{nextPrayer.icon}</div>
                    <div>
                  <h3 className="text-2xl font-bold text-white">Next Prayer: {nextPrayer.prayer}</h3>
                  <p className="text-yellow-300 text-lg">at {nextPrayer.time}</p>
          </div>
        </div>
            </motion.div>

            {/* Prayer Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(PRAYER_TIMES).map(([prayer, data]) => (
                <PrayerCard
                  key={prayer}
                  prayer={prayer}
                  time={data.time}
                  icon={data.icon}
                  color={data.color}
                  isCompleted={progressTracker.isPrayerCompleted(currentDate, prayer)}
                  isNext={nextPrayer.prayer === prayer}
                  onToggle={() => togglePrayer(prayer)}
                />
              ))}
        </div>
          </motion.div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-8">
              <motion.button
                onClick={goToPreviousDay}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Previous
              </motion.button>
              
              <h2 className="text-2xl font-bold text-white">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              
              <motion.button
                onClick={goToNextDay}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next →
              </motion.button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-gray-300 font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {getCalendarDays().map((day, index) => {
                  if (!day) return <div key={index} className="h-12"></div>;
                  
                  const dayProgress = progressTracker.getDayProgress(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = day.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <motion.div
                      key={day.toISOString()}
                      className={`h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        isToday 
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold' 
                          : isSelected
                          ? 'bg-white/20 text-white'
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                      onClick={() => setSelectedDate(day)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium">{day.getDate()}</div>
                        {dayProgress.completed > 0 && (
                          <div className="text-xs">
                            {dayProgress.completed}/{dayProgress.total}
                          </div>
                        )}
                      </div>
            </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Details */}
            <motion.div 
              className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(PRAYER_TIMES).map(([prayer, data]) => (
                  <div
                    key={prayer}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      progressTracker.isPrayerCompleted(selectedDate, prayer)
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50'
                        : 'bg-white/5 border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl p-2 rounded-lg bg-gradient-to-r ${data.color}`}>
                        {data.icon}
                      </div>
                      <div>
                        <div className="text-white font-bold">{prayer}</div>
                        <div className="text-gray-300 text-sm">{data.time}</div>
                      </div>
                      <div className="ml-auto">
                        {progressTracker.isPrayerCompleted(selectedDate, prayer) ? (
                          <span className="text-green-400 text-xl">✓</span>
                        ) : (
                          <span className="text-gray-400 text-xl">○</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                    </div>
            </motion.div>
          </motion.div>
        )}

        {/* Analytics View */}
        {viewMode === 'analytics' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Prayers"
                value={statistics.completedPrayers}
                icon="🤲"
                color="text-emerald-400"
                subtitle="All time"
              />
              <StatCard
                title="Completion Rate"
                value={`${statistics.completionRate}%`}
                icon="📊"
                color="text-blue-400"
                subtitle="Overall"
              />
              <StatCard
                title="Active Days"
                value={statistics.totalDays}
                icon="📅"
                color="text-purple-400"
                subtitle="Days tracked"
              />
              <StatCard
                title="Achievements"
                value={statistics.achievements}
                icon="🏆"
                color="text-yellow-400"
                subtitle="Unlocked"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-3xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-300 text-lg mb-6">
                Detailed prayer pattern analysis and insights coming soon!
              </p>
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
                  </div>
          </motion.div>
        )}

        {/* Goals View */}
        {viewMode === 'goals' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Daily Goal"
                value={`${goals.daily}/5`}
                icon="📅"
                color="text-emerald-400"
                subtitle="Prayers per day"
                onClick={() => setShowGoalsModal(true)}
              />
              <StatCard
                title="Weekly Goal"
                value={`${goals.weekly}/7`}
                icon="📆"
                color="text-blue-400"
                subtitle="Days per week"
                onClick={() => setShowGoalsModal(true)}
              />
              <StatCard
                title="Monthly Goal"
                value={`${goals.monthly}%`}
                icon="🎯"
                color="text-purple-400"
                subtitle="Completion rate"
                onClick={() => setShowGoalsModal(true)}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold text-white mb-4">Set Your Goals</h3>
              <p className="text-gray-300 text-lg mb-6">
                Define your prayer goals and track your progress towards spiritual growth!
              </p>
              <motion.button
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
                onClick={() => setShowGoalsModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Set Goals
              </motion.button>
                </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <AchievementModal
        isOpen={showAchievement}
        onClose={() => setShowAchievement(false)}
        achievement={newAchievement}
      />

      <GoalsModal
        isOpen={showGoalsModal}
        onClose={() => setShowGoalsModal(false)}
        goals={goals}
        onUpdate={updateGoals}
      />
    </div>
  );
} 