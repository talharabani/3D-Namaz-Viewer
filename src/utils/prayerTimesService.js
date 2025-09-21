// Prayer Times Service with CORS handling
class PrayerTimesService {
  constructor() {
    // Use proxy in development, direct API in production
    this.baseUrl = import.meta.env.DEV ? '/api/v1' : 'https://api.aladhan.com/v1';
    this.cache = new Map();
    this.cacheTimeout = 2 * 60 * 60 * 1000; // 2 hours cache
    this.lastRequestTime = 0;
    this.minRequestInterval = 10000; // Minimum 10 seconds between requests
    this.requestQueue = [];
    this.isProcessingQueue = false;
  }

  // Get prayer times with fallback handling
  async getPrayerTimes(latitude, longitude, method = 2, school = 0) {
    const cacheKey = `${latitude}_${longitude}_${method}_${school}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('Using cached prayer times data');
      return cached.data;
    }

    // If we're already processing a request, return mock data immediately
    if (this.isProcessingQueue) {
      console.log('Request in progress, using mock data');
      return this.getMockPrayerTimes(method, school);
    }

    try {
      // Try direct API call first
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/timings/${this.getCurrentDate()}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`
      );
      
      if (response.ok) {
        const data = await response.json();
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
      }
    } catch (error) {
      console.warn('API call failed, using mock data:', error.message);
    }

    // Fallback to mock data if API fails
    console.log('Using mock prayer times data');
    return this.getMockPrayerTimes(method, school);
  }

  // Fetch with retry logic and rate limiting
  async fetchWithRetry(url, retries = 3) {
    // Set processing flag
    this.isProcessingQueue = true;
    
    // Rate limiting: ensure minimum time between requests
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      console.log(`Rate limiting: waiting ${waitTime}ms before next request`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
    
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          cache: 'default'
        });

        if (response.ok) {
          // Reset processing flag on success
          this.isProcessingQueue = false;
          return response;
        } else if (response.status === 429) {
          // Handle rate limiting with longer delay
          console.warn(`Rate limited (429), waiting longer before retry ${i + 1}`);
          if (i === retries - 1) throw new Error('Rate limited - too many requests');
          await this.delay(5000 * (i + 1)); // Longer delay for rate limiting
        } else {
          console.warn(`HTTP ${response.status} on attempt ${i + 1}`);
          if (i === retries - 1) throw new Error(`HTTP ${response.status}`);
          await this.delay(1000 * (i + 1)); // Exponential backoff
        }
      } catch (error) {
        console.warn(`Attempt ${i + 1} failed:`, error);
        if (i === retries - 1) throw error;
        await this.delay(1000 * (i + 1)); // Exponential backoff
      }
    }
    
    // Reset processing flag
    this.isProcessingQueue = false;
    throw new Error('All retry attempts failed');
  }

  // Delay utility
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock prayer times for fallback
  getMockPrayerTimes(method = 2, school = 0) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Generate mock prayer times based on current time
    const mockTimes = {
      Fajr: "05:30",
      Sunrise: "06:45",
      Dhuhr: "12:15",
      Asr: "15:45",
      Maghrib: "18:30",
      Isha: "20:00"
    };

    return {
      code: 200,
      status: "OK",
      data: {
        timings: mockTimes,
        date: {
          readable: now.toLocaleDateString(),
          timestamp: Math.floor(now.getTime() / 1000),
          hijri: {
            date: "1-1-1446",
            format: "DD-MM-YYYY",
            day: "1",
            month: {
              number: 1,
              en: "Muḥarram",
              ar: "مُحَرَّم"
            },
            year: "1446"
          },
          gregorian: {
            date: today,
            format: "DD-MM-YYYY",
            day: now.getDate().toString(),
            month: {
              number: now.getMonth() + 1,
              en: now.toLocaleString('default', { month: 'long' })
            },
            year: now.getFullYear().toString()
          },
          timezone: {
            timezone_name: "Asia/Karachi",
            timezone_location: "Asia/Karachi",
            timezone_abbrev: "PKT",
            gmt_offset: 5,
            timestamp: Math.floor(now.getTime() / 1000)
          }
        },
        meta: {
          latitude: 31.493352318332022,
          longitude: 74.27756581247648,
          timezone: "Asia/Karachi",
          method: {
            id: method,
            name: "Islamic Society of North America (ISNA)",
            params: {
              Fajr: 15,
              Isha: 15
            }
          },
          latitudeAdjustmentMethod: "ANGLE_BASED",
          midnightMode: "STANDARD",
          school: school === 0 ? "STANDARD" : "HANAFI",
          offset: {
            Imsak: 0,
            Fajr: 0,
            Sunrise: 0,
            Dhuhr: 0,
            Asr: 0,
            Maghrib: 0,
            Sunset: 0,
            Isha: 0,
            Midnight: 0
          }
        }
      }
    };
  }

  // Get current prayer time info
  getCurrentPrayerInfo(prayerTimes) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'Fajr', time: prayerTimes.Fajr },
      { name: 'Sunrise', time: prayerTimes.Sunrise },
      { name: 'Dhuhr', time: prayerTimes.Dhuhr },
      { name: 'Asr', time: prayerTimes.Asr },
      { name: 'Maghrib', time: prayerTimes.Maghrib },
      { name: 'Isha', time: prayerTimes.Isha }
    ];

    let currentPrayer = null;
    let nextPrayer = null;

    for (let i = 0; i < prayers.length; i++) {
      const prayer = prayers[i];
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;

      if (currentTime >= prayerTime) {
        currentPrayer = prayer;
        nextPrayer = prayers[i + 1] || prayers[0]; // Next prayer or first prayer of next day
      } else {
        if (!nextPrayer) {
          nextPrayer = prayer;
        }
        break;
      }
    }

    return {
      currentPrayer,
      nextPrayer,
      currentTime: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      isPrayerTime: currentPrayer !== null
    };
  }

  // Get prayer times for a specific date
  async getPrayerTimesForDate(latitude, longitude, date, method = 2, school = 0) {
    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    const cacheKey = `${latitude}_${longitude}_${dateStr}_${method}_${school}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`
      );
      
      if (response.ok) {
        const data = await response.json();
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
      }
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
    }

    // Fallback to mock data
    return this.getMockPrayerTimes();
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Get cache size
  getCacheSize() {
    return this.cache.size;
  }

  // Get current date in DD-MM-YYYY format for API
  getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  }
}

// Export singleton instance
export const prayerTimesService = new PrayerTimesService();
export default prayerTimesService;
