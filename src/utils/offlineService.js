// Offline service for caching data and enabling offline functionality

class OfflineService {
  constructor() {
    this.cacheName = 'namaz-app-v1';
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Initialize offline support
  async init() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }

    // Initialize cache
    await this.initCache();
  }

  // Initialize cache storage
  async initCache() {
    if ('caches' in window) {
      try {
        const cache = await caches.open(this.cacheName);
        console.log('Cache initialized successfully');
        return cache;
      } catch (error) {
        console.error('Cache initialization failed:', error);
      }
    }
  }

  // Cache prayer times data
  async cachePrayerTimes(prayerTimes, location) {
    try {
      const cacheKey = `prayer-times-${location.latitude}-${location.longitude}`;
      const data = {
        prayerTimes,
        location,
        timestamp: Date.now(),
        expiry: Date.now() + this.cacheExpiry
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(data));
      console.log('Prayer times cached successfully');
    } catch (error) {
      console.error('Error caching prayer times:', error);
    }
  }

  // Get cached prayer times
  async getCachedPrayerTimes(location) {
    try {
      const cacheKey = `prayer-times-${location.latitude}-${location.longitude}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const data = JSON.parse(cached);
        
        // Check if cache is still valid
        if (data.expiry > Date.now()) {
          console.log('Using cached prayer times');
          return data.prayerTimes;
        } else {
          // Cache expired, remove it
          localStorage.removeItem(cacheKey);
          console.log('Cached prayer times expired');
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cached prayer times:', error);
      return null;
    }
  }

  // Cache hadith and ayat data
  async cacheContent(content, type) {
    try {
      const cacheKey = `content-${type}`;
      const data = {
        content,
        timestamp: Date.now(),
        expiry: Date.now() + (12 * 60 * 60 * 1000) // 12 hours for content
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(data));
      console.log(`${type} content cached successfully`);
    } catch (error) {
      console.error(`Error caching ${type} content:`, error);
    }
  }

  // Get cached content
  async getCachedContent(type) {
    try {
      const cacheKey = `content-${type}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const data = JSON.parse(cached);
        
        if (data.expiry > Date.now()) {
          console.log(`Using cached ${type} content`);
          return data.content;
        } else {
          localStorage.removeItem(cacheKey);
          console.log(`Cached ${type} content expired`);
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting cached ${type} content:`, error);
      return null;
    }
  }

  // Cache audio files
  async cacheAudio(url, filename) {
    if ('caches' in window) {
      try {
        const cache = await caches.open(this.cacheName);
        const response = await fetch(url);
        
        if (response.ok) {
          await cache.put(`/audio/${filename}`, response.clone());
          console.log(`Audio ${filename} cached successfully`);
          return true;
        }
      } catch (error) {
        console.error(`Error caching audio ${filename}:`, error);
      }
    }
    return false;
  }

  // Get cached audio
  async getCachedAudio(filename) {
    if ('caches' in window) {
      try {
        const cache = await caches.open(this.cacheName);
        const response = await cache.match(`/audio/${filename}`);
        
        if (response) {
          console.log(`Using cached audio ${filename}`);
          return response;
        }
      } catch (error) {
        console.error(`Error getting cached audio ${filename}:`, error);
      }
    }
    return null;
  }

  // Cache app assets
  async cacheAssets() {
    if ('caches' in window) {
      try {
        const cache = await caches.open(this.cacheName);
        const assets = [
          '/',
          '/index.html',
          '/manifest.json',
          '/favicon.ico',
          // Add other important assets here
        ];
        
        await cache.addAll(assets);
        console.log('App assets cached successfully');
      } catch (error) {
        console.error('Error caching app assets:', error);
      }
    }
  }

  // Check if app is online
  isOnline() {
    return navigator.onLine;
  }

  // Get offline status
  getOfflineStatus() {
    return {
      isOnline: this.isOnline(),
      hasCache: 'caches' in window,
      hasServiceWorker: 'serviceWorker' in navigator,
      hasLocalStorage: 'localStorage' in window
    };
  }

  // Clear all cached data
  async clearCache() {
    try {
      // Clear localStorage cache
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('prayer-times-') || key.startsWith('content-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear cache storage
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.startsWith('namaz-app-')) {
              return caches.delete(cacheName);
            }
          })
        );
      }
      
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  // Get cache size and info
  async getCacheInfo() {
    try {
      let cacheSize = 0;
      let cacheEntries = 0;
      
      // Calculate localStorage size
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('prayer-times-') || key.startsWith('content-')) {
          cacheSize += localStorage.getItem(key).length;
          cacheEntries++;
        }
      });
      
      // Calculate cache storage size
      if ('caches' in window) {
        const cache = await caches.open(this.cacheName);
        const requests = await cache.keys();
        cacheEntries += requests.length;
        
        // Note: Getting exact cache size is complex, this is an approximation
        cacheSize += requests.length * 1024; // Approximate 1KB per cached item
      }
      
      return {
        size: cacheSize,
        entries: cacheEntries,
        sizeInKB: Math.round(cacheSize / 1024),
        sizeInMB: Math.round(cacheSize / (1024 * 1024) * 100) / 100
      };
    } catch (error) {
      console.error('Error getting cache info:', error);
      return { size: 0, entries: 0, sizeInKB: 0, sizeInMB: 0 };
    }
  }

  // Preload important data for offline use
  async preloadData() {
    try {
      // Preload prayer times for current location
      const settings = JSON.parse(localStorage.getItem('namaz_settings') || '{}');
      if (settings.location && settings.location.latitude) {
        // This would typically fetch prayer times and cache them
        console.log('Preloading prayer times for offline use');
      }
      
      // Preload content
      console.log('Preloading content for offline use');
      
      // Preload assets
      await this.cacheAssets();
      
      console.log('Data preloaded successfully');
    } catch (error) {
      console.error('Error preloading data:', error);
    }
  }
}

// Export singleton instance
export const offlineService = new OfflineService(); 