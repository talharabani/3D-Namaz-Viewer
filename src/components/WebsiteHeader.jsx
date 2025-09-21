import React, { useState } from 'react';
import { useTranslation } from '../utils/translations';
import { useLocation, Link } from 'react-router-dom';
import Logo from './Logo';

export default function WebsiteHeader({ 
  onMenuClick, 
  onLanguageChange, 
  currentLang, 
  onChildrenModeToggle, 
  childrenMode, 
  onVoiceSearch, 
  isMobile,
  isAuthenticated,
  userProfile,
  onAuthClick,
  onLogout
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigationItems = [
    { name: t('home'), href: '/', current: location.pathname === '/' },
    { name: t('prayerTimes'), href: '/prayer-times', current: location.pathname === '/prayer-times' },
    { name: t('learn'), href: '/learn', current: location.pathname === '/learn' },
    { name: t('hadith'), href: '/hadith', current: location.pathname === '/hadith' },
    { name: t('duas'), href: '/duas', current: location.pathname === '/duas' },
    { name: t('qibla'), href: '/qibla', current: location.pathname === '/qibla' },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/': return t('home');
      case '/prayer-times': return t('prayerTimes');
      case '/qibla': return t('qibla');
      case '/learn': return t('learn');
      case '/quiz': return t('quiz');
      case '/tracker': return t('tracker');
      case '/hadith': return t('hadith');
      case '/duas': return t('duas');
      case '/namaz': return t('namaz');
      case '/mistakes': return t('mistakes');
      case '/progress': return t('progress');
      case '/ai-assistant': return t('aiAssistant');
      case '/settings': return t('settings');
      case '/daily-challenge': return t('dailyChallenge');
      default: return t('home');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <Logo size="medium" variant="icon" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Namaz Web</h1>
                <p className="text-xs text-gray-500">Islamic Prayer Companion</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      item.current
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Center - Page Title (Mobile) */}
          {isMobile && (
            <div className="flex-1 text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {getPageTitle()}
              </h2>
            </div>
          )}

          {/* Right side - Controls and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              title="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Voice Search Button */}
            <button
              onClick={onVoiceSearch}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              title={t('voiceSearch')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Children Mode Toggle */}
            <button
              onClick={onChildrenModeToggle}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors ${
                childrenMode 
                  ? 'text-green-600 bg-green-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={childrenMode ? t('disableChildrenMode') : t('enableChildrenMode')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Language Toggle */}
            <button
              onClick={onLanguageChange}
              className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              title={currentLang === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
            >
              {currentLang === 'en' ? 'اردو' : 'EN'}
            </button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                >
                  {userProfile?.picture ? (
                    <img 
                      src={userProfile.picture} 
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium">{userProfile?.name || 'User'}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userProfile?.name}</p>
                      <p className="text-xs text-gray-500">{userProfile?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onAuthClick}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onAuthClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for prayers, duas, hadith..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
