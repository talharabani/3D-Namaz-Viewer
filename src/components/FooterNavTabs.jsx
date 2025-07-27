import { NavLink } from 'react-router-dom';
import IslamicIcon from './IslamicIcon';

const tabs = [
  { to: '/', label: 'Home', icon: <IslamicIcon name="home" /> },
  { to: '/namaz', label: 'Namaz', icon: <IslamicIcon name="qibla" /> },
  { to: '/hadith', label: 'Hadith', icon: <IslamicIcon name="hadith" /> },
  { to: '/duas', label: 'Duas', icon: <IslamicIcon name="dua" /> },
  { to: '/qibla', label: 'Qibla', icon: <IslamicIcon name="qibla" /> },
  { to: '/learn', label: 'Learn', icon: <IslamicIcon name="learn" /> },
  { to: '/tracker', label: 'Tracker', icon: <IslamicIcon name="tracker" /> },
  { to: '/prayer-times', label: 'Times', icon: <IslamicIcon name="time" /> },
  { to: '/mistakes', label: 'Mistakes', icon: <IslamicIcon name="mistakes" /> },
  { to: '/progress', label: 'Progress', icon: <IslamicIcon name="tracker" /> },
  { to: '/settings', label: 'Settings', icon: <IslamicIcon name="settings" /> },
];

export default function FooterNavTabs() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-mocha/80 backdrop-blur-md border-t border-brass/30 flex justify-around py-3 rounded-t-2xl z-50">
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center px-2 text-sm font-arabic transition-colors ${isActive ? 'text-wood' : 'text-brass'}`
          }
        >
          <span className="text-2xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
} 