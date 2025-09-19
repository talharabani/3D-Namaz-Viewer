
import { auth } from './firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import authService from './authService';

// Daily duas data embedded directly to avoid import issues
const duasByCategory = {
  daily: [
    {
      arabic: "الحمدُ للهِ الذي أحيانا بعد ما أماتنا وإليه النشورُ",
      transliteration: "Alhamdu lillaahil-ladhee ahyaanaa ba'da maa amaatanaa wa ilayhin-nushoor",
      translation: "All praise is for Allah Who gave us life after causing us to die, and to Him is the resurrection."
    },
    {
      arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ",
      transliteration: "Bismika rabbī waḍa'tu janbī wa bika arfa'uhu",
      translation: "In Your name, O my Lord, I lay down and in Your name I rise."
    },
    {
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: "In the name of Allah."
    },
    {
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
      transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana Muslimeen",
      translation: "All praise is for Allah who fed us and gave us drink and made us Muslims."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
      transliteration: "Allahumma inni a'oodhu bika minal-khubthi wal-khaba'ith",
      translation: "O Allah, I seek refuge with You from male and female devils."
    },
    {
      arabic: "غُفْرَانَكَ",
      transliteration: "Ghufranaka",
      translation: "I seek Your forgiveness."
    },
    {
      arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
      transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
      translation: "In the name of Allah, I place my trust in Allah, and there is no power nor might except with Allah."
    },
    {
      arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
      transliteration: "Bismillah walajna, wa bismillah kharajna, wa 'ala Rabbina tawakkalna",
      translation: "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we place our trust."
    },
    {
      arabic: "اللّهُـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ",
      transliteration: "Allahumma anta rabbee la ilaha illa anta",
      translation: "O Allah, You are my Lord, there is no deity except You."
    },
    {
      arabic: "بِسْمِ اللهِ الَّذِي لا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un",
      translation: "In the name of Allah, with whose name nothing can harm on earth or in heaven."
    }
  ]
};

class NotificationService {
  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    this.permission = null;
    this.registration = null;
  }

  // Request notification permission
  async requestPermission() {
    if (!this.isSupported) {
      console.log('Notifications not supported');
      return false;
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Register service worker
  async registerServiceWorker() {
    if (!this.isSupported) return false;

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully');
      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  // Check if notifications are enabled
  isEnabled() {
    return this.isSupported && this.permission === 'granted';
  }

  // Check notification permission status
  async checkPermissionStatus() {
    if (!this.isSupported) {
      this.permission = 'denied';
      return false;
    }
    
    try {
      this.permission = Notification.permission;
      return this.permission === 'granted';
    } catch (error) {
      console.error('Error checking notification permission:', error);
      this.permission = 'denied';
      return false;
    }
  }

  // Get daily dua based on date
  getDailyDua() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    const dailyDuas = duasByCategory.daily || [];
    const duaIndex = dayOfYear % dailyDuas.length;
    
    return dailyDuas[duaIndex] || dailyDuas[0];
  }

  // Schedule daily notification
  async scheduleDailyNotification() {
    if (!this.isSupported || this.permission !== 'granted') {
      console.log('Notifications not available or not granted');
      return false;
    }

    try {
      // Clear existing notifications
      if (this.registration) {
        const notifications = await this.registration.getNotifications();
        notifications.forEach(notification => notification.close());
      }

      // Schedule notification for 7:00 PM today
      const now = new Date();
      const notificationTime = new Date();
      notificationTime.setHours(19, 0, 0, 0); // 7:00 PM

      // If it's already past 7:00 PM today, schedule for tomorrow
      if (now > notificationTime) {
        notificationTime.setDate(notificationTime.getDate() + 1);
      }

      const timeUntilNotification = notificationTime.getTime() - now.getTime();

      setTimeout(() => {
        this.showDailyDuaNotification();
      }, timeUntilNotification);

      // Schedule recurring notification for every day at 7:00 PM
      this.scheduleRecurringNotification();

      return true;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return false;
    }
  }

  // Schedule recurring daily notification
  scheduleRecurringNotification() {
    const scheduleNext = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(19, 0, 0, 0); // 7:00 PM tomorrow

      const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

      setTimeout(() => {
        this.showDailyDuaNotification();
        scheduleNext(); // Schedule the next day
      }, timeUntilTomorrow);
    };

    scheduleNext();
  }

  // Show prayer notification
  async showPrayerNotification(prayerName, prayerTime) {
    if (!this.isSupported || this.permission !== 'granted') return;

    try {
      const notification = new Notification(`🕌 ${prayerName} Prayer Time`, {
        body: `Allahu Akbar! Time for ${prayerName} prayer at ${prayerTime}`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: `prayer-${prayerName.toLowerCase()}`,
        requireInteraction: true,
        silent: false
      });

      // Auto-close after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);

      return notification;
    } catch (error) {
      console.error('Error showing prayer notification:', error);
    }
  }

  // Schedule prayer notifications
  async schedulePrayerNotifications(prayerTimes) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.log('Notifications not available or not granted');
      return false;
    }

    try {
      // Clear existing prayer notifications
      if ('serviceWorker' in navigator && this.registration) {
        const notifications = await this.registration.getNotifications();
        notifications.forEach(notification => {
          if (notification.tag && notification.tag.startsWith('prayer-')) {
            notification.close();
          }
        });
      }

      // Schedule notifications for each prayer time
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      Object.entries(prayerTimes).forEach(([prayerName, prayerTime]) => {
        if (prayerName === 'Sunrise') return; // Skip sunrise

        const [hours, minutes] = prayerTime.split(':');
        const prayerDateTime = new Date(today);
        prayerDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // If the prayer time has passed today, schedule for tomorrow
        if (prayerDateTime <= now) {
          prayerDateTime.setDate(prayerDateTime.getDate() + 1);
        }

        const timeUntilPrayer = prayerDateTime.getTime() - now.getTime();

        if (timeUntilPrayer > 0) {
          setTimeout(() => {
            this.showPrayerNotification(prayerName, prayerTime);
          }, timeUntilPrayer);
        }
      });

      return true;
    } catch (error) {
      console.error('Error scheduling prayer notifications:', error);
      return false;
    }
  }

  // Show daily dua notification
  async showDailyDuaNotification() {
    if (!this.isSupported || this.permission !== 'granted') return;

    const dailyDua = this.getDailyDua();
    
    const notificationOptions = {
      body: dailyDua.translation,
      icon: '/src/assets/logo.png', // You can add a logo
      badge: '/src/assets/badge.png', // You can add a badge
      tag: 'daily-dua',
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Dua',
          icon: '/src/assets/view-icon.png'
        },
        {
          action: 'bookmark',
          title: 'Bookmark',
          icon: '/src/assets/bookmark-icon.png'
        }
      ],
      data: {
        url: '/duas/daily',
        dua: dailyDua
      }
    };

    try {
      if (this.registration) {
        await this.registration.showNotification(
          `📿 Daily Dua - ${new Date().toLocaleDateString()}`,
          notificationOptions
        );
      } else {
        new Notification(
          `📿 Daily Dua - ${new Date().toLocaleDateString()}`,
          notificationOptions
        );
      }
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  // Handle notification click
  handleNotificationClick(event) {
    event.notification.close();

    if (event.action === 'view') {
      window.open(event.notification.data.url, '_blank');
    } else if (event.action === 'bookmark') {
      // Handle bookmark action
      this.bookmarkDua(event.notification.data.dua);
    } else {
      // Default action - open the app
      window.focus();
      window.location.href = event.notification.data.url;
    }
  }

  // Bookmark dua
  async bookmarkDua(dua) {
    try {
      const user = authService.getCurrentUser();
      if (!user) return;

      const bookmarksRef = doc(db, 'users', user.id, 'bookmarks', 'duas');
      const bookmarksDoc = await getDoc(bookmarksRef);
      
      let bookmarks = [];
      if (bookmarksDoc.exists()) {
        bookmarks = bookmarksDoc.data().duas || [];
      }

      const duaId = `daily-${dua.arabic.substring(0, 20)}`;
      if (!bookmarks.find(b => b.id === duaId)) {
        bookmarks.push({
          id: duaId,
          ...dua,
          category: 'daily',
          bookmarkedAt: new Date().toISOString()
        });

        await setDoc(bookmarksRef, { duas: bookmarks });
      }
    } catch (error) {
      console.error('Error bookmarking dua:', error);
    }
  }

  // Save notification preferences to Firestore
  async saveNotificationPreferences(enabled) {
    try {
      const user = authService.getCurrentUser();
      if (!user) return;

      const userRef = doc(db, 'users', user.id);
      await setDoc(userRef, {
        notificationPreferences: {
          dailyDua: enabled,
          time: '19:00', // 7:00 PM
          lastUpdated: new Date().toISOString()
        }
      }, { merge: true });
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    }
  }

  // Get notification preferences
  async getNotificationPreferences() {
    try {
      const user = authService.getCurrentUser();
      if (!user) return { dailyDua: false, time: '19:00' };

      const userRef = doc(db, 'users', user.id);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data().notificationPreferences || { dailyDua: false, time: '19:00' };
      }
      
      return { dailyDua: false, time: '19:00' };
    } catch (error) {
      console.error('Error getting notification preferences:', error);
      return { dailyDua: false, time: '19:00' };
    }
  }

  // Initialize notification service
  async initialize() {
    if (!this.isSupported) return false;

    try {
      // Register service worker
      await this.registerServiceWorker();

      // Set up notification click handler
      if (this.registration) {
        this.registration.addEventListener('notificationclick', this.handleNotificationClick.bind(this));
      }

      return true;
    } catch (error) {
      console.error('Error initializing notification service:', error);
      return false;
    }
  }
}

export default new NotificationService();