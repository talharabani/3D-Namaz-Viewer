import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { progressTracker } from '../utils/progressTracker';
import { ToggleLeft } from '../components/ToggleLeft';
import { BaseProgressDemo } from '../components/ProgressTracker';
import { useTranslation } from '../utils/translations';
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

  // Auto-refresh on focus
  useEffect(() => {
    function handleFocus() {
      loadProgress();
    }
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

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
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
        </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 py-12 px-4">
        {/* Header Section */}
        <motion.div 
          className="w-full text-center mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="relative">
            <motion.div 
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent"
              variants={pulseAnimation}
              animate="animate"
            >
              📊 {t('your Progress')}
            </motion.div>
            <div className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Track your learning journey and achievements
            </div>
            <div className="flex gap-4 justify-center mt-4">
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={loadProgress}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 {t('Refresh')}
              </motion.button>
              
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  if (progress) {
                    exportProgressToPDF(progress, achievements, getNotesList(), getPrayerHistory(), t);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📄 {t('Export Progress')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      
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

      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('Learning Progress')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{t('Completion')}</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold text-lg">{progress.completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-amber-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{t('Current Step')}</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{progress.currentStep}/8</span>
          </div>
        </div>
      </div>

      {/* Progress Tracker Demo */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('Progress Tracker Demo')}</h2>
        <div className="flex justify-center">
          <BaseProgressDemo />
        </div>
      </div>

      {/* Points Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">🏆 {t('Points Achievements')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.points?.total || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('Total Points')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.points?.today || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('Todays Points')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.points?.thisWeek || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('This Week')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.challengeStreak || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('Challenge Streak')}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-lg border border-amber-200 dark:border-amber-700">
          <div className="text-center">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {t('Completed Challenges Today', { count: progress.completedChallengesToday || 0 })}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300 opacity-80 mt-1">
              {t('Keep Up Great Work')}
            </div>
          </div>
        </div>
      </div>

      {/* Study & Prayer Statistics (merged) */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('Study and Prayer Statistics')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.streakDays}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('LearningS treak')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.prayerStreak}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('PrayerS treak')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{Math.round(progress.totalStudyTime / 60 * 10) / 10}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('Study Hours')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.quizStats.totalQuizzes}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('QuizzesTaken')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{getNotesCount()}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('Notes Added')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.prayerFullDays}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('Full Prayer Days')}</div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('Your Notes')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {getNotesList().filter(n => n && n.trim() !== '').length === 0 ? (
            <li className="text-gray-700 dark:text-gray-300">{t('No Notes Yet')}</li>
          ) : (
            getNotesList().map((note, idx) => note && note.trim() !== '' && (
              <NoteItem key={idx} note={note} idx={idx} refresh={loadProgress} />
            ))
          )}
        </ul>
      </div>

      {/* Prayer History */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700 overflow-x-auto">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('Prayer History')}</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <label className="flex items-center gap-2 text-sm">
            {t('Start')}:
            <input type="date" value={prayerStart} onChange={e => setPrayerStart(e.target.value)} className="rounded border p-1" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            {t('End')}:
            <input type="date" value={prayerEnd} onChange={e => setPrayerEnd(e.target.value)} className="rounded border p-1" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <ToggleLeft
              isActive={showFullDaysOnly}
              onChange={(active) => setShowFullDaysOnly(active)}
              stroke="#956D37"
            />
            <span>{t('Show Only Full Days')}</span>
          </label>
        </div>
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left">{t('Date')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('Fajr')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('Dhuhr')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('Asr')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('Maghrib')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('Isha')}</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let entries = Object.entries(getPrayerHistory());
              if (prayerStart) entries = entries.filter(([date]) => date >= prayerStart);
              if (prayerEnd) entries = entries.filter(([date]) => date <= prayerEnd);
              if (showFullDaysOnly) entries = entries.filter(([_, arr]) => arr.length === 5 && arr.every(Boolean));
                             if (entries.length === 0) return (
                 <tr><td colSpan={6} className="p-2 text-center text-gray-700 dark:text-gray-300">{t('No Prayer History')}</td></tr>
               );
              // Highlight streaks: consecutive full days
              let streak = 0;
              let lastDate = null;
              return entries.sort(([a], [b]) => a.localeCompare(b)).reverse().map(([date, arr], i) => {
                const isFull = arr.length === 5 && arr.every(Boolean);
                let isStreak = false;
                if (isFull) {
                  if (!lastDate || (new Date(lastDate) - new Date(date) === 24*60*60*1000)) {
                    streak++;
                    isStreak = streak > 1;
                  } else {
                    streak = 1;
                  }
                  lastDate = date;
                } else {
                  streak = 0;
                  lastDate = null;
                }
                                 return (
                   <tr key={date} className={isStreak ? 'bg-orange-50 dark:bg-orange-900/20' : isFull ? 'bg-amber-50 dark:bg-amber-900/20' : ''}>
                     <td className="p-2 border-b border-gray-300 dark:border-gray-600 font-bold">{date}</td>
                     {arr.map((done, idx) => (
                       <td key={idx} className={`p-2 border-b border-gray-300 dark:border-gray-600 text-center ${done ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-gray-400'}`}>{done ? '✓' : '-'}</td>
                     ))}
                   </tr>
                 );
              });
            })()}
          </tbody>
        </table>
      </div>

      {/* Quiz Performance */}
      {progress.quizStats.totalQuizzes > 0 && (
        <div className="card">
          <h2 className="text-xl font-heading text-brass font-bold mb-4">Quiz Performance</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100 font-medium">Average Score</span>
              <span className="text-brass font-bold">{progress.quizStats.averageScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100 font-medium">Best Score</span>
              <span className="text-brass font-bold">{progress.quizStats.bestScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100 font-medium">Total Quizzes</span>
              <span className="text-brass font-bold">{progress.quizStats.totalQuizzes}</span>
            </div>
          </div>
          
          {/* Recent Quiz Scores */}
          {progress.quizStats.recentScores.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-heading text-brass font-bold mb-2">Recent Scores</h3>
              <div className="space-y-2">
                {progress.quizStats.recentScores.slice().reverse().map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-900 dark:text-gray-100">
                      {new Date(quiz.date).toLocaleDateString()}
                    </span>
                    <span className={`font-bold ${
                      quiz.percentage >= 80 ? 'text-green-600' : 
                      quiz.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {quiz.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Achievements */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Achievements</h2>
        {achievements.length === 0 ? (
          <div className="text-center text-gray-900 dark:text-gray-100 py-8">
            <div className="text-4xl mb-2">🎯</div>
            <div className="font-medium">No achievements yet</div>
            <div className="text-sm opacity-75">Complete steps and take quizzes to earn achievements!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-900card border border-gray-300 dark:border-gray-600 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div className="flex-1">
                  <div className="font-bold text-brass">{achievement.title}</div>
                  <div className="text-sm text-gray-900 dark:text-gray-100">{achievement.description}</div>
                  <div className="text-xs text-gray-900 dark:text-gray-100 opacity-75">
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Tips */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Tips to Improve</h2>
        <div className="space-y-3">
          {progress.completionPercentage < 25 && (
            <div className="flex items-start gap-3">
              <div className="text-brass text-lg">📚</div>
              <div className="text-gray-900 dark:text-gray-100">
                <div className="font-medium">Start Learning</div>
                <div className="text-sm opacity-75">Complete the first few prayer steps to get started</div>
              </div>
            </div>
          )}
          
          {progress.streakDays < 3 && (
            <div className="flex items-start gap-3">
              <div className="text-brass text-lg">🔥</div>
              <div className="text-gray-900 dark:text-gray-100">
                <div className="font-medium">Build a Streak</div>
                <div className="text-sm opacity-75">Study daily to build a learning streak</div>
              </div>
            </div>
          )}
          
          {progress.quizStats.averageScore < 70 && progress.quizStats.totalQuizzes > 0 && (
            <div className="flex items-start gap-3">
              <div className="text-brass text-lg">📝</div>
              <div className="text-gray-900 dark:text-gray-100">
                <div className="font-medium">Practice More</div>
                <div className="text-sm opacity-75">Take more quizzes to improve your score</div>
              </div>
            </div>
          )}
          
          {progress.notesCount < 3 && (
            <div className="flex items-start gap-3">
              <div className="text-brass text-lg">✏️</div>
              <div className="text-gray-900 dark:text-gray-100">
                <div className="font-medium">Add Notes</div>
                <div className="text-sm opacity-75">Write notes while learning to remember better</div>
              </div>
            </div>
          )}
        </div>
      </div>

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
