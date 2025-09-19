import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../utils/translations';

const SearchBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Search suggestions data
  const searchSuggestions = [
    { key: 'home', label: t('home'), path: '/dashboard', icon: '🏠', keywords: ['home', 'dashboard', 'main'] },
    { key: 'prayer-times', label: t('prayerTimes'), path: '/prayer-times', icon: '🕐', keywords: ['prayer', 'times', 'salah', 'namaz'] },
    { key: 'namaz', label: t('namaz'), path: '/namaz', icon: '📖', keywords: ['namaz', 'prayer', 'guide', 'steps'] },
    { key: 'hadith', label: t('hadith'), path: '/hadith', icon: '📚', keywords: ['hadith', 'sunnah', 'prophet', 'sayings'] },
    { key: 'duas', label: t('duas'), path: '/duas', icon: '🤲', keywords: ['duas', 'supplications', 'prayers', 'dhikr'] },
    { key: 'qibla', label: t('qibla'), path: '/qibla', icon: '🧭', keywords: ['qibla', 'direction', 'mecca', 'kaaba'] },
    { key: 'tracker', label: t('tracker'), path: '/tracker', icon: '📊', keywords: ['tracker', 'progress', 'prayer', 'tracking'] },
    { key: 'quiz', label: t('quiz'), path: '/quiz', icon: '❓', keywords: ['quiz', 'test', 'knowledge', 'islamic'] },
    { key: 'mistakes', label: t('mistakes'), path: '/mistakes', icon: '⚠️', keywords: ['mistakes', 'common', 'errors', 'corrections'] }
  ];

  // Filter suggestions based on search query
  const filteredSuggestions = searchQuery.trim() 
    ? searchSuggestions.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // Handle search result click
  const handleSuggestionClick = (path) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(path);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredSuggestions.length > 0) {
      handleSuggestionClick(filteredSuggestions[0].path);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className={`relative transition-all duration-200 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              setIsFocused(true);
              if (searchQuery.trim()) setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={t('searchPlaceholder') || 'Search...'}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            <div className="p-2">
              <div className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700 mb-1">
                {filteredSuggestions.length} result{filteredSuggestions.length !== 1 ? 's' : ''} found
              </div>
              <div className="space-y-1">
                {filteredSuggestions.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => handleSuggestionClick(item.path)}
                    className="w-full flex items-center space-x-3 px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.keywords.slice(0, 2).join(', ')}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {showSuggestions && searchQuery.trim() && filteredSuggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="p-4 text-center">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">No results found</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try different keywords</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
