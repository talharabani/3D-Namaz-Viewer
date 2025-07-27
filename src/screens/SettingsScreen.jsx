import { useState, useEffect } from 'react';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
      sunrise: false,
      advanceMinutes: 10
    },
    location: {
      autoDetect: true,
      latitude: null,
      longitude: null,
      city: '',
      country: ''
    },
    prayerMethod: 2, // ISNA
    fiqh: 'shafi',
    theme: 'auto', // auto, light, dark
    language: 'en',
    soundEnabled: true,
    vibrationEnabled: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('namaz_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
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
            country: data.countryName || ''
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
      if (permission === 'granted') {
        alert('Notifications enabled! You will receive prayer time alerts.');
      } else {
        alert('Please enable notifications in your browser settings to receive prayer alerts.');
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 py-8 px-4">
      <h1 className="text-3xl font-heading text-brass font-bold text-center mb-6">Settings</h1>
      
      {/* Notifications Section */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Prayer Notifications</h2>
        <div className="space-y-3">
          {Object.entries(settings.notifications).map(([prayer, enabled]) => {
            if (prayer === 'advanceMinutes') return null;
            return (
              <div key={prayer} className="flex items-center justify-between">
                <span className="text-text dark:text-darktext font-medium capitalize">{prayer}</span>
                <button
                  className={`w-12 h-6 rounded-full transition-colors ${
                    enabled ? 'bg-brass' : 'bg-border dark:bg-darkborder'
                  }`}
                  onClick={() => updateNotificationSetting(prayer, !enabled)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            );
          })}
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-text dark:text-darktext font-medium">Advance Alert (minutes)</span>
            <select
              value={settings.notifications.advanceMinutes}
              onChange={(e) => updateAdvanceMinutes(parseInt(e.target.value))}
              className="bg-card dark:bg-darkcard border border-border dark:border-darkborder rounded-lg px-3 py-1 text-text dark:text-darktext"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          
          <button
            className="btn w-full mt-4"
            onClick={requestNotificationPermission}
          >
            Enable Notifications
          </button>
        </div>
      </div>

      {/* Location Section */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Location Settings</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text dark:text-darktext font-medium">Auto-detect Location</span>
            <button
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.location.autoDetect ? 'bg-brass' : 'bg-border dark:bg-darkborder'
              }`}
              onClick={() => {
                const newSettings = {
                  ...settings,
                  location: { ...settings.location, autoDetect: !settings.location.autoDetect }
                };
                saveSettings(newSettings);
              }}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.location.autoDetect ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          {settings.location.city && (
            <div className="text-sm text-text dark:text-darktext">
              Current: {settings.location.city}, {settings.location.country}
            </div>
          )}
          
          <button
            className="btn w-full"
            onClick={updateLocation}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Location'}
          </button>
        </div>
      </div>

      {/* Prayer Calculation Method */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Prayer Calculation</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-text dark:text-darktext font-medium mb-2">Calculation Method</label>
            <select
              value={settings.prayerMethod}
              onChange={(e) => saveSettings({ ...settings, prayerMethod: parseInt(e.target.value) })}
              className="w-full bg-card dark:bg-darkcard border border-border dark:border-darkborder rounded-lg px-3 py-2 text-text dark:text-darktext"
            >
              <option value={2}>ISNA</option>
              <option value={3}>MWL</option>
              <option value={4}>Umm Al-Qura</option>
              <option value={5}>Egyptian</option>
              <option value={12}>Dubai</option>
              <option value={1}>University of Islamic Sciences, Karachi</option>
            </select>
          </div>
          
          <div>
            <label className="block text-text dark:text-darktext font-medium mb-2">Fiqh</label>
            <select
              value={settings.fiqh}
              onChange={(e) => saveSettings({ ...settings, fiqh: e.target.value })}
              className="w-full bg-card dark:bg-darkcard border border-border dark:border-darkborder rounded-lg px-3 py-2 text-text dark:text-darktext"
            >
              <option value="shafi">Shafi</option>
              <option value="hanafi">Hanafi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Appearance</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-text dark:text-darktext font-medium mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => updateTheme(e.target.value)}
              className="w-full bg-card dark:bg-darkcard border border-border dark:border-darkborder rounded-lg px-3 py-2 text-text dark:text-darktext"
            >
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text dark:text-darktext font-medium">Sound Effects</span>
            <button
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-brass' : 'bg-border dark:bg-darkborder'
              }`}
              onClick={() => saveSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text dark:text-darktext font-medium">Vibration</span>
            <button
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.vibrationEnabled ? 'bg-brass' : 'bg-border dark:bg-darkborder'
              }`}
              onClick={() => saveSettings({ ...settings, vibrationEnabled: !settings.vibrationEnabled })}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h2 className="text-xl font-heading text-brass font-bold mb-4">Data Management</h2>
        <div className="space-y-3">
          <button
            className="btn w-full"
            onClick={() => {
              if (confirm('This will clear all your saved data. Are you sure?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Clear All Data
          </button>
          
          <button
            className="btn w-full"
            onClick={() => {
              const data = {
                settings: localStorage.getItem('namaz_settings'),
                notes: localStorage.getItem('learn_notes'),
                progress: localStorage.getItem('learn_progress')
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'namaz-app-data.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
} 