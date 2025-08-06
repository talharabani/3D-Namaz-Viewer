// Comprehensive Hadith Database
// Including Sahih Bukhari, Sahih Muslim, and other major hadith collections

export const HADITH_BOOKS = {
  'sahih-bukhari': {
    name: 'Sahih Bukhari',
    arabic: 'صحيح البخاري',
    author: 'Imam Muhammad ibn Ismail al-Bukhari',
    totalHadiths: 7563,
    description: 'The most authentic collection of hadith, compiled by Imam Bukhari (810-870 CE)',
    color: '#8B4513'
  },
  'sahih-muslim': {
    name: 'Sahih Muslim',
    arabic: 'صحيح مسلم',
    author: 'Imam Muslim ibn al-Hajjaj',
    totalHadiths: 7563,
    description: 'Second most authentic hadith collection, compiled by Imam Muslim (817-875 CE)',
    color: '#2E8B57'
  },
  'sunan-abu-dawud': {
    name: 'Sunan Abu Dawud',
    arabic: 'سنن أبي داود',
    author: 'Imam Abu Dawud',
    totalHadiths: 5274,
    description: 'Collection focusing on legal hadith, compiled by Imam Abu Dawud (817-889 CE)',
    color: '#4682B4'
  },
  'sunan-tirmidhi': {
    name: 'Sunan Tirmidhi',
    arabic: 'سنن الترمذي',
    author: 'Imam Abu Isa Muhammad at-Tirmidhi',
    totalHadiths: 3956,
    description: 'Collection with detailed commentary, compiled by Imam Tirmidhi (824-892 CE)',
    color: '#D2691E'
  },
  'sunan-nasai': {
    name: 'Sunan An-Nasai',
    arabic: 'سنن النسائي',
    author: 'Imam Ahmad ibn Shuayb an-Nasai',
    totalHadiths: 5662,
    description: 'Collection known for its authenticity, compiled by Imam Nasai (829-915 CE)',
    color: '#8A2BE2'
  },
  'sunan-ibn-majah': {
    name: 'Sunan Ibn Majah',
    arabic: 'سنن ابن ماجه',
    author: 'Imam Muhammad ibn Yazid ibn Majah',
    totalHadiths: 4341,
    description: 'One of the six major hadith collections, compiled by Imam Ibn Majah (824-887 CE)',
    color: '#DC143C'
  }
};

// Sample hadiths from Sahih Bukhari
export const SAHIH_BUKHARI_HADITHS = [
  {
    id: 'bukhari-1',
    book: 'Sahih Bukhari',
    bookId: 'sahih-bukhari',
    hadithNumber: '1',
    title: 'Actions Are by Intentions',
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    englishText: 'The Prophet Muhammad ﷺ said: "Actions are by intentions, and every person will have what they intended. So whoever emigrated for Allah and His Messenger, then his emigration was for Allah and His Messenger. And whoever emigrated for worldly gain or to marry a woman, then his emigration was for that which he emigrated."',
    narrator: 'Umar ibn Al-Khattab',
    category: 'Intentions',
    grade: 'Sahih',
    chapter: 'Book of Revelation'
  },
  {
    id: 'bukhari-2',
    book: 'Sahih Bukhari',
    bookId: 'sahih-bukhari',
    hadithNumber: '8',
    title: 'The Five Pillars of Islam',
    arabicText: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ',
    englishText: 'The Prophet Muhammad ﷺ said: "Islam is built upon five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing prayer, paying zakat, fasting Ramadan, and performing Hajj."',
    narrator: 'Abdullah ibn Umar',
    category: 'Pillars of Islam',
    grade: 'Sahih',
    chapter: 'Book of Faith'
  },
  {
    id: 'bukhari-3',
    book: 'Sahih Bukhari',
    bookId: 'sahih-bukhari',
    hadithNumber: '15',
    title: 'The Most Beloved Places to Allah',
    arabicText: 'أَحَبُّ الْبِلاَدِ إِلَى اللَّهِ مَسَاجِدُهَا',
    englishText: 'The Prophet Muhammad ﷺ said: "The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets."',
    narrator: 'Abu Huraira',
    category: 'Mosque',
    grade: 'Sahih',
    chapter: 'Book of Prayer'
  },
  {
    id: 'bukhari-4',
    book: 'Sahih Bukhari',
    bookId: 'sahih-bukhari',
    hadithNumber: '25',
    title: 'Kindness to Parents',
    arabicText: 'الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ',
    englishText: 'The Prophet Muhammad ﷺ said: "Paradise lies at the feet of your mother."',
    narrator: 'Anas ibn Malik',
    category: 'Family',
    grade: 'Sahih',
    chapter: 'Book of Good Manners'
  },
  {
    id: 'bukhari-5',
    book: 'Sahih Bukhari',
    bookId: 'sahih-bukhari',
    hadithNumber: '50',
    title: 'Seeking Knowledge',
    arabicText: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    englishText: 'The Prophet Muhammad ﷺ said: "Seeking knowledge is obligatory upon every Muslim."',
    narrator: 'Anas ibn Malik',
    category: 'Knowledge',
    grade: 'Sahih',
    chapter: 'Book of Knowledge'
  }
];

// Sample hadiths from Sahih Muslim
export const SAHIH_MUSLIM_HADITHS = [
  {
    id: 'muslim-1',
    book: 'Sahih Muslim',
    bookId: 'sahih-muslim',
    hadithNumber: '1',
    title: 'The Best of Deeds',
    arabicText: 'أَفْضَلُ الأَعْمَالِ إِيمَانٌ بِاللَّهِ وَرَسُولِهِ',
    englishText: 'The Prophet Muhammad ﷺ said: "The best of deeds is to believe in Allah and His Messenger, then jihad in the way of Allah."',
    narrator: 'Abu Huraira',
    category: 'Faith',
    grade: 'Sahih',
    chapter: 'Book of Faith'
  },
  {
    id: 'muslim-2',
    book: 'Sahih Muslim',
    bookId: 'sahih-muslim',
    hadithNumber: '8',
    title: 'Good Character',
    arabicText: 'أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا',
    englishText: 'The Prophet Muhammad ﷺ said: "The most complete of believers in faith is the one with the best character."',
    narrator: 'Abu Huraira',
    category: 'Character',
    grade: 'Sahih',
    chapter: 'Book of Good Manners'
  },
  {
    id: 'muslim-3',
    book: 'Sahih Muslim',
    bookId: 'sahih-muslim',
    hadithNumber: '15',
    title: 'The Rights of Neighbors',
    arabicText: 'مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ',
    englishText: 'The Prophet Muhammad ﷺ said: "Jibreel kept advising me about the neighbor until I thought he would make him an heir."',
    narrator: 'Aisha',
    category: 'Neighbors',
    grade: 'Sahih',
    chapter: 'Book of Good Manners'
  },
  {
    id: 'muslim-4',
    book: 'Sahih Muslim',
    bookId: 'sahih-muslim',
    hadithNumber: '25',
    title: 'The Importance of Prayer',
    arabicText: 'الصَّلاَةُ عِمَادُ الدِّينِ',
    englishText: 'The Prophet Muhammad ﷺ said: "Prayer is the pillar of religion."',
    narrator: 'Umar ibn Al-Khattab',
    category: 'Prayer',
    grade: 'Sahih',
    chapter: 'Book of Prayer'
  },
  {
    id: 'muslim-5',
    book: 'Sahih Muslim',
    bookId: 'sahih-muslim',
    hadithNumber: '50',
    title: 'Forgiveness and Mercy',
    arabicText: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ',
    englishText: 'The Prophet Muhammad ﷺ said: "The merciful will be shown mercy by the Most Merciful. Be merciful to those on earth, and the One in heaven will be merciful to you."',
    narrator: 'Abdullah ibn Amr',
    category: 'Mercy',
    grade: 'Sahih',
    chapter: 'Book of Good Manners'
  }
];

// Sample hadiths from other books
export const OTHER_HADITHS = [
  {
    id: 'abudawud-1',
    book: 'Sunan Abu Dawud',
    bookId: 'sunan-abu-dawud',
    hadithNumber: '1',
    title: 'The Importance of Sincerity',
    arabicText: 'إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى أَجْسَامِكُمْ',
    englishText: 'The Prophet Muhammad ﷺ said: "Allah does not look at your bodies or your appearances, but He looks at your hearts and your deeds."',
    narrator: 'Abu Huraira',
    category: 'Sincerity',
    grade: 'Sahih',
    chapter: 'Book of Good Manners'
  },
  {
    id: 'tirmidhi-1',
    book: 'Sunan Tirmidhi',
    bookId: 'sunan-tirmidhi',
    hadithNumber: '1',
    title: 'The Best of People',
    arabicText: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
    englishText: 'The Prophet Muhammad ﷺ said: "The best of people are those who are most beneficial to people."',
    narrator: 'Jabir ibn Abdullah',
    category: 'Good Deeds',
    grade: 'Hasan',
    chapter: 'Book of Good Manners'
  },
  {
    id: 'nasai-1',
    book: 'Sunan An-Nasai',
    bookId: 'sunan-nasai',
    hadithNumber: '1',
    title: 'The Right of the Road',
    arabicText: 'إِيَّاكُمْ وَالْجُلُوسَ عَلَى الطُّرُقَاتِ',
    englishText: 'The Prophet Muhammad ﷺ said: "Beware of sitting on the roads." They said: "O Messenger of Allah, we cannot avoid sitting there to talk." He said: "If you must sit there, then give the road its rights."',
    narrator: 'Abu Sa\'id Al-Khudri',
    category: 'Public Etiquette',
    grade: 'Sahih',
    chapter: 'Book of Good Manners'
  },
  {
    id: 'ibnmajah-1',
    book: 'Sunan Ibn Majah',
    bookId: 'sunan-ibn-majah',
    hadithNumber: '1',
    title: 'The Excellence of Knowledge',
    arabicText: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا',
    englishText: 'The Prophet Muhammad ﷺ said: "Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise."',
    narrator: 'Abu Huraira',
    category: 'Knowledge',
    grade: 'Sahih',
    chapter: 'Book of Knowledge'
  }
];

// Combine all hadiths
export const ALL_HADITHS = [
  ...SAHIH_BUKHARI_HADITHS,
  ...SAHIH_MUSLIM_HADITHS,
  ...OTHER_HADITHS
];

// Search function for hadith database
export function searchHadiths(query, filters = {}) {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return ALL_HADITHS;
  }

  return ALL_HADITHS.filter(hadith => {
    // Apply book filter if specified
    if (filters.book && filters.book !== 'all' && hadith.bookId !== filters.book) {
      return false;
    }

    // Apply category filter if specified
    if (filters.category && filters.category !== 'all' && hadith.category !== filters.category) {
      return false;
    }

    // Search in multiple fields
    const searchableText = [
      hadith.title,
      hadith.englishText,
      hadith.arabicText,
      hadith.narrator,
      hadith.book,
      hadith.category,
      hadith.hadithNumber
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}

// Get unique categories
export function getCategories() {
  const categories = [...new Set(ALL_HADITHS.map(h => h.category))];
  return categories.sort();
}

// Get hadith by ID
export function getHadithById(id) {
  return ALL_HADITHS.find(h => h.id === id);
}

// Get hadiths by book
export function getHadithsByBook(bookId) {
  return ALL_HADITHS.filter(h => h.bookId === bookId);
}

// Get random hadith
export function getRandomHadith() {
  const randomIndex = Math.floor(Math.random() * ALL_HADITHS.length);
  return ALL_HADITHS[randomIndex];
}

// Get hadiths by narrator
export function getHadithsByNarrator(narrator) {
  return ALL_HADITHS.filter(h => 
    h.narrator.toLowerCase().includes(narrator.toLowerCase())
  );
} 