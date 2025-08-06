import { useEffect, useState } from 'react';
import { ToggleLeft } from '../components/ToggleLeft';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
      sunrise: false,
      advanceMinutes: 10,
      adhanSound: true,
      reminderSound: true,
      silentMode: false,
      doNotDisturb: {
        enabled: false,
        startTime: '22:00',
        endTime: '06:00'
      }
    },
    location: {
      autoDetect: true,
      latitude: null,
      longitude: null,
      city: '',
      country: '',
      timezone: ''
    },
    prayerMethod: 2, // ISNA
    fiqh: 'shafi',
    theme: 'auto', // auto, light, dark
    language: 'en',
    soundEnabled: true,
    vibrationEnabled: true,
    qiblaDirection: true,
    hijriCalendar: true,
    showSeconds: false,
    militaryTime: false,
    autoRefresh: true,
    offlineMode: true,
    dataUsage: {
      autoSync: true,
      syncInterval: 30, // minutes
      backgroundSync: true
    },
    accessibility: {
      largeText: false,
      highContrast: false,
      reduceMotion: false,
      screenReader: false
    }
  });

  const [loading, setLoading] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('namaz_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('namaz_settings', JSON.stringify(newSettings));
  };

  const updateNotificationSetting = (prayer, enabled) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [prayer]: enabled
      }
    };
    saveSettings(newSettings);
  };

  const updateAdvanceMinutes = (minutes) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        advanceMinutes: minutes
      }
    };
    saveSettings(newSettings);
  };

  const updateLocation = async () => {
    setLoading(true);
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          });
        });

        const { latitude, longitude } = position.coords;
        
        // Get city name using reverse geocoding
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        
        const newSettings = {
          ...settings,
          location: {
            autoDetect: true,
            latitude,
            longitude,
            city: data.city || '',
            country: data.countryName || '',
            timezone: data.timezone || ''
          }
        };
        saveSettings(newSettings);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Could not get your location. Please check your location permissions.');
    } finally {
      setLoading(false);
    }
  };

  const updateTheme = (theme) => {
    const newSettings = { ...settings, theme };
    saveSettings(newSettings);
    
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto theme - check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        alert('Notifications enabled! You will receive prayer time alerts.');
      } else {
        alert('Please enable notifications in your browser settings to receive prayer alerts.');
      }
    }
  };

  const resetToDefaults = () => {
    if (confirm('This will reset all settings to default values. Are you sure?')) {
      const defaultSettings = {
        notifications: {
          fajr: true,
          dhuhr: true,
          asr: true,
          maghrib: true,
          isha: true,
          sunrise: false,
          advanceMinutes: 10,
          adhanSound: true,
          reminderSound: true,
          silentMode: false,
          doNotDisturb: {
            enabled: false,
            startTime: '22:00',
            endTime: '06:00'
          }
        },
        location: {
          autoDetect: true,
          latitude: null,
          longitude: null,
          city: '',
          country: '',
          timezone: ''
        },
        prayerMethod: 2,
        fiqh: 'shafi',
        theme: 'auto',
        language: 'en',
        soundEnabled: true,
        vibrationEnabled: true,
        qiblaDirection: true,
        hijriCalendar: true,
        showSeconds: false,
        militaryTime: false,
        autoRefresh: true,
        offlineMode: true,
        dataUsage: {
          autoSync: true,
          syncInterval: 30,
          backgroundSync: true
        },
        accessibility: {
          largeText: false,
          highContrast: false,
          reduceMotion: false,
          screenReader: false
        }
      };
      saveSettings(defaultSettings);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 py-8 px-4">
        {/* Header Section */}
        <div className="w-full text-center mb-8">
          <div className="text-5xl font-heading text-brass font-bold drop-shadow-2xl mb-4 bg-gradient-to-r from-brass to-wood bg-clip-text text-transparent">
            Settings
          </div>
          <div className="text-lg text-text dark:text-darktext opacity-90 max-w-2xl mx-auto">
            Customize your prayer experience and app preferences
          </div>
        </div>

        {/* Settings Sections */}
        <div className="w-full max-w-4xl space-y-8">
          {/* Notifications Section */}
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🔔</span>
              <h2 className="text-2xl font-heading text-brass font-bold">Prayer Notifications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(settings.notifications).filter(([key]) => ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(key)).map(([prayer, enabled]) => (
                <div key={prayer} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20">
                  <span className="text-text dark:text-darktext font-semibold capitalize">{prayer}</span>
                  <ToggleLeft
                    isActive={enabled}
                    onChange={(active) => updateNotificationSetting(prayer, active)}
                    stroke="#956D37"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text dark:text-darktext">Advance Notification (minutes)</span>
                <select
                  value={settings.notifications.advanceMinutes}
                  onChange={(e) => updateAdvanceMinutes(Number(e.target.value))}
                  className="rounded-lg border border-brass px-3 py-1 bg-card dark:bg-darkcard text-text dark:text-darktext"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📍</span>
              <h2 className="text-2xl font-heading text-brass font-bold">Location Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text dark:text-darktext">Auto-detect location</span>
                <button
                  onClick={() => updateLocation()}
                  className="bg-gradient-to-r from-brass to-wood text-white px-4 py-2 rounded-lg font-semibold hover:from-wood hover:to-brass transition-all duration-300"
                >
                  Update Location
                </button>
              </div>
            </div>
          </div>

          {/* Prayer Method Section */}
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🕌</span>
              <h2 className="text-2xl font-heading text-brass font-bold">Prayer Method</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text dark:text-darktext">Calculation Method</span>
                <select
                  value={settings.prayerMethod}
                  onChange={(e) => saveSettings({ ...settings, prayerMethod: Number(e.target.value) })}
                  className="rounded-lg border border-brass px-3 py-1 bg-card dark:bg-darkcard text-text dark:text-darktext"
                >
                  <option value={2}>ISNA</option>
                  <option value={3}>MWL</option>
                  <option value={4}>Umm Al-Qura</option>
                  <option value={5}>Egyptian</option>
                  <option value={12}>Dubai</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-text dark:text-darktext">Fiqh</span>
                <select
                  value={settings.fiqh}
                  onChange={(e) => saveSettings({ ...settings, fiqh: e.target.value })}
                  className="rounded-lg border border-brass px-3 py-1 bg-card dark:bg-darkcard text-text dark:text-darktext"
                >
                  <option value="shafi">Shafi</option>
                  <option value="hanafi">Hanafi</option>
                  <option value="ahl-e-hadith">Ahl-e-Hadith</option>
                </select>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🎨</span>
              <h2 className="text-2xl font-heading text-brass font-bold">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text dark:text-darktext">Theme</span>
                <select
                  value={settings.theme}
                  onChange={(e) => updateTheme(e.target.value)}
                  className="rounded-lg border border-brass px-3 py-1 bg-card dark:bg-darkcard text-text dark:text-darktext"
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reset Section */}
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🔄</span>
              <h2 className="text-2xl font-heading text-brass font-bold">Reset Settings</h2>
            </div>
            
            <button
              onClick={resetToDefaults}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 