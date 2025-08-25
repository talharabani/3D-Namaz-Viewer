// Progress tracking utilities for the Namaz app
import authService from './authService';

const PROGRESS_KEYS = {
  LEARN_PROGRESS: 'learn_progress',
  QUIZ_SCORES: 'quiz_scores',
  PRAYER_STREAK: 'prayer_streak',
  COMPLETED_LESSONS: 'completed_lessons',
  STUDY_TIME: 'study_time',
  NOTES_COUNT: 'notes_count',
  PRAYER_TRACKER: 'prayer_tracker', // NEW: for daily prayer tracking
  DAILY_CHALLENGES: 'daily_challenges', // NEW: for daily challenge tracking
  POINTS: 'points', // NEW: for points system
};

export class ProgressTracker {
  constructor() {
    this.progress = this.loadProgress();
    this.prayerData = this.loadPrayerData(); // NEW
    this.challenges = this.loadChallenges(); // NEW
    this.points = this.loadPoints(); // NEW
    this.loadUserData(); // Load data from authentication service
  }

  // Load data from authentication service if user is logged in
  loadUserData() {
    const user = authService.getCurrentUser();
    if (user && user.progress) {
      // Merge user progress with local progress
      this.progress = { ...this.progress, ...user.progress };
      this.prayerData = { ...this.prayerData, ...user.prayerData };
      this.challenges = { ...this.challenges, ...user.challenges };
      this.points = { ...this.points, ...user.points };
      this.saveAllData(); // Save merged data
    }
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(PROGRESS_KEYS.LEARN_PROGRESS);
      return saved ? JSON.parse(saved) : this.getDefaultProgress();
    } catch (error) {
      console.error('Error loading progress:', error);
      return this.getDefaultProgress();
    }
  }

  getDefaultProgress() {
    return {
      completedSteps: [],
      currentStep: 0,
      totalStudyTime: 0,
      lastStudyDate: null,
      quizScores: [],
      averageScore: 0,
      streakDays: 0,
      lastCompletedDate: null,
      notesCount: 0,
      achievements: []
    };
  }

  loadPrayerData() {
    try {
      const saved = localStorage.getItem(PROGRESS_KEYS.PRAYER_TRACKER);
      return saved ? JSON.parse(saved) : this.getDefaultPrayerData();
    } catch (error) {
      console.error('Error loading prayer data:', error);
      return this.getDefaultPrayerData();
    }
  }

  getDefaultPrayerData() {
    return {
      marked: {}, // { 'YYYY-MM-DD': [true, true, ...] }
      fullDays: 0,
      streak: 0,
      lastFullDay: null
    };
  }

  // NEW: Load challenges data
  loadChallenges() {
    try {
      const saved = localStorage.getItem(PROGRESS_KEYS.DAILY_CHALLENGES);
      return saved ? JSON.parse(saved) : this.getDefaultChallenges();
    } catch (error) {
      console.error('Error loading challenges:', error);
      return this.getDefaultChallenges();
    }
  }

  getDefaultChallenges() {
    return {
      completed: {}, // { 'YYYY-MM-DD': [challengeId1, challengeId2, ...] }
      streak: 0,
      lastCompletedDate: null
    };
  }

  // NEW: Load points data
  loadPoints() {
    try {
      const saved = localStorage.getItem(PROGRESS_KEYS.POINTS);
      return saved ? JSON.parse(saved) : this.getDefaultPoints();
    } catch (error) {
      console.error('Error loading points:', error);
      return this.getDefaultPoints();
    }
  }

  getDefaultPoints() {
    return {
      total: 0,
      history: [], // [{ date: 'YYYY-MM-DD', points: 10, source: 'challenge', description: 'Pray Tahajjud' }]
      lastUpdated: null
    };
  }

  saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEYS.LEARN_PROGRESS, JSON.stringify(this.progress));
      this.saveToAuthService();
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  savePrayerData() {
    try {
      localStorage.setItem(PROGRESS_KEYS.PRAYER_TRACKER, JSON.stringify(this.prayerData));
      this.saveToAuthService();
    } catch (error) {
      console.error('Error saving prayer data:', error);
    }
  }

  // NEW: Save challenges data
  saveChallenges() {
    try {
      localStorage.setItem(PROGRESS_KEYS.DAILY_CHALLENGES, JSON.stringify(this.challenges));
      this.saveToAuthService();
    } catch (error) {
      console.error('Error saving challenges:', error);
    }
  }

  // NEW: Save points data
  savePoints() {
    try {
      localStorage.setItem(PROGRESS_KEYS.POINTS, JSON.stringify(this.points));
      this.saveToAuthService();
    } catch (error) {
      console.error('Error saving points:', error);
    }
  }

  // Save all data to authentication service
  async saveToAuthService() {
    try {
      const user = authService.getCurrentUser();
      if (user) {
        await authService.updateUserProgress({
          progress: this.progress,
          prayerData: this.prayerData,
          challenges: this.challenges,
          points: this.points
        });
      }
    } catch (error) {
      console.error('Error saving to auth service:', error);
    }
  }

  // Save all data to both localStorage and auth service
  async saveAllData() {
    this.saveProgress();
    this.savePrayerData();
    this.saveChallenges();
    this.savePoints();
  }

  // Step completion tracking
  completeStep(stepIndex) {
    if (!this.progress.completedSteps.includes(stepIndex)) {
      this.progress.completedSteps.push(stepIndex);
      this.progress.currentStep = Math.max(this.progress.currentStep, stepIndex + 1);
      this.updateStreak();
      this.saveProgress();
    }
  }

  isStepCompleted(stepIndex) {
    return this.progress.completedSteps.includes(stepIndex);
  }

  getCurrentStep() {
    return this.progress.currentStep;
  }

  getCompletionPercentage() {
    const totalSteps = 8; // Total prayer steps
    return Math.round((this.progress.completedSteps.length / totalSteps) * 100);
  }

  // Quiz tracking
  addQuizScore(score, totalQuestions) {
    const percentage = Math.round((score / totalQuestions) * 100);
    this.progress.quizScores.push({
      score,
      totalQuestions,
      percentage,
      date: new Date().toISOString()
    });
    
    // Calculate average score
    const totalPercentage = this.progress.quizScores.reduce((sum, quiz) => sum + quiz.percentage, 0);
    this.progress.averageScore = Math.round(totalPercentage / this.progress.quizScores.length);
    
    this.saveProgress();
  }

  getQuizStats() {
    return {
      totalQuizzes: this.progress.quizScores.length,
      averageScore: this.progress.averageScore,
      bestScore: Math.max(...this.progress.quizScores.map(q => q.percentage), 0),
      recentScores: this.progress.quizScores.slice(-5) // Last 5 quizzes
    };
  }

  // Study time tracking
  addStudyTime(minutes) {
    this.progress.totalStudyTime += minutes;
    this.progress.lastStudyDate = new Date().toISOString();
    this.saveProgress();
  }

  getStudyStats() {
    return {
      totalMinutes: this.progress.totalStudyTime,
      totalHours: Math.round(this.progress.totalStudyTime / 60 * 10) / 10,
      lastStudyDate: this.progress.lastStudyDate
    };
  }

  // Streak tracking
  updateStreak() {
    const today = new Date().toDateString();
    const lastDate = this.progress.lastCompletedDate ? new Date(this.progress.lastCompletedDate).toDateString() : null;
    
    if (lastDate === today) {
      // Already completed today
      return;
    }
    
    if (lastDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
      // Consecutive day
      this.progress.streakDays++;
    } else if (lastDate !== today) {
      // Break in streak
      this.progress.streakDays = 1;
    } else {
      // First time
      this.progress.streakDays = 1;
    }
    
    this.progress.lastCompletedDate = new Date().toISOString();
  }

  getStreak() {
    return this.progress.streakDays;
  }

  // Notes tracking
  addNote() {
    this.progress.notesCount++;
    this.saveProgress();
  }

  getNotesCount() {
    return this.progress.notesCount;
  }

  // Achievements
  checkAchievements() {
    const newAchievements = [];
    
    // First step completed
    if (this.progress.completedSteps.length >= 1 && !this.hasAchievement('first_step')) {
      newAchievements.push({
        id: 'first_step',
        title: 'First Step',
        description: 'Completed your first prayer step',
        date: new Date().toISOString()
      });
    }
    
    // All steps completed
    if (this.progress.completedSteps.length >= 8 && !this.hasAchievement('all_steps')) {
      newAchievements.push({
        id: 'all_steps',
        title: 'Prayer Master',
        description: 'Completed all prayer steps',
        date: new Date().toISOString()
      });
    }
    
    // Quiz master
    if (this.progress.quizScores.length >= 5 && this.progress.averageScore >= 80 && !this.hasAchievement('quiz_master')) {
      newAchievements.push({
        id: 'quiz_master',
        title: 'Quiz Master',
        description: 'Scored 80%+ on 5 quizzes',
        date: new Date().toISOString()
      });
    }
    
    // Study streak
    if (this.progress.streakDays >= 7 && !this.hasAchievement('week_streak')) {
      newAchievements.push({
        id: 'week_streak',
        title: 'Dedicated Learner',
        description: '7-day study streak',
        date: new Date().toISOString()
      });
    }
    
    // NEW: 3-day streak
    if (this.progress.streakDays >= 3 && !this.hasAchievement('three_day_streak')) {
      newAchievements.push({
        id: 'three_day_streak',
        title: '3-Day Streak',
        description: 'Completed a 3-day learning streak',
        date: new Date().toISOString()
      });
    }
    
    // NEW: 10 notes
    if (this.progress.notesCount >= 10 && !this.hasAchievement('ten_notes')) {
      newAchievements.push({
        id: 'ten_notes',
        title: 'Note Taker',
        description: 'Added 10 notes while learning',
        date: new Date().toISOString()
      });
    }
    
    // NEW: Quiz perfectionist (100% score)
    if (this.progress.quizScores.some(q => q.percentage === 100) && !this.hasAchievement('quiz_perfectionist')) {
      newAchievements.push({
        id: 'quiz_perfectionist',
        title: 'Quiz Perfectionist',
        description: 'Scored 100% on a quiz',
        date: new Date().toISOString()
      });
    }
    
    // NEW: Perfect month (all prayers for a month)
    if (this.prayerData) {
      const marked = this.prayerData.marked || {};
      const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const PRAYER_COUNT = PRAYERS.length;
      const months = {};
      Object.keys(marked).forEach(dateStr => {
        const [year, month] = dateStr.split('-');
        const key = `${year}-${month}`;
        if (!months[key]) months[key] = [];
        months[key].push(marked[dateStr]);
      });
      for (const key in months) {
        const days = months[key];
        // Assume 28 days minimum for a perfect month
        if (days.length >= 28 && days.every(arr => arr.length === PRAYER_COUNT && arr.every(Boolean))) {
          if (!this.hasAchievement('perfect_month_' + key)) {
            newAchievements.push({
              id: 'perfect_month_' + key,
              title: 'Perfect Month',
              description: `Completed all ${PRAYER_COUNT} prayers every day in ${key}`,
              date: new Date().toISOString()
            });
          }
        }
      }
    }
    
    // Add new achievements
    this.progress.achievements.push(...newAchievements);
    this.saveProgress();
    
    return newAchievements;
  }

  hasAchievement(achievementId) {
    return this.progress.achievements.some(a => a.id === achievementId);
  }

  getAchievements() {
    return this.progress.achievements;
  }

  // Call this when a day's prayers are updated
  updatePrayerDay(dateStr, prayersArray) {
    this.prayerData.marked[dateStr] = prayersArray;
    // Recalculate fullDays and streak
    const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const PRAYER_COUNT = PRAYERS.length;
    let fullDays = 0;
    let streak = 0;
    let lastFullDay = null;
    const sortedDates = Object.keys(this.prayerData.marked).sort();
    for (const d of sortedDates) {
      if (this.prayerData.marked[d].length === PRAYER_COUNT && this.prayerData.marked[d].every(Boolean)) {
        fullDays++;
        if (!lastFullDay || (new Date(d) - new Date(lastFullDay) === 24*60*60*1000)) {
          streak++;
        } else {
          streak = 1;
        }
        lastFullDay = d;
      }
    }
    this.prayerData.fullDays = fullDays;
    this.prayerData.streak = streak;
    this.prayerData.lastFullDay = lastFullDay;
    this.savePrayerData();
  }

  getPrayerStats() {
    return {
      fullDays: this.prayerData.fullDays,
      streak: this.prayerData.streak,
    };
  }

  // NEW: Add points to user's total
  addPoints(points, source, description = '') {
    this.points.total += points;
    this.points.history.push({
      date: new Date().toISOString().split('T')[0],
      points: points,
      source: source,
      description: description
    });
    this.points.lastUpdated = new Date().toISOString();
    this.savePoints();
  }

  // NEW: Get total points
  getTotalPoints() {
    return this.points.total;
  }

  // NEW: Get points history
  getPointsHistory() {
    return this.points.history;
  }

  // NEW: Complete a daily challenge
  completeChallenge(challengeId, points, description) {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already completed today
    if (!this.challenges.completed[today]) {
      this.challenges.completed[today] = [];
    }
    
    if (!this.challenges.completed[today].includes(challengeId)) {
      this.challenges.completed[today].push(challengeId);
      this.addPoints(points, 'challenge', description);
      this.updateChallengeStreak();
      this.saveChallenges();
      return true;
    }
    
    return false; // Already completed
  }

  // NEW: Check if challenge is completed today
  isChallengeCompletedToday(challengeId) {
    const today = new Date().toISOString().split('T')[0];
    return this.challenges.completed[today] && this.challenges.completed[today].includes(challengeId);
  }

  // NEW: Get completed challenges for today
  getCompletedChallengesToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.challenges.completed[today] || [];
  }

  // NEW: Update challenge streak
  updateChallengeStreak() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (this.challenges.lastCompletedDate === yesterday || this.challenges.lastCompletedDate === today) {
      this.challenges.streak++;
    } else if (this.challenges.lastCompletedDate !== today) {
      this.challenges.streak = 1;
    }
    
    this.challenges.lastCompletedDate = today;
  }

  // NEW: Get challenge streak
  getChallengeStreak() {
    return this.challenges.streak;
  }

  // NEW: Get points summary for progress screen
  getPointsSummary() {
    return {
      total: this.points.total,
      today: this.getTodayPoints(),
      thisWeek: this.getThisWeekPoints(),
      thisMonth: this.getThisMonthPoints()
    };
  }

  // NEW: Get today's points
  getTodayPoints() {
    const today = new Date().toISOString().split('T')[0];
    return this.points.history
      .filter(entry => entry.date === today)
      .reduce((sum, entry) => sum + entry.points, 0);
  }

  // NEW: Get this week's points
  getThisWeekPoints() {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return this.points.history
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekAgo && entryDate <= today;
      })
      .reduce((sum, entry) => sum + entry.points, 0);
  }

  // NEW: Get this month's points
  getThisMonthPoints() {
    const today = new Date();
    const monthAgo = new Date(today.getFullYear(), today.getMonth(), 1);
    
    return this.points.history
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= monthAgo && entryDate <= today;
      })
      .reduce((sum, entry) => sum + entry.points, 0);
  }

  // NEW: Get month progress for prayer tracking
  getMonthProgress(year, month) {
    const marked = this.prayerData.marked || {};
    const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const PRAYER_COUNT = PRAYERS.length;
    
    let total = 0;
    let completed = 0;
    
    // Get all days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const prayers = marked[dateStr];
      
      if (prayers && Array.isArray(prayers)) {
        total += PRAYER_COUNT;
        completed += prayers.filter(Boolean).length;
      } else {
        total += PRAYER_COUNT; // Count as total even if not marked
      }
    }
    
    return { total, completed };
  }

  // NEW: Get current streak
  getCurrentStreak() {
    return this.prayerData.streak || 0;
  }

  // NEW: Get longest streak (calculate from history)
  getLongestStreak() {
    const marked = this.prayerData.marked || {};
    const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const PRAYER_COUNT = PRAYERS.length;
    let longestStreak = 0;
    let currentStreak = 0;
    
    const sortedDates = Object.keys(marked).sort();
    
    for (const dateStr of sortedDates) {
      const prayers = marked[dateStr];
      if (prayers && Array.isArray(prayers) && prayers.length === PRAYER_COUNT && prayers.every(Boolean)) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return longestStreak;
  }

  // NEW: Toggle prayer completion
  togglePrayer(dateStr, prayer) {
    if (!this.prayerData.marked[dateStr]) {
      this.prayerData.marked[dateStr] = [false, false, false, false, false];
    }
    
    const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const prayerIndex = PRAYERS.indexOf(prayer);
    if (prayerIndex !== -1) {
      this.prayerData.marked[dateStr][prayerIndex] = !this.prayerData.marked[dateStr][prayerIndex];
      this.updatePrayerDay(dateStr, this.prayerData.marked[dateStr]);
    }
  }

  // NEW: Mark prayer as complete
  markPrayerComplete(dateStr, prayer) {
    if (!this.prayerData.marked[dateStr]) {
      this.prayerData.marked[dateStr] = [false, false, false, false, false];
    }
    
    const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const prayerIndex = PRAYERS.indexOf(prayer);
    if (prayerIndex !== -1) {
      this.prayerData.marked[dateStr][prayerIndex] = true;
      this.updatePrayerDay(dateStr, this.prayerData.marked[dateStr]);
    }
  }

  // NEW: Export all data
  exportData() {
    return {
      progress: this.progress,
      prayerData: this.prayerData,
      challenges: this.challenges,
      points: this.points,
      exportDate: new Date().toISOString()
    };
  }

  // NEW: Import data
  importData(data) {
    try {
      if (data.progress) {
        this.progress = { ...this.getDefaultProgress(), ...data.progress };
        this.saveProgress();
      }
      if (data.prayerData) {
        this.prayerData = { ...this.getDefaultPrayerData(), ...data.prayerData };
        this.savePrayerData();
      }
      if (data.challenges) {
        this.challenges = { ...this.getDefaultChallenges(), ...data.challenges };
        this.saveChallenges();
      }
      if (data.points) {
        this.points = { ...this.getDefaultPoints(), ...data.points };
        this.savePoints();
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // NEW: Get day progress
  getDayProgress(dateStr) {
    const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const prayers = this.prayerData.marked[dateStr] || [false, false, false, false, false];
    
    const result = {};
    PRAYERS.forEach((prayer, index) => {
      result[prayer] = prayers[index] || false;
    });
    
    return result;
  }

  // Overall progress summary
  getProgressSummary() {
    const prayerStats = this.getPrayerStats();
    const pointsSummary = this.getPointsSummary();
    return {
      completionPercentage: this.getCompletionPercentage(),
      currentStep: this.getCurrentStep(),
      streakDays: this.getStreak(),
      totalStudyTime: this.progress.totalStudyTime,
      quizStats: this.getQuizStats(),
      achievements: this.progress.achievements.length,
      notesCount: this.progress.notesCount,
      prayerFullDays: prayerStats.fullDays,
      prayerStreak: prayerStats.streak,
      // NEW: Points information
      points: pointsSummary,
      challengeStreak: this.getChallengeStreak(),
      completedChallengesToday: this.getCompletedChallengesToday().length
    };
  }

  // Reset progress (for testing or user request)
  resetProgress() {
    this.progress = this.getDefaultProgress();
    this.saveProgress();
  }
}

// Export a singleton instance
export const progressTracker = new ProgressTracker(); 