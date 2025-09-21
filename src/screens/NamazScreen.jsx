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

// Prayer Guide Components - Using generic PrayerGuide for all Farz prayers

// All duplicate guide functions removed - using generic PrayerGuide component

// Generic Prayer Guide Component
const PrayerGuide = ({ namaz, onClose }) => {
  const getPrayerSteps = (prayerKey) => {
    const steps = {
      fajr: [
        { title: "🕌 Intention (النية)", content: "Silently make the intention in your heart: 'I intend to pray two Rak'ahs of Fajr prayer for the sake of Allah.'" },
        { title: "🕋 Takbir al-Ihram", content: "Raise both hands to ear level and say: اللَّهُ أَكْبَر (Allahu Akbar)" },
        { title: "🤲 Place Hands on Chest", content: "Right hand over left hand on your chest." },
        { title: "✨ Dua al-Istiftah", content: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ" },
        { title: "📖 Recite Surah Al-Fatiha", content: "Complete the full Surah Al-Fatiha. 'There is no prayer for the one who does not recite Al-Fatiha.' — (Bukhari, Muslim)" },
        { title: "🌟 Recite a Short Surah", content: "1st Rak'ah: Surah Al-Falaq or Al-Nas\n2nd Rak'ah: Surah Al-Ikhlas" },
        { title: "🙇 Ruku' (Bowing)", content: "Bow with hands on knees, back straight. Say three times: سُبْحَانَ رَبِّيَ الْعَظِيمِ (Subhana Rabbi al-Azeem)" },
        { title: "🧍 Rising from Ruku'", content: "Say: سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ (Sami' Allahu liman hamidah)\nThen: رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ" },
        { title: "🤲 Sujood (Prostration)", content: "Prostrate fully and say three times: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🪑 Sitting Between Sujoods", content: "Sit calmly and say: رَبِّ اغْفِرْ لِي (Rabbi ighfir li)" },
        { title: "🙇‍♂️ Second Sujood", content: "Repeat: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🔁 Second Rak'ah", content: "Say اللَّهُ أَكْبَر, then repeat: Surah Al-Fatiha + Short Surah → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 Final Tashahhud", content: "التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله" },
        { title: "🕊️ Tasleem (Ending)", content: "Turn head right: السلام عليكم ورحمة الله\nThen left: السلام عليكم ورحمة الله" }
      ],
      dhuhr: [
        { title: "🕌 Intention (النية)", content: "Silently make the intention in your heart: 'I intend to pray four Rak'ahs of Dhuhr prayer for the sake of Allah.'" },
        { title: "🕋 Takbir al-Ihram", content: "Raise both hands to ear level and say: اللَّهُ أَكْبَر (Allahu Akbar)" },
        { title: "🤲 Place Hands on Chest", content: "Right hand over left hand on your chest." },
        { title: "✨ Dua al-Istiftah", content: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ" },
        { title: "📖 Recite Surah Al-Fatiha", content: "Complete the full Surah Al-Fatiha. 'There is no prayer for the one who does not recite Al-Fatiha.' — (Bukhari, Muslim)" },
        { title: "🌟 Recite a Short Surah", content: "1st Rak'ah: Surah Al-Kawthar\n2nd Rak'ah: Surah Al-Ikhlas\n(3rd & 4th Rak'ahs: Surah Al-Fatiha only)" },
        { title: "🙇 Ruku' (Bowing)", content: "Bow with hands on knees, back straight. Say three times: سُبْحَانَ رَبِّيَ الْعَظِيمِ (Subhana Rabbi al-Azeem)" },
        { title: "🧍 Rising from Ruku'", content: "Say: سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ (Sami' Allahu liman hamidah)\nThen: رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ" },
        { title: "🤲 Sujood (Prostration)", content: "Prostrate fully and say three times: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🪑 Sitting Between Sujoods", content: "Sit calmly and say: رَبِّ اغْفِرْ لِي (Rabbi ighfir li)" },
        { title: "🙇‍♂️ Second Sujood", content: "Repeat: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🔁 Second Rak'ah", content: "Say اللَّهُ أَكْبَر, then repeat: Surah Al-Fatiha + Short Surah → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 First Tashahhud", content: "After 2nd Rak'ah: التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله\n➤ Then stand up for 3rd Rak'ah" },
        { title: "🔄 3rd Rak'ah", content: "Surah Al-Fatiha only → Ruku' → Standing → Sujood ×2" },
        { title: "🔄 4th Rak'ah", content: "Surah Al-Fatiha only → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 Final Tashahhud", content: "التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله" },
        { title: "🌸 Salat al-Ibrahimiyya", content: "اللهم صل على محمد وعلى آل محمد، كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد، وبارك على محمد وعلى آل محمد، كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد" },
        { title: "🕊️ Tasleem (Ending)", content: "Turn head right: السلام عليكم ورحمة الله\nThen left: السلام عليكم ورحمة الله" }
      ],
      asr: [
        { title: "🕌 Intention (النية)", content: "Silently make the intention in your heart: 'I intend to pray four Rak'ahs of Asr prayer for the sake of Allah.'" },
        { title: "🕋 Takbir al-Ihram", content: "Raise both hands to ear level and say: اللَّهُ أَكْبَر (Allahu Akbar)" },
        { title: "🤲 Place Hands on Chest", content: "Right hand over left hand on your chest." },
        { title: "✨ Dua al-Istiftah", content: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ" },
        { title: "📖 Recite Surah Al-Fatiha", content: "Complete the full Surah Al-Fatiha. 'There is no prayer for the one who does not recite Al-Fatiha.' — (Bukhari, Muslim)" },
        { title: "🌟 Recite a Short Surah", content: "1st Rak'ah: Surah Al-ʿAsr\n2nd Rak'ah: Surah Al-Kawthar\n(3rd & 4th Rak'ahs: Surah Al-Fatiha only)" },
        { title: "🙇 Ruku' (Bowing)", content: "Bow with hands on knees, back straight. Say three times: سُبْحَانَ رَبِّيَ الْعَظِيمِ (Subhana Rabbi al-Azeem)" },
        { title: "🧍 Rising from Ruku'", content: "Say: سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ (Sami' Allahu liman hamidah)\nThen: رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ" },
        { title: "🤲 Sujood (Prostration)", content: "Prostrate fully and say three times: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🪑 Sitting Between Sujoods", content: "Sit calmly and say: رَبِّ اغْفِرْ لِي (Rabbi ighfir li)" },
        { title: "🙇‍♂️ Second Sujood", content: "Repeat: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🔁 Second Rak'ah", content: "Say اللَّهُ أَكْبَر, then repeat: Surah Al-Fatiha + Short Surah → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 First Tashahhud", content: "After 2nd Rak'ah: التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله\n➤ Then stand up for 3rd Rak'ah" },
        { title: "🔄 3rd Rak'ah", content: "Surah Al-Fatiha only → Ruku' → Standing → Sujood ×2" },
        { title: "🔄 4th Rak'ah", content: "Surah Al-Fatiha only → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 Final Tashahhud", content: "التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله" },
        { title: "🌸 Salat al-Ibrahimiyya", content: "اللهم صل على محمد وعلى آل محمد، كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد، وبارك على محمد وعلى آل محمد، كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد" },
        { title: "🕊️ Tasleem (Ending)", content: "Turn head right: السلام عليكم ورحمة الله\nThen left: السلام عليكم ورحمة الله" }
      ],
      maghrib: [
        { title: "🕌 Intention (النية)", content: "Silently make the intention in your heart: 'I intend to pray three Rak'ahs of Maghrib prayer for the sake of Allah.'" },
        { title: "🕋 Takbir al-Ihram", content: "Raise both hands to ear level and say: اللَّهُ أَكْبَر (Allahu Akbar)" },
        { title: "🤲 Place Hands on Chest", content: "Right hand over left hand on your chest." },
        { title: "✨ Dua al-Istiftah", content: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ" },
        { title: "📖 Recite Surah Al-Fatiha", content: "Complete the full Surah Al-Fatiha. 'There is no prayer for the one who does not recite Al-Fatiha.' — (Bukhari, Muslim)" },
        { title: "🌟 Recite a Short Surah", content: "1st Rak'ah: Surah Al-Kafirun\n2nd Rak'ah: Surah Al-Ikhlas\n3rd Rak'ah: Surah Al-Fatiha only" },
        { title: "🙇 Ruku' (Bowing)", content: "Bow with hands on knees, back straight. Say three times: سُبْحَانَ رَبِّيَ الْعَظِيمِ (Subhana Rabbi al-Azeem)" },
        { title: "🧍 Rising from Ruku'", content: "Say: سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ (Sami' Allahu liman hamidah)\nThen: رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ" },
        { title: "🤲 Sujood (Prostration)", content: "Prostrate fully and say three times: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🪑 Sitting Between Sujoods", content: "Sit calmly and say: رَبِّ اغْفِرْ لِي (Rabbi ighfir li)" },
        { title: "🙇‍♂️ Second Sujood", content: "Repeat: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🔁 Second Rak'ah", content: "Say اللَّهُ أَكْبَر, then repeat: Surah Al-Fatiha + Short Surah → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 First Tashahhud", content: "After 2nd Rak'ah: التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله\n➤ Then stand up for 3rd Rak'ah" },
        { title: "🔄 3rd Rak'ah", content: "Surah Al-Fatiha only → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 Final Tashahhud", content: "التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله" },
        { title: "🌸 Salat al-Ibrahimiyya", content: "اللهم صل على محمد وعلى آل محمد، كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد، وبارك على محمد وعلى آل محمد، كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد" },
        { title: "🕊️ Tasleem (Ending)", content: "Turn head right: السلام عليكم ورحمة الله\nThen left: السلام عليكم ورحمة الله" }
      ],
      isha: [
        { title: "🕌 Intention (النية)", content: "Silently make the intention in your heart: 'I intend to pray four Rak'ahs of Isha prayer for the sake of Allah.'" },
        { title: "🕋 Takbir al-Ihram", content: "Raise both hands to ear level and say: اللَّهُ أَكْبَر (Allahu Akbar)" },
        { title: "🤲 Place Hands on Chest", content: "Right hand over left hand on your chest." },
        { title: "✨ Dua al-Istiftah", content: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ" },
        { title: "📖 Recite Surah Al-Fatiha", content: "Complete the full Surah Al-Fatiha. 'There is no prayer for the one who does not recite Al-Fatiha.' — (Bukhari, Muslim)" },
        { title: "🌟 Recite a Short Surah", content: "1st Rak'ah: Surah Al-Nasr\n2nd Rak'ah: Surah Al-Ikhlas\n(3rd & 4th Rak'ahs: Surah Al-Fatiha only)" },
        { title: "🙇 Ruku' (Bowing)", content: "Bow with hands on knees, back straight. Say three times: سُبْحَانَ رَبِّيَ الْعَظِيمِ (Subhana Rabbi al-Azeem)" },
        { title: "🧍 Rising from Ruku'", content: "Say: سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ (Sami' Allahu liman hamidah)\nThen: رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ" },
        { title: "🤲 Sujood (Prostration)", content: "Prostrate fully and say three times: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🪑 Sitting Between Sujoods", content: "Sit calmly and say: رَبِّ اغْفِرْ لِي (Rabbi ighfir li)" },
        { title: "🙇‍♂️ Second Sujood", content: "Repeat: سُبْحَانَ رَبِّيَ الأَعْلَى (Subhana Rabbi al-A'la)" },
        { title: "🔁 Second Rak'ah", content: "Say اللَّهُ أَكْبَر, then repeat: Surah Al-Fatiha + Short Surah → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 First Tashahhud", content: "After 2nd Rak'ah: التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله\n➤ Then stand up for 3rd Rak'ah" },
        { title: "🔄 3rd Rak'ah", content: "Surah Al-Fatiha only → Ruku' → Standing → Sujood ×2" },
        { title: "🔄 4th Rak'ah", content: "Surah Al-Fatiha only → Ruku' → Standing → Sujood ×2" },
        { title: "🧎 Final Tashahhud", content: "التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله، وأشهد أن محمدًا عبده ورسوله" },
        { title: "🌸 Salat al-Ibrahimiyya", content: "اللهم صل على محمد وعلى آل محمد، كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد، وبارك على محمد وعلى آل محمد، كما باركت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد" },
        { title: "🕊️ Tasleem (Ending)", content: "Turn head right: السلام عليكم ورحمة الله\nThen left: السلام عليكم ورحمة الله" }
      ]
    };
    
    return steps[prayerKey] || [];
  };

  const steps = getPrayerSteps(namaz.key);
  const getImportantNotes = (prayerKey) => {
    const notes = {
      fajr: [
        "Fajr is prayed silently — no loud recitation",
        "Both Rak'ahs are obligatory (fard)",
        "Perform each action with tranquility and humility (khushu')",
        "It's Sunnah to pray Fajr on time, before sunrise",
        "The two Rak'ahs before Fajr are highly recommended"
      ],
      dhuhr: [
        "Dhuhr is prayed silently — no loud recitation",
        "All four Rak'ahs are obligatory (fard)",
        "Perform each action with tranquility and humility (khushu')",
        "It's Sunnah to pray Dhuhr on time, after midday",
        "The gates of Paradise are opened during Dhuhr prayer"
      ],
      asr: [
        "Asr is prayed silently — no loud recitation",
        "All four Rak'ahs are obligatory (fard)",
        "Perform each action with tranquility and humility (khushu')",
        "It's Sunnah to pray Asr on time, before the sun begins to yellow",
        "Whoever prays Asr will enter Paradise"
      ],
      maghrib: [
        "Maghrib is prayed silently — no loud recitation",
        "All three Rak'ahs are obligatory (fard)",
        "Perform each action with tranquility and humility (khushu')",
        "It's Sunnah to pray Maghrib on time, just after sunset",
        "The prayer at the time when the fast is broken"
      ],
      isha: [
        "Isha is prayed silently — no loud recitation",
        "All four Rak'ahs are obligatory (fard)",
        "Perform each action with tranquility and humility (khushu')",
        "It's Sunnah to pray Isha on time, at night",
        "The prayer of the night is a light for the believer"
      ]
    };
    
    return notes[prayerKey] || [];
  };

  const importantNotes = getImportantNotes(namaz.key);

  return (
    <motion.div 
      className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={transitions.spring}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-20 left-20 w-30 h-30 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      {/* Decorative Elements */}
      <motion.div className="absolute -top-4 -left-4 text-4xl text-emerald-400/30 animate-wave" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>✦</motion.div>
      <motion.div className="absolute -top-4 -right-4 text-4xl text-emerald-400/30 animate-wave" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>✦</motion.div>
      <motion.div className="absolute -bottom-4 -left-4 text-4xl text-emerald-400/30 animate-wave" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>✦</motion.div>
      <motion.div className="absolute -bottom-4 -right-4 text-4xl text-emerald-400/30 animate-wave" animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>✦</motion.div>
      
      {/* Close Button */}
      <motion.button
        className="absolute top-4 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white/20 hover:from-emerald-500 hover:to-green-500 transition-all duration-300"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ✕
      </motion.button>
      
      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-6xl mb-4">{namaz.icon}</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-2">{namaz.name} Prayer Guide</h2>
          <p className="text-emerald-200 text-lg">{namaz.rakats} - {namaz.description}</p>
          <p className="text-emerald-300 text-sm">{namaz.arabic}</p>
        </motion.div>
        
        {/* Prayer Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
            >
              <h3 className="text-xl font-bold text-emerald-300 mb-3 flex items-center gap-2">{step.title}</h3>
              <p className="text-emerald-200 leading-relaxed whitespace-pre-line">{step.content}</p>
            </motion.div>
          ))}
          
          {/* Important Notes */}
          <motion.div 
            className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-emerald-400/30 p-6 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + (steps.length * 0.1) }}
          >
            <h3 className="text-xl font-bold text-emerald-300 mb-3 flex items-center gap-2">📝 Important Notes for {namaz.name} Salah</h3>
            <ul className="text-emerald-200 space-y-2">
              {importantNotes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FARZ_NAMAZ = [
  { 
    key: 'fajr', 
    name: 'Fajr', 
    icon: '🌅', 
    description: 'Dawn prayer', 
    timing: 'Before sunrise', 
    virtue: 'The most beloved prayer to Allah after the obligatory ones.',
    rakats: '2 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "The two Rak\'ahs before Fajr are better than this world and all that is in it."',
    benefits: 'Spiritual awakening, protection from hellfire, morning blessings, energy for the day',
    arabic: 'صلاة الفجر',
    difficulty: 'Easy',
    importance: 'Essential'
  },
  { 
    key: 'dhuhr', 
    name: 'Dhuhr', 
    icon: '🌞', 
    description: 'Midday prayer', 
    timing: 'After midday', 
    virtue: 'A time when the gates of heaven are opened.',
    rakats: '4 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "The gates of Paradise are opened during Dhuhr prayer."',
    benefits: 'Midday spiritual break, workplace blessings, community unity, productivity boost',
    arabic: 'صلاة الظهر',
    difficulty: 'Easy',
    importance: 'Essential'
  },
  { 
    key: 'asr', 
    name: 'Asr', 
    icon: '🌇', 
    description: 'Afternoon prayer', 
    timing: 'Afternoon', 
    virtue: 'Whoever prays Asr will enter Paradise.',
    rakats: '4 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "Whoever prays Asr will enter Paradise."',
    benefits: 'Afternoon reflection, protection from hellfire, day completion, spiritual strength',
    arabic: 'صلاة العصر',
    difficulty: 'Easy',
    importance: 'Essential'
  },
  { 
    key: 'maghrib', 
    name: 'Maghrib', 
    icon: '🌆', 
    description: 'Sunset prayer', 
    timing: 'Just after sunset', 
    virtue: 'The prayer at the time when the fast is broken.',
    rakats: '3 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "The time for Maghrib prayer is when the sun has set."',
    benefits: 'Evening gratitude, breaking fast blessing, family gathering, day closure',
    arabic: 'صلاة المغرب',
    difficulty: 'Easy',
    importance: 'Essential'
  },
  { 
    key: 'isha', 
    name: 'Isha', 
    icon: '🌙', 
    description: 'Night prayer', 
    timing: 'Night', 
    virtue: 'The prayer of the night is a light for the believer.',
    rakats: '4 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "The prayer of the night is a light for the believer."',
    benefits: 'Night reflection, spiritual peace, sleep blessing, day completion, family unity',
    arabic: 'صلاة العشاء',
    difficulty: 'Easy',
    importance: 'Essential'
  },
];

const NAWAFIL_NAMAZ = [
  { 
    key: 'tahajjud', 
    name: 'Tahajjud', 
    icon: '🕋', 
    description: 'Voluntary night prayer', 
    timing: 'Last third of the night', 
    virtue: 'A means to get closer to Allah.',
    rakats: '2-12 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "The best prayer after the obligatory prayers is the night prayer."',
    benefits: 'Closeness to Allah, forgiveness of sins, spiritual elevation',
    arabic: 'صلاة التهجد',
    difficulty: 'Advanced'
  },
  { 
    key: 'witir', 
    name: 'Witr', 
    icon: '🔆', 
    description: 'Odd-numbered prayer after Isha', 
    timing: 'After Isha', 
    virtue: 'The best of prayers after the obligatory ones.',
    rakats: '1, 3, 5, 7, 9, or 11 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "Make Witr your last prayer at night."',
    benefits: 'Protection from evil, completion of night prayers',
    arabic: 'صلاة الوتر',
    difficulty: 'Easy'
  },
  { 
    key: 'duha', 
    name: 'Duha (Chasht)', 
    icon: '☀️', 
    description: 'Forenoon prayer', 
    timing: 'After sunrise until before Dhuhr', 
    virtue: 'Charity for every joint in the body.',
    rakats: '2-12 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "In the morning, charity is due from every joint of the body."',
    benefits: 'Charity for every joint, morning blessings, energy for the day',
    arabic: 'صلاة الضحى',
    difficulty: 'Easy'
  },
  { 
    key: 'istikhara', 
    name: 'Istikhara', 
    icon: '🧭', 
    description: 'Prayer for guidance', 
    timing: 'Any time (except prohibited times)', 
    virtue: "Seek Allah's guidance in decisions.",
    rakats: '2 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "When one of you is concerned about a decision, let him pray two Rak\'ahs."',
    benefits: 'Divine guidance, clarity in decisions, peace of mind',
    arabic: 'صلاة الاستخارة',
    difficulty: 'Easy'
  },
  { 
    key: 'tarawih', 
    name: 'Tarawih', 
    icon: '🕌', 
    description: 'Ramadan night prayer', 
    timing: 'After Isha in Ramadan', 
    virtue: 'A special prayer in Ramadan.',
    rakats: '8 or 20 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "Whoever prays during the nights of Ramadan with faith and seeking reward will have his past sins forgiven."',
    benefits: 'Ramadan blessings, Quran completion, community unity',
    arabic: 'صلاة التراويح',
    difficulty: 'Medium'
  },
  { 
    key: 'jumma', 
    name: 'Jumma (Friday)', 
    icon: '🕌', 
    description: 'Friday congregational prayer', 
    timing: 'Friday Dhuhr time', 
    virtue: 'The best day of the week.',
    rakats: '2 Rak\'ahs (Jama\'ah)',
    hadith: 'The Prophet ﷺ said: "The best day on which the sun has risen is Friday."',
    benefits: 'Weekly spiritual renewal, community gathering, special blessings',
    arabic: 'صلاة الجمعة',
    difficulty: 'Easy'
  },
  { 
    key: 'eid', 
    name: 'Eid Prayers', 
    icon: '🎉', 
    description: 'Eid al-Fitr and Eid al-Adha', 
    timing: 'Eid mornings', 
    virtue: 'Celebration of Islamic festivals.',
    rakats: '2 Rak\'ahs (Jama\'ah)',
    hadith: 'The Prophet ﷺ said: "These are two days which Allah has made festivals for the Muslims."',
    benefits: 'Festival celebration, community joy, gratitude to Allah',
    arabic: 'صلاة العيد',
    difficulty: 'Easy'
  },
  { 
    key: 'istisqa', 
    name: 'Istisqa', 
    icon: '🌧️', 
    description: 'Prayer for rain', 
    timing: 'During drought', 
    virtue: 'Seeking Allah\'s mercy for rain.',
    rakats: '2 Rak\'ahs (Jama\'ah)',
    hadith: 'The Prophet ﷺ said: "Allah is not unjust to His servants."',
    benefits: 'Divine mercy, community supplication, environmental care',
    arabic: 'صلاة الاستسقاء',
    difficulty: 'Medium'
  },
  { 
    key: 'khusuf', 
    name: 'Khusuf (Lunar Eclipse)', 
    icon: '🌙', 
    description: 'Prayer during lunar eclipse', 
    timing: 'During lunar eclipse', 
    virtue: 'Remembrance of Allah\'s signs.',
    rakats: '2 Rak\'ahs (Jama\'ah)',
    hadith: 'The Prophet ﷺ said: "The sun and moon are two signs among the signs of Allah."',
    benefits: 'Awe of Allah\'s creation, community prayer, scientific wonder',
    arabic: 'صلاة الخسوف',
    difficulty: 'Medium'
  },
  { 
    key: 'kusuf', 
    name: 'Kusuf (Solar Eclipse)', 
    icon: '☀️', 
    description: 'Prayer during solar eclipse', 
    timing: 'During solar eclipse', 
    virtue: 'Remembrance of Allah\'s power.',
    rakats: '2 Rak\'ahs (Jama\'ah)',
    hadith: 'The Prophet ﷺ said: "When you see these signs, hasten to prayer."',
    benefits: 'Recognition of Allah\'s power, community unity, natural phenomena',
    arabic: 'صلاة الكسوف',
    difficulty: 'Medium'
  },
  { 
    key: 'tahiyatul-masjid', 
    name: 'Tahiyatul Masjid', 
    icon: '🏛️', 
    description: 'Greeting the mosque', 
    timing: 'Upon entering the mosque', 
    virtue: 'Respect for the house of Allah.',
    rakats: '2 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "When one of you enters the mosque, let him pray two Rak\'ahs before sitting."',
    benefits: 'Respect for sacred space, spiritual preparation, mosque etiquette',
    arabic: 'صلاة تحية المسجد',
    difficulty: 'Easy'
  },
  { 
    key: 'awabeen', 
    name: 'Salat al-Awabeen', 
    icon: '🕯️', 
    description: 'After Maghrib prayer', 
    timing: 'After Maghrib', 
    virtue: 'For the oft-returning to Allah.',
    rakats: '2-6 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "Whoever prays six Rak\'ahs after Maghrib will have the reward of a year\'s worship."',
    benefits: 'Extra reward, evening devotion, consistent worship',
    arabic: 'صلاة الأوابين',
    difficulty: 'Easy'
  },
  { 
    key: 'tasbih', 
    name: 'Salat al-Tasbih', 
    icon: '📿', 
    description: 'Special prayer with much glorification', 
    timing: 'Any time (except prohibited times)', 
    virtue: 'Forgiveness of all sins.',
    rakats: '4 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "If you can pray it once a day, do so. If not, then once a week."',
    benefits: 'Complete forgiveness, spiritual purification, special blessing',
    arabic: 'صلاة التسبيح',
    difficulty: 'Advanced'
  },
  { 
    key: 'janazah', 
    name: 'Salat al-Janazah', 
    icon: '⚰️', 
    description: 'Funeral prayer', 
    timing: 'After death, before burial', 
    virtue: 'A right of the Muslim upon another.',
    rakats: '4 Takbirs (no Ruku or Sujud)',
    hadith: 'The Prophet ﷺ said: "Whoever attends a funeral until the prayer is offered will have one Qirat of reward."',
    benefits: 'Community support, mercy for deceased, Islamic duty',
    arabic: 'صلاة الجنازة',
    difficulty: 'Medium'
  },
  { 
    key: 'hajat', 
    name: 'Salat al-Hajat', 
    icon: '🤲', 
    description: 'Prayer for needs', 
    timing: 'When in need', 
    virtue: 'Seeking Allah\'s help in times of need.',
    rakats: '2-12 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "Whoever has a need from Allah or from any of His creation, let him perform ablution and pray two Rak\'ahs."',
    benefits: 'Divine assistance, fulfillment of needs, spiritual support',
    arabic: 'صلاة الحاجة',
    difficulty: 'Easy'
  },
  { 
    key: 'istighfar', 
    name: 'Salat al-Istighfar', 
    icon: '🙏', 
    description: 'Prayer for forgiveness', 
    timing: 'Any time', 
    virtue: 'Seeking Allah\'s forgiveness.',
    rakats: '2 Rak\'ahs',
    hadith: 'The Prophet ﷺ said: "Whoever prays for forgiveness seventy times, Allah will forgive him even if he has committed adultery."',
    benefits: 'Divine forgiveness, spiritual cleansing, peace of mind',
    arabic: 'صلاة الاستغفار',
    difficulty: 'Easy'
  },
];

function getTodayKey(namazKey) {
  const today = new Date().toISOString().slice(0, 10);
  return `namaz_completed_${namazKey}_${today}`;
}

// All duplicate guide functions removed - using generic PrayerGuide component

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
    const getDifficultyColor = (difficulty) => {
      switch(difficulty) {
        case 'Easy': return 'text-green-400 bg-green-400/20';
        case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
        case 'Advanced': return 'text-red-400 bg-red-400/20';
        default: return 'text-emerald-400 bg-emerald-400/20';
      }
    };

    const getImportanceColor = (importance) => {
      switch(importance) {
        case 'Essential': return 'text-red-400 bg-red-400/20 border-red-400/30';
        case 'Important': return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
        case 'Recommended': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
        default: return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      }
    };

    return (
      <motion.div
        className="group relative p-4 sm:p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl hover:bg-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
        whileHover={{ y: -5, rotateY: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setModal({ namaz })}
      >
        {/* Enhanced Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-emerald-400/40 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-emerald-400/40 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-emerald-400/40 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-emerald-400/40 rounded-br-xl"></div>
        
        <div className="relative text-center">
          {/* Arabic Name */}
          {namaz.arabic && (
            <div className="text-sm font-arabic text-emerald-300 mb-2 group-hover:text-emerald-200 transition-colors duration-300">
              {namaz.arabic}
            </div>
          )}
          
          <motion.div 
            className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 10 }}
          >
            {namaz.icon}
          </motion.div>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-emerald-300 transition-colors duration-300 drop-shadow">
            {namaz.name}
          </h3>
          
          {namaz.description && (
            <p className="text-gray-200 mb-2 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
              {namaz.description}
            </p>
          )}
          
          {/* Rak'ahs */}
          {namaz.rakats && (
            <div className="mb-2">
              <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-400/30">
                {namaz.rakats}
              </span>
            </div>
          )}
          
          {/* Difficulty Level */}
          {namaz.difficulty && (
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(namaz.difficulty)}`}>
                {namaz.difficulty}
              </span>
            </div>
          )}

          {/* Importance Level (for Farz prayers) */}
          {namaz.importance && (
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${getImportanceColor(namaz.importance)}`}>
                {namaz.importance}
              </span>
            </div>
          )}
          
          {namaz.timing && (
            <p className="text-emerald-300 mb-2 text-xs sm:text-sm font-semibold group-hover:text-green-300 transition-colors duration-300">
              ⏰ {namaz.timing}
            </p>
          )}
          
          {/* Benefits Preview */}
          {namaz.benefits && (
            <p className="text-gray-300 mb-3 text-xs leading-relaxed group-hover:text-gray-200 transition-colors duration-300 line-clamp-2">
              {namaz.benefits.split(', ').slice(0, 2).join(', ')}...
            </p>
          )}
          
          <motion.button 
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.smooth}
            onClick={() => setModal(null)}
          >
            <motion.div 
              className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={transitions.spring}
              onClick={e => e.stopPropagation()}
            >
              {/* Enhanced Animated Background Elements - Matching Home Screen */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-20 left-20 w-30 h-30 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
                <div className="absolute top-1/2 right-10 w-20 h-20 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-3000"></div>
                <div className="absolute bottom-1/3 left-10 w-25 h-25 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-4000"></div>
              </div>
              
              {/* Enhanced Decorative Elements - More Home Screen Style */}
              <motion.div 
                className="absolute -top-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -top-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              
              {/* Additional Decorative Elements for Home Screen Feel */}
              <motion.div 
                className="absolute top-1/4 left-4 text-2xl text-emerald-300/20 animate-wave"
                animate={{ rotate: 180 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >◈</motion.div>
              <motion.div 
                className="absolute top-1/3 right-4 text-2xl text-green-300/20 animate-wave"
                animate={{ rotate: -180 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >◈</motion.div>
              <motion.div 
                className="absolute bottom-1/4 left-6 text-xl text-teal-300/20 animate-wave"
                animate={{ rotate: 90 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >◈</motion.div>
              <motion.div 
                className="absolute bottom-1/3 right-6 text-xl text-emerald-300/20 animate-wave"
                animate={{ rotate: -90 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >◈</motion.div>
              
              {/* Back Button */}
              <motion.button
                className="absolute top-4 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl sm:text-2xl flex items-center justify-center shadow-lg border-2 border-white/20 hover:from-emerald-500 hover:to-green-500 focus:from-emerald-500 focus:to-green-500 transition-all duration-300"
                onClick={() => setModal(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Back to Namaz Screen"
              >
                ✕
              </motion.button>
              {/* Only the floating close button is rendered via FajrGuide/DhuhrGuide/AsrGuide/MaghribGuide/IshaGuide/onClose, so remove any other close/cancel button here */}
              {modal.namaz.key === 'fajr' || modal.namaz.key === 'dhuhr' || modal.namaz.key === 'asr' || modal.namaz.key === 'maghrib' || modal.namaz.key === 'isha' ? (
                <PrayerGuide namaz={modal.namaz} onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'jumma' ? (
                <JummaGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'eid' ? (
                <EidGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'istisqa' ? (
                <IstisqaGuide onClose={() => setModal(null)} />
              ) : modal.namaz.key === 'hajat' ? (
                <HajatGuide onClose={() => setModal(null)} />
              ) : (
                <div className="relative z-10 p-6 sm:p-8">
                  {/* Enhanced Header Section - Home Screen Style */}
                  <div className="text-center mb-8 relative">
                    {/* Decorative Background for Header */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 rounded-2xl blur-sm"></div>
                    
                    <motion.div 
                      className="text-6xl mb-4 relative z-10"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {modal.namaz.icon}
                    </motion.div>
                    
                    {modal.namaz.arabic && (
                      <motion.div 
                        className="text-2xl font-arabic text-emerald-300 mb-2 animate-text-shimmer relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {modal.namaz.arabic}
                      </motion.div>
                    )}
                    
                    <motion.div 
                      className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-2 animate-text-shimmer relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {modal.namaz.name}
                    </motion.div>
                    
                    <motion.div 
                      className="text-emerald-200 text-xl mb-4 relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {modal.namaz.description}
                    </motion.div>
                    
                    {/* Additional Decorative Elements for Header */}
                    <motion.div 
                      className="absolute top-2 left-1/2 transform -translate-x-1/2 text-emerald-400/20 text-6xl animate-wave"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >✦</motion.div>
                    <motion.div 
                      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-green-400/20 text-4xl animate-wave"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >✦</motion.div>
                    
                    {/* Badges */}
                    <motion.div 
                      className="flex flex-wrap justify-center gap-2 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {modal.namaz.rakats && (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-semibold rounded-full border border-emerald-400/30">
                          {modal.namaz.rakats}
                        </span>
                      )}
                      {modal.namaz.difficulty && (
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                          modal.namaz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                          modal.namaz.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                          'bg-red-500/20 text-red-300 border-red-400/30'
                        }`}>
                          {modal.namaz.difficulty}
                        </span>
                      )}
                      {modal.namaz.importance && (
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                          modal.namaz.importance === 'Essential' ? 'bg-red-500/20 text-red-300 border-red-400/30' :
                          modal.namaz.importance === 'Important' ? 'bg-orange-500/20 text-orange-300 border-orange-400/30' :
                          modal.namaz.importance === 'Recommended' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
                          'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                        }`}>
                          {modal.namaz.importance}
                        </span>
                      )}
                    </motion.div>
                </div>

                  {/* Enhanced Main Content Grid - Home Screen Style */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Timing */}
                      {modal.namaz.timing && (
                        <motion.div 
                          className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl group hover:bg-white/15 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          {/* Decorative Corner Elements */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-emerald-400/40 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-emerald-400/40 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-emerald-400/40 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-emerald-400/40 rounded-br-lg"></div>
                          
                          <h3 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2 group-hover:text-emerald-200 transition-colors">
                            ⏰ Timing
                          </h3>
                          <p className="text-emerald-200 group-hover:text-white transition-colors">{modal.namaz.timing}</p>
                        </motion.div>
                      )}

                      {/* Virtue */}
                      {modal.namaz.virtue && (
                        <motion.div 
                          className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl group hover:bg-white/15 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          {/* Decorative Corner Elements */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-green-400/40 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-green-400/40 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-green-400/40 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-green-400/40 rounded-br-lg"></div>
                          
                          <h3 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2 group-hover:text-emerald-200 transition-colors">
                            ✨ Virtue
                          </h3>
                          <p className="text-emerald-200 italic group-hover:text-white transition-colors">{modal.namaz.virtue}</p>
            </motion.div>
                      )}

                      {/* Benefits */}
                      {modal.namaz.benefits && (
                        <motion.div 
                          className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl group hover:bg-white/15 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                        >
                          {/* Decorative Corner Elements */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-teal-400/40 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-teal-400/40 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-teal-400/40 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-teal-400/40 rounded-br-lg"></div>
                          
                          <h3 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2 group-hover:text-emerald-200 transition-colors">
                            🌟 Benefits
                          </h3>
                          <ul className="text-emerald-200 space-y-1 group-hover:text-white transition-colors">
                            {modal.namaz.benefits.split(', ').map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1 group-hover:text-green-300 transition-colors">•</span>
                                <span>{benefit.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Hadith */}
                      {modal.namaz.hadith && (
                        <motion.div 
                          className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl group hover:bg-white/15 transition-all duration-300"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          {/* Decorative Corner Elements */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-emerald-400/40 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-emerald-400/40 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-emerald-400/40 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-emerald-400/40 rounded-br-lg"></div>
                          
                          <h3 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2 group-hover:text-emerald-200 transition-colors">
                            📖 Hadith
                          </h3>
                          <p className="text-emerald-200 italic leading-relaxed group-hover:text-white transition-colors">{modal.namaz.hadith}</p>
                        </motion.div>
                      )}

                      {/* Additional Information */}
                      <motion.div 
                        className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl group hover:bg-white/15 transition-all duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-green-400/40 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-green-400/40 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-green-400/40 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-green-400/40 rounded-br-lg"></div>
                        
                        <h3 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2 group-hover:text-emerald-200 transition-colors">
                          ℹ️ Additional Info
                        </h3>
                        <div className="space-y-2 text-emerald-200 group-hover:text-white transition-colors">
                          {modal.namaz.rakats && (
                            <p><strong>Rak'ahs:</strong> {modal.namaz.rakats}</p>
                          )}
                          {modal.namaz.difficulty && (
                            <p><strong>Difficulty:</strong> {modal.namaz.difficulty}</p>
                          )}
                          {modal.namaz.importance && (
                            <p><strong>Importance:</strong> {modal.namaz.importance}</p>
                          )}
                          {modal.namaz.timing && (
                            <p><strong>Best Time:</strong> {modal.namaz.timing}</p>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Enhanced Action Buttons - Home Screen Style */}
                  <motion.div 
                    className="flex flex-wrap gap-3 mt-8 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <motion.button
                      onClick={() => toggleCompleted(modal.namaz.key)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg border-2 ${
                        completed[modal.namaz.key]
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 border-green-400/30 hover:border-green-400/50'
                          : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-400 hover:to-green-500 border-emerald-400/30 hover:border-emerald-400/50'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {completed[modal.namaz.key] ? '✓ Completed' : 'Mark as Completed'}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setModal(null)}
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 transition-all shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back to Namaz
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
