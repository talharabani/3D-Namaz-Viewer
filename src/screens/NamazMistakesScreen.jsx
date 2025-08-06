import React, { useState, useEffect } from 'react';
import { useTranslation } from '../utils/translations';

const mistakes = [
  {
    id: 1,
    title: 'Rushing the Prayer',
    mistake: 'Performing the movements and recitations too quickly, without calmness or reflection.',
    fix: 'Pray with calmness and humility. Allow each position to settle before moving to the next.',
    category: 'Tempo',
    severity: 'High',
    tips: ['Take deep breaths between positions', 'Recite slowly and clearly', 'Feel each movement']
  },
  {
    id: 2,
    title: 'Incorrect Posture in Rukoo or Sujood',
    mistake: 'Not keeping the back straight in Rukoo, or elbows touching the ground in Sujood.',
    fix: 'Keep your back flat in Rukoo and ensure only your hands, knees, feet, forehead, and nose touch the ground in Sujood.',
    category: 'Posture',
    severity: 'High',
    tips: ['Practice posture at home', 'Use a mirror to check form', 'Focus on alignment']
  },
  {
    id: 3,
    title: 'Lack of Focus (Khushu)',
    mistake: 'Letting the mind wander or thinking about worldly matters during prayer.',
    fix: 'Remind yourself you are standing before Allah. Focus on the meanings of what you recite.',
    category: 'Spirituality',
    severity: 'Medium',
    tips: ['Prepare mentally before prayer', 'Find a quiet place', 'Understand the meanings']
  },
  {
    id: 4,
    title: 'Not Reciting Al-Fatiha Properly',
    mistake: 'Skipping or mispronouncing parts of Surah Al-Fatiha.',
    fix: 'Recite Al-Fatiha slowly and clearly in every unit (rak\'ah) of prayer.',
    category: 'Recitation',
    severity: 'High',
    tips: ['Learn proper pronunciation', 'Practice daily', 'Listen to recitations']
  },
  {
    id: 5,
    title: 'Improper Dress',
    mistake: 'Wearing clothes that do not cover the awrah (parts of the body that must be covered).',
    fix: 'Ensure your clothing covers the required areas and is clean.',
    category: 'Appearance',
    severity: 'Medium',
    tips: ['Check clothing before prayer', 'Keep prayer clothes clean', 'Respect the sanctity']
  },
  {
    id: 6,
    title: 'Not Facing the Qibla',
    mistake: 'Praying without facing the direction of the Kaaba (Qibla).',
    fix: 'Always check your direction before starting prayer.',
    category: 'Direction',
    severity: 'High',
    tips: ['Use a compass app', 'Mark the direction', 'Check before each prayer']
  },
  {
    id: 7,
    title: 'Skipping the Opening Takbir',
    mistake: 'Not raising hands and saying "Allahu Akbar" at the start.',
    fix: 'Begin every prayer with the opening takbir, raising both hands.',
    category: 'Ritual',
    severity: 'Medium',
    tips: ['Make it a habit', 'Raise hands to shoulder level', 'Say it with conviction']
  },
  {
    id: 8,
    title: 'Not Maintaining Wudu',
    mistake: 'Praying without proper ablution or breaking wudu during prayer.',
    fix: 'Ensure you have valid wudu before starting prayer and maintain it throughout.',
    category: 'Purification',
    severity: 'High',
    tips: ['Learn wudu properly', 'Check before prayer', 'Know what breaks wudu']
  },
  {
    id: 9,
    title: 'Rushing Between Positions',
    mistake: 'Moving too quickly from one position to another without proper pause.',
    fix: 'Take a moment to settle in each position and maintain proper form.',
    category: 'Tempo',
    severity: 'Medium',
    tips: ['Count to 3 in each position', 'Feel the stillness', 'Don\'t rush']
  },
  {
    id: 10,
    title: 'Not Completing the Prayer',
    mistake: 'Leaving prayer incomplete or missing essential parts.',
    fix: 'Complete all required parts of the prayer including tasleem.',
    category: 'Completion',
    severity: 'High',
    tips: ['Learn prayer structure', 'Follow step by step', 'Don\'t skip parts']
  }
];

const CALLIGRAPHY = (
  <svg className="absolute left-1/2 top-1/2 -z-10 opacity-10 pointer-events-none select-none fade-in-out" style={{ transform: 'translate(-50%, -50%)', width: '60%', height: '60%' }} viewBox="0 0 200 80" fill="none">
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="48" fontFamily="serif" fill="#B5A642">﷽</text>
  </svg>
);

export default function NamazMistakesScreen() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMistake, setSelectedMistake] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [showTips, setShowTips] = useState({});

  // Get unique categories
  const categories = ['all', ...new Set(mistakes.map(m => m.category))];

  // Filter mistakes based on search and category
  const filteredMistakes = mistakes.filter(mistake => {
    const matchesSearch = searchTerm === '' || 
      mistake.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mistake.mistake.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mistake.fix.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || mistake.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleTips = (id) => {
    setShowTips(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Tempo': 'bg-blue-100 text-blue-700',
      'Posture': 'bg-green-100 text-green-700',
      'Spirituality': 'bg-purple-100 text-purple-700',
      'Recitation': 'bg-indigo-100 text-indigo-700',
      'Appearance': 'bg-pink-100 text-pink-700',
      'Direction': 'bg-red-100 text-red-700',
      'Ritual': 'bg-yellow-100 text-yellow-700',
      'Purification': 'bg-cyan-100 text-cyan-700',
      'Completion': 'bg-emerald-100 text-emerald-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 py-8 px-4">
        {/* Header */}
        <div className="w-full relative glassmorph-card p-6">
          {CALLIGRAPHY}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-heading text-brass font-bold mb-2">Common Mistakes in Prayer</h1>
            <p className="text-mocha">Learn to avoid common errors and improve your prayer</p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-mocha">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Low Priority</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search mistakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 text-mocha placeholder-mocha/60 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/20"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 text-mocha focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/20"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-3 rounded-xl border-2 border-brass/30 bg-white/80 text-mocha hover:border-brass transition-colors"
            >
              {viewMode === 'grid' ? '📋' : '🔲'}
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center text-sm text-mocha mb-4">
            <span>{filteredMistakes.length} mistakes found</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMistake(filteredMistakes[Math.floor(Math.random() * filteredMistakes.length)])}
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-brass to-wood text-white text-sm font-bold hover:from-wood hover:to-brass transition-all"
              >
                🎲 Random Mistake
              </button>
            </div>
          </div>
        </div>

        {/* Mistakes Grid/List */}
        <div className={`w-full grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredMistakes.map((mistake) => (
            <div
              key={mistake.id}
              className="glassmorph-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-brass/20 hover:border-brass"
              onClick={() => setSelectedMistake(mistake)}
            >
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-brass line-clamp-2">{mistake.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getSeverityColor(mistake.severity)}`}>
                    {mistake.severity}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(mistake.category)}`}>
                  {mistake.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-bold text-red-600 mb-1">❌ Mistake:</div>
                  <p className="text-mocha text-sm line-clamp-2">{mistake.mistake}</p>
                </div>
                <div>
                  <div className="text-sm font-bold text-green-600 mb-1">✅ Fix:</div>
                  <p className="text-mocha text-sm line-clamp-2">{mistake.fix}</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTips(mistake.id);
                }}
                className="mt-4 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-brass/20 to-wood/20 text-brass font-medium hover:from-brass/30 hover:to-wood/30 transition-all"
              >
                💡 {showTips[mistake.id] ? 'Hide Tips' : 'Show Tips'}
              </button>

              {showTips[mistake.id] && (
                <div className="mt-3 p-3 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg">
                  <div className="text-sm font-bold text-brass mb-2">💡 Practical Tips:</div>
                  <ul className="text-sm text-mocha space-y-1">
                    {mistake.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-brass mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Mistake Modal */}
        {selectedMistake && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-brass mb-2">{selectedMistake.title}</h2>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getSeverityColor(selectedMistake.severity)}`}>
                        {selectedMistake.severity} Priority
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedMistake.category)}`}>
                        {selectedMistake.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMistake(null)}
                    className="text-2xl text-mocha hover:text-brass transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                    <div className="text-lg font-bold text-red-700 mb-2">❌ The Mistake:</div>
                    <p className="text-mocha text-lg leading-relaxed">{selectedMistake.mistake}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                    <div className="text-lg font-bold text-green-700 mb-2">✅ The Fix:</div>
                    <p className="text-mocha text-lg leading-relaxed">{selectedMistake.fix}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-brass/10 to-wood/10 p-4 rounded-xl">
                    <div className="text-lg font-bold text-brass mb-3">💡 Practical Tips:</div>
                    <ul className="space-y-2">
                      {selectedMistake.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-brass text-lg mt-1">•</span>
                          <span className="text-mocha text-lg">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedMistake(null)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brass to-wood text-white font-bold hover:from-wood hover:to-brass transition-all"
                  >
                    Got it! ✅
                  </button>
                  <button
                    onClick={() => {
                      const nextMistake = filteredMistakes[(filteredMistakes.findIndex(m => m.id === selectedMistake.id) + 1) % filteredMistakes.length];
                      setSelectedMistake(nextMistake);
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all"
                  >
                    Next Mistake ➡️
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.25; }
          }
          .fade-in-out {
            animation: fadeInOut 6s ease-in-out infinite;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .glassmorph-card {
            background: rgba(255,255,255,0.35);
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15);
            backdrop-filter: blur(8px);
            border-radius: 1.5rem;
            border: 1.5px solid rgba(181,166,66,0.2);
          }
        `}</style>
      </div>
    </div>
  );
} 