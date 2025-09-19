import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../utils/translations';
import { 
  fadeInUp, 
  buttonPress,
  transitions 
} from '../utils/animations';

export default function UniversalSearch({ 
  onSearch, 
  placeholder = "Search...", 
  suggestions = [], 
  loading = false,
  className = "",
  showFilters = false,
  filters = [],
  onFilterChange = () => {},
  searchValue = "",
  onSearchChange = () => {}
}) {
  const { t } = useTranslation();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const searchTimeout = useRef(null);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Update local value when prop changes
  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchValue(value);
    onSearchChange(value);
    
    // Show suggestions if there are any
    if (value.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    
    // Debounce search
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setLocalSearchValue(suggestion);
    onSearchChange(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    onSearch(suggestion);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          onSearch(localSearchValue);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Clear search
  const clearSearch = () => {
    setLocalSearchValue('');
    onSearchChange('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    onSearch('');
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search Bar */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={localSearchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (localSearchValue.length >= 2 && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400">
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>

          {/* Clear Button */}
          {localSearchValue && !loading && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={transitions.smooth}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 z-50 max-h-80 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                    index === selectedSuggestionIndex ? 'bg-blue-50 dark:bg-slate-700' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 dark:text-blue-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{suggestion}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filters */}
      {showFilters && filters.length > 0 && (
        <motion.div 
          className="mt-4 flex flex-wrap gap-2"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.key}
              onClick={() => onFilterChange(filter.key, !filter.active)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${
                filter.active 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600 border-2 border-slate-200/50 dark:border-slate-700/50'
              }`}
              {...buttonPress}
            >
              {filter.icon && <span className="mr-2">{filter.icon}</span>}
              {filter.label}
              {filter.count !== undefined && (
                <span className="ml-2 px-2 py-1 bg-white/20 dark:bg-slate-600/20 rounded-full text-xs">
                  {filter.count}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
