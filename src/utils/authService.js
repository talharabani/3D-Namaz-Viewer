// Authentication Service for Namaz Web
class AuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.listeners = [];
    this.init();
  }

  init() {
    // Load user from localStorage on app start
    const savedUser = localStorage.getItem('namaz_user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        this.isAuthenticated = true;
        this.notifyListeners();
      } catch (error) {
        console.error('Error loading saved user:', error);
        this.logout();
      }
    }
  }

  // Gmail OAuth Integration
  async signInWithGmail() {
    try {
      // Initialize Google Sign-In
      if (!window.google) {
        await this.loadGoogleScript();
      }

      const auth2 = window.gapi.auth2.getAuthInstance();
      if (!auth2) {
        await window.gapi.auth2.init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
          scope: 'email profile'
        });
      }

      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      const idToken = googleUser.getAuthResponse().id_token;

      // Create user object
      const user = {
        id: profile.getId(),
        email: profile.getEmail(),
        name: profile.getName(),
        picture: profile.getImageUrl(),
        provider: 'google',
        idToken: idToken,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Save user data
      await this.saveUser(user);
      return user;

    } catch (error) {
      console.error('Gmail sign-in error:', error);
      throw new Error('Failed to sign in with Gmail');
    }
  }

  // Load Google Script
  loadGoogleScript() {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => {
        window.gapi.load('auth2', resolve);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Email/Password Authentication
  async signUpWithEmail(email, password, name) {
    try {
      // Validate email format
      if (!this.isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check if user already exists
      const existingUser = this.getUserByEmail(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create user object
      const user = {
        id: this.generateUserId(),
        email: email.toLowerCase(),
        name: name,
        password: await this.hashPassword(password), // In production, use proper hashing
        provider: 'email',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profile: {
          avatar: null,
          preferences: {
            language: 'en',
            childrenMode: false,
            notifications: true,
            theme: 'light'
          }
        }
      };

      // Save user data
      await this.saveUser(user);
      return user;

    } catch (error) {
      console.error('Email sign-up error:', error);
      throw error;
    }
  }

  async signInWithEmail(email, password) {
    try {
      const user = this.getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify password (in production, use proper verification)
      if (user.password !== await this.hashPassword(password)) {
        throw new Error('Invalid password');
      }

      // Update last login
      user.lastLogin = new Date().toISOString();
      await this.saveUser(user);

      return user;

    } catch (error) {
      console.error('Email sign-in error:', error);
      throw error;
    }
  }

  // User Data Management
  async saveUser(user) {
    try {
      // Save to localStorage
      localStorage.setItem('namaz_user', JSON.stringify(user));
      
      // Save to IndexedDB for larger data
      await this.saveToIndexedDB('users', user);
      
      // Update current user
      this.currentUser = user;
      this.isAuthenticated = true;
      
      // Notify listeners
      this.notifyListeners();
      
      return user;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async updateUserProfile(updates) {
    try {
      if (!this.currentUser) {
        throw new Error('No user logged in');
      }

      // Update user data
      this.currentUser = { ...this.currentUser, ...updates };
      this.currentUser.updatedAt = new Date().toISOString();

      // Save updated user
      await this.saveUser(this.currentUser);
      
      return this.currentUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  async updateUserProgress(progressData) {
    try {
      if (!this.currentUser) {
        throw new Error('No user logged in');
      }

      // Update progress data
      this.currentUser.progress = {
        ...this.currentUser.progress,
        ...progressData,
        lastUpdated: new Date().toISOString()
      };

      // Save updated user
      await this.saveUser(this.currentUser);
      
      return this.currentUser.progress;
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  }

  // Logout
  logout() {
    try {
      // Clear localStorage
      localStorage.removeItem('namaz_user');
      
      // Clear IndexedDB
      this.clearIndexedDB();
      
      // Reset current user
      this.currentUser = null;
      this.isAuthenticated = false;
      
      // Notify listeners
      this.notifyListeners();
      
      // Sign out from Google if applicable
      if (window.google && window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2) {
          auth2.signOut();
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Utility Methods
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async hashPassword(password) {
    // In production, use proper password hashing (bcrypt, argon2, etc.)
    // For now, using a simple hash for demonstration
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  getUserByEmail(email) {
    // In a real app, this would query a database
    // For now, we'll check localStorage
    const savedUser = localStorage.getItem('namaz_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }

  // IndexedDB Operations
  async saveToIndexedDB(storeName, data) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('NamazWebDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const saveRequest = store.put(data);
        
        saveRequest.onsuccess = () => resolve(saveRequest.result);
        saveRequest.onerror = () => reject(saveRequest.error);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      };
    });
  }

  async clearIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase('NamazWebDB');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Event Listeners
  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentUser, this.isAuthenticated);
      } catch (error) {
        console.error('Error in auth listener:', error);
      }
    });
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  // Get user progress
  getUserProgress() {
    return this.currentUser?.progress || {};
  }

  // Check if user has completed onboarding
  hasCompletedOnboarding() {
    return this.currentUser?.profile?.onboardingCompleted || false;
  }

  // Mark onboarding as completed
  async completeOnboarding() {
    return this.updateUserProfile({
      profile: {
        ...this.currentUser.profile,
        onboardingCompleted: true
      }
    });
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
