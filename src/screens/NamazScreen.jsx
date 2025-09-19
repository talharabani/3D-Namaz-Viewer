import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToggleLeft } from '../components/ToggleLeft';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions,
  pulseAnimation,
  mosqueGlow
} from '../utils/animations';

const FARZ_NAMAZ = [
  { key: 'fajr', name: 'Fajr', icon: '🌅', virtue: 'The most beloved prayer to Allah after the obligatory ones.' },
  { key: 'dhuhr', name: 'Dhuhr', icon: '🌞', description: "4 Rak'ah after midday", timing: 'After midday', virtue: 'A time when the gates of heaven are opened.' },
  { key: 'asr', name: 'Asr', icon: '🌇', description: "4 Rak'ah in the afternoon", timing: 'Afternoon', virtue: 'Whoever prays Asr will enter Paradise.' },
  { key: 'maghrib', name: 'Maghrib', icon: '🌆', description: "3 Rak'ah just after sunset", timing: 'Just after sunset', virtue: 'The prayer at the time when the fast is broken.' },
  { key: 'isha', name: 'Isha', icon: '🌙', description: "4 Rak'ah at night", timing: 'Night', virtue: 'The prayer of the night is a light for the believer.' },
];

const NAWAFIL_NAMAZ = [
  { key: 'tahajjud', name: 'Tahajjud', icon: '🕋', description: 'Voluntary night prayer', timing: 'Last third of the night', virtue: 'A means to get closer to Allah.' },
  { key: 'witir', name: 'Witr', icon: '🔆', description: 'Odd-numbered prayer after Isha', timing: 'After Isha', virtue: 'The best of prayers after the obligatory ones.' },
  { key: 'duha', name: 'Duha (Chasht)', icon: '☀️', description: 'Forenoon prayer', timing: 'After sunrise until before Dhuhr', virtue: 'Charity for every joint in the body.' },
  { key: 'istikhara', name: 'Istikhara', icon: '🧭', description: 'Prayer for guidance', timing: 'Any time (except prohibited times)', virtue: "Seek Allah's guidance in decisions." },
  { key: 'tarawih', name: 'Tarawih', icon: '🕌', description: 'Ramadan night prayer', timing: 'After Isha in Ramadan', virtue: 'A special prayer in Ramadan.' },
  { key: 'jumma', name: 'Jumma (Friday)', icon: '🕌', description: 'Friday congregational prayer', timing: 'Friday Dhuhr time', virtue: 'The best day of the week.' },
  { key: 'eid', name: 'Eid Prayers', icon: '🎉', description: 'Eid al-Fitr and Eid al-Adha', timing: 'Eid mornings', virtue: 'Celebration of Islamic festivals.' },
  { key: 'istisqa', name: 'Istisqa', icon: '🌧️', description: 'Prayer for rain', timing: 'During drought', virtue: 'Seeking Allah\'s mercy for rain.' },
  { key: 'khusuf', name: 'Khusuf (Lunar Eclipse)', icon: '🌙', description: 'Prayer during lunar eclipse', timing: 'During lunar eclipse', virtue: 'Remembrance of Allah\'s signs.' },
  { key: 'kusuf', name: 'Kusuf (Solar Eclipse)', icon: '☀️', description: 'Prayer during solar eclipse', timing: 'During solar eclipse', virtue: 'Remembrance of Allah\'s power.' },
  { key: 'tahiyatul-masjid', name: 'Tahiyatul Masjid', icon: '🏛️', description: 'Greeting the mosque', timing: 'Upon entering the mosque', virtue: 'Respect for the house of Allah.' },
  { key: 'awabeen', name: 'Salat al-Awabeen', icon: '🕯️', description: 'After Maghrib prayer', timing: 'After Maghrib', virtue: 'For the oft-returning to Allah.' },
  { key: 'tasbih', name: 'Salat al-Tasbih', icon: '📿', description: 'Special prayer with much glorification', timing: 'Any time (except prohibited times)', virtue: 'Forgiveness of all sins.' },
  { key: 'janazah', name: 'Salat al-Janazah', icon: '⚰️', description: 'Funeral prayer', timing: 'After death, before burial', virtue: 'A right of the Muslim upon another.' },
  { key: 'hajat', name: 'Salat al-Hajat', icon: '🤲', description: 'Prayer for needs', timing: 'When in need', virtue: 'Seeking Allah\'s help in times of need.' },
  { key: 'istighfar', name: 'Salat al-Istighfar', icon: '🙏', description: 'Prayer for forgiveness', timing: 'Any time', virtue: 'Seeking Allah\'s forgiveness.' },
];

function getTodayKey(namazKey) {
  const today = new Date().toISOString().slice(0, 10);
  return `namaz_completed_${namazKey}_${today}`;
}

function FajrGuide({ onClose }) {
  return (
    <div className="relative max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white/98 backdrop-blur-xl shadow-2xl p-0 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full mx-auto border border-white/30">
      {/* Back button */}
      <button
        className="fixed z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white hover:from-emerald-500 hover:to-green-500 focus:from-emerald-500 focus:to-green-500 transition-all duration-300"
        style={{ top: '10px', right: '10px' }}
        onClick={onClose}
        aria-label="Back"
      >
        ←
      </button>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-t-2xl sm:rounded-t-3xl flex flex-col items-center pt-6 sm:pt-8 pb-3 sm:pb-4 border-b-2 border-emerald-300">
        <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">🌅</div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-800 mb-1 sm:mb-2 text-center px-2">Fajr Prayer Guide (2 Rak'ahs)</div>
        <div className="text-sm sm:text-base md:text-lg text-emerald-700 text-center mb-1 sm:mb-2 px-2">According to the Sunnah of the Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-4 sm:px-6 md:px-10 pb-6 sm:pb-10 pt-4 sm:pt-6 text-lg sm:text-xl leading-relaxed bg-white/50">
        <ol className="list-decimal pl-4 sm:pl-6 md:pl-8 space-y-4 sm:space-y-6 md:space-y-8">
          <li>
            <span className="text-2xl sm:text-3xl">🕌</span> <span className="font-bold text-lg sm:text-xl md:text-2xl text-emerald-800">Intention (النية):</span>
            <div className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">Silently make the intention in your heart:<br />
              <span className="italic text-emerald-600 font-semibold">"I intend to pray two Rak'ahs of Fajr for the sake of Allah."</span>
            </div>
          </li>
          <li>
            <span className="text-xl sm:text-2xl">🕋</span> <span className="font-bold text-base sm:text-lg md:text-xl">Takbir al-Ihram (تكبيرة الإحرام):</span>
            <div className="text-gray-800 mt-1">Raise both hands to the <b>ears (men)</b> or <b>shoulders (women)</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />
              → This marks the start of Salah.
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Place Hands and Start Prayer</span>
            <div className="text-gray-800 mt-1">Place right hand over the left on the <b>chest</b>.<br />Begin with the opening supplication (optional).</div>
          </li>
          <li>
            <span className="text-xl">🙏</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span>
            <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</div>
          </li>
          <li>
            <span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span>
            <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</div>
            <div className="text-gray-800">Then complete the full <b>Surah Al-Fatiha</b>.</div>
            <div className="text-xs text-wood mt-1">📌 Prophet ﷺ said: "There is no prayer for the one who does not recite Al-Fatiha." (Bukhari, Muslim)</div>
          </li>
          <li>
            <span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah (in both Rak'ahs)</span>
            <div className="text-gray-800 mt-1">
              <b>First Rak'ah</b>: Surah <b>Al-Kafirun (الكافرون)</b><br />
              <b>Second Rak'ah</b>: Surah <b>Al-Ikhlas (الإخلاص)</b><br />
              <span className="text-xs">(These were commonly recited by the Prophet ﷺ in Fajr)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين قبل الركوع)</span>
            <div className="text-gray-800 mt-1">Raise hands again to <b>ears/shoulders</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing - الركوع)</span>
            <div className="text-gray-800 mt-1">Bow, placing hands on knees, back flat.<br />Recite <b>three times</b> (or more):<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🧍</span> <span className="font-bold text-lg">Standing Up from Ruku' (الرفع من الركوع)</span>
            <div className="text-gray-800 mt-1">Rise saying:<br />
              <span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span> <span className="italic">(Sami' Allahu liman ḥamidah)</span><br />
              Then say:<br />
              <span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span><br />
              <span className="italic">(Rabbanā laka al-ḥamdu ḥamdan kathīran ṭayyiban mubārakan fīh)</span>
            </div>
            <div className="text-xs text-wood mt-1">📚 Hadith: Sahih al-Bukhari, 799</div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration - السجود)</span>
            <div className="text-gray-800 mt-1">Go into sujood and say <b>three times</b>:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🪑</span> <span className="font-bold text-lg">Sit Between Two Sujoods</span>
            <div className="text-gray-800 mt-1">Sit calmly and recite:<br />
              <span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span>
            <div className="text-gray-800 mt-1">Go into sujood again and repeat:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span>
            <div className="text-gray-800 mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the same steps:<br />
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha</li>
                <li>Short Surah (e.g., Surah Al-Ikhlas)</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">Tashahhud (تشهد) After Second Rak'ah</span>
            <div className="text-gray-800 mt-1">Sit and recite the Tashahhud:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div>
          </li>
          <li>
            <span className="text-xl">🌹</span> <span className="font-bold text-lg">Salat al-Ibrahimiyya (الصلاة الإبراهيمية)</span>
            <div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div>
          </li>
          <li>
            <span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (التسليم)</span>
            <div className="text-gray-800 mt-1">To <b>end the Salah</b>, turn your head:</div>
            <ul className="list-disc pl-6 text-base mt-2">
              <li>To the <b>right</b> and say: <span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></li>
              <li>To the <b>left</b> and say: <span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></li>
            </ul>
          </li>
        </ol>
        <div className="mt-8 space-y-2 border-t border-brass pt-4">
          <h3 className="text-lg font-bold text-wood">Additional Sunnahs & Tips</h3>
          <ul className="list-disc pl-6 text-base">
            <li>Fajr Salah is <b>recited aloud</b>.</li>
            <li>Praying in <b>congregation</b> brings greater reward.</li>
            <li><b>Dua al-Istiftah</b> is <b>recommended</b>, not obligatory.</li>
            <li>Practice focus (<b>khushu'</b>) in every posture.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DhuhrGuide({ onClose }) {
  return (
    <div className="relative max-h-[80vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] border-2 border-brass shadow-2xl p-0 max-w-2xl w-full mx-auto">
      {/* Floating close button - outside the card, not overlapping */}
      <button
        className="fixed z-50 w-12 h-12 rounded-full bg-amber-600 text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-amber-700 focus:bg-amber-700 transition"
        style={{ top: 'calc(50% - 240px)', right: 'calc(50% - 320px)' }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] rounded-t-3xl flex flex-col items-center pt-6 pb-2 border-b-2 border-brass">
        <div className="text-5xl mb-2">🌞</div>
        <div className="text-3xl font-bold text-brass mb-1 text-center">Dhuhr Prayer Guide (4 Rak'ahs)</div>
        <div className="text-base text-gray-800 text-center mb-1">According to the Sunnah of the Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li>
            <span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span>
            <div className="text-gray-800 mt-1">Silently make the intention in your heart:<br />
              <span className="italic">"I intend to pray four Rak'ahs of Dhuhr for the sake of Allah."</span>
            </div>
          </li>
          <li>
            <span className="text-xl sm:text-2xl">🕋</span> <span className="font-bold text-base sm:text-lg md:text-xl">Takbir al-Ihram (تكبيرة الإحرام):</span>
            <div className="text-gray-800 mt-1">Raise both hands to the <b>ears (men)</b> or <b>shoulders (women)</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />
              → This marks the start of Salah.
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Place Hands and Start Prayer</span>
            <div className="text-gray-800 mt-1">Place right hand over the left on the <b>chest</b>.<br />Begin with the opening supplication (optional).</div>
          </li>
          <li>
            <span className="text-xl">🙏</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span>
            <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</div>
          </li>
          <li>
            <span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span>
            <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</div>
            <div className="text-gray-800">Then complete the full <b>Surah Al-Fatiha</b>.</div>
            <div className="text-xs text-wood mt-1">📌 Prophet ﷺ said: "There is no prayer for the one who does not recite Al-Fatiha." (Bukhari, Muslim)</div>
          </li>
          <li>
            <span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah (in both Rak'ahs)</span>
            <div className="text-gray-800 mt-1">
              <b>First Rak'ah</b>: Surah <b>Al-Kafirun (الكافرون)</b><br />
              <b>Second Rak'ah</b>: Surah <b>Al-Ikhlas (الإخلاص)</b><br />
              <span className="text-xs">(These were commonly recited by the Prophet ﷺ in Fajr)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين قبل الركوع)</span>
            <div className="text-gray-800 mt-1">Raise hands again to <b>ears/shoulders</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing - الركوع)</span>
            <div className="text-gray-800 mt-1">Bow, placing hands on knees, back flat.<br />Recite <b>three times</b> (or more):<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🧍</span> <span className="font-bold text-lg">Standing Up from Ruku' (الرفع من الركوع)</span>
            <div className="text-gray-800 mt-1">Rise saying:<br />
              <span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span> <span className="italic">(Sami' Allahu liman ḥamidah)</span><br />
              Then say:<br />
              <span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span><br />
              <span className="italic">(Rabbanā laka al-ḥamdu ḥamdan kathīran ṭayyiban mubārakan fīh)</span>
            </div>
            <div className="text-xs text-wood mt-1">📚 Hadith: Sahih al-Bukhari, 799</div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration - السجود)</span>
            <div className="text-gray-800 mt-1">Go into sujood and say <b>three times</b>:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🪑</span> <span className="font-bold text-lg">Sit Between Two Sujoods</span>
            <div className="text-gray-800 mt-1">Sit calmly and recite:<br />
              <span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span>
            <div className="text-gray-800 mt-1">Go into sujood again and repeat:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span>
            <div className="text-gray-800 mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the same steps:<br />
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha</li>
                <li>Short Surah (e.g., Surah Al-Ikhlas)</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">Tashahhud (تشهد) After Second Rak'ah</span>
            <div className="text-gray-800 mt-1">Sit and recite the Tashahhud:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div>
          </li>
          <li>
            <span className="text-xl">🌹</span> <span className="font-bold text-lg">Salat al-Ibrahimiyya (الصلاة الإبراهيمية)</span>
            <div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div>
          </li>
          <li>
            <span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (التسليم)</span>
            <div className="text-gray-800 mt-1">To <b>end the Salah</b>, turn your head:</div>
            <ul className="list-disc pl-6 text-base mt-2">
              <li>To the <b>right</b> and say: <span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></li>
              <li>To the <b>left</b> and say: <span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></li>
            </ul>
          </li>
        </ol>
        <div className="mt-8 space-y-2 border-t border-brass pt-4">
          <h3 className="text-lg font-bold text-wood">Additional Sunnahs & Tips</h3>
          <ul className="list-disc pl-6 text-base">
            <li>Fajr Salah is <b>recited aloud</b>.</li>
            <li>Praying in <b>congregation</b> brings greater reward.</li>
            <li><b>Dua al-Istiftah</b> is <b>recommended</b>, not obligatory.</li>
            <li>Practice focus (<b>khushu'</b>) in every posture.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AsrGuide({ onClose }) {
  return (
    <div className="relative max-h-[80vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] border-2 border-brass shadow-2xl p-0 max-w-2xl w-full mx-auto">
      {/* Floating close button */}
      <button
        className="fixed z-50 w-12 h-12 rounded-full bg-amber-600 text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-amber-700 focus:bg-amber-700 transition"
        style={{ top: 'calc(50% - 240px)', right: 'calc(50% - 320px)' }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] rounded-t-3xl flex flex-col items-center pt-6 pb-2 border-b-2 border-brass">
        <div className="text-5xl mb-2">🌇</div>
        <div className="text-3xl font-bold text-brass mb-1 text-center">Asr (ʿAsr) Prayer Guide — 4 Rak'ahs</div>
        <div className="text-base text-gray-800 text-center mb-1">According to the Sunnah of Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li>
            <span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span>
            <div className="text-gray-800 mt-1">Silently make the intention in your heart:<br />
              <span className="italic">"I intend to pray four Rak'ahs of Asr prayer for the sake of Allah."</span>
            </div>
          </li>
          <li>
            <span className="text-xl sm:text-2xl">🕋</span> <span className="font-bold text-base sm:text-lg md:text-xl">Takbir al-Ihram (Opening Takbir):</span>
            <div className="text-gray-800 mt-1">Raise both hands to <b>ear level (men)</b> or <b>shoulder level (women)</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />
              → This marks the beginning of your prayer.
            </div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Place Hands on Chest</span>
            <div className="text-gray-800 mt-1">Right hand over left hand on your chest.</div>
          </li>
          <li>
            <span className="text-xl">✨</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span>
            <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ،<br />وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ،<br />وَلَا إِلَهَ غَيْرُكَ</div>
          </li>
          <li>
            <span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span>
            <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...</div>
            <div className="text-gray-800">Complete the full <b>Surah Al-Fatiha</b>.</div>
            <div className="text-xs text-wood mt-1">📌 "There is no prayer for the one who does not recite Al-Fatiha." — (Bukhari, Muslim)</div>
          </li>
          <li>
            <span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah</span>
            <div className="text-gray-800 mt-1">
              <b>1st Rak'ah</b>: Surah Al-ʿAsr<br />
              <b>2nd Rak'ah</b>: Surah Al-Kawthar<br />
              <span className="text-xs">(3rd & 4th Rak'ahs: Surah Al-Fatiha only)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين)</span>
            <div className="text-gray-800 mt-1">Raise hands and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing)</span>
            <div className="text-gray-800 mt-1">Bow with hands on knees, back straight. Say <b>three times</b> (or more):<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🧍</span> <span className="font-bold text-lg">Rising from Ruku' (الرفع من الركوع)</span>
            <div className="text-gray-800 mt-1">Say:<br />
              <span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span><br />
              Then say:<br />
              <span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ،<br />حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration)</span>
            <div className="text-gray-800 mt-1">Prostrate fully and say three times:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🪑</span> <span className="font-bold text-lg">Sitting Between Two Sujoods</span>
            <div className="text-gray-800 mt-1">Sit calmly and say:<br />
              <span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span>
            <div className="text-gray-800 mt-1">Repeat:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span>
            <div className="text-gray-800 mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the cycle:<br />
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha</li>
                <li>Short Surah</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">After 2nd Rak'ah – First Tashahhud (التشهد الأول)</span>
            <div className="text-gray-800 mt-1">Sit and recite:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div>
            <div className="text-gray-800 mt-2">➤ Then stand up for the 3rd Rak'ah.</div>
          </li>
          <li>
            <span className="text-xl">🔄</span> <span className="font-bold text-lg">3rd Rak'ah</span>
            <div className="text-gray-800 mt-1">
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha only</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🔄</span> <span className="font-bold text-lg">4th Rak'ah</span>
            <div className="text-gray-800 mt-1">
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha only</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">Final Tashahhud After 4th Rak'ah</span>
            <div className="text-gray-800 mt-1">Recite both Tashahhud and Salat al-Ibrahimiyya:</div>
            <div className="font-bold text-gray-800 mt-2">🗣️ Tashahhud:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله...<br />أشهد أن لا إله إلا الله...<br />وأشهد أن محمدًا عبده ورسوله</div>
            <div className="font-bold text-gray-800 mt-2">🌸 Salat al-Ibrahimiyya:</div>
            <div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div>
          </li>
          <li>
            <span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (Ending the Prayer)</span>
            <div className="text-gray-800 mt-1">* Turn head to the <b>right</b>:<br />
              <span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span><br />* Then to the <b>left</b>:<br />
              <span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span>
            </div>
          </li>
        </ol>
        <div className="mt-8 space-y-2 border-t border-brass pt-4">
          <h3 className="text-lg font-bold text-wood">Important Notes for Asr Salah</h3>
          <ul className="list-disc pl-6 text-base">
            <li><b>Asr is prayed silently</b> — no loud recitation.</li>
            <li>All four Rak'ahs are <b>obligatory (fard)</b>.</li>
            <li>Perform each action <b>with tranquility and humility (khushu')</b>.</li>
            <li>It's Sunnah to <b>pray Asr on time</b>, before the sun begins to yellow.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MaghribGuide({ onClose }) {
  return (
    <div className="relative max-h-[80vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] border-2 border-brass shadow-2xl p-0 max-w-2xl w-full mx-auto">
      <button
        className="fixed z-50 w-12 h-12 rounded-full bg-amber-600 text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-amber-700 focus:bg-amber-700 transition"
        style={{ top: 'calc(50% - 240px)', right: 'calc(50% - 320px)' }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] rounded-t-3xl flex flex-col items-center pt-6 pb-2 border-b-2 border-brass">
        <div className="text-5xl mb-2">🌆</div>
        <div className="text-3xl font-bold text-brass mb-1 text-center">Maghrib Prayer Guide — 3 Rak'ahs</div>
        <div className="text-base text-gray-800 text-center mb-1">According to the Sunnah of Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li><span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span> <div className="text-gray-800 mt-1">Silently make the intention in your heart:<br /><span className="italic">"I intend to pray three Rak'ahs of Maghrib for the sake of Allah."</span></div></li>
          <li><span className="text-xl">🕋</span> <span className="font-bold text-lg">Takbir al-Ihram (Opening Takbir):</span> <div className="text-gray-800 mt-1">Raise both hands to <b>ear level (men)</b> or <b>shoulder level (women)</b> and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />→ This marks the beginning of your prayer.</div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Place Hands on Chest</span> <div className="text-gray-800 mt-1">Right hand over left hand on your chest.</div></li>
          <li><span className="text-xl">✨</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span> <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ،<br />وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ،<br />وَلَا إِلَهَ غَيْرُكَ</div></li>
          <li><span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span> <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...</div> <div className="text-gray-800">Complete the full <b>Surah Al-Fatiha</b>.</div> <div className="text-xs text-wood mt-1">📌 "There is no prayer for the one who does not recite Al-Fatiha." — (Bukhari, Muslim)</div></li>
          <li><span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah</span> <div className="text-gray-800 mt-1"><b>1st Rak'ah</b>: Surah Al-Falaq<br /><b>2nd Rak'ah</b>: Surah Al-Nas<br /><span className="text-xs">(3rd Rak'ah: Surah Al-Fatiha only)</span></div></li>
          <li><span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين)</span> <div className="text-gray-800 mt-1">Raise hands and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span></div></li>
          <li><span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing)</span> <div className="text-gray-800 mt-1">Bow with hands on knees, back straight. Say <b>three times</b> (or more):<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span></div></li>
          <li><span className="text-xl">🧍</span> <span className="font-bold text-lg">Rising from Ruku' (الرفع من الركوع)</span> <div className="text-gray-800 mt-1">Say:<br /><span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span><br />Then say:<br /><span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ،<br />حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span></div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration)</span> <div className="text-gray-800 mt-1">Prostrate fully and say three times:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🪑</span> <span className="font-bold text-lg">Sitting Between Two Sujoods</span> <div className="text-gray-800 mt-1">Sit calmly and say:<br /><span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span></div></li>
          <li><span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span> <div className="text-gray-800 mt-1">Repeat:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span> <div className="text-gray-800 mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the cycle:<br /><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha</li><li>Short Surah</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">After 2nd Rak'ah – First Tashahhud (التشهد الأول)</span> <div className="text-gray-800 mt-1">Sit and recite:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div><div className="text-gray-800 mt-2">➤ Then stand up for the 3rd Rak'ah.</div></li>
          <li><span className="text-xl">🔄</span> <span className="font-bold text-lg">3rd Rak'ah</span> <div className="text-gray-800 mt-1"><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha only</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">Final Tashahhud After 3rd Rak'ah</span> <div className="text-gray-800 mt-1">Recite both Tashahhud and Salat al-Ibrahimiyya:</div><div className="font-bold text-gray-800 mt-2">🗣️ Tashahhud:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله...<br />أشهد أن لا إله إلا الله...<br />وأشهد أن محمدًا عبده ورسوله</div><div className="font-bold text-gray-800 mt-2">🌸 Salat al-Ibrahimiyya:</div><div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div></li>
          <li><span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (Ending the Prayer)</span> <div className="text-gray-800 mt-1">* Turn head to the <b>right</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span><br />* Then to the <b>left</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></div></li>
        </ol>
        <div className="mt-8 space-y-2 border-t border-brass pt-4">
          <h3 className="text-lg font-bold text-wood">Important Notes for Maghrib Salah</h3>
          <ul className="list-disc pl-6 text-base">
            <li><b>Maghrib is recited aloud</b> in the first two Rak'ahs.</li>
            <li>All three Rak'ahs are <b>obligatory (fard)</b>.</li>
            <li>Perform each action <b>with tranquility and humility (khushu')</b>.</li>
            <li>Pray Maghrib soon after sunset.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function IshaGuide({ onClose }) {
  return (
    <div className="relative max-h-[80vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] border-2 border-brass shadow-2xl p-0 max-w-2xl w-full mx-auto">
      <button
        className="fixed z-50 w-12 h-12 rounded-full bg-amber-600 text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-amber-700 focus:bg-amber-700 transition"
        style={{ top: 'calc(50% - 240px)', right: 'calc(50% - 320px)' }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] rounded-t-3xl flex flex-col items-center pt-6 pb-2 border-b-2 border-brass">
        <div className="text-5xl mb-2">🌙</div>
        <div className="text-3xl font-bold text-brass mb-1 text-center">Isha Prayer Guide — 4 Rak'ahs</div>
        <div className="text-base text-gray-800 text-center mb-1">According to the Sunnah of Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li><span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span> <div className="text-gray-800 mt-1">Silently make the intention in your heart:<br /><span className="italic">"I intend to pray four Rak'ahs of Isha for the sake of Allah."</span></div></li>
          <li><span className="text-xl">🕋</span> <span className="font-bold text-lg">Takbir al-Ihram (Opening Takbir):</span> <div className="text-gray-800 mt-1">Raise both hands to <b>ear level (men)</b> or <b>shoulder level (women)</b> and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />→ This marks the beginning of your prayer.</div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Place Hands on Chest</span> <div className="text-gray-800 mt-1">Right hand over left hand on your chest.</div></li>
          <li><span className="text-xl">✨</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span> <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ،<br />وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ،<br />وَلَا إِلَهَ غَيْرُكَ</div></li>
          <li><span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span> <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...</div> <div className="text-gray-800">Complete the full <b>Surah Al-Fatiha</b>.</div> <div className="text-xs text-wood mt-1">📌 "There is no prayer for the one who does not recite Al-Fatiha." — (Bukhari, Muslim)</div></li>
          <li><span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah</span> <div className="text-gray-800 mt-1"><b>1st Rak'ah</b>: Surah Al-Ikhlas<br /><b>2nd Rak'ah</b>: Surah Al-Falaq<br /><span className="text-xs">(3rd & 4th Rak'ahs: Surah Al-Fatiha only)</span></div></li>
          <li><span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين)</span> <div className="text-gray-800 mt-1">Raise hands and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span></div></li>
          <li><span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing)</span> <div className="text-gray-800 mt-1">Bow with hands on knees, back straight. Say <b>three times</b> (or more):<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span></div></li>
          <li><span className="text-xl">🧍</span> <span className="font-bold text-lg">Rising from Ruku' (الرفع من الركوع)</span> <div className="text-gray-800 mt-1">Say:<br /><span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span><br />Then say:<br /><span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ،<br />حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span></div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration)</span> <div className="text-gray-800 mt-1">Prostrate fully and say three times:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🪑</span> <span className="font-bold text-lg">Sitting Between Two Sujoods</span> <div className="text-gray-800 mt-1">Sit calmly and say:<br /><span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span></div></li>
          <li><span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span> <div className="text-gray-800 mt-1">Repeat:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span> <div className="text-gray-800 mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the cycle:<br /><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha</li><li>Short Surah</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">After 2nd Rak'ah – First Tashahhud (التشهد الأول)</span> <div className="text-gray-800 mt-1">Sit and recite:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div><div className="text-gray-800 mt-2">➤ Then stand up for the 3rd Rak'ah.</div></li>
          <li><span className="text-xl">🔄</span> <span className="font-bold text-lg">3rd Rak'ah</span> <div className="text-gray-800 mt-1"><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha only</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🔄</span> <span className="font-bold text-lg">4th Rak'ah</span> <div className="text-gray-800 mt-1"><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha only</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">Final Tashahhud After 4th Rak'ah</span> <div className="text-gray-800 mt-1">Recite both Tashahhud and Salat al-Ibrahimiyya:</div><div className="font-bold text-gray-800 mt-2">🗣️ Tashahhud:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله...<br />أشهد أن لا إله إلا الله...<br />وأشهد أن محمدًا عبده ورسوله</div><div className="font-bold text-gray-800 mt-2">🌸 Salat al-Ibrahimiyya:</div><div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div></li>
          <li><span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (Ending the Prayer)</span> <div className="text-gray-800 mt-1">* Turn head to the <b>right</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span><br />* Then to the <b>left</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></div></li>
        </ol>
        <div className="mt-8 space-y-2 border-t border-brass pt-4">
          <h3 className="text-lg font-bold text-wood">Important Notes for Isha Salah</h3>
          <ul className="list-disc pl-6 text-base">
            <li><b>Isha is recited aloud</b> in the first two Rak'ahs.</li>
            <li>All four Rak'ahs are <b>obligatory (fard)</b>.</li>
            <li>Perform each action <b>with tranquility and humility (khushu')</b>.</li>
            <li>Pray Isha after the twilight has disappeared.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Jumma (Friday) Prayer Guide
function JummaGuide({ onClose }) {
  return (
    <div className="relative max-h-[90vh] overflow-y-auto rounded-3xl bg-white/98 backdrop-blur-xl shadow-2xl p-0 max-w-4xl w-full mx-auto border border-white/30">
      <button
        className="fixed z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white hover:from-emerald-500 hover:to-green-500 focus:from-emerald-500 focus:to-green-500 transition-all duration-300"
        style={{ top: '10px', right: '10px' }}
        onClick={onClose}
        aria-label="Back"
      >
        ←
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-t-3xl flex flex-col items-center pt-8 pb-4 border-b-2 border-emerald-300">
        <div className="text-6xl mb-3">🕌</div>
        <div className="text-4xl font-bold text-emerald-800 mb-2 text-center">Jumma (Friday) Prayer Guide</div>
        <div className="text-lg text-emerald-700 text-center mb-2">The Best Day of the Week - Congregational Prayer</div>
      </div>
      <div className="px-4 sm:px-6 md:px-10 pb-6 sm:pb-10 pt-4 sm:pt-6 text-lg sm:text-xl leading-relaxed bg-white/50">
        <div className="space-y-8">
          <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-400">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">🕌 What is Jumma Prayer?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Jumma is the Friday congregational prayer that replaces the regular Dhuhr prayer on Fridays. 
              It consists of 2 Rak'ahs and includes a sermon (Khutbah) before the prayer.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">⏰ Timing</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>Same time as Dhuhr prayer</strong> on Friday</li>
              <li>• <strong>Must be performed in congregation</strong> (Jama'ah)</li>
              <li>• <strong>Cannot be performed alone</strong> - requires at least 2 people</li>
              <li>• <strong>Khutbah (sermon)</strong> is delivered before the prayer</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-400">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">📋 Step-by-Step Guide</h3>
            <ol className="space-y-6">
              <li>
                <span className="text-3xl">🎤</span> <span className="font-bold text-2xl text-emerald-800">Khutbah (Sermon)</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Listen to the Imam's sermon. This is <strong>obligatory</strong> and part of the Jumma prayer.
                  <br />• First Khutbah: Imam stands and delivers sermon
                  <br />• Short sitting break
                  <br />• Second Khutbah: Imam continues with second part
                </div>
              </li>
              <li>
                <span className="text-3xl">🕌</span> <span className="font-bold text-2xl text-emerald-800">Intention (النية)</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Silently make the intention:
                  <br /><span className="italic text-emerald-600 font-semibold">"I intend to pray two Rak'ahs of Jumma prayer for the sake of Allah."</span>
                </div>
              </li>
              <li>
                <span className="text-3xl">🕋</span> <span className="font-bold text-2xl text-emerald-800">Takbir al-Ihram</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Follow the Imam's lead. When he says Takbir, raise your hands and say:
                  <br /><span className="font-arabic text-emerald-600 text-2xl">اللَّهُ أَكْبَر</span>
                </div>
              </li>
              <li>
                <span className="text-3xl">📖</span> <span className="font-bold text-2xl text-emerald-800">Recite Al-Fatiha</span>
                <div className="text-gray-700 mt-2 text-lg">
                  The Imam will recite Al-Fatiha and a Surah <strong>aloud</strong>. Listen attentively.
                  <br />In the second Rak'ah, the Imam will recite Al-Fatiha and another Surah.
                </div>
              </li>
              <li>
                <span className="text-3xl">🙇</span> <span className="font-bold text-2xl text-emerald-800">Follow Imam's Movements</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Follow the Imam in all movements:
                  <br />• Ruku' (bowing)
                  <br />• Sujood (prostration) - twice per Rak'ah
                  <br />• Sitting for Tashahhud
                  <br />• Tasleem (ending)
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">✨ Virtues of Jumma Prayer</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>Best day of the week</strong> - Prophet Muhammad ﷺ said: "The best day on which the sun has risen is Friday."</li>
              <li>• <strong>Forgiveness of sins</strong> - "Whoever performs Ghusl on Friday, then comes to Jumma prayer, it is as if he sacrificed a camel."</li>
              <li>• <strong>Special hour of acceptance</strong> - There is an hour on Friday when Allah accepts supplications.</li>
              <li>• <strong>Community bonding</strong> - Brings Muslims together in unity.</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
            <h3 className="text-2xl font-bold text-red-800 mb-4">⚠️ Important Notes</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>Obligatory for Muslim men</strong> - Women can attend but it's not obligatory</li>
              <li>• <strong>Must be in congregation</strong> - Cannot be performed alone</li>
              <li>• <strong>Arrive early</strong> - Better to arrive before the Khutbah starts</li>
              <li>• <strong>Listen to Khutbah</strong> - Talking during Khutbah is prohibited</li>
              <li>• <strong>Perform Ghusl</strong> - Recommended to take a bath before Jumma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Eid Prayers Guide
function EidGuide({ onClose }) {
  return (
    <div className="relative max-h-[90vh] overflow-y-auto rounded-3xl bg-white/98 backdrop-blur-xl shadow-2xl p-0 max-w-4xl w-full mx-auto border border-white/30">
      <button
        className="fixed z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white hover:from-emerald-500 hover:to-green-500 focus:from-emerald-500 focus:to-green-500 transition-all duration-300"
        style={{ top: '10px', right: '10px' }}
        onClick={onClose}
        aria-label="Back"
      >
        ←
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-t-3xl flex flex-col items-center pt-8 pb-4 border-b-2 border-emerald-300">
        <div className="text-6xl mb-3">🎉</div>
        <div className="text-4xl font-bold text-emerald-800 mb-2 text-center">Eid Prayers Guide</div>
        <div className="text-lg text-emerald-700 text-center mb-2">Eid al-Fitr & Eid al-Adha - Celebration Prayers</div>
      </div>
      <div className="px-4 sm:px-6 md:px-10 pb-6 sm:pb-10 pt-4 sm:pt-6 text-lg sm:text-xl leading-relaxed bg-white/50">
        <div className="space-y-8">
          <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-400">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">🎉 What are Eid Prayers?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Eid prayers are special congregational prayers performed on the two major Islamic festivals:
              <br />• <strong>Eid al-Fitr</strong> - After Ramadan (1st Shawwal)
              <br />• <strong>Eid al-Adha</strong> - During Hajj season (10th Dhul-Hijjah)
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">⏰ Timing</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>After sunrise</strong> until before Dhuhr</li>
              <li>• <strong>Performed in congregation</strong> (Jama'ah)</li>
              <li>• <strong>Outdoor prayer</strong> preferred (if weather permits)</li>
              <li>• <strong>No Adhan or Iqamah</strong> - just starts with Takbir</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-400">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">📋 Step-by-Step Guide</h3>
            <ol className="space-y-6">
              <li>
                <span className="text-3xl">🛁</span> <span className="font-bold text-2xl text-emerald-800">Preparation</span>
                <div className="text-gray-700 mt-2 text-lg">
                  • Take a bath (Ghusl)
                  <br />• Wear your best clothes
                  <br />• Apply perfume (for men)
                  <br />• Eat something sweet before Eid al-Fitr (Sunnah)
                </div>
              </li>
              <li>
                <span className="text-3xl">🕌</span> <span className="font-bold text-2xl text-emerald-800">Intention (النية)</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Silently make the intention:
                  <br /><span className="italic text-emerald-600 font-semibold">"I intend to pray two Rak'ahs of Eid prayer for the sake of Allah."</span>
                </div>
              </li>
              <li>
                <span className="text-3xl">🕋</span> <span className="font-bold text-2xl text-emerald-800">Takbir al-Ihram</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Follow the Imam's lead. When he says Takbir, raise your hands and say:
                  <br /><span className="font-arabic text-emerald-600 text-2xl">اللَّهُ أَكْبَر</span>
                </div>
              </li>
              <li>
                <span className="text-3xl">📖</span> <span className="font-bold text-2xl text-emerald-800">Recite Al-Fatiha</span>
                <div className="text-gray-700 mt-2 text-lg">
                  The Imam will recite Al-Fatiha and a Surah <strong>aloud</strong>. Listen attentively.
                  <br />In the second Rak'ah, the Imam will recite Al-Fatiha and another Surah.
                </div>
              </li>
              <li>
                <span className="text-3xl">🙇</span> <span className="font-bold text-2xl text-emerald-800">Follow Imam's Movements</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Follow the Imam in all movements:
                  <br />• Ruku' (bowing)
                  <br />• Sujood (prostration) - twice per Rak'ah
                  <br />• Sitting for Tashahhud
                  <br />• Tasleem (ending)
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">✨ Virtues of Eid Prayers</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>Expression of gratitude</strong> to Allah for His blessings</li>
              <li>• <strong>Community celebration</strong> - brings Muslims together</li>
              <li>• <strong>Forgiveness of sins</strong> - opportunity for spiritual renewal</li>
              <li>• <strong>Charity and giving</strong> - especially on Eid al-Fitr</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Istisqa (Prayer for Rain) Guide
function IstisqaGuide({ onClose }) {
  return (
    <div className="relative max-h-[90vh] overflow-y-auto rounded-3xl bg-white/98 backdrop-blur-xl shadow-2xl p-0 max-w-4xl w-full mx-auto border border-white/30">
      <button
        className="fixed z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white hover:from-emerald-500 hover:to-green-500 focus:from-emerald-500 focus:to-green-500 transition-all duration-300"
        style={{ top: '10px', right: '10px' }}
        onClick={onClose}
        aria-label="Back"
      >
        ←
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-t-3xl flex flex-col items-center pt-8 pb-4 border-b-2 border-emerald-300">
        <div className="text-6xl mb-3">🌧️</div>
        <div className="text-4xl font-bold text-emerald-800 mb-2 text-center">Istisqa Prayer Guide</div>
        <div className="text-lg text-emerald-700 text-center mb-2">Prayer for Rain - Seeking Allah's Mercy</div>
      </div>
      <div className="px-4 sm:px-6 md:px-10 pb-6 sm:pb-10 pt-4 sm:pt-6 text-lg sm:text-xl leading-relaxed bg-white/50">
        <div className="space-y-8">
          <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-400">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">🌧️ What is Istisqa Prayer?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Istisqa is a special prayer performed during times of drought to seek rain from Allah. 
              It's a congregational prayer that demonstrates our dependence on Allah for sustenance.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">⏰ When to Perform</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>During drought</strong> or water shortage</li>
              <li>• <strong>After sunrise</strong> until before Dhuhr</li>
              <li>• <strong>Outdoor prayer</strong> preferred</li>
              <li>• <strong>Congregational prayer</strong> (Jama'ah)</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-400">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">📋 Step-by-Step Guide</h3>
            <ol className="space-y-6">
              <li>
                <span className="text-3xl">🕌</span> <span className="font-bold text-2xl text-emerald-800">Preparation</span>
                <div className="text-gray-700 mt-2 text-lg">
                  • Fast for 3 days before the prayer (recommended)
                  <br />• Repent from sins and seek forgiveness
                  <br />• Give charity to the poor
                  <br />• Gather the community for the prayer
                </div>
              </li>
              <li>
                <span className="text-3xl">🕋</span> <span className="font-bold text-2xl text-emerald-800">Intention (النية)</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Silently make the intention:
                  <br /><span className="italic text-emerald-600 font-semibold">"I intend to pray two Rak'ahs of Istisqa prayer for the sake of Allah."</span>
                </div>
              </li>
              <li>
                <span className="text-3xl">📖</span> <span className="font-bold text-2xl text-emerald-800">Recite Al-Fatiha</span>
                <div className="text-gray-700 mt-2 text-lg">
                  The Imam will recite Al-Fatiha and a Surah <strong>aloud</strong>. Listen attentively.
                  <br />In the second Rak'ah, the Imam will recite Al-Fatiha and another Surah.
                </div>
              </li>
              <li>
                <span className="text-3xl">🙇</span> <span className="font-bold text-2xl text-emerald-800">Follow Imam's Movements</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Follow the Imam in all movements:
                  <br />• Ruku' (bowing)
                  <br />• Sujood (prostration) - twice per Rak'ah
                  <br />• Sitting for Tashahhud
                  <br />• Tasleem (ending)
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">✨ Virtues of Istisqa Prayer</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>Expression of dependence</strong> on Allah for sustenance</li>
              <li>• <strong>Community unity</strong> - brings people together in supplication</li>
              <li>• <strong>Spiritual purification</strong> - encourages repentance and charity</li>
              <li>• <strong>Allah's mercy</strong> - demonstrates trust in Allah's provision</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Salat al-Hajat (Prayer for Needs) Guide
function HajatGuide({ onClose }) {
  return (
    <div className="relative max-h-[90vh] overflow-y-auto rounded-3xl bg-white/98 backdrop-blur-xl shadow-2xl p-0 max-w-4xl w-full mx-auto border border-white/30">
      <button
        className="fixed z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white hover:from-emerald-500 hover:to-green-500 focus:from-emerald-500 focus:to-green-500 transition-all duration-300"
        style={{ top: '10px', right: '10px' }}
        onClick={onClose}
        aria-label="Back"
      >
        ←
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-t-3xl flex flex-col items-center pt-8 pb-4 border-b-2 border-emerald-300">
        <div className="text-6xl mb-3">🤲</div>
        <div className="text-4xl font-bold text-emerald-800 mb-2 text-center">Salat al-Hajat Guide</div>
        <div className="text-lg text-emerald-700 text-center mb-2">Prayer for Needs - Seeking Allah's Help</div>
      </div>
      <div className="px-4 sm:px-6 md:px-10 pb-6 sm:pb-10 pt-4 sm:pt-6 text-lg sm:text-xl leading-relaxed bg-white/50">
        <div className="space-y-8">
          <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-400">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">🤲 What is Salat al-Hajat?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Salat al-Hajat is a voluntary prayer performed when you have a specific need or want to ask Allah for something. 
              It's a way to seek Allah's help and guidance in times of difficulty or when making important decisions.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">⏰ When to Perform</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>When you have a specific need</strong> or want</li>
              <li>• <strong>Before making important decisions</strong></li>
              <li>• <strong>During times of difficulty</strong> or hardship</li>
              <li>• <strong>Any time</strong> (except prohibited times)</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-400">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">📋 Step-by-Step Guide</h3>
            <ol className="space-y-6">
              <li>
                <span className="text-3xl">🕌</span> <span className="font-bold text-2xl text-emerald-800">Intention (النية)</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Silently make the intention:
                  <br /><span className="italic text-emerald-600 font-semibold">"I intend to pray two Rak'ahs of Salat al-Hajat for the sake of Allah."</span>
                </div>
              </li>
              <li>
                <span className="text-3xl">🕋</span> <span className="font-bold text-2xl text-emerald-800">Takbir al-Ihram</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Raise your hands and say:
                  <br /><span className="font-arabic text-emerald-600 text-2xl">اللَّهُ أَكْبَر</span>
                </div>
              </li>
              <li>
                <span className="text-3xl">📖</span> <span className="font-bold text-2xl text-emerald-800">Recite Al-Fatiha</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Recite Al-Fatiha and then a short Surah (like Al-Ikhlas or Al-Falaq).
                </div>
              </li>
              <li>
                <span className="text-3xl">🙇</span> <span className="font-bold text-2xl text-emerald-800">Complete the Prayer</span>
                <div className="text-gray-700 mt-2 text-lg">
                  Perform the complete prayer with:
                  <br />• Ruku' (bowing)
                  <br />• Sujood (prostration) - twice per Rak'ah
                  <br />• Sitting for Tashahhud
                  <br />• Tasleem (ending)
                </div>
              </li>
              <li>
                <span className="text-3xl">🤲</span> <span className="font-bold text-2xl text-emerald-800">Make Dua</span>
                <div className="text-gray-700 mt-2 text-lg">
                  After completing the prayer, make sincere dua for your need:
                  <br /><span className="font-arabic text-emerald-600 text-xl">اللَّهُمَّ إِنِّي أَسْأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِمُحَمَّدٍ نَبِيِّ الرَّحْمَةِ</span>
                  <br /><span className="italic text-emerald-600">"O Allah, I ask You and turn to You through Muhammad, the Prophet of Mercy."</span>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">✨ Virtues of Salat al-Hajat</h3>
            <ul className="text-gray-700 text-lg space-y-2">
              <li>• <strong>Direct connection</strong> with Allah for your needs</li>
              <li>• <strong>Spiritual purification</strong> and focus</li>
              <li>• <strong>Increased faith</strong> and trust in Allah</li>
              <li>• <strong>Peace of mind</strong> knowing Allah will provide</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NamazScreen() {
  const [modal, setModal] = useState(null); // { namaz, type }
  const [completed, setCompleted] = useState(() => {
    const obj = {};
    [...FARZ_NAMAZ, ...NAWAFIL_NAMAZ].forEach(n => {
      obj[n.key] = localStorage.getItem(getTodayKey(n.key)) === 'true';
    });
    return obj;
  });

  function toggleCompleted(key) {
    setCompleted(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem(getTodayKey(key), updated[key]);
      return updated;
    });
  }

  function Card({ namaz, color }) {
    return (
      <motion.div
        className="group relative p-4 sm:p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl hover:bg-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
        whileHover={{ y: -5, rotateY: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setModal({ namaz })}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative text-center">
          <motion.div 
            className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 10 }}
          >
            {namaz.icon}
          </motion.div>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-emerald-300 transition-colors duration-300">
            {namaz.name}
          </h3>
          
          {namaz.description && (
            <p className="text-gray-200 mb-2 sm:mb-3 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
              {namaz.description}
            </p>
          )}
          
          {namaz.timing && (
            <p className="text-emerald-300 mb-3 sm:mb-4 text-xs sm:text-sm font-semibold group-hover:text-green-300 transition-colors duration-300">
              {namaz.timing}
            </p>
          )}
          
          <motion.button 
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg"
            onClick={e => { e.stopPropagation(); setModal({ namaz }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
          
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 cursor-pointer" onClick={e => { e.stopPropagation(); toggleCompleted(namaz.key); }}>
          <ToggleLeft
            isActive={completed[namaz.key]}
              onChange={() => {}}
              stroke="#10B981"
          />
            <span className="text-xs sm:text-sm text-gray-200 group-hover:text-white transition-colors duration-300 font-medium">
              Mark as Completed
            </span>
          </div>
      </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/50 rounded-3xl transition-colors duration-500"></div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12 py-6 sm:py-12 px-3 sm:px-4">
        {/* Header Section */}
        <motion.div 
          className="w-full text-center mb-8 sm:mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="relative">
            <motion.div 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent"
              variants={pulseAnimation}
              animate="animate"
            >
              🕌 All Namaz
            </motion.div>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Complete guide to all prayers - Farz and Nawafil
            </div>
        </div>
        </motion.div>
        {/* Farz Namaz Section */}
        <motion.div 
          className="w-full max-w-7xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="text-center mb-6 sm:mb-8"
            variants={staggerItem}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              📋 Farz Namaz
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
            variants={staggerContainer}
          >
            {FARZ_NAMAZ.map(namaz => (
              <Card key={namaz.key} namaz={namaz} color="farz" />
            ))}
          </motion.div>
        </motion.div>
        {/* Nawafil Namaz Section */}
        <motion.div 
          className="w-full max-w-7xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="text-center mb-6 sm:mb-8"
            variants={staggerItem}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              🌟 Nawafil (Nafl) Namaz
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            variants={staggerContainer}
          >
            {NAWAFIL_NAMAZ.map(namaz => (
              <Card key={namaz.key} namaz={namaz} color="nafl" />
            ))}
          </motion.div>
        </motion.div>
        {modal && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.smooth}
            onClick={() => setModal(null)}
          >
            <motion.div 
              className="bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full border border-emerald-400/30 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={transitions.spring}
              onClick={e => e.stopPropagation()}
            >
              {/* Only the floating close button is rendered via FajrGuide/DhuhrGuide/AsrGuide/MaghribGuide/IshaGuide/onClose, so remove any other close/cancel button here */}
              {modal.namaz.key === 'fajr' ? (
                <FajrGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'dhuhr' ? (
                <DhuhrGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'asr' ? (
                <AsrGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'maghrib' ? (
                <MaghribGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'isha' ? (
                <IshaGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'jumma' ? (
                <JummaGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'eid' ? (
                <EidGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'istisqa' ? (
                <IstisqaGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'hajat' ? (
                <HajatGuide onClose={() => setModal(null)} />
              ) : (
                <div className="p-8 bg-white/98 rounded-3xl">
                  <div className="text-6xl mb-4 text-center">{modal.namaz.icon}</div>
                  <div className="text-4xl font-bold text-emerald-800 mb-4 text-center">{modal.namaz.name}</div>
                  <div className="text-gray-700 mb-4 text-center text-xl">{modal.namaz.description}</div>
                  <div className="text-emerald-600 mb-4 text-center text-lg font-semibold">Timing: {modal.namaz.timing}</div>
                  <div className="text-emerald-700 text-center text-lg italic bg-emerald-50 p-4 rounded-xl">{modal.namaz.virtue}</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
