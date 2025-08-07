import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import IslamicIcon from './IslamicIcon';

// Icon imports from lucide-react (you'll need to install: npm install lucide-react)
// import { 
//   HomeIcon, 
//   ClockIcon, 
//   CompassIcon, 
//   BookOpenIcon, 
//   BotIcon, 
//   EllipsisHorizontalIcon,
//   Cog6ToothIcon,
//   LanguageIcon,
//   HistoryIcon,
//   CircleDotIcon
// } from 'lucide-react';

// Fallback icons using emoji for now (replace with lucide-react icons)
const Icons = {
  Home: () => <span className="text-xl">🏠</span>,
  Clock: () => <span className="text-xl">🕐</span>,
  Compass: () => <span className="text-xl">🧭</span>,
  BookOpen: () => <span className="text-xl">📖</span>,
  Bot: () => <span className="text-xl">🤖</span>,
  EllipsisHorizontal: () => <span className="text-xl">⋯</span>,
  Cog6Tooth: () => <span className="text-xl">⚙️</span>,
  Language: () => <span className="text-xl">🌐</span>,
  History: () => <span className="text-xl">📜</span>,
  CircleDot: () => <span className="text-xl">🔘</span>
};

export default function FooterNavTabs({ onNavigate, className = '' }) {
  const { t } = useTranslation();
  const [showOverflow, setShowOverflow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const overflowRef = useRef(null);

  // Primary navigation items (always visible)
  const primaryItems = [
    { key: 'home', to: '/', label: t('home'), icon: <Icons.Home />, primary: true },
    { key: 'prayer-times', to: '/prayer-times', label: t('prayerTimes'), icon: <Icons.Clock />, primary: true },
    { key: 'qibla', to: '/qibla', label: t('qibla'), icon: <Icons.Compass />, primary: true },
    { key: 'learn', to: '/learn', label: t('learn'), icon: <Icons.BookOpen />, primary: true },
    { key: 'ai-assistant', to: '/ai-assistant', label: t('aiAssistant'), icon: <Icons.Bot />, primary: true },
  ];

  // Secondary navigation items (in overflow menu)
  const secondaryItems = [
    { key: 'hadith', to: '/hadith', label: t('hadith'), icon: <IslamicIcon name="hadith" /> },
    { key: 'duas', to: '/duas', label: t('duas'), icon: <IslamicIcon name="dua" /> },
    { key: 'quiz', to: '/quiz', label: 'Quiz', icon: <span className="text-xl">🏆</span> },
    { key: 'daily-challenge', to: '/daily-challenge', label: 'Daily Challenge', icon: <span className="text-xl">🌟</span> },
    { key: 'tracker', to: '/tracker', label: t('tracker'), icon: <IslamicIcon name="tracker" /> },
    { key: 'mistakes', to: '/mistakes', label: t('mistakes'), icon: <IslamicIcon name="mistakes" /> },
    { key: 'progress', to: '/progress', label: t('progress'), icon: <IslamicIcon name="tracker" /> },
    { key: 'settings', to: '/settings', label: t('settings'), icon: <Icons.Cog6Tooth /> },
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
      return primaryItems.slice(0, 4); // Show only 4 on very narrow screens
    }
    return primaryItems;
  };

  const visibleItems = getVisibleItems();

  return (
    <>
      {/* Main Navigation Bar */}
      <nav 
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg
          border-t border-gray-200/50 dark:border-gray-700/50
          shadow-lg dark:shadow-gray-900/20
          ${className}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around px-2 py-3">
          {visibleItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              onClick={() => handleNavigate(item.key)}
              className={({ isActive }) => `
                flex flex-col items-center justify-center
                min-h-[44px] min-w-[44px] px-2 py-1
                rounded-2xl transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-500/50
                hover:bg-gray-100/50 dark:hover:bg-gray-800/50
                ${isActive 
                  ? 'bg-amber-100/80 dark:bg-amber-800/20 text-amber-700 dark:text-amber-300 shadow-md' 
                  : 'text-gray-600 dark:text-gray-300'
                }
                ${isMobile && !isNarrow ? 'flex-1' : ''}
              `}
              aria-label={item.label}
              role="tab"
              aria-selected={false}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className={`
                text-xs font-medium text-center leading-tight
                ${isNarrow ? 'hidden' : 'block'}
              `}>
                {item.label}
              </span>
            </NavLink>
          ))}

          {/* Overflow Button */}
          {(isNarrow || secondaryItems.length > 0) && (
            <div className="relative" ref={overflowRef}>
              <button
                onClick={() => setShowOverflow(!showOverflow)}
                className={`
                  flex flex-col items-center justify-center
                  min-h-[44px] min-w-[44px] px-2 py-1
                  rounded-2xl transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-amber-500/50
                  hover:bg-gray-100/50 dark:hover:bg-gray-800/50
                  ${showOverflow 
                    ? 'bg-amber-100/80 dark:bg-amber-800/20 text-amber-700 dark:text-amber-300 shadow-md' 
                    : 'text-gray-600 dark:text-gray-300'
                  }
                  ${isMobile && !isNarrow ? 'flex-1' : ''}
                `}
                aria-label="More options"
                aria-expanded={showOverflow}
                aria-haspopup="true"
              >
                <span className="text-xl mb-1">
                  <Icons.EllipsisHorizontal />
                </span>
                <span className={`
                  text-xs font-medium text-center leading-tight
                  ${isNarrow ? 'hidden' : 'block'}
                `}>
                  {t('more')}
                </span>
              </button>

              {/* Overflow Panel */}
              {showOverflow && (
                <div className="
                  absolute bottom-full mb-2 right-0
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  rounded-2xl shadow-xl dark:shadow-gray-900/50
                  p-2 min-w-[200px]
                  animate-in slide-in-from-bottom-2 duration-200
                ">
                  <div className="grid grid-cols-2 gap-1">
                    {secondaryItems.map((item) => (
                      <NavLink
                        key={item.key}
                        to={item.to}
                        onClick={() => handleNavigate(item.key)}
                        className={({ isActive }) => `
                          flex flex-col items-center justify-center
                          min-h-[44px] px-3 py-2
                          rounded-xl transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-amber-500/50
                          hover:bg-gray-100 dark:hover:bg-gray-700
                          ${isActive 
                            ? 'bg-amber-100/80 dark:bg-amber-800/20 text-amber-700 dark:text-amber-300' 
                            : 'text-gray-600 dark:text-gray-300'
                          }
                        `}
                        aria-label={item.label}
                      >
                        <span className="text-lg mb-1">{item.icon}</span>
                        <span className="text-xs font-medium text-center leading-tight">
                          {item.label}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Spacing */}
      <div className="h-20"></div>

      <style>{`
        @keyframes slide-in-from-bottom-2 {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .slide-in-from-bottom-2 {
          animation-name: slide-in-from-bottom-2;
        }
      `}</style>
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