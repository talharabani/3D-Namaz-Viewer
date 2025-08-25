import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

export default function ModernHeader({ 
  currentLang, 
  onLanguageChange, 
  isAuthenticated, 
  userProfile, 
  onAuthClick, 
  onLogout 
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef(null);
  const tabsScrollRef = useRef(null);
  const [showScrollControls, setShowScrollControls] = useState(false);

  // Navigation tabs
  const navTabs = [
    { path: '/', label: t('home'), icon: '🏠' },
    { path: '/prayer-times', label: t('prayerTimes'), icon: '🕐' },
    { path: '/namaz', label: t('namaz'), icon: '🕌' },
    { path: '/learn', label: t('learn'), icon: '📚' },
    { path: '/hadith', label: t('hadith'), icon: '📜' },
    { path: '/duas', label: t('duas'), icon: '🤲' },
    { path: '/qibla', label: t('qibla'), icon: '🧭' },
    { path: '/tracker', label: t('tracker'), icon: '📈' },
    { path: '/quiz', label: t('quiz'), icon: '🏆' },
    { path: '/ai-assistant', label: t('aiAssistant'), icon: '🤖' },
    { path: '/progress', label: t('progress'), icon: '📊' },
    { path: '/mistakes', label: t('mistakes'), icon: '⚠️' },
    { path: '/settings', label: t('settings'), icon: '⚙️' }
  ];

  // Search functionality
  const searchItems = [
    { type: 'dua', label: t('duas'), path: '/duas', icon: '🤲', description: t('searchDuasDesc') },
    { type: 'hadith', label: t('hadith'), path: '/hadith', icon: '📜', description: t('searchHadithDesc') },
    { type: 'learn', label: t('learn'), path: '/learn', icon: '📚', description: t('searchLearnDesc') },
    { type: 'prayer', label: t('namaz'), path: '/namaz', icon: '🕌', description: t('searchPrayerDesc') },
    { type: 'qibla', label: t('qibla'), path: '/qibla', icon: '🧭', description: t('searchQiblaDesc') },
    { type: 'tracker', label: t('tracker'), path: '/tracker', icon: '📈', description: t('searchTrackerDesc') },
    { type: 'quiz', label: t('quiz'), path: '/quiz', icon: '🏆', description: t('searchQuizDesc') },
    { type: 'ai', label: t('aiAssistant'), path: '/ai-assistant', icon: '🤖', description: t('searchAIDesc') },
    { type: 'times', label: t('prayerTimes'), path: '/prayer-times', icon: '🕐', description: t('searchTimesDesc') },
    { type: 'settings', label: t('settings'), path: '/settings', icon: '⚙️', description: t('searchSettingsDesc') }
  ];

  const filteredSearchResults = searchItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (!event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect if scroll controls are needed (small screens)
  const updateScrollControls = () => {
    const el = tabsScrollRef.current;
    if (!el) return;
    setShowScrollControls(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    updateScrollControls();
    window.addEventListener('resize', updateScrollControls);
    return () => window.removeEventListener('resize', updateScrollControls);
  }, [navTabs]);

  const scrollTabs = (dir) => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const amount = Math.min(240, el.clientWidth * 0.8);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg">
              🕌
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Namaz Web</h1>
              <p className="text-xs text-gray-400">Islamic Companion</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 md:mx-8 relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-3 md:px-4 py-2 pl-10 md:pl-12 pr-3 md:pr-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && filteredSearchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                {filteredSearchResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(item.path)}
                    className="w-full flex items-center space-x-4 px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-white font-medium">{item.label}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Toggle */}
            <button
              onClick={onLanguageChange}
              className="px-3 md:px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 rounded-xl font-medium hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 shadow-lg"
            >
              {currentLang === 'en' ? 'اردو' : 'EN'}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 md:space-x-3 p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                >
                  {userProfile?.picture ? (
                    <img
                      src={userProfile.picture}
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium">{userProfile?.name || 'User'}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl py-2 border border-gray-600 z-50">
                    <div className="px-4 py-3 border-b border-gray-600">
                      <p className="text-sm font-medium text-white">{userProfile?.name}</p>
                      <p className="text-xs text-gray-400">{userProfile?.email}</p>
                    </div>
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </NavLink>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={onAuthClick}
                  className="px-3 md:px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={onAuthClick}
                  className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative border-t border-gray-700">
          {/* Scroll buttons for small screens */}
          {showScrollControls && (
            <>
              <button
                onClick={() => scrollTabs('left')}
                className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full shadow"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => scrollTabs('right')}
                className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full shadow"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <nav
            ref={tabsScrollRef}
            className="flex flex-wrap md:flex-nowrap gap-1 overflow-x-auto scrollbar-hide py-2"
          >
            {navTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-2 text-sm font-medium rounded-lg md:rounded-t-xl transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`
                }
              >
                <span className="text-base md:text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
