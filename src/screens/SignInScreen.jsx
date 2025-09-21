import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import authService from '../utils/authService';
import ParticleBackground from '../components/ParticleBackground';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions,
  pulseAnimation
} from '../utils/animations';

export default function SignInScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (authService.isUserAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

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
    setLoading(true);

    try {
      await authService.signInWithEmail(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message || t('authenticationError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await authService.signInWithGmail();
      navigate('/');
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.message || t('googleSignInError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
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

            <div className="relative">
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-4 animate-text-shimmer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  🔐 {t('welcomeBack')}
                </motion.h1>
                <motion.p 
                  className="text-emerald-200 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {t('signInToContinue')}
                </motion.p>
              </motion.div>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sign In Form */}
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {/* Email Input */}
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

                {/* Password Input */}
                <div>
                  <label className="block text-emerald-200 font-medium mb-2">
                    {t('password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                      placeholder={t('enterYourPassword')}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                      🔒
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                  >
                    {t('forgotPassword')}?
                  </Link>
                </div>

                {/* Sign In Button */}
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
                      {t('signingIn')}...
                    </span>
                  ) : (
                    t('signIn')
                  )}
                </motion.button>
              </motion.form>

              {/* Divider */}
              <motion.div 
                className="flex items-center my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="px-4 text-emerald-300 text-sm">{t('or')}</span>
                <div className="flex-1 h-px bg-white/20"></div>
              </motion.div>

              {/* Google Sign In Button */}
              <motion.button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-3 text-xl">🔍</span>
                {t('continueWithGoogle')}
              </motion.button>

              {/* Sign Up Link */}
              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <p className="text-emerald-200">
                  {t('dontHaveAnAccount')}{' '}
                  <Link 
                    to="/signup" 
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    {t('signUp')}
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Back to Home Link */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Link 
              to="/" 
              className="text-emerald-300 hover:text-emerald-200 text-sm transition-colors flex items-center justify-center"
            >
              ← {t('backToHome')}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
