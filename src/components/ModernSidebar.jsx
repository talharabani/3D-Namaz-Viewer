import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

export default function ModernSidebar({ isOpen, onClose, currentLang, isAuthenticated }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Menu structure with icons and submenus
  const menuItems = [
    {
      id: 'dashboard',
      title: t('dashboard'),
      icon: '📊',
      path: '/dashboard',
      badge: 'New'
    },
    {
      id: 'prayer',
      title: t('prayer'),
      icon: '🕌',
      submenu: [
        { title: t('prayerTimes'), path: '/prayer-times', icon: '🕐' },
        { title: t('namaz'), path: '/namaz', icon: '📿' },
        { title: t('qibla'), path: '/qibla', icon: '🧭' },
        { title: t('tracker'), path: '/tracker', icon: '📈' }
      ]
    },
    {
      id: 'learning',
      title: t('learning'),
      icon: '📚',
      submenu: [
        { title: t('learn'), path: '/learn', icon: '📖' },
        { title: t('quiz'), path: '/quiz', icon: '🏆', badge: 'Popular' },
        { title: t('hadith'), path: '/hadith', icon: '📜' },
        { title: t('mistakes'), path: '/mistakes', icon: '⚠️' }
      ]
    },
    {
      id: 'spiritual',
      title: t('spiritual'),
      icon: '🤲',
      submenu: [
        { title: t('duas'), path: '/duas', icon: '📿' },
        { title: t('aiAssistant'), path: '/ai-assistant', icon: '🤖', badge: 'AI' },
        { title: t('dailyChallenge'), path: '/daily-challenge', icon: '🌟' }
      ]
    },
    {
      id: 'progress',
      title: t('progress'),
      icon: '📈',
      path: '/progress'
    },
    {
      id: 'settings',
      title: t('settings'),
      icon: '⚙️',
      path: '/settings'
    }
  ];

  // Check if a menu item is active
  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Toggle submenu expansion
  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    if (item.submenu) {
      toggleSubmenu(item.id);
    } else {
      onClose?.();
    }
  };

  // Auto-expand submenu if current page is in it
  useEffect(() => {
    const newExpandedMenus = {};
    menuItems.forEach(item => {
      if (item.submenu) {
        const hasActiveChild = item.submenu.some(subItem => isActive(subItem.path));
        if (hasActiveChild) {
          newExpandedMenus[item.id] = true;
        }
      }
    });
    setExpandedMenus(newExpandedMenus);
  }, [location.pathname]);

  // Handle hover for desktop
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsHovered(false);
    }
  };

  const sidebarWidth = isCollapsed && !isHovered ? 'w-20' : 'w-72';
  const isExpanded = !isCollapsed || isHovered;

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={`hidden lg:block fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 shadow-2xl transition-all duration-300 ease-in-out z-40 ${sidebarWidth}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg">
                🕌
              </div>
              {isExpanded && (
                <div>
                  <h1 className="text-xl font-bold text-white">Namaz Web</h1>
                  <p className="text-sm text-gray-400">Islamic Companion</p>
                </div>
              )}
            </div>
            {isExpanded && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* User Profile Section */}
          {isAuthenticated && isExpanded && (
            <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-800 to-gray-700">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    U
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Welcome back!</p>
                  <p className="text-xs text-gray-400">Continue your journey</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  // Menu item with submenu
                  <div>
                    <button
                      onClick={() => handleMenuItemClick(item)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        expandedMenus[item.id]
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-xl">{item.icon}</span>
                        {isExpanded && <span>{item.title}</span>}
                      </div>
                      {isExpanded && (
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            expandedMenus[item.id] ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>

                    {/* Submenu */}
                    {expandedMenus[item.id] && isExpanded && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <NavLink
                            key={index}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                                isActive
                                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 shadow-lg'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              }`
                            }
                            onClick={onClose}
                          >
                            <span className="text-lg">{subItem.icon}</span>
                            <span className="flex-1">{subItem.title}</span>
                            {subItem.badge && (
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                location.pathname === subItem.path
                                  ? 'bg-gray-900/20 text-gray-900'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {subItem.badge}
                              </span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Simple menu item
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 shadow-lg'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`
                    }
                    onClick={onClose}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isExpanded && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            location.pathname === item.path
                              ? 'bg-gray-900/20 text-gray-900'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 bg-gray-800">
            {isExpanded ? (
              <div className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-700 rounded-xl p-3 text-center shadow-lg">
                    <div className="text-xl mb-1">🕌</div>
                    <div className="text-xs font-medium text-gray-400">Next</div>
                    <div className="text-sm font-bold text-white">14:30</div>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-3 text-center shadow-lg">
                    <div className="text-xl mb-1">🎯</div>
                    <div className="text-xs font-medium text-gray-400">Goal</div>
                    <div className="text-sm font-bold text-white">3/5</div>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-3 text-center shadow-lg">
                    <div className="text-xl mb-1">🔥</div>
                    <div className="text-xs font-medium text-gray-400">Streak</div>
                    <div className="text-sm font-bold text-white">7</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
                    <span className="mr-3 text-lg">🕌</span>
                    Start Prayer
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
                    <span className="mr-3 text-lg">📚</span>
                    Learn
                  </button>
                </div>

                {/* App Info */}
                <div className="text-center pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center text-gray-900 font-bold text-sm">
                      🕌
                    </div>
                    <span className="text-sm font-bold text-white">Namaz Web</span>
                  </div>
                  <p className="text-xs text-gray-400">v2.0 - Your Islamic Companion</p>
                  <div className="flex items-center justify-center mt-3 space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">All systems operational</span>
                  </div>
                </div>
              </div>
            ) : (
              // Collapsed footer
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center text-gray-900 font-bold text-sm mx-auto mb-3">
                  🕌
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-75 z-50 backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg">
                🕌
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Namaz Web</h1>
                <p className="text-sm text-gray-400">Islamic Companion</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => handleMenuItemClick(item)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        expandedMenus[item.id]
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          expandedMenus[item.id] ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedMenus[item.id] && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <NavLink
                            key={index}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center space-x-4 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 shadow-lg'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              }`
                            }
                            onClick={onClose}
                          >
                            <span className="text-xl">{subItem.icon}</span>
                            <span className="flex-1">{subItem.title}</span>
                            {subItem.badge && (
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                location.pathname === subItem.path
                                  ? 'bg-gray-900/20 text-gray-900'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {subItem.badge}
                              </span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-4 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 shadow-lg'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`
                    }
                    onClick={onClose}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        location.pathname === item.path
                          ? 'bg-gray-900/20 text-gray-900'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-gray-800 bg-gray-800">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-700 rounded-xl p-3 text-center shadow-lg">
                  <div className="text-xl mb-1">🕌</div>
                  <div className="text-xs font-medium text-gray-400">Next</div>
                  <div className="text-sm font-bold text-white">14:30</div>
                </div>
                <div className="bg-gray-700 rounded-xl p-3 text-center shadow-lg">
                  <div className="text-xl mb-1">🎯</div>
                  <div className="text-xs font-medium text-gray-400">Goal</div>
                  <div className="text-sm font-bold text-white">3/5</div>
                </div>
                <div className="bg-gray-700 rounded-xl p-3 text-center shadow-lg">
                  <div className="text-xl mb-1">🔥</div>
                  <div className="text-xs font-medium text-gray-400">Streak</div>
                  <div className="text-sm font-bold text-white">7</div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-5 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-medium shadow-lg">
                  <span className="mr-4 text-xl">🕌</span>
                  Start Prayer
                </button>
                <button className="w-full flex items-center justify-center px-5 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg">
                  <span className="mr-4 text-xl">📚</span>
                  Learn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
