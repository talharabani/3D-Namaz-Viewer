import { useEffect, useState, useRef } from 'react';
import audioService from '../utils/audioService';
import notificationService from '../utils/notificationService';
import { ToggleLeft } from '../components/ToggleLeft';
import { useSettings } from '../contexts/SettingsContext';

const PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const AZAN_AUDIO = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
const METHODS = [
  { id: 2, name: 'ISNA' },
  { id: 3, name: 'MWL' },
  { id: 4, name: 'Umm Al-Qura' },
  { id: 5, name: 'Egyptian' },
  { id: 12, name: 'Dubai' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
];
const FIQHS = [
  { id: 'shafi', name: 'Shafi' },
  { id: 'hanafi', name: 'Hanafi' },
  { id: 'ahl-e-hadith', name: 'Ahl-e-Hadith' },
];

function getTimeDiff(target) {
  const now = new Date();
  let diff = (target - now) / 1000;
  if (diff < 0) diff += 24 * 3600; // next day
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = Math.floor(diff % 60);
  return { h, m, s, total: diff };
}

// Function to adjust prayer times according to Ahl-e-Hadith fiqh
function adjustPrayerTimesForAhlEHadith(timings) {
  if (!timings) return timings;
  
  const adjusted = { ...timings };
  
  // Ahl-e-Hadith specific adjustments based on authentic hadith:
  
  // 1. Fajr: When true dawn appears (Subh Sadiq)
  // - API already provides this correctly
  
  // 2. Dhuhr: When sun passes zenith (Zawal)
  // - API already provides this correctly
  
  // 3. Asr: When shadow of an object equals its height (Shadow = 1)
  // - This is already handled by API with school=0 (Shafi method)
  
  // 4. Maghrib: Immediately after sunset (Ghurub)
  // - Ensure Maghrib is set to sunset time
  if (adjusted.Sunset) {
    adjusted.Maghrib = adjusted.Sunset;
  }
  
  // 5. Isha: When twilight disappears (Shafaq)
  // - Ahl-e-Hadith prays Isha earlier than Hanafi
  // - API with school=0 provides this correctly
  
  // 6. Additional Ahl-e-Hadith considerations:
  // - They follow the authentic hadith more strictly
  // - Avoid delaying prayers unnecessarily
  // - Pray in congregation when possible
  
  return adjusted;
}

// Prayer notification messages
const PRAYER_MESSAGES = {
  'Fajr': 'Allahu Akbar! Time for Fajr prayer. Come to Allah, He is calling you.',
  'Dhuhr': 'Allahu Akbar! Time for Dhuhr prayer. Come to Allah, He is calling you.',
  'Asr': 'Allahu Akbar! Time for Asr prayer. Come to Allah, He is calling you.',
  'Maghrib': 'Allahu Akbar! Time for Maghrib prayer. Come to Allah, He is calling you.',
  'Isha': 'Allahu Akbar! Time for Isha prayer. Come to Allah, He is calling you.',
};

export default function PrayerTimesScreen() {
  const { settings } = useSettings();
  const [times, setTimes] = useState(null);
  const [hijri, setHijri] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextIdx, setNextIdx] = useState(0);
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0, total: 0 });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const [currentPrayerAlert, setCurrentPrayerAlert] = useState(null);
  
  const azanRef = useRef();
  const [coords, setCoords] = useState(null);

  // Format time based on settings
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !settings.militaryTime
    };
    
    if (settings.showSeconds) {
      options.second = '2-digit';
    }
    
    return date.toLocaleTimeString('en-US', options);
  };

  // Format countdown time based on settings
  const formatCountdown = (countdown) => {
    const { h, m, s } = countdown;
    
    if (settings.militaryTime) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}${settings.showSeconds ? `:${s.toString().padStart(2, '0')}` : ''}`;
    } else {
      const totalMinutes = h * 60 + m;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      
      let result = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      if (settings.showSeconds) {
        result += `:${s.toString().padStart(2, '0')}`;
      }
      return result;
    }
  };

  // Check notification permission status (without requesting)
  useEffect(() => {
    const checkNotificationStatus = () => {
      const enabled = notificationService.isEnabled();
      setNotificationsEnabled(enabled);
    };
    checkNotificationStatus();
  }, []);

  // Show prayer notification
  const showPrayerNotification = (prayerName) => {
    const enhancedMessage = `🕌 Allahu Akbar! Allah is calling you for ${prayerName} prayer at ${times[prayerName]}`;
    
    // Show browser notification with enhanced features
    notificationService.showPrayerNotification(prayerName, times[prayerName]);

    // Show in-app alert with enhanced message
    setCurrentPrayerAlert({
      prayer: prayerName,
      message: enhancedMessage,
      timestamp: Date.now()
    });

    // Play Allahu Akbar sound once with vibration
    audioService.playNotificationWithVibration();

    // Auto-hide alert after 30 seconds
    setTimeout(() => {
      setCurrentPrayerAlert(null);
    }, 30000);
  };

  // Get user location and fetch prayer times
  useEffect(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      setCoords({ latitude, longitude });
      try {
        // Handle different fiqh calculations using settings
        let school = 0; // Default Shafi
        if (settings.fiqh === 'hanafi') {
          school = 1;
        } else if (settings.fiqh === 'ahl-e-hadith') {
          // Ahl-e-Hadith uses different calculation method
          school = 0; // Similar to Shafi but with specific adjustments
        }
        
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${settings.prayerMethod}&school=${school}`, {
          timeout: 10000 // 10 second timeout
        });
        if (!res.ok) {
          throw new Error(`Prayer times API responded with status: ${res.status}`);
        }
        const data = await res.json();
        if (data.code === 200 && data.data && data.data.timings) {
          let prayerTimes = data.data.timings;
          
          // Apply Ahl-e-Hadith specific adjustments if selected
          if (settings.fiqh === 'ahl-e-hadith') {
            prayerTimes = adjustPrayerTimesForAhlEHadith(prayerTimes);
          }
          
          setTimes(prayerTimes);
          setHijri(`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year} AH`);
          
          // Schedule notifications for all prayer times
          notificationService.schedulePrayerNotifications(prayerTimes);
        } else {
          throw new Error('Invalid prayer times data');
        }
      } catch (error) {
        console.warn('Prayer times API failed:', error);
        setError('Failed to fetch prayer times. Please check your internet connection and try again.');
      }
      setLoading(false);
    }, () => {
      setError('Location denied or unavailable.');
      setLoading(false);
    });
  }, [settings.prayerMethod, settings.fiqh]);

  // Find next prayer and update countdown
  useEffect(() => {
    if (!times) return;
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const prayerTimes = PRAYERS.map(p => {
      const [h, m] = times[p].split(':').map(Number);
      const t = new Date(today + 'T' + times[p].padStart(5, '0'));
      t.setHours(h, m, 0, 0);
      return t;
    });
    let idx = prayerTimes.findIndex((t, i) => t > now && PRAYERS[i] !== 'Sunrise');
    if (idx === -1) idx = 0; // next day
    setNextIdx(idx);
    const diff = getTimeDiff(prayerTimes[idx]);
    setCountdown(diff);
    
    // Check if it's prayer time (within 1 minute)
    if (diff.total < 60 && diff.total > 0) {
      const prayerName = PRAYERS[idx];
      if (prayerName !== 'Sunrise') {
        showPrayerNotification(prayerName);
      }
    }
    
    // Azan sound when time is up
    if (diff.total < 1 && azanRef.current) {
      azanRef.current.currentTime = 0;
      azanRef.current.play();
    }
    
    const interval = setInterval(() => {
      const now2 = new Date();
      const diff2 = getTimeDiff(prayerTimes[idx]);
      setCountdown(diff2);
      
      // Check for prayer time again
      if (diff2.total < 60 && diff2.total > 0) {
        const prayerName = PRAYERS[idx];
        if (prayerName !== 'Sunrise') {
          showPrayerNotification(prayerName);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [times]);

  // Enable notifications
  const enableNotifications = async () => {
    const enabled = await notificationService.requestPermission();
    setNotificationsEnabled(enabled);
    if (enabled) {
      setShowNotificationAlert(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1] flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🕋</div>
        <div className="text-xl text-brass font-bold">Loading prayer times...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1] flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <div className="text-xl text-error font-bold">{error}</div>
      </div>
    </div>
  );
  
  if (!times) return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 py-8 px-4">
        {/* Header Section */}
        <div className="w-full text-center mb-8">
          <div className="text-5xl font-heading text-brass font-bold drop-shadow-2xl mb-4 bg-gradient-to-r from-brass to-wood bg-clip-text text-transparent">
            Prayer Times
          </div>
          <div className="text-lg text-text dark:text-darktext opacity-90 max-w-2xl mx-auto">
            Check prayer timings and get notified when it's time to pray
          </div>
        </div>

        {/* Prayer Time Alert Modal */}
        {currentPrayerAlert && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-brass/20">
              <div className="text-6xl mb-6">🕌</div>
              <h2 className="text-3xl font-heading text-brass font-bold mb-4">
                {currentPrayerAlert.prayer} Prayer Time
              </h2>
              <p className="text-text dark:text-darktext text-lg mb-8 leading-relaxed">
                {currentPrayerAlert.message}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentPrayerAlert(null)}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-brass to-wood text-white font-bold hover:from-wood hover:to-brass transition-all duration-300 shadow-lg"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    setCurrentPrayerAlert(null);
                    // Navigate to prayer guide or tracker
                  }}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold hover:from-accent2 hover:to-accent transition-all duration-300 shadow-lg"
                >
                  Start Prayer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Permission Alert */}
        {showNotificationAlert && (
          <div className="w-full max-w-4xl">
            <div className="card p-6 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-brass font-bold text-lg mb-2">Enable Prayer Notifications</h3>
                  <p className="text-text dark:text-darktext">Get notified when it's time for prayer</p>
                </div>
                <button
                  onClick={enableNotifications}
                  className="px-6 py-3 bg-warning text-white rounded-xl font-bold hover:bg-warning/80 transition-all duration-300 shadow-lg"
                >
                  Enable
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Info Section */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-2xl font-heading text-brass font-bold">Current Settings</div>
              <div className="flex gap-4 text-sm">
                <div className="text-text dark:text-darktext">
                  <span className="text-brass font-bold">Method:</span> {METHODS.find(m => m.id === settings.prayerMethod)?.name}
                </div>
                <div className="text-text dark:text-darktext">
                  <span className="text-brass font-bold">Fiqh:</span> {FIQHS.find(f => f.id === settings.fiqh)?.name}
                </div>
                <div className="text-text dark:text-darktext">
                  <span className="text-brass font-bold">Time Format:</span> {settings.militaryTime ? '24h' : '12h'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Times Display */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-text dark:text-darktext font-body">
                <span className="text-brass font-bold">Fiqh:</span> {FIQHS.find(f => f.id === settings.fiqh)?.name}
                {settings.fiqh === 'ahl-e-hadith' && (
                  <span className="ml-2 text-xs text-accent4">
                    (Asr: Shadow=1, Maghrib: After sunset, Isha: Earlier)
                  </span>
                )}
              </div>
              <div className="text-right text-brass font-bold font-body">{hijri}</div>
            </div>
            
            <div className="space-y-4">
              {PRAYERS.map((p, i) => (
                <div
                  key={p}
                  className={`relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    i === nextIdx 
                      ? 'bg-gradient-to-r from-accent/20 to-accent2/20 border-2 border-accent2 shadow-vibrant' 
                      : 'bg-gradient-to-r from-card/80 to-card/60 border border-brass/20'
                  }`}
                  style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
                >
                  <div className="flex flex-col">
                    <span className="text-xl font-heading text-brass font-bold">{p}</span>
                    <span className="text-lg text-text dark:text-darktext font-body">{formatTime(times[p])}</span>
                  </div>
                  {i === nextIdx && p !== 'Sunrise' ? (
                    <div className="flex items-center gap-3">
                      {/* Countdown ring */}
                      <svg width="48" height="48" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(181, 166, 66, 0.2)" strokeWidth="6" />
                        <circle
                          cx="24" cy="24" r="20"
                          fill="none"
                          stroke="currentColor"
                          className="text-accent"
                          strokeWidth="6"
                          strokeDasharray={2 * Math.PI * 20}
                          strokeDashoffset={(2 * Math.PI * 20) * (1 - countdown.total / (60 * 60))}
                          style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                        <text x="24" y="28" textAnchor="middle" fontSize="14" className="text-accent" fill="currentColor">{formatCountdown(countdown)}</text>
                      </svg>
                      {/* Azan icon pulse */}
                      <span className={`text-3xl text-accent2 ${countdown.total < 60 ? 'animate-azan-pulse' : ''}`}>🔊</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Notification Status */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-brass font-bold text-lg mb-2">Prayer Notifications</h3>
                <p className="text-text dark:text-darktext">
                  {notificationsEnabled 
                    ? '✅ Notifications enabled - You will be notified at prayer times'
                    : '❌ Notifications disabled - Click to enable'
                  }
                </p>
              </div>
              <ToggleLeft
                isActive={notificationsEnabled}
                onChange={enableNotifications}
                stroke="#956D37"
              />
            </div>
          </div>
        </div>
        
        <audio ref={azanRef} src={AZAN_AUDIO} preload="auto" />
      </div>
    </div>
  );
} 