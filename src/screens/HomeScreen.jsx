import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set greeting based on time
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Assalamu Alaikum - Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Assalamu Alaikum - Good Afternoon');
    } else if (hour >= 17 && hour < 21) {
      setGreeting('Assalamu Alaikum - Good Evening');
    } else {
      setGreeting('Assalamu Alaikum - Good Night');
    }

    return () => clearInterval(timer);
  }, [currentTime]);

  const islamicQuotes = [
    "Indeed, prayer prohibits immorality and wrongdoing. (Quran 29:45)",
    "The closest a servant comes to his Lord is when he is prostrating. (Prophet Muhammad ﷺ)",
    "Successful indeed are the believers, those who humble themselves in prayer. (Quran 23:1-2)",
    "Establish prayer for My remembrance. (Quran 20:14)",
    "The key to Paradise is prayer. (Prophet Muhammad ﷺ)"
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % islamicQuotes.length);
    }, 8000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-4 md:gap-6 lg:gap-8 py-4 md:py-6 lg:py-8 px-2 md:px-4">
        {/* Header Section */}
        <div className="w-full text-center mb-6 md:mb-8">
          <div className="card p-6 md:p-8 bg-gradient-to-r from-brass/15 to-wood/15 border border-brass/30 backdrop-blur-sm relative overflow-hidden shadow-lg">
            {/* Main Calligraphy - Centered */}
            <div className="text-center relative z-10 flex flex-col items-center justify-center">
              <div className="text-6xl md:text-8xl lg:text-9xl font-arabic text-brass/70 leading-none mb-6 drop-shadow-lg" style={{ fontFamily: 'Amiri, serif' }}>
                ﷽
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-arabic text-brass/90 mb-4 font-bold" style={{ fontFamily: 'Amiri, serif' }}>
                بسم الله الرحمن الرحيم
              </div>
              <div className="text-lg md:text-xl text-text dark:text-darktext opacity-80 font-medium mb-6">
                In the name of Allah, the Most Gracious, the Most Merciful
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-heading text-brass font-bold bg-gradient-to-r from-brass to-wood bg-clip-text text-transparent">
                Islamic Companion
              </div>
              <div className="text-base md:text-lg text-text dark:text-darktext opacity-90 mt-2">
                Your daily companion for prayer, learning, and spiritual growth
              </div>
            </div>
            
            {/* Decorative Islamic Patterns */}
            <div className="absolute top-4 left-4 w-16 h-16 opacity-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#956D37" strokeWidth="2" fill="none"/>
                <circle cx="50" cy="50" r="20" stroke="#956D37" strokeWidth="1" fill="none"/>
                <circle cx="50" cy="50" r="8" stroke="#956D37" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#956D37" strokeWidth="2" fill="none"/>
                <circle cx="50" cy="50" r="20" stroke="#956D37" strokeWidth="1" fill="none"/>
                <circle cx="50" cy="50" r="8" stroke="#956D37" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 w-16 h-16 opacity-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#956D37" strokeWidth="2" fill="none"/>
                <circle cx="50" cy="50" r="20" stroke="#956D37" strokeWidth="1" fill="none"/>
                <circle cx="50" cy="50" r="8" stroke="#956D37" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div className="absolute bottom-4 right-4 w-16 h-16 opacity-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#956D37" strokeWidth="2" fill="none"/>
                <circle cx="50" cy="50" r="20" stroke="#956D37" strokeWidth="1" fill="none"/>
                <circle cx="50" cy="50" r="8" stroke="#956D37" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-1/2 left-8 w-8 h-8 opacity-15">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M20 50 L80 50 M50 20 L50 80" stroke="#956D37" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div className="absolute top-1/2 right-8 w-8 h-8 opacity-15">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M20 50 L80 50 M50 20 L50 80" stroke="#956D37" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="w-full max-w-4xl px-4">
          <div className="card p-4 md:p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-heading text-brass font-bold mb-2 bg-gradient-to-r from-brass to-wood bg-clip-text text-transparent">
                {greeting}
              </div>
              <div className="text-xl md:text-2xl text-text dark:text-darktext font-semibold mb-2">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-base md:text-lg text-text dark:text-darktext opacity-75">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="w-full max-w-4xl px-4">
          <div className="card p-4 md:p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🕌</div>
              <div className="text-lg md:text-xl text-text dark:text-darktext italic mb-3 md:mb-4 leading-relaxed px-2">
                "{islamicQuotes[quoteIndex]}"
              </div>
              <div className="text-brass font-bold text-base md:text-lg">
                Daily Reminder
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div 
              className="group relative card p-4 md:p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden cursor-pointer"
              onClick={() => navigate('/prayer-times')}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
              
              <div className="relative text-center">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">🕋</div>
                <div className="text-base md:text-lg font-bold text-brass">Prayer Times</div>
                <div className="text-xs md:text-sm text-text dark:text-darktext mt-1 md:mt-2">
                  Check prayer timings
                </div>
              </div>
            </div>

            <div 
              className="group relative card p-4 md:p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden cursor-pointer"
              onClick={() => navigate('/learn')}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
              
              <div className="relative text-center">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">📖</div>
                <div className="text-base md:text-lg font-bold text-brass">Learn Namaz</div>
                <div className="text-xs md:text-sm text-text dark:text-darktext mt-1 md:mt-2">
                  Master prayer steps
                </div>
              </div>
            </div>

            <div 
              className="group relative card p-4 md:p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden cursor-pointer"
              onClick={() => navigate('/qibla')}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
              
              <div className="relative text-center">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">🧭</div>
                <div className="text-base md:text-lg font-bold text-brass">Qibla Direction</div>
                <div className="text-xs md:text-sm text-text dark:text-darktext mt-1 md:mt-2">
                  Find prayer direction
                </div>
              </div>
            </div>

            <div 
              className="group relative card p-4 md:p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden cursor-pointer"
              onClick={() => navigate('/ai-assistant')}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
              
              <div className="relative text-center">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">🤖</div>
                <div className="text-base md:text-lg font-bold text-brass">AI Assistant</div>
                <div className="text-xs md:text-sm text-text dark:text-darktext mt-1 md:mt-2">
                  Get Islamic guidance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Prayer Reminder */}
        <div className="w-full max-w-4xl px-4">
          <div className="card p-4 md:p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🕌</div>
              <div className="text-lg md:text-xl font-heading text-brass font-bold mb-3 md:mb-4">
                Remember Your Prayers
              </div>
              <div className="text-base md:text-lg text-text dark:text-darktext mb-4 md:mb-6 leading-relaxed px-2">
                "The first thing that will be judged among a person's deeds on the Day of Resurrection is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is defective, then the rest of his deeds will be defective."
              </div>
              <div className="text-brass font-bold text-base md:text-lg">
                - Prophet Muhammad ﷺ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 