import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

export default function LandingPage() {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: '🕐',
      title: 'Accurate Prayer Times',
      description: 'Get precise prayer times based on your location with automatic adjustments for daylight saving time.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🧭',
      title: 'Qibla Direction',
      description: 'Find the exact direction of the Kaaba from anywhere in the world with our advanced compass.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📚',
      title: 'Comprehensive Learning',
      description: 'Step-by-step prayer guides, Islamic education, and interactive learning modules.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Get instant answers to your Islamic questions with our AI-powered assistant.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Track your prayer habits, learning progress, and spiritual growth over time.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: '🌟',
      title: 'Daily Challenges',
      description: 'Stay motivated with daily Islamic challenges and earn rewards for your spiritual journey.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      role: 'Student',
      content: 'Namaz Web has completely transformed my prayer routine. The accurate prayer times and Qibla direction feature are incredibly helpful.',
      avatar: '👨‍🎓'
    },
    {
      name: 'Fatima Ali',
      role: 'Teacher',
      content: 'As an Islamic studies teacher, I recommend this app to all my students. The learning modules are comprehensive and easy to follow.',
      avatar: '👩‍🏫'
    },
    {
      name: 'Omar Khan',
      role: 'Business Owner',
      content: 'The AI assistant helps me find answers to Islamic questions quickly. It\'s like having a knowledgeable scholar available 24/7.',
      avatar: '👨‍💼'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Prayer Times Calculated' },
    { number: '100+', label: 'Countries Supported' },
    { number: '4.9', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('homeTitle')}
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('comprehensiveIslamicPrayerCompanion')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('beginYourSpiritualJourney')}
            </p>
            
            {/* Current Time Display */}
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 mb-8">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Current Time</div>
                <div className="text-3xl md:text-4xl font-mono text-blue-600 font-bold">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('getStartedFree')}
              </Link>
              <Link
                to="/prayer-times"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('viewPrayerTimes')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Spiritual Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From accurate prayer times to comprehensive Islamic education, 
              we provide all the tools you need to strengthen your faith.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who have transformed their spiritual journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Spiritual Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Muslims worldwide who trust Namaz Web for their daily spiritual needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
