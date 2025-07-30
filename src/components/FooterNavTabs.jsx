import { NavLink } from 'react-router-dom';
import IslamicIcon from './IslamicIcon';
import { useTranslation } from '../utils/translations';

export default function FooterNavTabs() {
  const { t } = useTranslation();

  const tabs = [
    { to: '/', label: t('home'), icon: <IslamicIcon name="home" /> },
    { to: '/namaz', label: t('home'), icon: <IslamicIcon name="qibla" /> },
    { to: '/hadith', label: t('hadith'), icon: <IslamicIcon name="hadith" /> },
    { to: '/duas', label: t('duas'), icon: <IslamicIcon name="dua" /> },
    { to: '/qibla', label: t('qibla'), icon: <IslamicIcon name="qibla" /> },
    { to: '/learn', label: t('learn'), icon: <IslamicIcon name="learn" /> },
    { to: '/tracker', label: t('tracker'), icon: <IslamicIcon name="tracker" /> },
    { to: '/prayer-times', label: t('prayerTimes'), icon: <IslamicIcon name="time" /> },
    { to: '/ai-assistant', label: t('aiAssistant'), icon: <span className="text-2xl">🤖</span> },
    { to: '/mistakes', label: t('mistakes'), icon: <IslamicIcon name="mistakes" /> },
    { to: '/progress', label: t('progress'), icon: <IslamicIcon name="tracker" /> },
    { to: '/settings', label: t('settings'), icon: <IslamicIcon name="settings" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-mocha/80 backdrop-blur-md border-t border-brass/30 flex justify-around py-2 sm:py-3 rounded-t-2xl z-50">
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center px-1 sm:px-2 text-xs sm:text-sm font-arabic transition-colors ${isActive ? 'text-wood' : 'text-brass'}`
          }
        >
          <span className="text-xl sm:text-2xl">{tab.icon}</span>
          <span className="text-center">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
} 