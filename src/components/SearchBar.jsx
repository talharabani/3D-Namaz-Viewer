import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../utils/translations';

const SearchBar = ({ className = "" }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Search suggestions data
  const searchSuggestions = [
    // App Pages
    {
      id: 'home',
      title: t('home'),
      description: t('homeDescription'),
      type: 'page',
      route: '/dashboard',
      icon: '🏠',
      category: 'Pages'
    },
    {
      id: 'prayer-times',
      title: t('prayerTimes'),
      description: t('prayerTimesDesc'),
      type: 'page',
      route: '/prayer-times',
      icon: '🕐',
      category: 'Pages'
    },
    {
      id: 'namaz',
      title: t('namaz'),
      description: t('learnNamazDesc'),
      type: 'page',
      route: '/namaz',
      icon: '🤲',
      category: 'Pages'
    },
    {
      id: 'duas',
      title: t('duas'),
      description: t('duaCollectionDesc'),
      type: 'page',
      route: '/duas',
      icon: '📿',
      category: 'Pages'
    },
    {
      id: 'hadith',
      title: t('hadith'),
      description: t('hadithDesc'),
      type: 'page',
      route: '/hadith',
      icon: '📖',
      category: 'Pages'
    },
    {
      id: 'qibla',
      title: t('qibla'),
      description: t('qiblaDirectionDesc'),
      type: 'page',
      route: '/qibla',
      icon: '🧭',
      category: 'Pages'
    },
    {
      id: 'tracker',
      title: t('tracker'),
      description: t('prayerTrackerDesc'),
      type: 'page',
      route: '/tracker',
      icon: '📊',
      category: 'Pages'
    },
    {
      id: 'quiz',
      title: t('quiz'),
      description: t('quizDesc'),
      type: 'page',
      route: '/quiz',
      icon: '🏆',
      category: 'Pages'
    },
    {
      id: 'settings',
      title: t('settings'),
      description: 'App settings and preferences',
      type: 'page',
      route: '/settings',
      icon: '⚙️',
      category: 'Pages'
    },
    {
      id: 'learn',
      title: t('learn'),
      description: t('learnNamazDesc'),
      type: 'page',
      route: '/learn',
      icon: '📚',
      category: 'Pages'
    },
    {
      id: 'progress',
      title: t('progress'),
      description: 'Track your learning progress',
      type: 'page',
      route: '/progress',
      icon: '📈',
      category: 'Pages'
    },
    {
      id: 'ai-assistant',
      title: t('aiAssistant'),
      description: t('aiAssistantDesc'),
      type: 'page',
      route: '/ai-assistant',
      icon: '🤖',
      category: 'Pages'
    },
    {
      id: 'mistakes',
      title: t('mistakes'),
      description: 'Common prayer mistakes to avoid',
      type: 'page',
      route: '/mistakes',
      icon: '⚠️',
      category: 'Pages'
    },
    {
      id: 'daily-challenge',
      title: t('dailyChallenge'),
      description: 'Daily Islamic challenges',
      type: 'page',
      route: '/daily-challenge',
      icon: '🎯',
      category: 'Pages'
    },
    // Sample Duas
    {
      id: 'dua-morning',
      title: 'Morning Dua',
      description: 'Beautiful morning supplications',
      type: 'content',
      route: '/duas',
      icon: '🌅',
      category: 'Duas'
    },
    {
      id: 'dua-evening',
      title: 'Evening Dua',
      description: 'Peaceful evening prayers',
      type: 'content',
      route: '/duas',
      icon: '🌙',
      category: 'Duas'
    },
    {
      id: 'dua-travel',
      title: 'Travel Dua',
      description: 'Prayers for safe journey',
      type: 'content',
      route: '/duas',
      icon: '✈️',
      category: 'Duas'
    },
    {
      id: 'dua-food',
      title: 'Before Eating Dua',
      description: 'Blessing before meals',
      type: 'content',
      route: '/duas',
      icon: '🍽️',
      category: 'Duas'
    },
    // Sample Hadith
    {
      id: 'hadith-prayer',
      title: 'Hadith about Prayer',
      description: 'Prophet\'s sayings about Salah',
      type: 'content',
      route: '/hadith',
      icon: '🤲',
      category: 'Hadith'
    },
    {
      id: 'hadith-charity',
      title: 'Hadith about Charity',
      description: 'Teachings about giving',
      type: 'content',
      route: '/hadith',
      icon: '💝',
      category: 'Hadith'
    },
    {
      id: 'hadith-knowledge',
      title: 'Hadith about Knowledge',
      description: 'Importance of seeking knowledge',
      type: 'content',
      route: '/hadith',
      icon: '📚',
      category: 'Hadith'
    }
  ];

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredSuggestions([]);
      setIsOpen(false);
      return;
    }

    const filtered = searchSuggestions.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [query]);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setQuery('');
    setIsOpen(false);
    navigate(suggestion.route);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`} ref={dropdownRef}>
      {/* Search Input */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <motion.svg
              className="h-4 w-4 text-emerald-400/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </motion.svg>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setIsOpen(true)}
            placeholder="Search pages, Duas, Hadith..."
            className="w-full pl-10 pr-10 py-3 bg-white/5 backdrop-blur-lg border border-emerald-400/20 rounded-xl text-white placeholder-emerald-300/70 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all duration-300 text-sm sm:text-base shadow-lg"
          />

          {/* Clear Button */}
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-300 hover:text-white transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Dropdown Suggestions */}
      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/5 backdrop-blur-lg border border-emerald-400/20 rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  className={`px-4 py-3 cursor-pointer transition-all duration-200 border-b border-white/10 last:border-b-0 ${
                    selectedIndex === index
                      ? 'bg-emerald-500/20 border-emerald-400/40'
                      : 'hover:bg-white/10 hover:border-emerald-400/20'
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm">
                      {suggestion.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm truncate">
                          {suggestion.title}
                        </h4>
                        <span className="text-xs text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-full">
                          {suggestion.category}
                        </span>
                      </div>
                      <p className="text-emerald-200 text-xs mt-1 line-clamp-1">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-white/5 border-t border-white/10">
              <p className="text-xs text-emerald-300 text-center">
                Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Enter</kbd> to select, 
                <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs ml-1">↑↓</kbd> to navigate, 
                <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs ml-1">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {isOpen && query && filteredSuggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/5 backdrop-blur-lg border border-emerald-400/20 rounded-xl shadow-xl p-4 text-center z-50"
          >
            <div className="text-emerald-300 text-4xl mb-2">🔍</div>
            <p className="text-white font-medium">No results found</p>
            <p className="text-emerald-200 text-sm mt-1">
              Try searching for pages, Duas, or Hadith
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
