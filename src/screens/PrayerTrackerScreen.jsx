import { useState } from 'react';
import { progressTracker } from '../utils/progressTracker';

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

export default function PrayerTrackerScreen() {
  const today = new Date();
  const [marked, setMarked] = useState({}); // { 'YYYY-MM-DD': [true, true, ...] }
  const [privacy, setPrivacy] = useState(false);
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = getMonthDays(year, month);

  // Calculate stats
  let fullDays = 0;
  Object.values(marked).forEach(arr => {
    if (arr.length === PRAYERS.length && arr.every(Boolean)) fullDays++;
  });
  const streak = Object.values(marked).reduce((acc, arr) => (arr.length === PRAYERS.length && arr.every(Boolean)) ? acc + 1 : 0, 0);

  function togglePrayer(dateStr, idx) {
    setMarked(prev => {
      const arr = prev[dateStr] ? [...prev[dateStr]] : Array(PRAYERS.length).fill(false);
      arr[idx] = !arr[idx];
      const updated = { ...prev, [dateStr]: arr };
      // Update progress tracker for prayer streak/full days
      progressTracker.updatePrayerDay(dateStr, arr);
      return updated;
    });
  }

  if (privacy) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="text-2xl mb-4 text-text dark:text-darktext">🔒 Prayer Tracker is locked</div>
        <button className="btn" onClick={() => setPrivacy(false)}>
          Unlock
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto gap-8 py-8">
      <div className="flex justify-between w-full items-center">
        <div className="text-3xl font-heading text-brass font-bold">Prayer Tracker</div>
        <button className="btn text-sm" onClick={() => setPrivacy(true)}>
          Lock 🔒
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b border-border dark:border-darkborder text-left text-text dark:text-darktext">Date</th>
              {PRAYERS.map(p => (
                <th key={p} className="p-2 border-b border-border dark:border-darkborder text-center text-text dark:text-darktext">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(date => {
              const dateStr = date.toISOString().slice(0, 10);
              return (
                <tr key={dateStr} className={dateStr === today.toISOString().slice(0, 10) ? 'bg-brass/10' : ''}>
                  <td className="p-2 border-b border-border dark:border-darkborder font-bold text-text dark:text-darktext">{date.getDate()}</td>
                  {PRAYERS.map((_, idx) => (
                    <td key={idx} className="p-2 border-b border-border dark:border-darkborder text-center">
                      <button
                        className={`w-6 h-6 rounded-full border-2 ${marked[dateStr]?.[idx] ? 'bg-wood border-brass' : 'bg-card dark:bg-darkcard border-border dark:border-darkborder'}`}
                        onClick={() => togglePrayer(dateStr, idx)}
                        aria-label={`Toggle ${PRAYERS[idx]} for ${dateStr}`}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full card flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="text-lg text-text dark:text-darktext">You've prayed <span className="font-bold text-brass">{PRAYERS.length}</span> times/day for <span className="font-bold text-brass">{fullDays}</span> days</div>
        <div className="text-lg text-text dark:text-darktext">🔥 Streak: <span className="font-bold text-wood">{streak}</span> days</div>
      </div>
    </div>
  );
} 