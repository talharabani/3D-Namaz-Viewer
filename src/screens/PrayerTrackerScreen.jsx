import { useState, useEffect } from 'react';
import { progressTracker } from '../utils/progressTracker';

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
  const [noteText, setNoteText] = useState(note || '');

  useEffect(() => {
    setNoteText(note || '');
  }, [note]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-card to-card/80 dark:from-darkcard dark:to-darkcard/80 p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl border border-border/20 dark:border-darkborder/20">
        <h3 className="text-2xl font-bold text-brass mb-6 text-center">
          📝 Notes for {new Date(dateStr).toLocaleDateString()}
        </h3>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add your prayer notes here..."
          className="w-full h-32 p-4 border-2 border-border/30 dark:border-darkborder/30 rounded-xl bg-background/50 dark:bg-dark/50 text-text dark:text-darktext resize-none focus:border-wood focus:ring-2 focus:ring-wood/20 transition-all"
        />
        <div className="flex gap-3 mt-6">
          <button
            className="btn flex-1 bg-gradient-to-r from-wood to-brass hover:from-brass hover:to-wood text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              onSave(dateStr, noteText);
              onClose();
            }}
          >
            💾 Save
          </button>
          <button
            className="btn flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onClose}
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Quick Actions Component
function QuickActions({ onMarkAll, onMarkToday, onMarkWeek }) {
  return (
    <div className="w-full bg-gradient-to-br from-card/80 to-card/60 dark:from-darkcard/80 dark:to-darkcard/60 p-6 rounded-2xl shadow-xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-brass mb-4 flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        Quick Actions
      </h3>
      <div className="flex flex-wrap gap-3">
        <button 
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkToday}
        >
          ✅ Mark Today Complete
        </button>
        <button 
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkWeek}
        >
          📅 Mark This Week
        </button>
        <button 
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkAll}
        >
          🎯 Mark All This Month
        </button>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color = "wood" }) {
  return (
    <div className="bg-gradient-to-br from-card/80 to-card/60 dark:from-darkcard/80 dark:to-darkcard/60 p-6 rounded-2xl shadow-xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <div className="text-right">
          <div className={`text-3xl font-bold text-${color} mb-1`}>{value}</div>
          <div className="text-sm text-text/70 dark:text-darktext/70">{title}</div>
        </div>
      </div>
    </div>
  );
}

export default function PrayerTrackerScreen() {
  const today = new Date();
  const [marked, setMarked] = useState({});
  const [privacy, setPrivacy] = useState(false);
  const [viewMode, setViewMode] = useState('month');
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [showPrayerReminder, setShowPrayerReminder] = useState(false);
  const [notesModal, setNotesModal] = useState({ isOpen: false, dateStr: '', note: '' });

  const days = getMonthDays(selectedYear, selectedMonth);

  // Load saved data on component mount
  useEffect(() => {
    const savedMarked = localStorage.getItem('prayer_tracker_marked');
    const savedNotes = localStorage.getItem('prayer_tracker_notes');
    
    if (savedMarked) {
      setMarked(JSON.parse(savedMarked));
    }
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save data when marked or notes change
  useEffect(() => {
    localStorage.setItem('prayer_tracker_marked', JSON.stringify(marked));
  }, [marked]);

  useEffect(() => {
    localStorage.setItem('prayer_tracker_notes', JSON.stringify(notes));
  }, [notes]);

  // Calculate comprehensive stats
  const calculateStats = () => {
    let fullDays = 0;
    let totalPrayers = 0;
    let missedPrayers = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const prayerCounts = { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 };
    
    const sortedDates = Object.keys(marked).sort();
    
    sortedDates.forEach(dateStr => {
      const prayers = marked[dateStr];
      if (prayers && prayers.length === PRAYERS.length) {
        const completedPrayers = prayers.filter(Boolean).length;
        totalPrayers += completedPrayers;
        missedPrayers += (PRAYERS.length - completedPrayers);
        
        prayers.forEach((prayed, idx) => {
          if (prayed) prayerCounts[PRAYERS[idx]]++;
        });
        
        if (prayers.every(Boolean)) {
          fullDays++;
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }
    });
    
    const todayStr = today.toISOString().slice(0, 10);
    let streakCount = 0;
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const dateStr = sortedDates[i];
      const prayers = marked[dateStr];
      if (prayers && prayers.length === PRAYERS.length && prayers.every(Boolean)) {
        streakCount++;
      } else {
        break;
      }
    }
    currentStreak = streakCount;

    return {
      fullDays,
      totalPrayers,
      missedPrayers,
      currentStreak,
      longestStreak,
      prayerCounts,
      completionRate: totalPrayers > 0 ? Math.round((totalPrayers / (totalPrayers + missedPrayers)) * 100) : 0
    };
  };

  const stats = calculateStats();

  function togglePrayer(dateStr, idx) {
    setMarked(prev => {
      const arr = prev[dateStr] ? [...prev[dateStr]] : Array(PRAYERS.length).fill(false);
      arr[idx] = !arr[idx];
      const updated = { ...prev, [dateStr]: arr };
      progressTracker.updatePrayerDay(dateStr, arr);
      return updated;
    });
  }

  function addNote(dateStr, note) {
    if (note.trim()) {
      setNotes(prev => ({
        ...prev,
        [dateStr]: note.trim()
      }));
    } else {
      removeNote(dateStr);
    }
  }

  function removeNote(dateStr) {
    setNotes(prev => {
      const updated = { ...prev };
      delete updated[dateStr];
      return updated;
    });
  }

  function openNotesModal(dateStr) {
    setNotesModal({
      isOpen: true,
      dateStr,
      note: notes[dateStr] || ''
    });
  }

  function closeNotesModal() {
    setNotesModal({ isOpen: false, dateStr: '', note: '' });
  }

  // Quick action functions
  function markTodayComplete() {
    const todayStr = today.toISOString().slice(0, 10);
    setMarked(prev => {
      const updated = { ...prev, [todayStr]: Array(PRAYERS.length).fill(true) };
      progressTracker.updatePrayerDay(todayStr, Array(PRAYERS.length).fill(true));
      return updated;
    });
  }

  function markThisWeek() {
    const todayStr = today.toISOString().slice(0, 10);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const updated = { ...marked };
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10);
      if (date <= today) {
        updated[dateStr] = Array(PRAYERS.length).fill(true);
        progressTracker.updatePrayerDay(dateStr, Array(PRAYERS.length).fill(true));
      }
    }
    setMarked(updated);
  }

  function markAllThisMonth() {
    const updated = { ...marked };
    days.forEach(date => {
      const dateStr = date.toISOString().slice(0, 10);
      if (date <= today) {
        updated[dateStr] = Array(PRAYERS.length).fill(true);
        progressTracker.updatePrayerDay(dateStr, Array(PRAYERS.length).fill(true));
      }
    });
    setMarked(updated);
  }

  function exportData() {
    const exportDate = new Date();
    const stats = calculateStats();
    
    // Create comprehensive export data
    const exportData = {
      metadata: {
        appName: "Islamic Prayer Companion",
        exportDate: exportDate.toISOString(),
        exportDateFormatted: exportDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        version: '2.0',
        totalDaysTracked: Object.keys(marked).length,
        userStats: {
          fullDays: stats.fullDays,
          currentStreak: stats.currentStreak,
          longestStreak: stats.longestStreak,
          completionRate: stats.completionRate,
          totalPrayers: stats.totalPrayers,
          missedPrayers: stats.missedPrayers,
          weekProgress: getWeekProgress()
        }
      },
      prayerData: {
        marked,
        notes,
        prayerBreakdown: stats.prayerCounts
      },
      achievements: {
        unlocked: [],
        totalAchievements: 0
      },
      summary: {
        totalDays: Object.keys(marked).length,
        daysWithNotes: Object.keys(notes).length,
        averagePrayersPerDay: stats.totalPrayers / Math.max(Object.keys(marked).length, 1),
        bestMonth: getBestMonth(),
        mostConsistentPrayer: getMostConsistentPrayer(stats.prayerCounts)
      }
    };

    // Generate achievements
    if (stats.currentStreak >= 7) {
      exportData.achievements.unlocked.push({
        id: '7_day_streak',
        title: '7-Day Streak',
        description: 'Maintained prayer streak for 7 days',
        date: new Date().toISOString()
      });
    }
    if (stats.fullDays >= 30) {
      exportData.achievements.unlocked.push({
        id: 'monthly_master',
        title: 'Monthly Master',
        description: 'Completed all prayers for 30 days',
        date: new Date().toISOString()
      });
    }
    if (stats.completionRate >= 90) {
      exportData.achievements.unlocked.push({
        id: 'consistent_prayer',
        title: 'Consistent Prayer',
        description: '90%+ prayer completion rate',
        date: new Date().toISOString()
      });
    }
    if (getWeekProgress() >= 100) {
      exportData.achievements.unlocked.push({
        id: 'perfect_week',
        title: 'Perfect Week',
        description: 'Completed all prayers this week',
        date: new Date().toISOString()
      });
    }
    exportData.achievements.totalAchievements = exportData.achievements.unlocked.length;

    // Create beautiful HTML report
    const htmlReport = generateHTMLReport(exportData);
    
    // Create both JSON and HTML exports
    const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const htmlBlob = new Blob([htmlReport], { type: 'text/html' });
    
    // Create zip file with both formats
    const zip = new JSZip();
    zip.file('prayer-data.json', jsonBlob);
    zip.file('prayer-report.html', htmlBlob);
    
    zip.generateAsync({ type: 'blob' }).then(function(content) {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prayer-tracker-report-${exportDate.toISOString().slice(0, 10)}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function generateHTMLReport(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prayer Tracker Report - ${data.metadata.exportDateFormatted}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #44403c 0%, #78716c 50%, #d6d3d1 100%);
            color: #2D2A24;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #956D37 0%, #DDC00F 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #F5F5F5 0%, #E5E7EB 100%);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            border: 2px solid #956D37;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #956D37;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 1rem;
            color: #6B7280;
            font-weight: 600;
        }
        
        .section {
            padding: 30px;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .section:last-child {
            border-bottom: none;
        }
        
        .section h2 {
            color: #956D37;
            font-size: 1.8rem;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .achievements-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }
        
        .achievement-card {
            background: linear-gradient(135deg, #DDC00F 0%, #956D37 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .achievement-icon {
            font-size: 2rem;
        }
        
        .achievement-info h3 {
            font-size: 1.2rem;
            margin-bottom: 5px;
        }
        
        .achievement-info p {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .prayer-breakdown {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .prayer-card {
            background: linear-gradient(135deg, #F5F5F5 0%, #E5E7EB 100%);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            border: 1px solid #956D37;
        }
        
        .prayer-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .prayer-count {
            font-size: 1.5rem;
            font-weight: 700;
            color: #956D37;
            margin-bottom: 5px;
        }
        
        .prayer-name {
            font-size: 1rem;
            color: #6B7280;
            font-weight: 600;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #E5E7EB;
            border-radius: 4px;
            overflow: hidden;
            margin: 10px 0;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #956D37 0%, #DDC00F 100%);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .summary-box {
            background: linear-gradient(135deg, #956D37 0%, #DDC00F 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            margin: 20px 0;
        }
        
        .summary-box h3 {
            font-size: 1.3rem;
            margin-bottom: 15px;
        }
        
        .summary-list {
            list-style: none;
        }
        
        .summary-list li {
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .summary-list li:last-child {
            border-bottom: none;
        }
        
        @media print {
            body {
                background: white;
            }
            .container {
                box-shadow: none;
                border-radius: 0;
            }
        }
        
        @media (max-width: 768px) {
            .header {
                padding: 20px;
            }
            .header h1 {
                font-size: 2rem;
            }
            .stats-grid {
                grid-template-columns: 1fr;
                padding: 20px;
            }
            .section {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🕌 Prayer Tracker Report</h1>
            <p>Generated on ${data.metadata.exportDateFormatted}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${data.metadata.userStats.fullDays}</div>
                <div class="stat-label">Full Days</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.metadata.userStats.currentStreak}</div>
                <div class="stat-label">Current Streak</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.metadata.userStats.longestStreak}</div>
                <div class="stat-label">Longest Streak</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.metadata.userStats.completionRate}%</div>
                <div class="stat-label">Completion Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.metadata.userStats.totalPrayers}</div>
                <div class="stat-label">Total Prayers</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.metadata.userStats.weekProgress}%</div>
                <div class="stat-label">This Week</div>
            </div>
        </div>
        
        <div class="section">
            <h2>🏆 Achievements (${data.achievements.totalAchievements})</h2>
            ${data.achievements.unlocked.length > 0 ? `
            <div class="achievements-grid">
                ${data.achievements.unlocked.map(achievement => `
                <div class="achievement-card">
                    <div class="achievement-icon">${getAchievementIcon(achievement.id)}</div>
                    <div class="achievement-info">
                        <h3>${achievement.title}</h3>
                        <p>${achievement.description}</p>
                    </div>
                </div>
                `).join('')}
            </div>
            ` : '<p style="text-align: center; color: #6B7280; font-style: italic;">No achievements unlocked yet. Keep praying consistently!</p>'}
        </div>
        
        <div class="section">
            <h2>📊 Prayer Breakdown</h2>
            <div class="prayer-breakdown">
                ${Object.entries(data.prayerData.prayerBreakdown).map(([prayer, count]) => `
                <div class="prayer-card">
                    <div class="prayer-icon">${PRAYER_TIMES[prayer]}</div>
                    <div class="prayer-count">${count}</div>
                    <div class="prayer-name">${prayer}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${data.metadata.userStats.totalPrayers > 0 ? (count / data.metadata.userStats.totalPrayers * 100) : 0}%"></div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2>📋 Summary</h2>
            <div class="summary-box">
                <h3>Your Prayer Journey</h3>
                <ul class="summary-list">
                    <li><strong>Total Days Tracked:</strong> ${data.summary.totalDays} days</li>
                    <li><strong>Days with Notes:</strong> ${data.summary.daysWithNotes} days</li>
                    <li><strong>Average Prayers per Day:</strong> ${data.summary.averagePrayersPerDay.toFixed(1)} prayers</li>
                    <li><strong>Most Consistent Prayer:</strong> ${data.summary.mostConsistentPrayer}</li>
                    <li><strong>Best Month:</strong> ${data.summary.bestMonth}</li>
                </ul>
            </div>
        </div>
        
        <div class="section" style="text-align: center; color: #6B7280; font-style: italic;">
            <p>Generated by Islamic Prayer Companion App</p>
            <p>Keep up the great work in maintaining your prayer routine! 🌟</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  function getAchievementIcon(achievementId) {
    const icons = {
      '7_day_streak': '🔥',
      'monthly_master': '📅',
      'consistent_prayer': '⭐',
      'perfect_week': '📊'
    };
    return icons[achievementId] || '🏆';
  }

  function getBestMonth() {
    const months = {};
    Object.keys(marked).forEach(dateStr => {
      const [year, month] = dateStr.split('-');
      const key = `${year}-${month}`;
      if (!months[key]) months[key] = { fullDays: 0, totalDays: 0 };
      months[key].totalDays++;
      const prayers = marked[dateStr];
      if (prayers && prayers.length === PRAYERS.length && prayers.every(Boolean)) {
        months[key].fullDays++;
      }
    });
    
    let bestMonth = 'None';
    let bestRatio = 0;
    
    Object.entries(months).forEach(([key, data]) => {
      const ratio = data.fullDays / data.totalDays;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        const [year, month] = key.split('-');
        const monthName = getMonthName(parseInt(month));
        bestMonth = `${monthName} ${year}`;
      }
    });
    
    return bestMonth;
  }

  function getMostConsistentPrayer(prayerCounts) {
    const entries = Object.entries(prayerCounts);
    if (entries.length === 0) return 'None';
    
    const maxPrayer = entries.reduce((max, [prayer, count]) => 
      count > max.count ? { prayer, count } : max, 
      { prayer: '', count: 0 }
    );
    
    return maxPrayer.prayer;
  }

  function importData(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.marked) setMarked(data.marked);
          if (data.notes) setNotes(data.notes);
          setShowImport(false);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  }

  function resetData() {
    if (confirm('Are you sure you want to reset all prayer data? This cannot be undone.')) {
      setMarked({});
      setNotes({});
      localStorage.removeItem('prayer_tracker_marked');
      localStorage.removeItem('prayer_tracker_notes');
    }
  }

  function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  }

  function getPrayerStatus(dateStr) {
    const prayers = marked[dateStr];
    if (!prayers) return 'none';
    const completed = prayers.filter(Boolean).length;
    if (completed === 0) return 'none';
    if (completed === PRAYERS.length) return 'complete';
    return 'partial';
  }

  function getPrayerEmoji(status) {
    switch (status) {
      case 'complete': return '✅';
      case 'partial': return '⚠️';
      case 'none': return '❌';
      default: return '⚪';
    }
  }

  function getWeekProgress() {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    let weekPrayers = 0;
    let weekTotal = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10);
      const prayers = marked[dateStr];
      if (prayers && prayers.length === PRAYERS.length) {
        weekTotal += PRAYERS.length;
        weekPrayers += prayers.filter(Boolean).length;
      }
    }
    
    return weekTotal > 0 ? Math.round((weekPrayers / weekTotal) * 100) : 0;
  }

  if (privacy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#44403c] via-[#78716c] to-[#d6d3d1] flex flex-col items-center justify-center">
        <div className="bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-12 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm text-center">
          <div className="text-6xl mb-6">🔒</div>
          <div className="text-3xl font-bold text-brass mb-8">Prayer Tracker is Locked</div>
          <button 
            className="bg-gradient-to-r from-wood to-brass hover:from-brass hover:to-wood text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setPrivacy(false)}
          >
            🔓 Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#44403c] via-[#78716c] to-[#d6d3d1] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto gap-8 py-8 px-4">
        {/* Header */}
        <div className="w-full bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-6 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🕌</div>
              <div>
                <div className="text-3xl font-bold text-brass">Prayer Tracker</div>
                <div className="text-sm text-text/70 dark:text-darktext/70">Track your daily prayers with ease</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowQuickActions(!showQuickActions)}
              >
                ⚡ Quick Actions
              </button>
              <button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowStats(!showStats)}
              >
                📊 Stats
              </button>
              <button 
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowAchievements(!showAchievements)}
              >
                🏆 Achievements
              </button>
              <button 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowExport(!showExport)}
              >
                📤 Export
              </button>
              <button 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setPrivacy(true)}
              >
                🔒 Lock
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        {showQuickActions && (
          <QuickActions
            onMarkAll={markAllThisMonth}
            onMarkToday={markTodayComplete}
            onMarkWeek={markThisWeek}
          />
        )}

        {/* View Mode Toggle */}
        <div className="w-full bg-gradient-to-br from-card/80 to-card/60 dark:from-darkcard/80 dark:to-darkcard/60 p-4 rounded-2xl shadow-xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
          <div className="flex gap-2 justify-center">
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                viewMode === 'month' 
                  ? 'bg-gradient-to-r from-wood to-brass text-white shadow-lg' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
              }`}
              onClick={() => setViewMode('month')}
            >
              📅 Month View
            </button>
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                viewMode === 'year' 
                  ? 'bg-gradient-to-r from-wood to-brass text-white shadow-lg' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
              }`}
              onClick={() => setViewMode('year')}
            >
              📊 Year View
            </button>
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                viewMode === 'stats' 
                  ? 'bg-gradient-to-r from-wood to-brass text-white shadow-lg' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
              }`}
              onClick={() => setViewMode('stats')}
            >
              📈 Statistics
            </button>
          </div>
        </div>

        {/* Month/Year Navigation */}
        <div className="flex items-center gap-6 bg-gradient-to-br from-card/80 to-card/60 dark:from-darkcard/80 dark:to-darkcard/60 p-4 rounded-2xl shadow-xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
          <button 
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              if (viewMode === 'month') {
                setSelectedMonth(prev => prev === 0 ? 11 : prev - 1);
                if (selectedMonth === 0) setSelectedYear(prev => prev - 1);
              } else {
                setSelectedYear(prev => prev - 1);
              }
            }}
          >
            ← Previous
          </button>
          <div className="text-2xl font-bold text-brass bg-gradient-to-r from-wood/20 to-brass/20 px-8 py-3 rounded-xl">
            {viewMode === 'month' ? `${getMonthName(selectedMonth)} ${selectedYear}` : `${selectedYear}`}
          </div>
          <button 
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              if (viewMode === 'month') {
                setSelectedMonth(prev => prev === 11 ? 0 : prev + 1);
                if (selectedMonth === 11) setSelectedYear(prev => prev + 1);
              } else {
                setSelectedYear(prev => prev + 1);
              }
            }}
          >
            Next →
          </button>
        </div>

        {/* Statistics Panel */}
        {showStats && (
          <div className="w-full bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-8 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-brass mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Prayer Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <StatCard title="Full Days" value={stats.fullDays} icon="📅" color="wood" />
              <StatCard title="Current Streak" value={stats.currentStreak} icon="🔥" color="wood" />
              <StatCard title="Longest Streak" value={stats.longestStreak} icon="🏆" color="wood" />
              <StatCard title="Completion Rate" value={`${stats.completionRate}%`} icon="📈" color="wood" />
            </div>
            <div className="bg-gradient-to-br from-card/60 to-card/40 dark:from-darkcard/60 dark:to-darkcard/40 p-6 rounded-2xl">
              <h4 className="font-bold text-brass mb-4 text-lg">Prayer Breakdown:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {PRAYERS.map(prayer => (
                  <div key={prayer} className="text-center bg-gradient-to-br from-wood/20 to-brass/20 p-4 rounded-xl">
                    <div className="text-2xl mb-2">{PRAYER_TIMES[prayer]}</div>
                    <div className="text-xl font-bold text-wood">{stats.prayerCounts[prayer]}</div>
                    <div className="text-sm text-text/70 dark:text-darktext/70">{prayer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Panel */}
        {showAchievements && (
          <div className="w-full bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-8 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-brass mb-6 flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.currentStreak >= 7 && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-wood/20 to-brass/20 rounded-2xl border border-wood/30">
                  <span className="text-3xl">🔥</span>
                  <div>
                    <div className="font-bold text-brass text-lg">7-Day Streak</div>
                    <div className="text-sm text-text/70 dark:text-darktext/70">Maintained prayer streak for 7 days</div>
                  </div>
                </div>
              )}
              {stats.fullDays >= 30 && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-wood/20 to-brass/20 rounded-2xl border border-wood/30">
                  <span className="text-3xl">📅</span>
                  <div>
                    <div className="font-bold text-brass text-lg">Monthly Master</div>
                    <div className="text-sm text-text/70 dark:text-darktext/70">Completed all prayers for 30 days</div>
                  </div>
                </div>
              )}
              {stats.completionRate >= 90 && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-wood/20 to-brass/20 rounded-2xl border border-wood/30">
                  <span className="text-3xl">⭐</span>
                  <div>
                    <div className="font-bold text-brass text-lg">Consistent Prayer</div>
                    <div className="text-sm text-text/70 dark:text-darktext/70">90%+ prayer completion rate</div>
                  </div>
                </div>
              )}
              {getWeekProgress() >= 100 && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-wood/20 to-brass/20 rounded-2xl border border-wood/30">
                  <span className="text-3xl">📊</span>
                  <div>
                    <div className="font-bold text-brass text-lg">Perfect Week</div>
                    <div className="text-sm text-text/70 dark:text-darktext/70">Completed all prayers this week</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Export/Import Panel */}
        {showExport && (
          <div className="w-full bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-8 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-brass mb-6 flex items-center gap-3">
              <span className="text-3xl">📤</span>
              Export/Import Data
            </h3>
            
            {/* Export Information */}
            <div className="bg-gradient-to-br from-wood/20 to-brass/20 p-6 rounded-2xl mb-6">
              <h4 className="text-lg font-bold text-brass mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span>
                What's Included in Your Export
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Complete prayer tracking data</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Personal prayer notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Detailed statistics & achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Beautiful HTML report</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Printable format</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Mobile-friendly design</span>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30">
                <h5 className="font-bold text-green-700 mb-2">📤 Complete Export</h5>
                <p className="text-sm text-green-600 mb-3">Get everything in a ZIP file with JSON data and beautiful HTML report</p>
                <button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={exportData}
                >
                  📦 Download ZIP
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                <h5 className="font-bold text-blue-700 mb-2">📥 Import Data</h5>
                <p className="text-sm text-blue-600 mb-3">Restore your prayer data from a previously exported file</p>
                <button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setShowImport(!showImport)}
                >
                  📁 Choose File
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-4 rounded-xl border border-red-500/30">
                <h5 className="font-bold text-red-700 mb-2">🗑️ Reset Data</h5>
                <p className="text-sm text-red-600 mb-3">Clear all prayer tracking data (cannot be undone)</p>
                <button 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={resetData}
                >
                  ⚠️ Reset All
                </button>
              </div>
            </div>

            {/* Import Section */}
            {showImport && (
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-2xl border border-blue-500/30">
                <h4 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                  <span className="text-xl">📥</span>
                  Import Prayer Data
                </h4>
                <div className="mb-4">
                  <input 
                    type="file" 
                    accept=".json,.zip"
                    onChange={importData}
                    className="block w-full text-sm text-text dark:text-darktext file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all"
                  />
                </div>
                <p className="text-sm text-blue-600">
                  <strong>Supported formats:</strong> JSON files from previous exports or ZIP files with prayer data
                </p>
              </div>
            )}

            {/* Export Preview */}
            <div className="bg-gradient-to-br from-wood/10 to-brass/10 p-6 rounded-2xl border border-wood/30">
              <h4 className="text-lg font-bold text-brass mb-3 flex items-center gap-2">
                <span className="text-xl">👀</span>
                Export Preview
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-wood">{Object.keys(marked).length}</div>
                  <div className="text-text/70">Days Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wood">{Object.keys(notes).length}</div>
                  <div className="text-text/70">Notes Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wood">{stats.fullDays}</div>
                  <div className="text-text/70">Full Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wood">{stats.currentStreak}</div>
                  <div className="text-text/70">Current Streak</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Calendar View */}
        {viewMode === 'month' && (
          <div className="w-full bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-8 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b-2 border-border/30 dark:border-darkborder/30">
                    <th className="p-4 text-left text-brass font-bold text-lg">Date</th>
                    {PRAYERS.map(p => (
                      <th key={p} className="p-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">{PRAYER_TIMES[p]}</span>
                          <span className="text-sm font-semibold text-brass">{p}</span>
                        </div>
                      </th>
                    ))}
                    <th className="p-4 text-center text-brass font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map(date => {
                    const dateStr = date.toISOString().slice(0, 10);
                    const prayerStatus = getPrayerStatus(dateStr);
                    const isToday = dateStr === today.toISOString().slice(0, 10);
                    
                    return (
                      <tr key={dateStr} className={`border-b border-border/20 dark:border-darkborder/20 hover:bg-wood/10 transition-all duration-300 ${
                        isToday ? 'bg-gradient-to-r from-brass/20 to-wood/20' : ''
                      }`}>
                        <td className="p-4 font-bold text-lg">
                          <div className="flex items-center gap-3">
                            <span className={`text-xl ${isToday ? 'text-brass' : 'text-text dark:text-darktext'}`}>
                              {date.getDate()}
                            </span>
                            {prayerStatus !== 'none' && (
                              <span className="text-lg">{getPrayerEmoji(prayerStatus)}</span>
                            )}
                          </div>
                        </td>
                        {PRAYERS.map((_, idx) => (
                          <td key={idx} className="p-4 text-center">
                            <button
                              className={`w-12 h-12 rounded-full border-3 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl ${
                                marked[dateStr]?.[idx] 
                                  ? 'bg-gradient-to-br from-wood to-brass border-brass shadow-wood/50' 
                                  : 'bg-gradient-to-br from-card to-card/80 dark:from-darkcard dark:to-darkcard/80 border-border/50 dark:border-darkborder/50 hover:border-wood'
                              }`}
                              onClick={() => togglePrayer(dateStr, idx)}
                              aria-label={`Toggle ${PRAYERS[idx]} for ${dateStr}`}
                            />
                          </td>
                        ))}
                        <td className="p-4 text-center">
                          <button
                            className={`w-10 h-10 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
                              notes[dateStr] 
                                ? 'bg-gradient-to-br from-wood to-brass' 
                                : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
                            }`}
                            onClick={() => openNotesModal(dateStr)}
                            aria-label={`Add note for ${dateStr}`}
                          >
                            {notes[dateStr] ? '📝' : '+'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Year View */}
        {viewMode === 'year' && (
          <div className="w-full grid grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 12 }, (_, month) => {
              const monthDays = getMonthDays(selectedYear, month);
              const monthStats = monthDays.reduce((acc, date) => {
                const dateStr = date.toISOString().slice(0, 10);
                const prayers = marked[dateStr];
                if (prayers && prayers.length === PRAYERS.length && prayers.every(Boolean)) {
                  acc.fullDays++;
                }
                return acc;
              }, { fullDays: 0 });

              return (
                <div key={month} className="bg-gradient-to-br from-card/80 to-card/60 dark:from-darkcard/80 dark:to-darkcard/60 p-6 rounded-2xl shadow-xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="font-bold text-brass mb-2 text-lg">{getMonthName(month)}</div>
                  <div className="text-3xl font-bold text-wood">{monthStats.fullDays}</div>
                  <div className="text-xs text-text/70 dark:text-darktext/70">full days</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Statistics View */}
        {viewMode === 'stats' && (
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Prayers" value={stats.totalPrayers} icon="🕌" color="wood" />
              <StatCard title="Missed Prayers" value={stats.missedPrayers} icon="⏰" color="wood" />
              <StatCard title="Completion Rate" value={`${stats.completionRate}%`} icon="📈" color="wood" />
            </div>
            
            <div className="bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-8 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-brass mb-6 flex items-center gap-3">
                <span className="text-3xl">📊</span>
                Prayer Distribution
              </h3>
              <div className="space-y-4">
                {PRAYERS.map(prayer => {
                  const count = stats.prayerCounts[prayer];
                  const percentage = stats.totalPrayers > 0 ? Math.round((count / stats.totalPrayers) * 100) : 0;
                  return (
                    <div key={prayer} className="flex items-center justify-between p-4 bg-gradient-to-br from-card/60 to-card/40 dark:from-darkcard/60 dark:to-darkcard/40 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{PRAYER_TIMES[prayer]}</span>
                        <span className="font-medium text-lg">{prayer}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-wood to-brass h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-wood min-w-[3rem] text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="w-full bg-gradient-to-br from-card/90 to-card/70 dark:from-darkcard/90 dark:to-darkcard/70 p-6 rounded-3xl shadow-2xl border border-border/20 dark:border-darkborder/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="text-center md:text-left">
              <div className="text-lg text-text dark:text-darktext">
                You've prayed <span className="font-bold text-brass text-xl">{PRAYERS.length}</span> times/day for <span className="font-bold text-brass text-xl">{stats.fullDays}</span> days
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-lg text-text dark:text-darktext">
                  🔥 Streak: <span className="font-bold text-wood text-xl">{stats.currentStreak}</span> days
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg text-text dark:text-darktext">
                  📊 Completion: <span className="font-bold text-wood text-xl">{stats.completionRate}%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg text-text dark:text-darktext">
                  📅 This Week: <span className="font-bold text-wood text-xl">{getWeekProgress()}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Modal */}
        <NotesModal
          isOpen={notesModal.isOpen}
          onClose={closeNotesModal}
          dateStr={notesModal.dateStr}
          note={notesModal.note}
          onSave={addNote}
        />
      </div>
    </div>
  );
} 