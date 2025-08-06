import { useState, useEffect } from 'react';
import { progressTracker } from '../utils/progressTracker';
import { ToggleLeft } from '../components/ToggleLeft';

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
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-8 px-4">
          <div className="text-lg text-text dark:text-darktext">Loading progress...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 py-8 px-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-heading text-brass font-bold text-center">Your Progress</h1>
          <button className="btn ml-4" onClick={loadProgress} title="Refresh Progress">🔄 Refresh</button>
        </div>
      
      {/* Achievement Notification */}
      {showAchievement && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-brass text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="font-bold">{showAchievement.title}</div>
            <div className="text-sm opacity-90">{showAchievement.description}</div>
          </div>
        </div>
      )}

      {/* Overall Progress */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Learning Progress</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text dark:text-darktext font-medium">Completion</span>
            <span className="text-brass font-bold text-lg">{progress.completionPercentage}%</span>
          </div>
          <div className="w-full bg-border dark:bg-darkborder rounded-full h-3">
            <div 
              className="bg-brass h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text dark:text-darktext font-medium">Current Step</span>
            <span className="text-brass font-bold">{progress.currentStep}/8</span>
          </div>
        </div>
      </div>

      {/* Points Section */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">🏆 Points & Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
            <div className="text-3xl text-brass font-bold">{progress.points?.total || 0}</div>
            <div className="text-sm text-text dark:text-darktext">Total Points</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
            <div className="text-3xl text-brass font-bold">{progress.points?.today || 0}</div>
            <div className="text-sm text-text dark:text-darktext">Today's Points</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
            <div className="text-3xl text-brass font-bold">{progress.points?.thisWeek || 0}</div>
            <div className="text-sm text-text dark:text-darktext">This Week</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
            <div className="text-3xl text-brass font-bold">{progress.challengeStreak || 0}</div>
            <div className="text-sm text-text dark:text-darktext">Challenge Streak</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
          <div className="text-center">
            <div className="text-sm text-text dark:text-darktext">
              Completed {progress.completedChallengesToday || 0} challenges today
            </div>
            <div className="text-xs text-text dark:text-darktext opacity-80 mt-1">
              Keep up the great work! 🌟
            </div>
          </div>
        </div>
      </div>

      {/* Study & Prayer Statistics (merged) */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Study & Prayer Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl text-brass font-bold">{progress.streakDays}</div>
            <div className="text-sm text-text dark:text-darktext">Learning Streak (days)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brass font-bold">{progress.prayerStreak}</div>
            <div className="text-sm text-text dark:text-darktext">Prayer Streak (days)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brass font-bold">{Math.round(progress.totalStudyTime / 60 * 10) / 10}</div>
            <div className="text-sm text-text dark:text-darktext">Study Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brass font-bold">{progress.quizStats.totalQuizzes}</div>
            <div className="text-sm text-text dark:text-darktext">Quizzes Taken</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brass font-bold">{getNotesCount()}</div>
            <div className="text-sm text-text dark:text-darktext">Notes Added</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brass font-bold">{progress.prayerFullDays}</div>
            <div className="text-sm text-text dark:text-darktext">Full 5-Prayer Days</div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Your Notes</h2>
        <ul className="list-disc pl-6 space-y-2">
          {getNotesList().filter(n => n && n.trim() !== '').length === 0 ? (
            <li className="text-text dark:text-darktext">No notes yet. Add notes while learning to see them here.</li>
          ) : (
            getNotesList().map((note, idx) => note && note.trim() !== '' && (
              <NoteItem key={idx} note={note} idx={idx} refresh={loadProgress} />
            ))
          )}
        </ul>
      </div>

      {/* Prayer History */}
      <div className="card overflow-x-auto">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Prayer History</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <label className="flex items-center gap-2 text-sm">
            Start:
            <input type="date" value={prayerStart} onChange={e => setPrayerStart(e.target.value)} className="rounded border p-1" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            End:
            <input type="date" value={prayerEnd} onChange={e => setPrayerEnd(e.target.value)} className="rounded border p-1" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <ToggleLeft
              isActive={showFullDaysOnly}
              onChange={(active) => setShowFullDaysOnly(active)}
              stroke="#956D37"
            />
            <span>Show only full days</span>
          </label>
        </div>
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 border-b border-border dark:border-darkborder text-left">Date</th>
              <th className="p-2 border-b border-border dark:border-darkborder text-center">Fajr</th>
              <th className="p-2 border-b border-border dark:border-darkborder text-center">Dhuhr</th>
              <th className="p-2 border-b border-border dark:border-darkborder text-center">Asr</th>
              <th className="p-2 border-b border-border dark:border-darkborder text-center">Maghrib</th>
              <th className="p-2 border-b border-border dark:border-darkborder text-center">Isha</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let entries = Object.entries(getPrayerHistory());
              if (prayerStart) entries = entries.filter(([date]) => date >= prayerStart);
              if (prayerEnd) entries = entries.filter(([date]) => date <= prayerEnd);
              if (showFullDaysOnly) entries = entries.filter(([_, arr]) => arr.length === 5 && arr.every(Boolean));
              if (entries.length === 0) return (
                <tr><td colSpan={6} className="p-2 text-center text-text dark:text-darktext">No prayer history for selected filters.</td></tr>
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
                  <tr key={date} className={isStreak ? 'bg-wood/10' : isFull ? 'bg-brass/10' : ''}>
                    <td className="p-2 border-b border-border dark:border-darkborder font-bold">{date}</td>
                    {arr.map((done, idx) => (
                      <td key={idx} className={`p-2 border-b border-border dark:border-darkborder text-center ${done ? 'text-brass font-bold' : 'text-gray-400'}`}>{done ? '✓' : '-'}</td>
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