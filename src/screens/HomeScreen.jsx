import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const formatTime = (date) => {
    if (settings.militaryTime) {
      return date.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: settings.showSeconds ? '2-digit' : undefined
      });
    } else {
      return date.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit',
        second: settings.showSeconds ? '2-digit' : undefined
      });
    }
  };

  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    {
      title: 'Prayer Times',
      description: 'View daily prayer times',
      icon: '🕐',
      path: '/prayer-times',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Prayer Tracker',
      description: 'Track your daily prayers',
      icon: '📊',
      path: '/tracker',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Learn Namaz',
      description: 'Step-by-step prayer guide',
      icon: '📚',
      path: '/learn',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Prayer Quiz',
      description: 'Test your knowledge of Salah',
      icon: '🏆',
      path: '/quiz',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Qibla Direction',
      description: 'Find prayer direction',
      icon: '🕌',
      path: '/qibla',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Duas',
      description: 'Collection of Islamic duas',
      icon: '🤲',
      path: '/duas',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Hadith',
      description: 'Islamic traditions and sayings',
      icon: '📖',
      path: '/hadith',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Namaz Mistakes',
      description: 'Common prayer mistakes to avoid',
      icon: '⚠️',
      path: '/mistakes',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'AI Assistant',
      description: 'Get help with Islamic questions',
      icon: '🤖',
      path: '/ai-assistant',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        {/* Beautiful Calligraphy Header */}
        <div className="text-center mb-12">
          {/* Arabic Calligraphy */}
          <div className="mb-6">
            <div className="text-6xl md:text-8xl font-arabic text-brass mb-4 leading-none drop-shadow-2xl">
              بسم الله الرحمن الرحيم
            </div>
            <div className="text-sm md:text-base text-text dark:text-darktext opacity-80 italic">
              In the name of Allah, the Most Gracious, the Most Merciful
            </div>
          </div>

          {/* Main Title with Calligraphy */}
          <div className="relative mb-8">
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-brass to-transparent opacity-30"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4 drop-shadow-2xl relative z-10">
              🕌 Namaz App
            </h1>
            
            {/* Subtitle with Islamic styling */}
            <div className="mb-6">
              <div className="text-2xl md:text-3xl font-arabic text-brass mb-2 leading-relaxed">
                تطبيق الصلاة
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Your comprehensive Islamic prayer companion
              </p>
            </div>

            {/* Islamic quote */}
            <div className="bg-gradient-to-r from-brass/10 to-wood/10 rounded-2xl p-6 border border-brass/20 backdrop-blur-sm max-w-3xl mx-auto">
              <div className="text-xl md:text-2xl font-arabic text-brass mb-2 leading-relaxed">
                "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"
              </div>
              <div className="text-sm md:text-base text-text dark:text-darktext opacity-90 italic">
                "Indeed, prayer has been decreed upon the believers a decree of specified times."
              </div>
              <div className="text-xs text-text dark:text-darktext opacity-70 mt-2">
                — Quran 4:103
              </div>
            </div>
          </div>
        </div>
          
        {/* Current Time Display with Islamic styling */}
        <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 rounded-2xl p-6 border border-brass/20 shadow-xl max-w-md mx-auto mb-8 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-lg font-arabic text-brass mb-2">الوقت الحالي</div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Current Time</h2>
            <div className="text-4xl font-mono text-amber-600 dark:text-amber-400 mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {settings.militaryTime ? '24-hour format' : '12-hour format'}
              {settings.showSeconds && ' • Showing seconds'}
            </div>
          </div>
        </div>

        {/* Settings Demo with enhanced styling */}
        <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 rounded-2xl p-6 border border-brass/20 shadow-xl max-w-2xl mx-auto mb-8 backdrop-blur-sm">
          <div className="text-center mb-4">
            <div className="text-lg font-arabic text-brass mb-2">الإعدادات الحالية</div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Current Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Theme:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 capitalize">{settings.theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Large Text:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{settings.accessibility.largeText ? '✅ Enabled' : '❌ Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">High Contrast:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{settings.accessibility.highContrast ? '✅ Enabled' : '❌ Disabled'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Military Time:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{settings.militaryTime ? '✅ Enabled' : '❌ Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Show Seconds:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{settings.showSeconds ? '✅ Enabled' : '❌ Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Reduce Motion:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{settings.accessibility.reduceMotion ? '✅ Enabled' : '❌ Disabled'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className="group relative bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 rounded-2xl p-6 border border-brass/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-brass/30 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-brass/30 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-brass/30 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-brass/30 rounded-br-lg"></div>

              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-brass transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brass/5 to-wood/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Footer with Islamic quote */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-brass/10 to-wood/10 rounded-2xl p-6 border border-brass/20 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="text-lg font-arabic text-brass mb-2 leading-relaxed">
              "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ"
            </div>
            <div className="text-sm text-text dark:text-darktext opacity-90 italic">
              "O Allah, help me to remember You, thank You, and worship You in the best way."
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 