// Audio resources for prayer steps - Using local downloaded audio files
export const prayerAudioUrls = {
  niyyah: {
    audio: '/audio/niyyah.mp3',
    description: 'Bismillah (In the name of Allah)',
    duration: '00:03'
  },
  takbir: {
    audio: '/audio/takbir.mp3',
    description: 'Allahu Akbar (Allah is the Greatest)',
    duration: '00:02'
  },
  qiyam: {
    audio: '/audio/qiyam.mp3',
    description: 'Surah Al-Fatiha recitation',
    duration: '00:45'
  },
  rukoo: {
    audio: '/audio/rukoo.mp3',
    description: 'Subhana Rabbiyal Adheem (Glory be to my Lord, the Most Great)',
    duration: '00:04'
  },
  sajda: {
    audio: '/audio/sajda.mp3',
    description: 'Subhana Rabbiyal A\'la (Glory be to my Lord, the Most High)',
    duration: '00:04'
  },
  jalsa: {
    audio: '/audio/jalsa.mp3',
    description: 'Sitting between prostrations',
    duration: '00:02'
  },
  tashahhud: {
    audio: '/audio/tashahhud.mp3',
    description: 'Tashahhud (Testification)',
    duration: '00:15'
  },
  salam: {
    audio: '/audio/salam.mp3',
    description: 'Assalamu Alaikum wa Rahmatullah (Peace be upon you and Allah\'s mercy)',
    duration: '00:03'
  }
};

// Multiple audio sequences for specific steps - These will play automatically one after another
export const audioSequences = {
  qiyam: [
    {
      audio: '/audio/fatiha.mp3',
      description: 'Surah Al-Fatiha recitation',
      duration: '00:45'
    },
    {
      audio: '/audio/ikhlas.mp3',
      description: 'Surah Al-Ikhlas recitation',
      duration: '00:30'
    },
    {
      audio: '/audio/takbir.mp3',
      description: 'Allahu Akbar (Opening Takbir)',
      duration: '00:02'
    }
  ],
  tashahhud: [
    {
      audio: '/audio/tashahhud.mp3',
      description: 'Tashahhud (Testification)',
      duration: '00:15'
    },
    {
      audio: '/audio/salat-alan-nabi-darud.mp3',
      description: 'Salat Alan Nabi (Darud)',
      duration: '00:10'
    },
    {
      audio: '/audio/after-darud.mp3',
      description: 'After Darud (Dua)',
      duration: '00:08'
    }
  ]
};

// Additional audio sources for specific steps - Using local files
export const additionalAudioUrls = {
  qiyam: [
    '/audio/qiyam.mp3',
    '/audio/takbir.mp3' // Alternative for qiyam
  ],
  tashahhud: [
    '/audio/tashahhud.mp3',
    '/audio/salam.mp3' // Alternative for tashahhud
  ],
  qaumah: [
    '/audio/rukoo.mp3' // Using rukoo audio for qaumah
  ]
};

// Video demonstrations for each step
export const prayerVideoUrls = {
  niyyah: {
    video: 'https://www.youtube.com/embed/6n2ManvDNr0?autoplay=1',
    description: 'How to make intention (Niyyah) for prayer - Complete guide in English'
  },
  takbir: {
    video: 'https://www.youtube.com/embed/mlKyq-sn5qs?autoplay=1',
    description: 'How to perform Takbir (raising hands) - Step by step demonstration'
  },
  qiyam: {
    video: 'https://www.youtube.com/embed/S6hu0GYD9bc?autoplay=1',
    description: 'How to stand properly in Qiyam and recite Surah Al-Fatiha'
  },
  rukoo: {
    video: 'https://www.youtube.com/embed/cmxZ3bDFKzM?autoplay=1',
    description: 'How to perform Rukoo (bowing) correctly - Proper form and recitation'
  },
  sajda: {
    video: 'https://www.youtube.com/embed/SzTpFJJq_pg?autoplay=1',
    description: 'How to perform Sajda (prostration) properly - Complete guide'
  },
  jalsa: {
    video: 'https://www.youtube.com/embed/xDhz6eRPTEo?autoplay=1',
    description: 'How to sit between prostrations - Jalsa position explained'
  },
  tashahhud: {
    video: 'https://www.youtube.com/embed/5m-48VvthqI?autoplay=1',
    description: 'How to recite Tashahhud - Complete testification with proper hand position'
  },
  salam: {
    video: 'https://www.youtube.com/embed/-QSyc4uDXVM?autoplay=1',
    description: 'How to perform Salam (ending prayer) - Proper way to end Salah'
  }
};

// Step descriptions and instructions
export const prayerSteps = {
  niyyah: {
    title: 'Niyyah (Intention)',
    description: 'Make intention in your heart for the prayer you are about to perform.',
    instructions: [
      'Stand facing the Qibla',
      'Make intention in your heart for the specific prayer',
      'You can say the intention silently or aloud',
      'Example: "I intend to pray Fajr prayer for Allah"'
    ],
    arabic: 'نَوَيْتُ أَنْ أُصَلِّيَ صَلاَةَ الْفَجْرِ لِلَّهِ تَعَالَى',
    transliteration: 'Nawaitu an usalli salatal fajri lillahi ta\'ala',
    translation: 'I intend to pray Fajr prayer for Allah the Most High'
  },
  takbir: {
    title: 'Takbir (Opening)',
    description: 'Raise your hands and say Allahu Akbar to begin the prayer.',
    instructions: [
      'Raise both hands to your ears',
      'Palms should face forward',
      'Say "Allahu Akbar"',
      'Lower your hands and place them on your chest'
    ],
    arabic: 'اللهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest'
  },
  qiyam: {
    title: 'Qiyam (Standing)',
    description: 'Stand upright and recite Surah Al-Fatiha and additional verses.',
    instructions: [
      'Stand straight with feet shoulder-width apart',
      'Place right hand over left hand on chest',
      'Recite Surah Al-Fatiha',
      'Recite additional verses or surah'
    ],
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Bismillahir Rahmanir Rahim',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful'
  },
  rukoo: {
    title: 'Rukoo (Bowing)',
    description: 'Bend forward from the waist while keeping your back straight.',
    instructions: [
      'Say "Allahu Akbar" and bend forward',
      'Place hands on knees',
      'Keep back straight and parallel to ground',
      'Recite "Subhana Rabbiyal Adheem" 3 times'
    ],
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subhana Rabbiyal Adheem',
    translation: 'Glory be to my Lord, the Most Great'
  },
  sajda: {
    title: 'Sajda (Prostration)',
    description: 'Place your forehead, nose, hands, knees, and toes on the ground.',
    instructions: [
      'Say "Allahu Akbar" and go down',
      'Place forehead, nose, hands, knees, and toes on ground',
      'Keep elbows away from body',
      'Recite "Subhana Rabbiyal A\'la" 3 times'
    ],
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    transliteration: 'Subhana Rabbiyal A\'la',
    translation: 'Glory be to my Lord, the Most High'
  },
  jalsa: {
    title: 'Jalsa (Sitting)',
    description: 'Sit between the two prostrations.',
    instructions: [
      'Say "Allahu Akbar" and sit up',
      'Sit on your left foot',
      'Keep right foot upright',
      'Place hands on thighs'
    ],
    arabic: 'رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbighfir li',
    translation: 'My Lord, forgive me'
  },
  tashahhud: {
    title: 'Tashahhud (Testification)',
    description: 'Recite the testification while sitting.',
    instructions: [
      'Sit in the same position as Jalsa',
      'Raise index finger while reciting',
      'Recite the complete Tashahhud',
      'Send blessings on Prophet Muhammad ﷺ'
    ],
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ',
    transliteration: 'Attahiyyatu lillahi wassalawatu wattayyibat',
    translation: 'All greetings, prayers, and pure words are for Allah'
  },
  salam: {
    title: 'Salam (Ending)',
    description: 'Turn your head right and left saying Salam to end the prayer.',
    instructions: [
      'Turn head to the right saying "Assalamu Alaikum wa Rahmatullah"',
      'Turn head to the left saying the same',
      'This completes the prayer',
      'Make dua after prayer'
    ],
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'Assalamu Alaikum wa Rahmatullah',
    translation: 'Peace be upon you and Allah\'s mercy'
  }
}; 