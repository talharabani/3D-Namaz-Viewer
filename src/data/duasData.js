// Self-contained duas data to avoid import issues
export const duaCategories = [
  { key: 'daily', title: 'Daily Duas', description: 'Supplications for daily life and routines.' },
  { key: 'prayer', title: 'Prayer (Salah) Duas', description: 'Duas to recite before, during, and after Salah.' },
  { key: 'protection', title: 'Protection Duas', description: 'Duas for safety and protection from harm.' },
  { key: 'hardship', title: 'Hardship & Forgiveness', description: 'Duas for difficult times and seeking forgiveness.' },
  { key: 'relationship', title: 'Relationship & Family Duas', description: 'Duas for family, marriage, and relationships.' },
  { key: 'general', title: 'General & Miscellaneous', description: 'Other beneficial supplications.' },
  { key: 'hajj', title: 'Hajj & Umrah Duas', description: 'Duas for pilgrimage.' },
  { key: 'ramadan', title: 'Ramadan Special Duas', description: 'Duas for the month of Ramadan.' },
  { key: 'weather', title: 'Weather & Nature', description: 'Duas for rain, storms, and natural events.' },
  { key: 'sickness', title: 'Sickness & Death', description: 'Duas for illness and for the deceased.' },
  { key: 'social', title: 'Social & Community', description: 'Duas for society and community well-being.' },
  { key: 'rizq', title: 'Rizq (Sustenance) & Work', description: 'Duas for provision and work.' },
  { key: 'repentance', title: 'Repentance & Self-Improvement', description: 'Duas for seeking forgiveness and self-betterment.' },
  { key: 'enemy', title: 'Enemy & Danger', description: 'Duas for protection from enemies and danger.' },
  { key: 'business', title: 'Duas for Business', description: 'Supplications for business, rizq, and success.' },
  { key: 'success', title: 'Duas for Success & Guidance', description: 'Supplications for success, guidance, and ease in all affairs.' },
  { key: 'love', title: 'Duas for Earning the Love of Allah', description: 'Supplications for attaining the love and nearness of Allah.' },
  { key: 'prophetlove', title: 'Duas for Loving the Prophet Muhammad ﷺ', description: 'Supplications for expressing love and connection to the Prophet Muhammad ﷺ.' },
  { key: 'imaan', title: 'Duas to Strengthen Imaan (Faith)', description: 'Supplications for firm faith, guidance, and love of Imaan.' },
  { key: 'dailybooster', title: 'Daily Imaan Booster Routine', description: 'A daily routine of Duas, Adhkar, and habits to boost your Imaan.' },
  { key: 'consistency', title: 'Powerful Duas for Consistency in Worship', description: 'Supplications for steadfastness, sincerity, and consistency in worship.' },
  { key: 'beforesalah', title: 'Duas Before or During Salah', description: 'Supplications to recite before or during Salah.' },
  { key: 'aftersalah', title: 'Duas After Salah', description: 'Supplications and dhikr to recite after Salah.' },
];

export const duasByCategory = {
  daily: [
    {
      arabic: "الحمدُ للهِ الذي أحيانا بعد ما أماتنا وإليه النشورُ",
      transliteration: "Alhamdu lillaahil-ladhee ahyaanaa ba'da maa amaatanaa wa ilayhin-nushoor",
      translation: "All praise is for Allah Who gave us life after causing us to die, and to Him is the resurrection."
    },
    {
      arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ",
      transliteration: "Bismika rabbī waḍa'tu janbī wa bika arfa'uhu",
      translation: "In Your name, O my Lord, I lay down and in Your name I rise."
    },
    {
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: "In the name of Allah."
    },
    {
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
      transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana Muslimeen",
      translation: "All praise is for Allah who fed us and gave us drink and made us Muslims."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
      transliteration: "Allahumma inni a'oodhu bika minal-khubthi wal-khaba'ith",
      translation: "O Allah, I seek refuge with You from male and female devils."
    },
    {
      arabic: "غُفْرَانَكَ",
      transliteration: "Ghufranaka",
      translation: "I seek Your forgiveness."
    },
    {
      arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
      transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
      translation: "In the name of Allah, I place my trust in Allah, and there is no power nor might except with Allah."
    },
    {
      arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
      transliteration: "Bismillah walajna, wa bismillah kharajna, wa 'ala Rabbina tawakkalna",
      translation: "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we place our trust."
    },
    {
      arabic: "اللّهُـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ",
      transliteration: "Allahumma anta rabbee la ilaha illa anta",
      translation: "O Allah, You are my Lord, there is no deity except You."
    },
    {
      arabic: "بِسْمِ اللهِ الَّذِي لا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un",
      translation: "In the name of Allah, with whose name nothing can harm on earth or in heaven."
    }
  ],
  prayer: [
    {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruka",
      translation: "Glory be to You, O Allah, and praise be to You, blessed is Your name, and exalted is Your majesty, and there is no deity except You."
    }
  ],
  protection: [
    {
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      transliteration: "A'oodhu billahi minash-shaytanir-rajeem",
      translation: "I seek refuge with Allah from Satan, the accursed."
    }
  ]
};

export default duaCategories;
