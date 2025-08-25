import { useState, useEffect } from 'react';
import { progressTracker } from '../utils/progressTracker';
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl border border-brass/30 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-brass mb-6 text-center">
          {t('notesFor')} {new Date(dateStr).toLocaleDateString()}
        </h3>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={t('addYourPrayerNotesHere')}
          className="w-full h-32 p-4 border-2 border-brass/30 dark:border-brass/60 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 resize-none focus:border-wood focus:ring-2 focus:ring-wood/20 transition-all backdrop-blur-sm"
        />
        <div className="flex gap-3 mt-6">
          <MotionButton
            className="flex-1 bg-gradient-to-r from-wood to-brass hover:from-brass hover:to-wood text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              onSave(dateStr, noteText);
              onClose();
            }}
            {...buttonPress}
          >
            {t('save')}
          </MotionButton>
          <MotionButton
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onClose}
            {...buttonPress}
          >
            {t('cancel')}
          </MotionButton>
        </div>
      </GlowCard>
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
        <MotionButton 
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkToday}
          {...buttonPress}
        >
          {t('markTodayComplete')}
        </MotionButton>
        <MotionButton 
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkWeek}
          {...buttonPress}
        >
          {t('markThisWeek')}
        </MotionButton>
        <MotionButton 
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={onMarkAll}
          {...buttonPress}
        >
          {t('markAllThisMonth')}
        </MotionButton>
      </div>
    </GlowCard>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color, onClick }) {
  return (
    <MotionCard
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
    </MotionCard>
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
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'stats'
  const [exportData, setExportData] = useState(null);

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
    <MotionDiv 
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative"
      {...pageTransition}
    >
      {/* Floating Islamic Calligraphy - Perfectly Positioned */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-30">
        <GlowCard className="group islamic-calligraphy bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-2xl p-3 sm:p-4 border border-brass/30 shadow-2xl backdrop-blur-sm hover:shadow-3xl hover:scale-105 transition-all duration-500 max-w-[140px] sm:max-w-[160px] md:max-w-[180px]">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-arabic text-brass mb-1 group-hover:text-amber-600 transition-colors duration-300">📊</div>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-brass transition-colors duration-300">تتبع</h2>
          </div>
        </GlowCard>
      </div>

      <div className="w-full max-w-7xl mx-auto py-8 px-4 pt-24 sm:pt-28">
        {/* Beautiful Calligraphy Header - Perfectly Centered */}
        <div className="text-center mb-16 flex flex-col items-center justify-center min-h-[40vh] px-4">
          {/* Arabic Calligraphy - Perfectly Centered */}
          <div className="mb-16 animate-fadeInScale text-center w-full max-w-5xl arabic-content">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-arabic text-brass mb-8 leading-none drop-shadow-2xl animate-pulse arabic-text-center font-bold tracking-wide">
              📊 {t('prayerTracker')}
            </div>
            <div className="text-sm md:text-base text-text dark:text-darktext opacity-80 italic text-center mx-auto max-w-2xl">
              {t('trackYourDailyPrayers')}
            </div>
          </div>

          {/* Enhanced Islamic Design - Perfectly Centered */}
          <div className="relative mb-16 animate-fadeInUp text-center w-full max-w-5xl arabic-content">
            {/* Decorative Islamic pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-brass to-transparent opacity-40 animate-shimmer"></div>
            </div>
            
            {/* Beautiful Arabic Calligraphy - Perfectly Centered */}
            <div className="mb-8 text-center w-full">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arabic text-brass mb-6 leading-relaxed drop-shadow-xl animate-float arabic-text-center font-bold tracking-wide">
                تتبع الصلاة
              </div>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
                {t('monitorYourPrayerProgress')}
              </p>
            </div>

            {/* Enhanced Islamic quote with better styling - Perfectly Centered */}
            <GlowCard className="bg-gradient-to-r from-brass/15 to-wood/15 rounded-3xl p-8 sm:p-10 border border-brass/30 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl animate-pulse-glow text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-arabic text-brass mb-4 leading-relaxed arabic-text-center font-bold tracking-wide">
                "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"
              </div>
              <div className="text-sm sm:text-base md:text-lg text-text dark:text-darktext opacity-90 italic text-center mx-auto">
                "Indeed, prayer has been decreed upon the believers a decree of specified times"
              </div>
              <div className="text-xs sm:text-sm text-text dark:text-darktext opacity-70 mt-4 font-semibold text-center mx-auto">
                Quran 4:103
              </div>
            </GlowCard>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-1 border border-brass/30 backdrop-blur-sm">
            <MotionButton
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                viewMode === 'calendar' 
                  ? 'bg-gradient-to-r from-brass to-wood text-white shadow-lg' 
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-brass/10'
              }`}
              onClick={() => setViewMode('calendar')}
              {...buttonPress}
            >
              📅 {t('calendar')}
            </MotionButton>
            <MotionButton
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                viewMode === 'stats' 
                  ? 'bg-gradient-to-r from-brass to-wood text-white shadow-lg' 
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-brass/10'
              }`}
              onClick={() => setViewMode('stats')}
              {...buttonPress}
            >
              📊 {t('statistics')}
            </MotionButton>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-8">
              <MotionButton
                onClick={goToPreviousMonth}
                className="bg-gradient-to-r from-brass to-wood text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                {...buttonPress}
              >
                ← {t('previous')}
              </MotionButton>
              
              <h2 className="text-2xl font-bold text-brass">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              
              <MotionButton
                onClick={goToNextMonth}
                className="bg-gradient-to-r from-brass to-wood text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                {...buttonPress}
              >
                {t('next')} →
              </MotionButton>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <QuickActions 
                onMarkAll={markMonthComplete}
                onMarkToday={markTodayComplete}
                onMarkWeek={markWeekComplete}
              />
            </div>

            {/* Calendar Grid */}
            <MotionDiv className="grid grid-cols-7 gap-2 mb-8" {...staggerContainer}>
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <MotionDiv
                  key={day}
                  className="text-center font-bold text-brass p-2"
                  {...staggerItem}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {day}
                </MotionDiv>
              ))}
              
              {/* Calendar days */}
              {days.map((day, index) => {
                const dateStr = day.toISOString().split('T')[0];
                const dayProgress = progressTracker.getDayProgress(dateStr);
                const isToday = day.toDateString() === new Date().toDateString();
                const isCurrentMonth = day.getMonth() === month;
                
                return (
                  <MotionCard
                    key={day.toISOString()}
                    className={`p-2 rounded-xl border border-brass/30 transition-all duration-300 cursor-pointer hover:shadow-lg backdrop-blur-sm ${
                      isToday ? 'ring-2 ring-brass shadow-lg' : ''
                    } ${
                      isCurrentMonth 
                        ? 'bg-white/80 dark:bg-gray-800/80' 
                        : 'bg-gray-100/50 dark:bg-gray-700/50'
                    }`}
                    onClick={() => setSelectedDate(day)}
                    {...staggerItem}
                    style={{ animationDelay: `${(index + 7) * 50}ms` }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <div className={`text-sm font-semibold mb-1 ${
                        isToday ? 'text-brass' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {day.getDate()}
                      </div>
                      
                      {/* Prayer indicators */}
                      <div className="grid grid-cols-5 gap-1">
                        {PRAYERS.map(prayer => {
                          const isCompleted = dayProgress[prayer];
                          return (
                            <div
                              key={prayer}
                              className={`w-2 h-2 rounded-full ${
                                isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              title={`${prayer}: ${isCompleted ? t('completed') : t('notCompleted')}`}
                            />
                          );
                        })}
                      </div>
                      
                      {/* Note indicator */}
                      {notes[dateStr] && (
                        <div className="text-xs text-brass mt-1">📝</div>
                      )}
                    </div>
                  </MotionCard>
                );
              })}
            </MotionDiv>

            {/* Selected Date Details */}
            {selectedDate && (
              <MotionDiv className="mb-8" {...fadeInUp}>
                <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 p-6 rounded-2xl shadow-xl border border-brass/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-brass">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <MotionButton
                      onClick={() => setSelectedDate(null)}
                      className="text-gray-500 hover:text-brass transition-colors"
                      {...buttonPress}
                    >
                      ✕
                    </MotionButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Prayer status */}
                    <div>
                      <h4 className="font-semibold text-brass mb-3">{t('prayerStatus')}</h4>
                      <div className="space-y-2">
                        {PRAYERS.map(prayer => {
                          const dateStr = selectedDate.toISOString().split('T')[0];
                          const isCompleted = progressTracker.getDayProgress(dateStr)[prayer];
                          
                          return (
                            <div key={prayer} className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span className="text-lg">{PRAYER_TIMES[prayer]}</span>
                                <span className="text-gray-700 dark:text-gray-300">{prayer}</span>
                              </span>
                              <MotionButton
                                onClick={() => togglePrayer(selectedDate, prayer)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                                  isCompleted
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                                {...buttonPress}
                              >
                                {isCompleted ? t('completed') : t('markComplete')}
                              </MotionButton>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Notes */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-brass">{t('notes')}</h4>
                        <MotionButton
                          onClick={() => editNote(selectedDate.toISOString().split('T')[0])}
                          className="px-3 py-1 bg-gradient-to-r from-brass to-wood text-white rounded-lg text-sm hover:from-wood hover:to-brass transition-all font-medium"
                          {...buttonPress}
                        >
                          {notes[selectedDate.toISOString().split('T')[0]] ? t('edit') : t('add')}
                        </MotionButton>
                      </div>
                      
                      {notes[selectedDate.toISOString().split('T')[0]] ? (
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <p className="text-gray-700 dark:text-gray-300">
                            {notes[selectedDate.toISOString().split('T')[0]]}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic">
                          {t('noNotesForThisDay')}
                        </p>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </MotionDiv>
            )}
          </>
        ) : (
          /* Statistics View */
          <MotionDiv className="space-y-8" {...staggerContainer}>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title={t('completionRate')}
                value={`${completionRate}%`}
                icon="📊"
                color="text-brass"
              />
              <StatCard
                title={t('totalPrayers')}
                value={totalPrayers}
                icon="🕌"
                color="text-blue-600"
              />
              <StatCard
                title={t('completedPrayers')}
                value={completedPrayers}
                icon="✅"
                color="text-green-600"
              />
              <StatCard
                title={t('missedPrayers')}
                value={totalPrayers - completedPrayers}
                icon="❌"
                color="text-red-600"
              />
            </div>

            {/* Streak Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard
                title={t('currentStreak')}
                value={`${currentStreak} ${t('days')}`}
                icon="🔥"
                color="text-orange-600"
              />
              <StatCard
                title={t('longestStreak')}
                value={`${longestStreak} ${t('days')}`}
                icon="🏆"
                color="text-yellow-600"
              />
            </div>

            {/* Export/Import */}
            <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 p-6 rounded-2xl shadow-xl border border-brass/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-brass mb-4">{t('dataManagement')}</h3>
              <div className="flex flex-wrap gap-4">
                <MotionButton
                  onClick={handleExport}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  {...buttonPress}
                >
                  📤 {t('exportData')}
                </MotionButton>
                
                <label className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  📥 {t('importData')}
                  <input
                    type="file"
                    accept=".json,.zip"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
                
                <MotionButton
                  onClick={goToCurrentMonth}
                  className="bg-gradient-to-r from-brass to-wood text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  {...buttonPress}
                >
                  📅 {t('goToCurrentMonth')}
                </MotionButton>
              </div>
              
              {/* Export/Import feedback */}
              {exportData && (
                <div className={`mt-4 p-3 rounded-lg ${
                  exportData.success 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                }`}>
                  {exportData.message}
                </div>
              )}
            </GlowCard>
          </MotionDiv>
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
    </MotionDiv>
  );
} 