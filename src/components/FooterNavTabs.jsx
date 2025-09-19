import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import IslamicIcon from './IslamicIcon';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced icons with better visual appeal
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

  // Primary navigation items (always visible) - Most important features
  const primaryItems = [
    { 
      key: 'home', 
      to: '/dashboard', 
      label: t('home'), 
      icon: Icons.Home, 
      primary: true,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'prayer-times', 
      to: '/prayer-times', 
      label: t('prayerTimes'), 
      icon: Icons.Clock, 
      primary: true,
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      key: 'qibla', 
      to: '/qibla', 
      label: t('qibla'), 
      icon: Icons.Compass, 
      primary: true,
      color: 'from-amber-500 to-amber-600'
    },
    { 
      key: 'quiz', 
      to: '/quiz', 
      label: t('quiz'), 
      icon: ({ isActive }) => (
        <motion.span 
          className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          🏆
        </motion.span>
      ), 
      primary: true,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      key: 'mistakes', 
      to: '/mistakes', 
      label: t('mistakes'), 
      icon: ({ isActive }) => (
        <motion.span 
          className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          ⚠️
        </motion.span>
      ), 
      primary: true,
      color: 'from-red-500 to-red-600'
    },
  ];

  // Secondary navigation items (in overflow menu)
  const secondaryItems = [
    { key: 'hadith', to: '/hadith', label: t('hadith'), icon: <IslamicIcon name="hadith" /> },
    { key: 'duas', to: '/duas', label: t('duas'), icon: <IslamicIcon name="dua" /> },
    { key: 'learn', to: '/learn', label: t('learn'), icon: Icons.BookOpen },
    { key: 'daily-challenge', to: '/daily-challenge', label: t('dailyChallenge'), icon: ({ isActive }) => (
      <motion.span 
        className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        🌟
      </motion.span>
    ) },
    { key: 'tracker', to: '/tracker', label: t('tracker'), icon: <IslamicIcon name="tracker" /> },
    { key: 'progress', to: '/progress', label: t('progress'), icon: <IslamicIcon name="tracker" /> },
    { key: 'ai-assistant', to: '/ai-assistant', label: t('aiAssistant'), icon: Icons.Bot },
    { key: 'settings', to: '/settings', label: t('settings'), icon: Icons.Cog6Tooth },
  ];

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsNarrow(width < 480);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      return primaryItems.slice(0, 5); // Show all 5 primary items on narrow screens
    }
    return primaryItems;
  };

  const visibleItems = getVisibleItems();

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-gradient-to-t from-slate-900/95 to-slate-800/95 backdrop-blur-xl
          border-t border-emerald-500/30
          shadow-2xl shadow-emerald-900/20
          ${className}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none"></div>
        
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
                  min-h-[60px] min-w-[60px] px-2 py-2
                  rounded-xl transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  hover:scale-105 active:scale-95
                ${isActive 
                    ? `bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30` 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }
                ${isMobile && !isNarrow ? 'flex-1' : ''}
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
                    text-xs font-medium text-center leading-tight
                    ${isNarrow ? 'hidden' : 'block'}
                    ${isActive ? 'text-white' : 'text-gray-300'}
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
                    className="absolute -top-1 w-2 h-2 bg-white rounded-full shadow-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
            </NavLink>
            );
          })}

          {/* Overflow Button */}
          {(isNarrow || secondaryItems.length > 0) && (
            <div className="relative" ref={overflowRef}>
              <motion.button
                onClick={() => setShowOverflow(!showOverflow)}
                className={`
                  flex flex-col items-center justify-center
                  min-h-[56px] min-w-[56px] px-3 py-2
                  rounded-2xl transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  hover:scale-105 active:scale-95
                  ${showOverflow 
                    ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
                  }
                  ${isMobile && !isNarrow ? 'flex-1' : ''}
                `}
                aria-label="More options"
                aria-expanded={showOverflow}
                aria-haspopup="true"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                    text-xs font-semibold text-center leading-tight
                  ${isNarrow ? 'hidden' : 'block'}
                    ${showOverflow ? 'text-white' : 'text-gray-600 dark:text-gray-300'}
                  `}
                  animate={{ 
                    scale: showOverflow ? 1.05 : 1,
                    color: showOverflow ? '#ffffff' : undefined
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {t('more')}
                </motion.span>
              </motion.button>

              {/* Overflow Panel */}
              <AnimatePresence>
              {showOverflow && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="
                      absolute bottom-full mb-3 right-0
                      bg-white/98 dark:bg-gray-800/98 backdrop-blur-xl
                      border border-gray-200/60 dark:border-gray-700/60
                      rounded-3xl shadow-2xl dark:shadow-gray-900/50
                      p-3 min-w-[240px]
                    "
                  >
                    {/* Panel header */}
                    <div className="text-center mb-3 pb-2 border-b border-gray-200/50 dark:border-gray-700/50">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {t('moreFeatures')}
                      </span>
                    </div>
                    
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
                              min-h-[48px] px-2 py-2
                              rounded-2xl transition-all duration-300
                              focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                              hover:scale-105 active:scale-95
                          ${isActive 
                                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg' 
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60'
                          }
                        `}
                        aria-label={item.label}
                      >
                            <motion.div
                              className="mb-1"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {typeof IconComponent === 'function' ? (
                                <IconComponent isActive={isActive} />
                              ) : (
                                <span className="text-lg">{IconComponent}</span>
                              )}
                            </motion.div>
                        <span className="text-xs font-medium text-center leading-tight">
                          {item.label}
                        </span>
                      </NavLink>
                        );
                      })}
                  </div>
                  </motion.div>
              )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Bottom Spacing - Reduced to not impact UI */}
      <div className="h-16"></div>
    </>
  );
}

// Helper function to determine label visibility based on available width
export const useLabelVisibility = (breakpoint = 480) => {
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLabels(window.innerWidth >= breakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return showLabels;
};

// Framer Motion animation variants (if using Framer Motion)
export const overflowAnimations = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
}; 
