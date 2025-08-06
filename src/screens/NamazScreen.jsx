import React, { useState } from 'react';
import { ToggleLeft } from '../components/ToggleLeft';

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
  { key: 'tahiyatul-masjid', name: 'Tahiyatul Masjid', icon: '🏛️', description: 'Greeting the mosque', timing: 'Upon entering the mosque', virtue: 'Respect for the house of Allah.' },
  { key: 'awabeen', name: 'Salat al-Awabeen', icon: '🕯️', description: 'After Maghrib prayer', timing: 'After Maghrib', virtue: 'For the oft-returning to Allah.' },
  { key: 'tasbih', name: 'Salat al-Tasbih', icon: '📿', description: 'Special prayer with much glorification', timing: 'Any time (except prohibited times)', virtue: 'Forgiveness of all sins.' },
  { key: 'janazah', name: 'Salat al-Janazah', icon: '⚰️', description: 'Funeral prayer', timing: 'After death, before burial', virtue: 'A right of the Muslim upon another.' },
];

function getTodayKey(namazKey) {
  const today = new Date().toISOString().slice(0, 10);
  return `namaz_completed_${namazKey}_${today}`;
}

function FajrGuide({ onClose }) {
  return (
    <div className="relative max-h-[80vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] border-2 border-brass shadow-2xl p-0 max-w-2xl w-full mx-auto">
      {/* Floating close button - outside the card, not overlapping */}
      <button
        className="fixed z-50 w-12 h-12 rounded-full bg-brass text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-wood focus:bg-wood transition"
        style={{ top: 'calc(50% - 240px)', right: 'calc(50% - 320px)' }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] rounded-t-3xl flex flex-col items-center pt-6 pb-2 border-b-2 border-brass">
        <div className="text-5xl mb-2">🌅</div>
        <div className="text-3xl font-bold text-brass mb-1 text-center">Fajr Prayer Guide (2 Rak'ahs)</div>
        <div className="text-base text-mocha text-center mb-1">According to the Sunnah of the Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li>
            <span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span>
            <div className="text-mocha mt-1">Silently make the intention in your heart:<br />
              <span className="italic">"I intend to pray two Rak'ahs of Fajr for the sake of Allah."</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🕋</span> <span className="font-bold text-lg">Takbir al-Ihram (تكبيرة الإحرام):</span>
            <div className="text-mocha mt-1">Raise both hands to the <b>ears (men)</b> or <b>shoulders (women)</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />
              → This marks the start of Salah.
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Place Hands and Start Prayer</span>
            <div className="text-mocha mt-1">Place right hand over the left on the <b>chest</b>.<br />Begin with the opening supplication (optional).</div>
          </li>
          <li>
            <span className="text-xl">🙏</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span>
            <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</div>
          </li>
          <li>
            <span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span>
            <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</div>
            <div className="text-mocha">Then complete the full <b>Surah Al-Fatiha</b>.</div>
            <div className="text-xs text-wood mt-1">📌 Prophet ﷺ said: "There is no prayer for the one who does not recite Al-Fatiha." (Bukhari, Muslim)</div>
          </li>
          <li>
            <span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah (in both Rak'ahs)</span>
            <div className="text-mocha mt-1">
              <b>First Rak'ah</b>: Surah <b>Al-Kafirun (الكافرون)</b><br />
              <b>Second Rak'ah</b>: Surah <b>Al-Ikhlas (الإخلاص)</b><br />
              <span className="text-xs">(These were commonly recited by the Prophet ﷺ in Fajr)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين قبل الركوع)</span>
            <div className="text-mocha mt-1">Raise hands again to <b>ears/shoulders</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing - الركوع)</span>
            <div className="text-mocha mt-1">Bow, placing hands on knees, back flat.<br />Recite <b>three times</b> (or more):<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🧍</span> <span className="font-bold text-lg">Standing Up from Ruku' (الرفع من الركوع)</span>
            <div className="text-mocha mt-1">Rise saying:<br />
              <span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span> <span className="italic">(Sami' Allahu liman ḥamidah)</span><br />
              Then say:<br />
              <span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span><br />
              <span className="italic">(Rabbanā laka al-ḥamdu ḥamdan kathīran ṭayyiban mubārakan fīh)</span>
            </div>
            <div className="text-xs text-wood mt-1">📚 Hadith: Sahih al-Bukhari, 799</div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration - السجود)</span>
            <div className="text-mocha mt-1">Go into sujood and say <b>three times</b>:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🪑</span> <span className="font-bold text-lg">Sit Between Two Sujoods</span>
            <div className="text-mocha mt-1">Sit calmly and recite:<br />
              <span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span>
            <div className="text-mocha mt-1">Go into sujood again and repeat:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span>
            <div className="text-mocha mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the same steps:<br />
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha</li>
                <li>Short Surah (e.g., Surah Al-Ikhlas)</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">Tashahhud (تشهد) After Second Rak'ah</span>
            <div className="text-mocha mt-1">Sit and recite the Tashahhud:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div>
          </li>
          <li>
            <span className="text-xl">🌹</span> <span className="font-bold text-lg">Salat al-Ibrahimiyya (الصلاة الإبراهيمية)</span>
            <div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div>
          </li>
          <li>
            <span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (التسليم)</span>
            <div className="text-mocha mt-1">To <b>end the Salah</b>, turn your head:</div>
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
        className="fixed z-50 w-12 h-12 rounded-full bg-brass text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-wood focus:bg-wood transition"
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
        <div className="text-base text-mocha text-center mb-1">According to the Sunnah of the Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li>
            <span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span>
            <div className="text-mocha mt-1">Silently make the intention in your heart:<br />
              <span className="italic">"I intend to pray four Rak'ahs of Dhuhr for the sake of Allah."</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🕋</span> <span className="font-bold text-lg">Takbir al-Ihram (تكبيرة الإحرام):</span>
            <div className="text-mocha mt-1">Raise both hands to the <b>ears (men)</b> or <b>shoulders (women)</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />
              → This marks the start of Salah.
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Place Hands and Start Prayer</span>
            <div className="text-mocha mt-1">Place right hand over the left on the <b>chest</b>.<br />Begin with the opening supplication (optional).</div>
          </li>
          <li>
            <span className="text-xl">🙏</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span>
            <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</div>
          </li>
          <li>
            <span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span>
            <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</div>
            <div className="text-mocha">Then complete the full <b>Surah Al-Fatiha</b>.</div>
            <div className="text-xs text-wood mt-1">📌 Prophet ﷺ said: "There is no prayer for the one who does not recite Al-Fatiha." (Bukhari, Muslim)</div>
          </li>
          <li>
            <span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah (in both Rak'ahs)</span>
            <div className="text-mocha mt-1">
              <b>First Rak'ah</b>: Surah <b>Al-Kafirun (الكافرون)</b><br />
              <b>Second Rak'ah</b>: Surah <b>Al-Ikhlas (الإخلاص)</b><br />
              <span className="text-xs">(These were commonly recited by the Prophet ﷺ in Fajr)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين قبل الركوع)</span>
            <div className="text-mocha mt-1">Raise hands again to <b>ears/shoulders</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing - الركوع)</span>
            <div className="text-mocha mt-1">Bow, placing hands on knees, back flat.<br />Recite <b>three times</b> (or more):<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🧍</span> <span className="font-bold text-lg">Standing Up from Ruku' (الرفع من الركوع)</span>
            <div className="text-mocha mt-1">Rise saying:<br />
              <span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span> <span className="italic">(Sami' Allahu liman ḥamidah)</span><br />
              Then say:<br />
              <span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span><br />
              <span className="italic">(Rabbanā laka al-ḥamdu ḥamdan kathīran ṭayyiban mubārakan fīh)</span>
            </div>
            <div className="text-xs text-wood mt-1">📚 Hadith: Sahih al-Bukhari, 799</div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration - السجود)</span>
            <div className="text-mocha mt-1">Go into sujood and say <b>three times</b>:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🪑</span> <span className="font-bold text-lg">Sit Between Two Sujoods</span>
            <div className="text-mocha mt-1">Sit calmly and recite:<br />
              <span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span>
            <div className="text-mocha mt-1">Go into sujood again and repeat:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span>
            <div className="text-mocha mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the same steps:<br />
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha</li>
                <li>Short Surah (e.g., Surah Al-Ikhlas)</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">Tashahhud (تشهد) After Second Rak'ah</span>
            <div className="text-mocha mt-1">Sit and recite the Tashahhud:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div>
          </li>
          <li>
            <span className="text-xl">🌹</span> <span className="font-bold text-lg">Salat al-Ibrahimiyya (الصلاة الإبراهيمية)</span>
            <div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div>
          </li>
          <li>
            <span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (التسليم)</span>
            <div className="text-mocha mt-1">To <b>end the Salah</b>, turn your head:</div>
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
        className="fixed z-50 w-12 h-12 rounded-full bg-brass text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-wood focus:bg-wood transition"
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
        <div className="text-base text-mocha text-center mb-1">According to the Sunnah of Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li>
            <span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span>
            <div className="text-mocha mt-1">Silently make the intention in your heart:<br />
              <span className="italic">"I intend to pray four Rak'ahs of Asr prayer for the sake of Allah."</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🕋</span> <span className="font-bold text-lg">Takbir al-Ihram (Opening Takbir):</span>
            <div className="text-mocha mt-1">Raise both hands to <b>ear level (men)</b> or <b>shoulder level (women)</b> and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />
              → This marks the beginning of your prayer.
            </div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Place Hands on Chest</span>
            <div className="text-mocha mt-1">Right hand over left hand on your chest.</div>
          </li>
          <li>
            <span className="text-xl">✨</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span>
            <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ،<br />وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ،<br />وَلَا إِلَهَ غَيْرُكَ</div>
          </li>
          <li>
            <span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span>
            <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...</div>
            <div className="text-mocha">Complete the full <b>Surah Al-Fatiha</b>.</div>
            <div className="text-xs text-wood mt-1">📌 "There is no prayer for the one who does not recite Al-Fatiha." — (Bukhari, Muslim)</div>
          </li>
          <li>
            <span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah</span>
            <div className="text-mocha mt-1">
              <b>1st Rak'ah</b>: Surah Al-ʿAsr<br />
              <b>2nd Rak'ah</b>: Surah Al-Kawthar<br />
              <span className="text-xs">(3rd & 4th Rak'ahs: Surah Al-Fatiha only)</span>
            </div>
          </li>
          <li>
            <span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين)</span>
            <div className="text-mocha mt-1">Raise hands and say:<br />
              <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing)</span>
            <div className="text-mocha mt-1">Bow with hands on knees, back straight. Say <b>three times</b> (or more):<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🧍</span> <span className="font-bold text-lg">Rising from Ruku' (الرفع من الركوع)</span>
            <div className="text-mocha mt-1">Say:<br />
              <span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span><br />
              Then say:<br />
              <span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ،<br />حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration)</span>
            <div className="text-mocha mt-1">Prostrate fully and say three times:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🪑</span> <span className="font-bold text-lg">Sitting Between Two Sujoods</span>
            <div className="text-mocha mt-1">Sit calmly and say:<br />
              <span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span>
            <div className="text-mocha mt-1">Repeat:<br />
              <span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span>
            </div>
          </li>
          <li>
            <span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span>
            <div className="text-mocha mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the cycle:<br />
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha</li>
                <li>Short Surah</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">After 2nd Rak'ah – First Tashahhud (التشهد الأول)</span>
            <div className="text-mocha mt-1">Sit and recite:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div>
            <div className="text-mocha mt-2">➤ Then stand up for the 3rd Rak'ah.</div>
          </li>
          <li>
            <span className="text-xl">🔄</span> <span className="font-bold text-lg">3rd Rak'ah</span>
            <div className="text-mocha mt-1">
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha only</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🔄</span> <span className="font-bold text-lg">4th Rak'ah</span>
            <div className="text-mocha mt-1">
              <ul className="list-disc pl-6 text-base mt-2">
                <li>Surah Al-Fatiha only</li>
                <li>Ruku' → Standing → Sujood ×2</li>
              </ul>
            </div>
          </li>
          <li>
            <span className="text-xl">🧎</span> <span className="font-bold text-lg">Final Tashahhud After 4th Rak'ah</span>
            <div className="text-mocha mt-1">Recite both Tashahhud and Salat al-Ibrahimiyya:</div>
            <div className="font-bold text-mocha mt-2">🗣️ Tashahhud:</div>
            <div className="font-arabic text-brass text-xl mt-2">التحيات لله...<br />أشهد أن لا إله إلا الله...<br />وأشهد أن محمدًا عبده ورسوله</div>
            <div className="font-bold text-mocha mt-2">🌸 Salat al-Ibrahimiyya:</div>
            <div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div>
          </li>
          <li>
            <span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (Ending the Prayer)</span>
            <div className="text-mocha mt-1">* Turn head to the <b>right</b>:<br />
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
        className="fixed z-50 w-12 h-12 rounded-full bg-brass text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-wood focus:bg-wood transition"
        style={{ top: 'calc(50% - 240px)', right: 'calc(50% - 320px)' }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] rounded-t-3xl flex flex-col items-center pt-6 pb-2 border-b-2 border-brass">
        <div className="text-5xl mb-2">🌆</div>
        <div className="text-3xl font-bold text-brass mb-1 text-center">Maghrib Prayer Guide — 3 Rak'ahs</div>
        <div className="text-base text-mocha text-center mb-1">According to the Sunnah of Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li><span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span> <div className="text-mocha mt-1">Silently make the intention in your heart:<br /><span className="italic">"I intend to pray three Rak'ahs of Maghrib for the sake of Allah."</span></div></li>
          <li><span className="text-xl">🕋</span> <span className="font-bold text-lg">Takbir al-Ihram (Opening Takbir):</span> <div className="text-mocha mt-1">Raise both hands to <b>ear level (men)</b> or <b>shoulder level (women)</b> and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />→ This marks the beginning of your prayer.</div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Place Hands on Chest</span> <div className="text-mocha mt-1">Right hand over left hand on your chest.</div></li>
          <li><span className="text-xl">✨</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span> <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ،<br />وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ،<br />وَلَا إِلَهَ غَيْرُكَ</div></li>
          <li><span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span> <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...</div> <div className="text-mocha">Complete the full <b>Surah Al-Fatiha</b>.</div> <div className="text-xs text-wood mt-1">📌 "There is no prayer for the one who does not recite Al-Fatiha." — (Bukhari, Muslim)</div></li>
          <li><span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah</span> <div className="text-mocha mt-1"><b>1st Rak'ah</b>: Surah Al-Falaq<br /><b>2nd Rak'ah</b>: Surah Al-Nas<br /><span className="text-xs">(3rd Rak'ah: Surah Al-Fatiha only)</span></div></li>
          <li><span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين)</span> <div className="text-mocha mt-1">Raise hands and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span></div></li>
          <li><span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing)</span> <div className="text-mocha mt-1">Bow with hands on knees, back straight. Say <b>three times</b> (or more):<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span></div></li>
          <li><span className="text-xl">🧍</span> <span className="font-bold text-lg">Rising from Ruku' (الرفع من الركوع)</span> <div className="text-mocha mt-1">Say:<br /><span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span><br />Then say:<br /><span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ،<br />حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span></div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration)</span> <div className="text-mocha mt-1">Prostrate fully and say three times:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🪑</span> <span className="font-bold text-lg">Sitting Between Two Sujoods</span> <div className="text-mocha mt-1">Sit calmly and say:<br /><span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span></div></li>
          <li><span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span> <div className="text-mocha mt-1">Repeat:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span> <div className="text-mocha mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the cycle:<br /><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha</li><li>Short Surah</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">After 2nd Rak'ah – First Tashahhud (التشهد الأول)</span> <div className="text-mocha mt-1">Sit and recite:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div><div className="text-mocha mt-2">➤ Then stand up for the 3rd Rak'ah.</div></li>
          <li><span className="text-xl">🔄</span> <span className="font-bold text-lg">3rd Rak'ah</span> <div className="text-mocha mt-1"><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha only</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">Final Tashahhud After 3rd Rak'ah</span> <div className="text-mocha mt-1">Recite both Tashahhud and Salat al-Ibrahimiyya:</div><div className="font-bold text-mocha mt-2">🗣️ Tashahhud:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله...<br />أشهد أن لا إله إلا الله...<br />وأشهد أن محمدًا عبده ورسوله</div><div className="font-bold text-mocha mt-2">🌸 Salat al-Ibrahimiyya:</div><div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div></li>
          <li><span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (Ending the Prayer)</span> <div className="text-mocha mt-1">* Turn head to the <b>right</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span><br />* Then to the <b>left</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></div></li>
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
        className="fixed z-50 w-12 h-12 rounded-full bg-brass text-white text-3xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-wood focus:bg-wood transition"
        style={{ top: 'calc(50% - 240px)', right: 'calc(50% - 320px)' }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="sticky top-0 z-10 bg-gradient-to-br from-[#fffbe6] via-[#fff] to-[#f7ecd7] rounded-t-3xl flex flex-col items-center pt-6 pb-2 border-b-2 border-brass">
        <div className="text-5xl mb-2">🌙</div>
        <div className="text-3xl font-bold text-brass mb-1 text-center">Isha Prayer Guide — 4 Rak'ahs</div>
        <div className="text-base text-mocha text-center mb-1">According to the Sunnah of Prophet Muhammad ﷺ</div>
      </div>
      <div className="px-8 pb-8 pt-4 text-lg leading-relaxed">
        <ol className="list-decimal pl-6 space-y-7">
          <li><span className="text-xl">🕌</span> <span className="font-bold text-lg">Intention (النية):</span> <div className="text-mocha mt-1">Silently make the intention in your heart:<br /><span className="italic">"I intend to pray four Rak'ahs of Isha for the sake of Allah."</span></div></li>
          <li><span className="text-xl">🕋</span> <span className="font-bold text-lg">Takbir al-Ihram (Opening Takbir):</span> <div className="text-mocha mt-1">Raise both hands to <b>ear level (men)</b> or <b>shoulder level (women)</b> and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span> <span className="italic">(Allahu Akbar)</span><br />→ This marks the beginning of your prayer.</div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Place Hands on Chest</span> <div className="text-mocha mt-1">Right hand over left hand on your chest.</div></li>
          <li><span className="text-xl">✨</span> <span className="font-bold text-lg">Dua al-Istiftah (Optional Opening Supplication)</span> <div className="font-arabic text-brass text-xl mt-1">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ،<br />وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ،<br />وَلَا إِلَهَ غَيْرُكَ</div></li>
          <li><span className="text-xl">📖</span> <span className="font-bold text-lg">Recite Surah Al-Fatiha (الفاتحة)</span> <div className="font-arabic text-brass text-xl mt-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...</div> <div className="text-mocha">Complete the full <b>Surah Al-Fatiha</b>.</div> <div className="text-xs text-wood mt-1">📌 "There is no prayer for the one who does not recite Al-Fatiha." — (Bukhari, Muslim)</div></li>
          <li><span className="text-xl">🌟</span> <span className="font-bold text-lg">Recite a Short Surah</span> <div className="text-mocha mt-1"><b>1st Rak'ah</b>: Surah Al-Ikhlas<br /><b>2nd Rak'ah</b>: Surah Al-Falaq<br /><span className="text-xs">(3rd & 4th Rak'ahs: Surah Al-Fatiha only)</span></div></li>
          <li><span className="text-xl">✋</span> <span className="font-bold text-lg">Raise Hands Before Ruku' (رفع اليدين)</span> <div className="text-mocha mt-1">Raise hands and say:<br /><span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span></div></li>
          <li><span className="text-xl">🙇</span> <span className="font-bold text-lg">Ruku' (Bowing)</span> <div className="text-mocha mt-1">Bow with hands on knees, back straight. Say <b>three times</b> (or more):<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الْعَظِيمِ</span></div></li>
          <li><span className="text-xl">🧍</span> <span className="font-bold text-lg">Rising from Ruku' (الرفع من الركوع)</span> <div className="text-mocha mt-1">Say:<br /><span className="font-arabic text-brass text-xl">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</span><br />Then say:<br /><span className="font-arabic text-brass text-xl">رَبَّنَا لَكَ الْحَمْدُ،<br />حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ</span></div></li>
          <li><span className="text-xl">🤲</span> <span className="font-bold text-lg">Sujood (Prostration)</span> <div className="text-mocha mt-1">Prostrate fully and say three times:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🪑</span> <span className="font-bold text-lg">Sitting Between Two Sujoods</span> <div className="text-mocha mt-1">Sit calmly and say:<br /><span className="font-arabic text-brass text-xl">رَبِّ اغْفِرْ لِي</span> or <span className="font-arabic text-brass text-xl">اللَّهُمَّ اغْفِرْ لِي</span></div></li>
          <li><span className="text-xl">🙇‍♂️</span> <span className="font-bold text-lg">Second Sujood</span> <div className="text-mocha mt-1">Repeat:<br /><span className="font-arabic text-brass text-xl">سُبْحَانَ رَبِّيَ الأَعْلَى</span></div></li>
          <li><span className="text-xl">🔁</span> <span className="font-bold text-lg">Stand for Second Rak'ah</span> <div className="text-mocha mt-1">Say <span className="font-arabic text-brass text-xl">اللَّهُ أَكْبَر</span>, then repeat the cycle:<br /><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha</li><li>Short Surah</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">After 2nd Rak'ah – First Tashahhud (التشهد الأول)</span> <div className="text-mocha mt-1">Sit and recite:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله والصلوات والطيبات،<br />السلام عليك أيها النبي ورحمة الله وبركاته،<br />السلام علينا وعلى عباد الله الصالحين،<br />أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله</div><div className="text-mocha mt-2">➤ Then stand up for the 3rd Rak'ah.</div></li>
          <li><span className="text-xl">🔄</span> <span className="font-bold text-lg">3rd Rak'ah</span> <div className="text-mocha mt-1"><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha only</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🔄</span> <span className="font-bold text-lg">4th Rak'ah</span> <div className="text-mocha mt-1"><ul className="list-disc pl-6 text-base mt-2"><li>Surah Al-Fatiha only</li><li>Ruku' → Standing → Sujood ×2</li></ul></div></li>
          <li><span className="text-xl">🧎</span> <span className="font-bold text-lg">Final Tashahhud After 4th Rak'ah</span> <div className="text-mocha mt-1">Recite both Tashahhud and Salat al-Ibrahimiyya:</div><div className="font-bold text-mocha mt-2">🗣️ Tashahhud:</div><div className="font-arabic text-brass text-xl mt-2">التحيات لله...<br />أشهد أن لا إله إلا الله...<br />وأشهد أن محمدًا عبده ورسوله</div><div className="font-bold text-mocha mt-2">🌸 Salat al-Ibrahimiyya:</div><div className="font-arabic text-brass text-xl mt-2">اللهم صل على محمد وعلى آل محمد،<br />كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد،<br />وبارك على محمد وعلى آل محمد،<br />كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد</div></li>
          <li><span className="text-xl">🕊️</span> <span className="font-bold text-lg">Tasleem (Ending the Prayer)</span> <div className="text-mocha mt-1">* Turn head to the <b>right</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span><br />* Then to the <b>left</b>:<br /><span className="font-arabic text-brass text-xl">السلام عليكم ورحمة الله</span></div></li>
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
      <div
        className={`card flex flex-col items-center justify-center gap-2 p-6 rounded-2xl shadow-lg border hover:scale-105 hover:shadow-2xl transition cursor-pointer group ${color}`}
        style={{ background: color === 'farz' ? 'linear-gradient(135deg, #F5F5F5 0%, #fffbe6 60%, #f7ecd7 100%)' : 'linear-gradient(135deg, #f7ecd7 0%, #fffbe6 60%, #F5F5F5 100%)', borderColor: color === 'farz' ? '#DDC00F' : '#956D37' }}
      >
        <div className="text-4xl mb-1">{namaz.icon}</div>
        <div className="text-2xl font-bold text-brass mb-1">{namaz.name}</div>
        {namaz.key !== 'fajr' && namaz.key !== 'dhuhr' && namaz.key !== 'asr' && namaz.key !== 'maghrib' && namaz.key !== 'isha' && <div className="text-sm text-mocha mb-1">{namaz.description}</div>}
        {namaz.key !== 'fajr' && namaz.key !== 'dhuhr' && namaz.key !== 'asr' && namaz.key !== 'maghrib' && namaz.key !== 'isha' && <div className="text-xs text-wood mb-1">{namaz.timing}</div>}
        <button className="btn btn-xs mt-1" onClick={e => { e.stopPropagation(); setModal({ namaz }); }}>Details</button>
        <div className="flex items-center gap-2 mt-2 cursor-pointer">
          <ToggleLeft
            isActive={completed[namaz.key]}
            onChange={(active) => { toggleCompleted(namaz.key); }}
            stroke="#956D37"
          />
          <span className="text-xs text-brass">Mark as Completed</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-3xl mx-auto py-8 px-2 md:px-4">
        <h1 className="text-3xl font-heading text-brass font-bold mb-8 text-center drop-shadow">All Namaz</h1>
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-wood mb-4 text-center">Farz Namaz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {FARZ_NAMAZ.map(namaz => (
              <Card key={namaz.key} namaz={namaz} color="farz" />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-wood mb-4 text-center">Nawafil (Nafl) Namaz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {NAWAFIL_NAMAZ.map(namaz => (
              <Card key={namaz.key} namaz={namaz} color="nafl" />
            ))}
          </div>
        </div>
        {modal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setModal(null)}>
            <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
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
              ) : (
                <>
                  <div className="text-4xl mb-2 text-center">{modal.namaz.icon}</div>
                  <div className="text-2xl font-bold text-brass mb-2 text-center">{modal.namaz.name}</div>
                  <div className="text-mocha mb-2 text-center">{modal.namaz.description}</div>
                  <div className="text-wood mb-2 text-center text-sm">Timing: {modal.namaz.timing}</div>
                  <div className="text-brass text-center text-sm italic">Virtue: {modal.namaz.virtue}</div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 