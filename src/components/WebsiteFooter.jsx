import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { useToast } from './Toast';

export default function WebsiteFooter() {
  const { t, currentLang } = useTranslation();
  const { success, error } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('quickLinks'),
      links: [
        { name: t('prayerTimes'), href: '/prayer-times' },
        { name: t('qibla'), href: '/qibla' },
        { name: t('learn'), href: '/learn' },
        { name: t('hadith'), href: '/hadith' },
        { name: t('duas'), href: '/duas' },
        { name: t('tracker'), href: '/tracker' },
      ]
    },
    {
      title: t('features'),
      links: [
        { name: t('aiAssistant'), href: '/ai-assistant' },
        { name: t('quiz'), href: '/quiz' },
        { name: t('dailyChallenge'), href: '/daily-challenge' },
        { name: t('progress'), href: '/progress' },
        { name: t('mistakes'), href: '/mistakes' },
        { name: t('settings'), href: '/settings' },
      ]
    },
    {
      title: t('support'),
      links: [
        { name: t('help'), href: '/help' },
        { name: t('contact'), href: '/contact' },
        { name: t('about'), href: '/about' },
        { name: t('privacy'), href: '/privacy' },
        { name: t('terms'), href: '/terms' },
        { name: t('feedback'), href: '/feedback' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      error(t('pleaseEnterEmail'));
      return;
    }

    if (!isValidEmail(email)) {
      error(t('pleaseEnterValidEmail'));
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate API call - in real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store subscription in localStorage for demo
      const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
      if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
        success(t('subscriptionSuccessful'));
        setEmail('');
      } else {
        error(t('alreadySubscribed'));
      }
    } catch (err) {
      error(t('subscriptionFailed'));
    } finally {
      setIsSubscribing(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                🕌
              </div>
              <div>
                <h3 className="text-xl font-bold">Namaz Web</h3>
                <p className="text-gray-400 text-sm">Islamic Prayer Companion</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your comprehensive Islamic companion for prayer times, learning, and spiritual growth. 
              Stay connected with your faith through accurate prayer times, educational content, and daily reminders.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-2">{t('stayUpdated')}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('newsletterDescription')}
            </p>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('enterEmail')}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubscribing}
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md text-white font-medium transition-colors"
              >
                {isSubscribing ? '...' : t('subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} Namaz Web. {t('allRightsReserved')}.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('termsOfService')}
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('cookiePolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
