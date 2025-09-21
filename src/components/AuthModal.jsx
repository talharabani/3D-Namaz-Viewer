import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../utils/authService';
import { useTranslation } from '../utils/translations';
import ParticleBackground from './ParticleBackground';
import { 
  fadeInUp, 
  buttonPress,
  transitions 
} from '../utils/animations';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await authService.signInWithEmail(formData.email, formData.password);
        onClose();
      } else if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError(t('passwordsDoNotMatch'));
          return;
        }
        if (formData.password.length < 6) {
          setError(t('passwordMustBeAtLeast6Characters'));
          return;
        }
        await authService.signUpWithEmail(formData.email, formData.password, formData.displayName);
        setMessage(t('accountCreatedSuccessfully'));
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (mode === 'reset') {
        // For now, show a message that password reset is not available
        setMessage(t('passwordResetNotAvailable'));
        setTimeout(() => {
          setMode('login');
          setFormData({ email: '', password: '', confirmPassword: '', displayName: '' });
        }, 2000);
      }
    } catch (error) {
      console.error('Auth error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError(t('userNotFound'));
          break;
        case 'auth/wrong-password':
          setError(t('incorrectPassword'));
          break;
        case 'auth/email-already-in-use':
          setError(t('emailAlreadyInUse'));
          break;
        case 'auth/weak-password':
          setError(t('passwordTooWeak'));
          break;
        case 'auth/invalid-email':
          setError(t('invalidEmail'));
          break;
        default:
          setError(error.message || t('authenticationError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setMessage('');
    setFormData({ email: '', password: '', confirmPassword: '', displayName: '' });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={transitions.smooth}
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl"
        >
          {/* Decorative Elements */}
          <motion.div 
            className="absolute -top-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >✦</motion.div>
          <motion.div 
            className="absolute -top-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >✦</motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >✦</motion.div>
          <motion.div 
            className="absolute -bottom-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >✦</motion.div>

          {/* Header */}
          <div className="text-center mb-6 relative">
            <motion.h2 
              className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-2 animate-text-shimmer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {mode === 'login' && '🔐 ' + t('login')}
              {mode === 'signup' && '📝 ' + t('signUp')}
              {mode === 'reset' && '🔄 ' + t('resetPassword')}
            </motion.h2>
            <motion.p 
              className="text-emerald-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {mode === 'login' && t('loginToSyncYourProgress')}
              {mode === 'signup' && t('createAccountToSyncProgress')}
              {mode === 'reset' && t('enterEmailToResetPassword')}
            </motion.p>
          </div>

          {/* Error/Message Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-xl mb-4 text-center"
              >
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-500/20 border border-green-400/30 text-green-300 px-4 py-3 rounded-xl mb-4 text-center"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {mode === 'signup' && (
              <div>
                <label className="block text-emerald-200 font-medium mb-2">
                  {t('displayName')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    placeholder={t('enterYourName')}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                    👤
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-emerald-200 font-medium mb-2">
                {t('email')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  placeholder={t('enterYourEmail')}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                  ✉️
                </div>
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-emerald-200 font-medium mb-2">
                  {t('password')}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    placeholder={t('enterYourPassword')}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                    🔒
                  </div>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-emerald-200 font-medium mb-2">
                  {t('confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    placeholder={t('confirmYourPassword')}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                    🔒
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t('loading')}...
                </span>
              ) : (
                <>
                  {mode === 'login' && t('login')}
                  {mode === 'signup' && t('signUp')}
                  {mode === 'reset' && t('sendResetEmail')}
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div 
            className="flex items-center my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-emerald-300 text-sm">{t('or')}</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </motion.div>

          {/* Google Sign In Button */}
          <motion.button
            onClick={async () => {
              setError('');
              setLoading(true);
              try {
                await authService.signInWithGmail();
                onClose();
              } catch (error) {
                setError(error.message || t('googleSignInError'));
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="w-full py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-3 text-xl">🔍</span>
            {t('continueWithGoogle')}
          </motion.button>

          {/* Mode Switcher */}
          <motion.div 
            className="mt-6 text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {mode === 'login' && (
              <>
                <p className="text-emerald-200">
                  {t('dontHaveAnAccount')}{' '}
                  <button
                    onClick={() => switchMode('signup')}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    {t('signUp')}
                  </button>
                </p>
                <p className="text-emerald-200">
                  {t('forgotYourPassword')}{' '}
                  <button
                    onClick={() => switchMode('reset')}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    {t('resetPassword')}
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p className="text-emerald-200">
                {t('alreadyHaveAnAccount')}{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  {t('login')}
                </button>
              </p>
            )}

            {mode === 'reset' && (
              <p className="text-emerald-200">
                {t('rememberYourPassword')}{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  {t('login')}
                </button>
              </p>
            )}
          </motion.div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-300 hover:text-emerald-200 transition-colors text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
