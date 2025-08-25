import { useState, useEffect } from 'react';
import { progressTracker } from '../utils/progressTracker';
import { ToggleLeft } from '../components/ToggleLeft';
import { BaseProgressDemo } from '../components/ProgressTracker';
import { useTranslation } from '../utils/translations';
import { GlowCard } from '../components/nurui/spotlight-card';
import { 
  MotionDiv, 
  MotionCard, 
  MotionButton,
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions
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
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 py-8 px-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-heading text-amber-800 dark:text-amber-200 font-bold text-center">{t('yourProgress')}</h1>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ml-4" onClick={loadProgress} title={t('refresh')}>🔄 {t('refresh')}</button>
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

      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('learningProgress')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{t('completion')}</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold text-lg">{progress.completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-amber-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{t('currentStep')}</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{progress.currentStep}/8</span>
          </div>
        </div>
      </div>

      {/* Progress Tracker Demo */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('progressTrackerDemo')}</h2>
        <div className="flex justify-center">
          <BaseProgressDemo />
        </div>
      </div>

      {/* Points Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">🏆 {t('pointsAchievements')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.points?.total || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('totalPoints')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.points?.today || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('todaysPoints')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.points?.thisWeek || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('thisWeek')}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-3xl text-amber-600 dark:text-amber-400 font-bold">{progress.challengeStreak || 0}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('challengeStreak')}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-lg border border-amber-200 dark:border-amber-700">
          <div className="text-center">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {t('completedChallengesToday', { count: progress.completedChallengesToday || 0 })}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300 opacity-80 mt-1">
              {t('keepUpGreatWork')}
            </div>
          </div>
        </div>
      </div>

      {/* Study & Prayer Statistics (merged) */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('studyPrayerStatistics')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.streakDays}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('learningStreak')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.prayerStreak}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('prayerStreak')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{Math.round(progress.totalStudyTime / 60 * 10) / 10}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('studyHours')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.quizStats.totalQuizzes}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('quizzesTaken')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{getNotesCount()}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('notesAdded')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-amber-600 dark:text-amber-400 font-bold">{progress.prayerFullDays}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{t('fullPrayerDays')}</div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('yourNotes')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {getNotesList().filter(n => n && n.trim() !== '').length === 0 ? (
            <li className="text-gray-700 dark:text-gray-300">{t('noNotesYet')}</li>
          ) : (
            getNotesList().map((note, idx) => note && note.trim() !== '' && (
              <NoteItem key={idx} note={note} idx={idx} refresh={loadProgress} />
            ))
          )}
        </ul>
      </div>

      {/* Prayer History */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-amber-200 dark:border-amber-700 overflow-x-auto">
        <h2 className="text-xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4">{t('prayerHistory')}</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <label className="flex items-center gap-2 text-sm">
            {t('start')}:
            <input type="date" value={prayerStart} onChange={e => setPrayerStart(e.target.value)} className="rounded border p-1" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            {t('end')}:
            <input type="date" value={prayerEnd} onChange={e => setPrayerEnd(e.target.value)} className="rounded border p-1" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <ToggleLeft
              isActive={showFullDaysOnly}
              onChange={(active) => setShowFullDaysOnly(active)}
              stroke="#956D37"
            />
            <span>{t('showOnlyFullDays')}</span>
          </label>
        </div>
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left">{t('date')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('fajr')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('dhuhr')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('asr')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('maghrib')}</th>
              <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-center">{t('isha')}</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let entries = Object.entries(getPrayerHistory());
              if (prayerStart) entries = entries.filter(([date]) => date >= prayerStart);
              if (prayerEnd) entries = entries.filter(([date]) => date <= prayerEnd);
              if (showFullDaysOnly) entries = entries.filter(([_, arr]) => arr.length === 5 && arr.every(Boolean));
                             if (entries.length === 0) return (
                 <tr><td colSpan={6} className="p-2 text-center text-gray-700 dark:text-gray-300">{t('noPrayerHistory')}</td></tr>
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
              <span className="text-text dark:text-darktext font-medium">Average Score</span>
              <span className="text-brass font-bold">{progress.quizStats.averageScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text dark:text-darktext font-medium">Best Score</span>
              <span className="text-brass font-bold">{progress.quizStats.bestScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text dark:text-darktext font-medium">Total Quizzes</span>
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
                    <span className="text-text dark:text-darktext">
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
          <div className="text-center text-text dark:text-darktext py-8">
            <div className="text-4xl mb-2">🎯</div>
            <div className="font-medium">No achievements yet</div>
            <div className="text-sm opacity-75">Complete steps and take quizzes to earn achievements!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-card dark:bg-darkcard border border-border dark:border-darkborder rounded-lg">
                <div className="text-2xl">🏆</div>
                <div className="flex-1">
                  <div className="font-bold text-brass">{achievement.title}</div>
                  <div className="text-sm text-text dark:text-darktext">{achievement.description}</div>
                  <div className="text-xs text-text dark:text-darktext opacity-75">
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
              <div className="text-text dark:text-darktext">
                <div className="font-medium">Start Learning</div>
                <div className="text-sm opacity-75">Complete the first few prayer steps to get started</div>
              </div>
            </div>
          )}
          
          {progress.streakDays < 3 && (
            <div className="flex items-start gap-3">
              <div className="text-brass text-lg">🔥</div>
              <div className="text-text dark:text-darktext">
                <div className="font-medium">Build a Streak</div>
                <div className="text-sm opacity-75">Study daily to build a learning streak</div>
              </div>
            </div>
          )}
          
          {progress.quizStats.averageScore < 70 && progress.quizStats.totalQuizzes > 0 && (
            <div className="flex items-start gap-3">
              <div className="text-brass text-lg">📝</div>
              <div className="text-text dark:text-darktext">
                <div className="font-medium">Practice More</div>
                <div className="text-sm opacity-75">Take more quizzes to improve your score</div>
              </div>
            </div>
          )}
          
          {progress.notesCount < 3 && (
            <div className="flex items-start gap-3">
              <div className="text-brass text-lg">✏️</div>
              <div className="text-text dark:text-darktext">
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
          className="flex-1 rounded border border-border p-1 text-text"
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
      <span className="flex-1 text-text dark:text-darktext">{note}</span>
      <button className="btn text-xs px-2 py-1" onClick={() => setEditing(true)} title="Edit">✏️</button>
      <button className="btn text-xs px-2 py-1" onClick={handleDelete} title="Delete">🗑️</button>
    </li>
  );
} 