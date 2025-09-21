import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { useToast } from './Toast';

const WebsiteFooter = () => {
  const { t } = useTranslation();
  const { success, error } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('features'),
      links: [
        { name: t('Prayer Times'), href: '/prayer-times' },
        { name: t('Namaz'), href: '/namaz' },
        { name: t('Hadith'), href: '/hadith' },
        { name: t('Duas'), href: '/duas' },
        { name: t('Qibla'), href: '/qibla' },
        { name: t('Tracker'), href: '/tracker' },
        { name: t('Quiz'), href: '/quiz' },
        { name: t('AiAssistant'), href: '/ai-assistant' }
      ]
    },
    {
      title: t('Learn'),
      links: [
        { name: t('Learn'), href: '/learn' },
        { name: t('Mistakes'), href: '/mistakes' },
        { name: t('Progress'), href: '/progress' },
        { name: t('Daily Challenge'), href: '/daily-challenge' },
        { name: t('Settings'), href: '/settings' }
      ]
    },
    {
      title: t('Support'),
      links: [
        { name: t('Help'), href: '/help' },
        { name: t('Contact'), href: '/contact' },
        { name: t('About'), href: '/about' },
        { name: t('Privacy'), href: '/privacy' },
        { name: t('Terms'), href: '/terms' },
        { name: t('Feedback'), href: '/feedback' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      error(t('Email Required'));
      return;
    }

    if (!isValidEmail(email)) {
      error(t('Invalid Email'));
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if already subscribed (simulate)
      const isAlreadySubscribed = false;
      
      if (!isAlreadySubscribed) {
        success(t('Subscription Successful'));
        setEmail('');
      } else {
        error(t('Already Subscribed'));
      }
    } catch (err) {
      error(t('Subscription Failed'));
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <p className="text-gray-400 mb-6 max-w-lg leading-relaxed">
              Your comprehensive Islamic companion for prayer times, learning, and spiritual growth. 
              Stay connected with your faith through accurate prayer times, educational content, and daily reminders.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
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
          <div className="max-w-2xl">
            <h4 className="text-lg font-semibold mb-2">{t('stayUpdated')}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('News letter Description')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('Enter Email')}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubscribing}
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors whitespace-nowrap"
              >
                {isSubscribing ? '...' : t('Subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Namaz Web. {t('All Rights Reserved')}.
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors whitespace-nowrap">
                {t('PSrivacy Policy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors whitespace-nowrap">
                {t('Terms Of Service')}
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors whitespace-nowrap">
                {t('Cookie Policy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebsiteFooter;