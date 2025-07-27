import { useEffect, useState } from 'react';

export default function HomeScreen() {
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
    <div className="relative flex flex-col gap-8 items-center w-full py-8 min-h-screen bg-background dark:bg-dark">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center gap-8">
        
        {/* Greeting Section */}
        <div className="w-full card text-center">
          <div className="text-2xl md:text-3xl font-heading text-brass font-bold mb-2">
            {greeting}
          </div>
          <div className="text-lg text-text dark:text-darktext">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit',
              hour12: true 
            })}
          </div>
          <div className="text-sm text-text dark:text-darktext opacity-75 mt-1">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="w-full card text-center">
          <div className="text-4xl mb-4">🕌</div>
          <div className="text-lg text-text dark:text-darktext italic mb-2">
            "{islamicQuotes[quoteIndex]}"
          </div>
          <div className="text-sm text-brass font-medium">
            Daily Reminder
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-3xl mb-2">🕋</div>
            <div className="text-sm font-medium text-brass">Prayer Times</div>
          </div>
          <div className="card text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-sm font-medium text-brass">Learn Namaz</div>
          </div>
          <div className="card text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-3xl mb-2">🧭</div>
            <div className="text-sm font-medium text-brass">Qibla Direction</div>
          </div>
          <div className="card text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm font-medium text-brass">Progress</div>
          </div>
        </div>

        {/* Islamic Calligraphy */}
        <div className="w-full card text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="48" fontFamily="serif" fill="#956D37">
                ﷽
              </text>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="text-xl font-heading text-brass font-bold mb-2">
              Welcome to Your Islamic Companion
            </div>
            <div className="text-text dark:text-darktext">
              May Allah guide you in your journey of faith and prayer
            </div>
          </div>
        </div>

        {/* Daily Prayer Reminder */}
        <div className="w-full card text-center">
          <div className="text-2xl mb-2">🕌</div>
          <div className="text-lg font-heading text-brass font-bold mb-2">
            Remember Your Prayers
          </div>
          <div className="text-text dark:text-darktext mb-4">
            "The first thing that will be judged among a person's deeds on the Day of Resurrection is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is defective, then the rest of his deeds will be defective."
          </div>
          <div className="text-sm text-brass font-medium">
            - Prophet Muhammad ﷺ
          </div>
        </div>

      </div>
    </div>
  );
} 