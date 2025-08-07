import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
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

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('namaz_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Apply settings effects
  useEffect(() => {
    // Apply theme
    applyTheme(settings.theme);
    
    // Apply accessibility settings
    applyAccessibilitySettings(settings.accessibility);
    
    // Apply language
    applyLanguage(settings.language);
    
    // Apply font size
    applyFontSize(settings.accessibility.largeText);
    
    // Apply high contrast
    applyHighContrast(settings.accessibility.highContrast);
    
    // Apply reduced motion
    applyReducedMotion(settings.accessibility.reduceMotion);
    
  }, [settings]);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      // Auto theme - check system preference
      root.classList.remove('dark', 'light');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    }
  };

  const applyAccessibilitySettings = (accessibility) => {
    const root = document.documentElement;
    
    // Apply large text
    if (accessibility.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    // Apply high contrast
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (accessibility.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Apply screen reader support
    if (accessibility.screenReader) {
      root.classList.add('screen-reader');
    } else {
      root.classList.remove('screen-reader');
    }
  };

  const applyLanguage = (language) => {
    document.documentElement.lang = language;
  };

  const applyFontSize = (largeText) => {
    const root = document.documentElement;
    if (largeText) {
      root.style.fontSize = '1.2rem';
      root.style.setProperty('--text-scale', '1.2');
    } else {
      root.style.fontSize = '1rem';
      root.style.setProperty('--text-scale', '1');
    }
  };

  const applyHighContrast = (highContrast) => {
    const root = document.documentElement;
    if (highContrast) {
      root.style.setProperty('--contrast-scale', '1.5');
    } else {
      root.style.setProperty('--contrast-scale', '1');
    }
  };

  const applyReducedMotion = (reduceMotion) => {
    const root = document.documentElement;
    if (reduceMotion) {
      root.style.setProperty('--motion-scale', '0');
    } else {
      root.style.setProperty('--motion-scale', '1');
    }
  };

  const updateSettings = (newSettings) => {
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
    updateSettings(newSettings);
  };

  const updateAdvanceMinutes = (minutes) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        advanceMinutes: minutes
      }
    };
    updateSettings(newSettings);
  };

  const updateLocation = async () => {
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
        updateSettings(newSettings);
        return { success: true, message: 'Location updated successfully!' };
      }
    } catch (error) {
      console.error('Error getting location:', error);
      return { success: false, message: 'Could not get your location. Please check your location permissions.' };
    }
  };

  const updateTheme = (theme) => {
    const newSettings = { ...settings, theme };
    updateSettings(newSettings);
  };

  const updateAccessibility = (accessibility) => {
    const newSettings = {
      ...settings,
      accessibility: { ...settings.accessibility, ...accessibility }
    };
    updateSettings(newSettings);
  };

  const updateDataUsage = (dataUsage) => {
    const newSettings = {
      ...settings,
      dataUsage: { ...settings.dataUsage, ...dataUsage }
    };
    updateSettings(newSettings);
  };

  const resetToDefaults = () => {
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
    updateSettings(defaultSettings);
  };

  const value = {
    settings,
    updateSettings,
    updateNotificationSetting,
    updateAdvanceMinutes,
    updateLocation,
    updateTheme,
    updateAccessibility,
    updateDataUsage,
    resetToDefaults
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
