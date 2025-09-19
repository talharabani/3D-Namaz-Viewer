import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';

// Professional SVG Icons
const Icons = {
  Home: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </motion.svg>
  ),
  Clock: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
    </motion.svg>
  ),
  Compass: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-3.5-3.5 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </motion.svg>
  ),
  BookOpen: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </motion.svg>
  ),
  Bot: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </motion.svg>
  ),
  Trophy: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h4c1.1 0 2 .9 2 2v2c0 4.97-4.03 9-9 9s-9-4.03-9-9V6c0-1.1.9-2 2-2h4zM9 6H7v2c0 3.87 3.13 7 7 7s7-3.13 7-7V6h-2v2c0 2.76-2.24 5-5 5s-5-2.24-5-5V6z"/>
    </motion.svg>
  ),
  AlertTriangle: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </motion.svg>
  ),
  EllipsisHorizontal: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </motion.svg>
  ),
  Cog6Tooth: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
    </motion.svg>
  ),
  Language: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
    </motion.svg>
  ),
  History: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
    </motion.svg>
  ),
  CircleDot: ({ isActive }) => (
    <motion.svg 
      className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </motion.svg>
  )
};

export default function FooterNavTabs({ onNavigate, className = '' }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [showOverflow, setShowOverflow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const overflowRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      const narrow = window.innerWidth < 480;
      setIsMobile(mobile);
      setIsNarrow(narrow);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Primary navigation items - Most important features
  const primaryItems = [
    { 
      key: 'home', 
      to: '/dashboard', 
      label: t('home'), 
      icon: Icons.Home, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'prayer-times', 
      to: '/prayer-times', 
      label: t('prayerTimes'), 
      icon: Icons.Clock, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'namaz', 
      to: '/namaz', 
      label: t('namaz'), 
      icon: Icons.BookOpen, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'qibla', 
      to: '/qibla', 
      label: t('qibla'), 
      icon: Icons.Compass, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'learn', 
      to: '/learn', 
      label: t('learn'), 
      icon: Icons.BookOpen, 
      color: 'from-blue-500 to-blue-600'
    }
  ];

  // Secondary navigation items - In overflow menu
  const secondaryItems = [
    { 
      key: 'hadith', 
      to: '/hadith', 
      label: t('hadith'), 
      icon: Icons.BookOpen, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'duas', 
      to: '/duas', 
      label: t('duas'), 
      icon: Icons.BookOpen, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'tracker', 
      to: '/tracker', 
      label: t('tracker'), 
      icon: Icons.History, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'quiz', 
      to: '/quiz', 
      label: t('quiz'), 
      icon: Icons.Trophy, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'mistakes', 
      to: '/mistakes', 
      label: t('mistakes'), 
      icon: Icons.AlertTriangle, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'ai-assistant', 
      to: '/ai-assistant', 
      label: t('aiAssistant'), 
      icon: Icons.Bot, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'progress', 
      to: '/progress', 
      label: t('progress'), 
      icon: Icons.History, 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'settings', 
      to: '/settings', 
      label: t('settings'), 
      icon: Icons.Cog6Tooth, 
      color: 'from-blue-500 to-blue-600'
    }
  ];

  // Close overflow menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overflowRef.current && !overflowRef.current.contains(event.target)) {
        setShowOverflow(false);
      }
    };

    if (showOverflow) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOverflow]);

  // Handle navigation
  const handleNavigate = (key) => {
    onNavigate?.(key);
    setShowOverflow(false);
  };

  // Get visible items based on screen size
  const getVisibleItems = () => {
    if (isNarrow) {
      return primaryItems.slice(0, 4); // Show 4 items on very narrow screens
    } else if (isMobile) {
      return primaryItems.slice(0, 5); // Show 5 items on mobile
    }
    return primaryItems; // Show all on desktop
  };

  const visibleItems = getVisibleItems();
  const hasOverflow = primaryItems.length > visibleItems.length;

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          border-t border-gray-200/60 dark:border-gray-700/60
          shadow-lg dark:shadow-gray-900/30
          ${className}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent dark:from-gray-800/50 pointer-events-none"></div>
        
        <div className="relative flex items-center justify-around px-1 py-2">
          {visibleItems.map((item) => {
            const isActive = location.pathname === item.to;
            const IconComponent = item.icon;
            
            return (
              <NavLink
                key={item.key}
                to={item.to}
                onClick={() => handleNavigate(item.key)}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center
                  min-h-[56px] min-w-[56px] px-2 py-1.5
                  rounded-lg transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  hover:scale-105 active:scale-95
                  ${isActive 
                    ? `bg-blue-500 text-white shadow-md` 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
                aria-label={item.label}
                role="tab"
                aria-selected={isActive}
              >
                <motion.div
                  className="mb-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconComponent isActive={isActive} />
                </motion.div>
                <motion.span 
                  className={`
                    text-[9px] font-medium text-center leading-tight
                    ${isNarrow ? 'hidden' : 'block'}
                    ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}
                  `}
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                    color: isActive ? '#ffffff' : undefined
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    className="absolute -top-1 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </NavLink>
            );
          })}

          {/* Overflow Menu Button */}
          {hasOverflow && (
            <motion.button
              ref={overflowRef}
              onClick={() => setShowOverflow(!showOverflow)}
              className={`
                flex flex-col items-center justify-center
                min-h-[56px] min-w-[56px] px-2 py-1.5
                rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                hover:scale-105 active:scale-95
                ${showOverflow 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="More features"
            >
              <motion.div
                className="mb-1"
                animate={{ rotate: showOverflow ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icons.EllipsisHorizontal isActive={showOverflow} />
              </motion.div>
              <motion.span 
                className={`
                  text-[9px] font-medium text-center leading-tight
                  ${isNarrow ? 'hidden' : 'block'}
                  ${showOverflow ? 'text-white' : 'text-gray-600 dark:text-gray-400'}
                `}
                animate={{ 
                  scale: showOverflow ? 1.05 : 1,
                  color: showOverflow ? '#ffffff' : undefined
                }}
                transition={{ duration: 0.2 }}
              >
                More
              </motion.span>
            </motion.button>
          )}
        </div>

        {/* Overflow Panel */}
        <AnimatePresence>
          {showOverflow && (
            <motion.div
              ref={overflowRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-gray-900/50 p-3 min-w-[240px] max-w-[280px]"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  More Features
                </h3>
                <button
                  onClick={() => setShowOverflow(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Secondary Items Grid */}
              <div className="grid grid-cols-2 gap-2">
                {secondaryItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  const IconComponent = item.icon;
                  
                  return (
                    <NavLink
                      key={item.key}
                      to={item.to}
                      onClick={() => handleNavigate(item.key)}
                      className={({ isActive }) => `
                        flex flex-col items-center justify-center
                        p-2 rounded-lg transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50
                        hover:scale-105 active:scale-95
                        ${isActive 
                          ? `bg-blue-500 text-white shadow-md` 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                      aria-label={item.label}
                    >
                      <motion.div
                        className="mb-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconComponent isActive={isActive} />
                      </motion.div>
                      <span className="text-[9px] font-medium text-center leading-tight">
                        {item.label}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}