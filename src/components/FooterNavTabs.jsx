import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import IslamicIcon from './IslamicIcon';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced icons with better visual appeal
const Icons = {
  Home: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      🏠
    </motion.span>
  ),
  Clock: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      🕐
    </motion.span>
  ),
  Compass: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      🧭
    </motion.span>
  ),
  BookOpen: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      📖
    </motion.span>
  ),
  Bot: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      🤖
    </motion.span>
  ),
  EllipsisHorizontal: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      ⋯
    </motion.span>
  ),
  Cog6Tooth: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      ⚙️
    </motion.span>
  ),
  Language: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      🌐
    </motion.span>
  ),
  History: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      📜
    </motion.span>
  ),
  CircleDot: ({ isActive }) => (
    <motion.span 
      className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      🔘
    </motion.span>
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
          bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl
          border-t border-gray-200/60 dark:border-gray-700/60
          shadow-2xl dark:shadow-gray-900/30
          ${className}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent dark:from-gray-900/20 pointer-events-none"></div>
        
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
                  min-h-[56px] min-w-[56px] px-3 py-2
                  rounded-2xl transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  hover:scale-105 active:scale-95
                  ${isActive 
                    ? `bg-gradient-to-br ${item.color} text-white shadow-lg shadow-${item.color.split('-')[1]}-500/25` 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
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
                    text-xs font-semibold text-center leading-tight
                    ${isNarrow ? 'hidden' : 'block'}
                    ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}
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