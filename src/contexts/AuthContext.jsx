import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Sign up function
  async function signup(email, password, displayName) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName || result.user.displayName,
        createdAt: new Date().toISOString(),
        progress: {},
        settings: {},
        bookmarks: [],
        notes: []
      });
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Sign in function
  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Sign out function
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  // Reset password function
  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  }

  // Save user progress to Firestore
  async function saveUserProgress(progressData) {
    if (!currentUser) return;
    
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        progress: progressData
      }, { merge: true });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Save user settings to Firestore
  async function saveUserSettings(settingsData) {
    if (!currentUser) return;
    
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        settings: settingsData
      }, { merge: true });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  // Load user data from Firestore
  async function loadUserData() {
    if (!currentUser) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        return userDoc.data();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    return null;
  }

  // Sync local storage with Firestore
  async function syncLocalData() {
    if (!currentUser) return;
    
    try {
      // Load progress from local storage
      const localProgress = JSON.parse(localStorage.getItem('progress') || '{}');
      const localSettings = JSON.parse(localStorage.getItem('settings') || '{}');
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const localNotes = JSON.parse(localStorage.getItem('learn_notes') || '[]');
      
      // Save to Firestore
      await setDoc(doc(db, 'users', currentUser.uid), {
        progress: localProgress,
        settings: localSettings,
        bookmarks: localBookmarks,
        notes: localNotes
      }, { merge: true });
      
      // Load from Firestore and update local storage
      const userData = await loadUserData();
      if (userData) {
        if (userData.progress) {
          localStorage.setItem('progress', JSON.stringify(userData.progress));
        }
        if (userData.settings) {
          localStorage.setItem('settings', JSON.stringify(userData.settings));
        }
        if (userData.bookmarks) {
          localStorage.setItem('bookmarks', JSON.stringify(userData.bookmarks));
        }
        if (userData.notes) {
          localStorage.setItem('learn_notes', JSON.stringify(userData.notes));
        }
      }
    } catch (error) {
      console.error('Error syncing data:', error);
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserData();
        await syncLocalData();
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    resetPassword,
    saveUserProgress,
    saveUserSettings,
    loadUserData,
    syncLocalData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
