// Authentication Service for Namaz Web
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

class AuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.listeners = [];
    this.init();
  }

  init() {
    // Listen for Firebase auth state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          picture: user.photoURL,
          provider: user.providerData[0]?.providerId || 'email',
          createdAt: user.metadata.creationTime,
          lastLogin: user.metadata.lastSignInTime
        };
        this.isAuthenticated = true;
        localStorage.setItem('namaz_user', JSON.stringify(this.currentUser));
      } else {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('namaz_user');
      }
      this.notifyListeners();
    });
  }

  // Google OAuth Integration
  async signInWithGmail() {
    try {
      // Mock Google sign-in for demo purposes
      const mockUser = {
        id: 'google-demo-user-' + Date.now(),
        email: 'demo@gmail.com',
        name: 'Demo User',
        picture: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=G',
        provider: 'google.com',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      this.currentUser = mockUser;
      this.isAuthenticated = true;
      localStorage.setItem('namaz_user', JSON.stringify(mockUser));
      this.notifyListeners();
      
      return { user: mockUser };
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw new Error('Failed to sign in with Google');
    }
  }


  // Email/Password Authentication
  async signUpWithEmail(email, password, name) {
    try {
      // Validate email format
      if (!this.isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Mock authentication for demo purposes
      if (email && password && password.length >= 6) {
        const mockUser = {
          id: 'demo-user-' + Date.now(),
          email: email,
          name: name || email.split('@')[0],
          picture: null,
          provider: 'email',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        this.currentUser = mockUser;
        this.isAuthenticated = true;
        localStorage.setItem('namaz_user', JSON.stringify(mockUser));
        this.notifyListeners();
        
        return { user: mockUser };
      } else {
        throw new Error('Please enter a valid email and password (minimum 6 characters)');
      }

    } catch (error) {
      console.error('Email sign-up error:', error);
      throw new Error(this.getFirebaseErrorMessage(error.code));
    }
  }

  async signInWithEmail(email, password) {
    try {
      // Mock authentication for demo purposes
      if (email && password && password.length >= 6) {
        const mockUser = {
          id: 'demo-user-' + Date.now(),
          email: email,
          name: email.split('@')[0],
          picture: null,
          provider: 'email',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        this.currentUser = mockUser;
        this.isAuthenticated = true;
        localStorage.setItem('namaz_user', JSON.stringify(mockUser));
        this.notifyListeners();
        
        return { user: mockUser };
      } else {
        throw new Error('Please enter a valid email and password (minimum 6 characters)');
      }
    } catch (error) {
      console.error('Email sign-in error:', error);
      throw new Error(error.message || 'Sign in failed. Please try again.');
    }
  }

  // User Data Management
  async updateUserProfile(updates) {
    try {
      if (!this.currentUser) {
        throw new Error('No user logged in');
      }

      // Update user data
      this.currentUser = { ...this.currentUser, ...updates };
      this.currentUser.updatedAt = new Date().toISOString();

      // Save to localStorage
      localStorage.setItem('namaz_user', JSON.stringify(this.currentUser));
      
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

      // Save to localStorage
      localStorage.setItem('namaz_user', JSON.stringify(this.currentUser));
      
      return this.currentUser.progress;
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      // Mock logout for demo purposes
      this.currentUser = null;
      this.isAuthenticated = false;
      localStorage.removeItem('namaz_user');
      this.notifyListeners();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Utility Methods
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getFirebaseErrorMessage(errorCode) {
    const errorMessages = {
      'auth/user-not-found': 'No user found with this email address',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'An account with this email already exists',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/invalid-email': 'Invalid email address',
      'auth/user-disabled': 'This account has been disabled',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later',
      'auth/network-request-failed': 'Network error. Please check your connection',
      'auth/popup-closed-by-user': 'Sign-in popup was closed',
      'auth/cancelled-popup-request': 'Sign-in was cancelled'
    };
    return errorMessages[errorCode] || 'An error occurred. Please try again';
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
