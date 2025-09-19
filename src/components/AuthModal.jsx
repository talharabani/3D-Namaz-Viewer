import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../utils/authService';
import { useTranslation } from '../utils/translations';
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={transitions.smooth}
          className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-200/50 dark:border-slate-700/50"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
              {mode === 'login' && '🔐 ' + t('login')}
              {mode === 'signup' && '📝 ' + t('signUp')}
              {mode === 'reset' && '🔄 ' + t('resetPassword')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              {mode === 'login' && t('loginToSyncYourProgress')}
              {mode === 'signup' && t('createAccountToSyncProgress')}
              {mode === 'reset' && t('enterEmailToResetPassword')}
            </p>
          </div>

          {/* Error/Message Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-4"
            >
              {error}
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl mb-4"
            >
              {message}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('displayName')}
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all"
                  placeholder={t('enterYourName')}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all"
                placeholder={t('enterYourEmail')}
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('password')}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all"
                  placeholder={t('enterYourPassword')}
                />
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('confirmPassword')}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all"
                  placeholder={t('confirmYourPassword')}
                />
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              {...buttonPress}
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
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('dontHaveAnAccount')}{' '}
                  <button
                    onClick={() => switchMode('signup')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    {t('signUp')}
                  </button>
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('forgotYourPassword')}{' '}
                  <button
                    onClick={() => switchMode('reset')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    {t('resetPassword')}
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p className="text-slate-600 dark:text-slate-300">
                {t('alreadyHaveAnAccount')}{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {t('login')}
                </button>
              </p>
            )}

            {mode === 'reset' && (
              <p className="text-slate-600 dark:text-slate-300">
                {t('rememberYourPassword')}{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {t('login')}
                </button>
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-2xl"
          >
            ✕
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}