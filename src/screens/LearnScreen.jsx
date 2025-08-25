import { useState, useEffect, useRef } from 'react';
import { prayerAudioUrls, prayerVideoUrls, prayerSteps, audioSequences } from '../data/prayerAudio';
import { prayerAudioPlayer } from '../utils/prayerAudioService';
import { progressTracker } from '../utils/progressTracker';
import { GlowCard } from '../components/nurui/spotlight-card';
import { 
  MotionDiv, 
  MotionCard, 
  MotionButton,
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions
} from '../utils/animations';
import takbir1 from '../assets/takbir1.jpg';
import takbir2 from '../assets/takbir2.jpg';
import takbir3 from '../assets/takbir3.jpg';
import qiyam1 from '../assets/qiyam1.jpg';
import qiyyam2 from '../assets/qiyyam2.jpg';
import jalsa1 from '../assets/jalsa1.jpg';
import jalsa2 from '../assets/jalsa2.jpg';
import sajjda1 from '../assets/sajjda1.jpg';
import sajjda2 from '../assets/sajjda2.jpg';
import raku1 from '../assets/raku1.jpg';
import raku2 from '../assets/raku2.jpg';
import Tashahhud1 from '../assets/Tashahhud1.jpg';
import Tashahhud2 from '../assets/Tashahhud2.jpg';
import Tashahhud3 from '../assets/Tashahhud3.jpg';
import sajjda3 from '../assets/sajjda3.jpg';
import salam1 from '../assets/salam1.jpg';
import niyyah1 from '../assets/niyyah1.jpg';

const steps = ['niyyah', 'takbir', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'tashahhud', 'salam'];

// Comprehensive prayer learning content from MyMasjid.ca guide
const comprehensivePrayerSteps = {
  niyyah: {
    title: 'Step 1: Make Your Intention (Niyyah)',
    description: 'Begin by making an intention from the heart to pray to Allah. As soon as you begin, your entire focus should be on the prayer itself and nothing else.',
    image: niyyah1,
    arabic: 'نَوَيْتُ أَنْ أُصَلِّيَ صَلاَةَ الْفَجْرِ لِلَّهِ تَعَالَى',
    transliteration: 'Nawaitu an usalli salatal fajri lillahi ta\'ala',
    translation: 'I intend to pray Fajr prayer for Allah the Most High',
    instructions: [
      'Stand facing the Qibla (direction of the Kaaba)',
      'Make intention in your heart for the specific prayer you are about to perform',
      'You can say the intention silently or aloud',
      'Your entire focus should be on the prayer itself and nothing else',
      'Example: "I intend to pray Fajr prayer for Allah"'
    ],
    tips: [
      'The intention is made in the heart, not necessarily spoken',
      'Be specific about which prayer you are performing',
      'Clear your mind of worldly distractions'
    ]
  },
  takbir: {
    title: 'Step 2: Raise Your Hands and Say "Allahu Akbar"',
    description: 'The moment you say "Allahu Akbar" the prayer will officially begin. From this point forward you should focus wholeheartedly on the prayer and do your best to ignore all distractions.',
    image: takbir1,
    arabic: 'اللهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    instructions: [
      'Raise both hands to your ears',
      'Palms should face forward',
      'Say "Allahu Akbar" (Allah is the Greatest)',
      'Lower your hands and place them over your chest',
      'Your right hand should be placed over your left hand'
    ],
    tips: [
      '"Allahu Akbar" means "Allah is Greater" - greater than all other thoughts and actions',
      'This marks the official beginning of your prayer',
      'Keep your eyes focused on the ground in front of you'
    ]
  },
  qiyam: {
    title: 'Step 3: Recite Surah Al-Fatiha',
    description: 'Recite the opening chapter of the Qur\'an. You will begin by saying "I seek refuge in Allah from the accursed Shaytan" and then begin to recite the chapter verse by verse in Arabic.',
    image: qiyam1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: 'Bismillahir Rahmanir Rahim\nAlhamdu lillahi rabbil \'alameen\nAr-Rahmani ar-Raheem\nMaliki yawmid deen\nIyyaaka na\'aboodu wa iyyaaka nasta\'een\nIhdeenas siraatal mustaqeem\nSiraatal ladheena an \'amta\' alayhim\nGhayril maghduubi \'alayhim waladawleen',
    translation: 'In the name of God, the infinitely Compassionate and Merciful.\nPraise be to Allah, Lord of all the worlds.\nThe Most Gracious, the Most Merciful.\nMaster on the Day of Recompense (Judgement Day).\nYou alone do we worship, and You alone do we ask for help.\nGuide us on the straight path,\nThe path of those who You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
    instructions: [
      'Stand straight with feet shoulder-width apart',
      'Place right hand over left hand on chest',
      'Recite "A\'auodu billaahi minash-shaytaanir rajeem" (I seek refuge in Allah from the accursed Shaytan)',
      'Recite Surah Al-Fatiha verse by verse',
      'You can recite additional verses or surah after Fatiha'
    ],
    tips: [
      'Surah Al-Fatiha is mandatory in every rakah of prayer',
      'Keep your eyes focused on the ground where you will be prostrating',
      'Recite with proper tajweed (pronunciation)'
    ]
  },
  rukoo: {
    title: 'Step 4: Perform Rukoo (Bowing)',
    description: 'Bend forward from the waist while keeping your back straight. Make sure to keep your back straight, your hands on your knees, and your eyes focused on the ground where you will be prostrating.',
    image: raku1,
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subhanna rabbeeyal adheem',
    translation: 'How perfect is my Lord, the Magnificent',
    instructions: [
      'Say "Allahu Akbar" and bend forward',
      'Place hands on knees with fingers spread',
      'Keep back straight and parallel to ground',
      'Keep your eyes focused on the ground where you will be prostrating',
      'Recite "Subhanna rabbeeyal adheem" 3 times'
    ],
    tips: [
      'Your back should be parallel to the ground',
      'Your head should be level with your back',
      'Keep your knees slightly bent'
    ]
  },
  sajda: {
    title: 'Step 5: Perform Sujud (Prostration)',
    description: 'Place your forehead, nose, palms of both hands, knees, and both toes on the ground. This is the position where you are closest to Allah.',
    image: sajjda1,
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    transliteration: 'Subhanna rabbeeyal \'alaa',
    translation: 'How perfect is my Lord, the Most High',
    instructions: [
      'Say "Allahu Akbar" and go down',
      'Place forehead, nose, palms of both hands, knees, and both toes on ground',
      'Keep elbows away from body',
      'Keep your feet upright with toes pointing towards Qibla',
      'Recite "Subhanna rabbeeyal \'alaa" 3 times'
    ],
    tips: [
      'This is the position where you are closest to Allah',
      'Make sure all seven parts touch the ground: forehead, nose, both hands, both knees, and both feet',
      'Keep your arms away from your body'
    ]
  },
  jalsa: {
    title: 'Step 6: Sit Between Prostrations (Jalsa)',
    description: 'Rise up from sujud and sit for a moment. Sit on your left leg while your left foot will rest on the floor and your right foot is upright.',
    image: jalsa1,
    arabic: 'رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbigh-fir lee',
    translation: 'O my Lord, forgive me',
    instructions: [
      'Say "Allahu Akbar" as you rise from sujud',
      'Sit on your left leg',
      'Keep right foot upright with toes pointing towards Qibla',
      'Place hands on thighs',
      'Ask Allah for forgiveness with "Rabbigh-fir lee"'
    ],
    tips: [
      'This is a moment of rest between the two prostrations',
      'Use this time to ask Allah for forgiveness',
      'Keep your back straight while sitting'
    ]
  },
  tashahhud: {
    title: 'Step 7: Perform Tashahhud (Testification)',
    description: 'Recite the testification while sitting. This is performed at the end of every two rakah and at the end of the prayer.',
    image: Tashahhud1,
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ\nالسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ\nالسَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ\nأَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'At Tahiyyaatu lilaahi was Salawaatu wat tayibaatu\nAssalaamu \'alaika ayyuhan nabiyyu wa rahmatu Allahi wa barakaatuh\nAssalaamu \'alaynaa wa \'alaa \'ebaadillaahis saaliheen\nAsh hadu allaa ilaha illa Allah Wa ash hadu anna Muhammadan \'abduhuu wa rasuuluh',
    translation: 'All compliments, prayers and pure words are due to Allah.\nPeace be upon you, O Prophet, and the mercy of Allah and His blessings.\nPeace be upon us, and on the righteous slaves of Allah.\nI bear witness that none has the right to be worshipped except Allah, and I bear witness that Muhammad is His slave and Messenger.',
    instructions: [
      'Sit in the same position as Jalsa',
      'Raise your right index finger while reciting',
      'Recite the complete Tashahhud',
      'Send blessings on Prophet Muhammad ﷺ',
      'Keep your eyes focused on your index finger'
    ],
    tips: [
      'This is performed at the end of every two rakah',
      'The index finger should be raised throughout the recitation',
      'This is a moment of testification and sending blessings'
    ]
  },
  salam: {
    title: 'Step 8: Perform Salam (Ending Prayer)',
    description: 'Turn your head right and left saying Salam to end the prayer. This is the final step that completes your prayer.',
    image: salam1,
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'Assalamu alaykum wa rahmatu Allah',
    translation: 'Peace be upon you and Allah\'s mercy',
    instructions: [
      'Turn head to the right saying "Assalamu alaykum wa rahmatu Allah"',
      'Turn head to the left saying the same phrase',
      'This completes the prayer',
      'Make dua after prayer',
      'You can now end your prayer'
    ],
    tips: [
      'This is the final step that completes your prayer',
      'The salam is a greeting of peace',
      'After salam, you can make personal duas'
    ]
  }
};

// Prayer structure for different prayers
const prayerStructure = {
  fajr: {
    name: 'Fajr (Dawn Prayer)',
    rakah: 2,
    description: 'The dawn prayer performed before sunrise',
    timing: 'Before sunrise',
    steps: ['niyyah', 'takbir', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'salam']
  },
  dhuhr: {
    name: 'Dhuhr (Noon Prayer)',
    rakah: 4,
    description: 'The noon prayer performed after the sun has passed its zenith',
    timing: 'After noon until Asr',
    steps: ['niyyah', 'takbir', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'salam']
  },
  asr: {
    name: 'Asr (Afternoon Prayer)',
    rakah: 4,
    description: 'The afternoon prayer performed in the late afternoon',
    timing: 'Late afternoon until sunset',
    steps: ['niyyah', 'takbir', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'salam']
  },
  maghrib: {
    name: 'Maghrib (Sunset Prayer)',
    rakah: 3,
    description: 'The sunset prayer performed immediately after sunset',
    timing: 'Immediately after sunset',
    steps: ['niyyah', 'takbir', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'salam']
  },
  isha: {
    name: 'Isha (Night Prayer)',
    rakah: 4,
    description: 'The night prayer performed after the twilight has disappeared',
    timing: 'After twilight until midnight',
    steps: ['niyyah', 'takbir', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'qiyam', 'rukoo', 'sajda', 'jalsa', 'sajda', 'tashahhud', 'salam']
  }
};

// Takbir images for the gallery
const takbirImages = [
  {
    src: takbir1,
    alt: 'Takbir - Front view of person raising hands to ears',
    description: 'Front view showing proper hand position for Takbir'
  },
  {
    src: takbir2,
    alt: 'Takbir - Back view of person raising hands to ears',
    description: 'Back view showing proper posture for Takbir'
  },
  {
    src: takbir3,
    alt: 'Takbir - Side view of person raising hands to ears',
    description: 'Side view showing proper hand and body position for Takbir'
  }
];

const qiyamImages = [
  {
    src: qiyam1,
    alt: 'Qiyam - Front view of person standing in prayer',
    description: 'Front view showing proper Qiyam posture'
  },
  {
    src: qiyyam2,
    alt: 'Qiyam - Side view of person standing in prayer',
    description: 'Side view showing proper Qiyam posture'
  }
];

const jalsaImages = [
  {
    src: jalsa1,
    alt: 'Jalsa - Front view of person sitting between prostrations',
    description: 'Front view showing proper Jalsa posture'
  },
  {
    src: jalsa2,
    alt: 'Jalsa - Back view of person sitting between prostrations',
    description: 'Back view showing proper Jalsa posture'
  }
];

const sajdaImages = [
  {
    src: sajjda1,
    alt: 'Sajda - Side view of person in prostration',
    description: 'Side view showing proper Sajda posture'
  },
  {
    src: sajjda2,
    alt: 'Sajda - Front view of person in prostration',
    description: 'Front view showing proper Sajda posture'
  },
  {
    src: sajjda3,
    alt: 'Sajda - Another view of person in prostration',
    description: 'Another perspective of proper Sajda posture'
  }
];

const rukooImages = [
  {
    src: raku1,
    alt: 'Rukoo - Front view of person bowing in prayer',
    description: 'Front view showing proper Rukoo posture'
  },
  {
    src: raku2,
    alt: 'Rukoo - Side view of person bowing in prayer',
    description: 'Side view showing proper Rukoo posture'
  }
];

const tashahhudImages = [
  {
    src: Tashahhud1,
    alt: 'Tashahhud - Front view of person sitting with index finger raised',
    description: 'Front view showing proper Tashahhud posture with index finger raised'
  },
  {
    src: Tashahhud2,
    alt: 'Tashahhud - Side view of person sitting with index finger raised',
    description: 'Side view showing proper Tashahhud posture'
  },
  {
    src: Tashahhud3,
    alt: 'Tashahhud - Close-up of hand gesture',
    description: 'Close-up of the hand gesture during Tashahhud'
  }
];

const salamImages = [
  {
    src: salam1,
    alt: 'Salam - Person in prayer position turning head to right',
    description: 'Person performing Salam by turning head to the right side'
  }
];

const niyyahImages = [
  {
    src: niyyah1,
    alt: 'Niyyah - Elderly man making intention with raised hands in prayer',
    description: 'Elderly man making intention (Niyyah) with raised hands in prayer'
  }
];



const rewardQuotes = [
  '"The coolness of my eyes is in prayer." (Ahmad)',
  '"Successful indeed are the believers, those who humble themselves in prayer." (Quran 23:1-2)',
  '"Establish prayer for My remembrance." (Quran 20:14)',
  '"The key to Paradise is prayer." (Tirmidhi)',
  '"Between a man and disbelief is the abandonment of prayer." (Muslim)',
  '"Indeed, prayer prohibits immorality and wrongdoing." (Quran 29:45)',
  '"Pray as you have seen me praying." (Bukhari)',
  '"The closest a servant comes to his Lord is when he is prostrating." (Muslim)',
];

function getSavedBookmarks() {
  try {
    const saved = JSON.parse(localStorage.getItem('learn_bookmarks'));
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
}



export default function LearnScreen() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [bookmarks, setBookmarks] = useState(getSavedBookmarks());


  const [rewardIdx, setRewardIdx] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentPlayingStep, setCurrentPlayingStep] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetailsStep, setSelectedDetailsStep] = useState(null);
  const [audioSequenceInfo, setAudioSequenceInfo] = useState(null);
  
  // New state for comprehensive learning
  const [selectedPrayer, setSelectedPrayer] = useState('fajr');
  const [showPrayerStructure, setShowPrayerStructure] = useState(false);
  const [showComprehensiveStep, setShowComprehensiveStep] = useState(false);
  const [selectedComprehensiveStep, setSelectedComprehensiveStep] = useState(null);
  const [learningMode, setLearningMode] = useState('steps'); // 'steps', 'prayer', 'comprehensive'
  
  // New state for Takbir image gallery
  const [showTakbirImages, setShowTakbirImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Add state for Qiyam images modal
  const [showQiyamImages, setShowQiyamImages] = useState(false);
  const [zoomedQiyamImageIndex, setZoomedQiyamImageIndex] = useState(null);
  const [qiyamZoomLevel, setQiyamZoomLevel] = useState(1);

  // Add state for Jalsa images modal
  const [showJalsaImages, setShowJalsaImages] = useState(false);
  const [zoomedJalsaImageIndex, setZoomedJalsaImageIndex] = useState(null);
  const [jalsaZoomLevel, setJalsaZoomLevel] = useState(1);

  // Add state for Sajda images modal
  const [showSajdaImages, setShowSajdaImages] = useState(false);
  const [zoomedSajdaImageIndex, setZoomedSajdaImageIndex] = useState(null);
  const [sajdaZoomLevel, setSajdaZoomLevel] = useState(1);

  // Add state for Rukoo images modal
  const [showRukooImages, setShowRukooImages] = useState(false);
  const [zoomedRukooImageIndex, setZoomedRukooImageIndex] = useState(null);
  const [rukooZoomLevel, setRukooZoomLevel] = useState(1);

  // Add state for Tashahhud images modal
  const [showTashahhudImages, setShowTashahhudImages] = useState(false);
  const [zoomedTashahhudImageIndex, setZoomedTashahhudImageIndex] = useState(null);
  const [tashahhudZoomLevel, setTashahhudZoomLevel] = useState(1);

  // Add state for Salam images modal
  const [showSalamImages, setShowSalamImages] = useState(false);
  const [zoomedSalamImageIndex, setZoomedSalamImageIndex] = useState(null);
  const [salamZoomLevel, setSalamZoomLevel] = useState(1);

  // Add state for Niyyah images modal
  const [showNiyyahImages, setShowNiyyahImages] = useState(false);
  const [zoomedNiyyahImageIndex, setZoomedNiyyahImageIndex] = useState(null);
  const [niyyahZoomLevel, setNiyyahZoomLevel] = useState(1);



  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioPlaying) {
        prayerAudioPlayer.stop();
      }
    };
  }, [audioPlaying]);

  // Monitor audio sequence progress
  useEffect(() => {
    let interval;
    if (audioPlaying && (currentPlayingStep === 'qiyam' || currentPlayingStep === 'tashahhud')) {
      interval = setInterval(() => {
        const sequenceInfo = prayerAudioPlayer.getCurrentSequenceInfo();
        if (sequenceInfo) {
          setAudioSequenceInfo(sequenceInfo);
        }
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [audioPlaying, currentPlayingStep]);

  function toggleBookmark(step) {
    const newBookmarks = bookmarks.includes(step)
      ? bookmarks.filter(b => b !== step)
      : [...bookmarks, step];
    setBookmarks(newBookmarks);
    localStorage.setItem('learn_bookmarks', JSON.stringify(newBookmarks));
  }

  async function playAudio(step) {
    try {
      // If same step is playing, stop it
      if (currentPlayingStep === step && audioPlaying) {
        prayerAudioPlayer.stop();
        setAudioPlaying(false);
        setCurrentPlayingStep(null);
        setAudioSequenceInfo(null);
        return;
      }

      // Stop any currently playing audio
      prayerAudioPlayer.stop();
      setAudioPlaying(false);
      setCurrentPlayingStep(null);
      setAudioSequenceInfo(null);

      setAudioPlaying(true);
      setCurrentPlayingStep(step);
      
      await prayerAudioPlayer.play(step);
      
      setAudioPlaying(false);
      setCurrentPlayingStep(null);
      setAudioSequenceInfo(null);
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioPlaying(false);
      setCurrentPlayingStep(null);
      setAudioSequenceInfo(null);
      
      // Show error notification
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = `Failed to play audio: ${error.message}`;
      document.body.appendChild(errorDiv);
      setTimeout(() => document.body.removeChild(errorDiv), 3000);
    }
  }

  function showStepDetails(step) {
    setSelectedDetailsStep(step);
    setShowDetails(true);
  }

  function closeDetails() {
    setShowDetails(false);
    setSelectedDetailsStep(null);
  }

  function playVideo(step) {
    setSelectedStep(step);
  }

  function stopVideo() {
    setSelectedStep(null);
  }





  return (
    <MotionDiv 
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative"
      {...pageTransition}
    >
      {/* Floating Islamic Calligraphy - Perfectly Positioned */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-30">
        <GlowCard className="group islamic-calligraphy bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-2xl p-3 sm:p-4 border border-brass/30 shadow-2xl backdrop-blur-sm hover:shadow-3xl hover:scale-105 transition-all duration-500 max-w-[140px] sm:max-w-[160px] md:max-w-[180px]">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-arabic text-brass mb-1 group-hover:text-amber-600 transition-colors duration-300">📚</div>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-brass transition-colors duration-300">تعلم</h2>
          </div>
        </GlowCard>
      </div>

      <div className="w-full max-w-7xl mx-auto py-8 px-4 pt-24 sm:pt-28">
        {/* Beautiful Calligraphy Header - Perfectly Centered */}
        <div className="text-center mb-16 flex flex-col items-center justify-center min-h-[40vh] px-4">
          {/* Arabic Calligraphy - Perfectly Centered */}
          <div className="mb-16 animate-fadeInScale text-center w-full max-w-5xl arabic-content">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-arabic text-brass mb-8 leading-none drop-shadow-2xl animate-pulse arabic-text-center font-bold tracking-wide">
              📚 {t('learnToPray')}
            </div>
            <div className="text-sm md:text-base text-text dark:text-darktext opacity-80 italic text-center mx-auto max-w-2xl">
              {t('stepByStepPrayerGuide')}
            </div>
          </div>

          {/* Enhanced Islamic Design - Perfectly Centered */}
          <div className="relative mb-16 animate-fadeInUp text-center w-full max-w-5xl arabic-content">
            {/* Decorative Islamic pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-brass to-transparent opacity-40 animate-shimmer"></div>
            </div>
            
            {/* Beautiful Arabic Calligraphy - Perfectly Centered */}
            <div className="mb-8 text-center w-full">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arabic text-brass mb-6 leading-relaxed drop-shadow-xl animate-float arabic-text-center font-bold tracking-wide">
                تعلم الصلاة
              </div>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
                {t('masterTheArtOfPrayer')}
              </p>
            </div>

            {/* Enhanced Islamic quote with better styling - Perfectly Centered */}
            <GlowCard className="bg-gradient-to-r from-brass/15 to-wood/15 rounded-3xl p-8 sm:p-10 border border-brass/30 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl animate-pulse-glow text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-arabic text-brass mb-4 leading-relaxed arabic-text-center font-bold tracking-wide">
                "أَفَلاَ يَتَدَبَّرُونَ الْقُرْآنَ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلاَفًا كَثِيرًا"
              </div>
              <div className="text-sm sm:text-base md:text-lg text-text dark:text-darktext opacity-90 italic text-center mx-auto">
                "Do they not contemplate the Quran? If it were from other than Allah, they would have found therein much contradiction"
              </div>
              <div className="text-xs sm:text-sm text-text dark:text-darktext opacity-70 mt-4 font-semibold text-center mx-auto">
                Quran 4:82
              </div>
            </GlowCard>
          </div>
        </div>

        {/* Learning Mode Toggle */}
        <div className="w-full max-w-4xl mb-8">
          <GlowCard className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-800/80 rounded-2xl p-6 shadow-xl border border-brass/30 backdrop-blur-sm">
            <div className="text-xl text-brass dark:text-amber-200 font-bold mb-4 text-center">{t('chooseLearningMode')}</div>
            <div className="flex flex-wrap gap-4 justify-center">
              <MotionButton
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  learningMode === 'steps'
                    ? 'bg-gradient-to-r from-brass to-wood text-white shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-brass/30 dark:border-brass/60 backdrop-blur-sm'
                }`}
                onClick={() => setLearningMode('steps')}
                {...buttonPress}
              >
                📋 {t('stepByStepGuide')}
              </MotionButton>
              <MotionButton
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  learningMode === 'prayer'
                    ? 'bg-gradient-to-r from-brass to-wood text-white shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-brass/30 dark:border-brass/60 backdrop-blur-sm'
                }`}
                onClick={() => setLearningMode('prayer')}
                {...buttonPress}
              >
                🕌 {t('completePrayerStructure')}
              </MotionButton>
              <MotionButton
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  learningMode === 'comprehensive'
                    ? 'bg-gradient-to-r from-brass to-wood text-white shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-brass/30 dark:border-brass/60 backdrop-blur-sm'
                }`}
                onClick={() => setLearningMode('comprehensive')}
                {...buttonPress}
              >
                📖 {t('comprehensiveLearning')}
              </MotionButton>
            </div>
          </GlowCard>
        </div>

        {/* Learning Mode Toggle */}
        <div className="w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="text-xl text-amber-800 dark:text-amber-200 font-bold mb-4 text-center">Choose Learning Mode</div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  learningMode === 'steps'
                    ? 'bg-amber-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
                }`}
                onClick={() => setLearningMode('steps')}
              >
                📋 Step-by-Step Guide
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  learningMode === 'prayer'
                    ? 'bg-amber-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
                }`}
                onClick={() => setLearningMode('prayer')}
              >
                🕌 Complete Prayer Structure
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  learningMode === 'comprehensive'
                    ? 'bg-amber-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
                }`}
                onClick={() => setLearningMode('comprehensive')}
              >
                📖 Comprehensive Learning
              </button>
            </div>
          </div>
        </div>

        {/* Prayer Structure Section */}
        {learningMode === 'prayer' && (
          <div className="w-full max-w-6xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="text-2xl text-amber-800 dark:text-amber-200 font-bold mb-6 text-center">🕌 Complete Prayer Structure</div>
              
              {/* Prayer Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {Object.entries(prayerStructure).map(([key, prayer]) => (
                  <button
                    key={key}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      selectedPrayer === key
                        ? 'bg-amber-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
                    }`}
                    onClick={() => setSelectedPrayer(key)}
                  >
                    <div className="text-lg font-bold mb-2">{prayer.name}</div>
                    <div className="text-sm opacity-80">{prayer.rakah} Rakah</div>
                    <div className="text-xs opacity-60">{prayer.timing}</div>
                  </button>
                ))}
              </div>

              {/* Selected Prayer Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4">{prayerStructure[selectedPrayer].name}</div>
                <div className="text-gray-700 dark:text-gray-300 mb-4">{prayerStructure[selectedPrayer].description}</div>
                
                {/* Prayer Steps Flow */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {prayerStructure[selectedPrayer].steps.map((step, index) => (
                    <div
                      key={index}
                      className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700 text-center cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-all duration-300"
                      onClick={() => {
                        setSelectedComprehensiveStep(step);
                        setShowComprehensiveStep(true);
                      }}
                    >
                      <div className="text-sm font-bold">{comprehensivePrayerSteps[step]?.title.split(':')[1]?.trim() || step}</div>
                      <div className="text-xs opacity-80">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comprehensive Learning Section */}
        {learningMode === 'comprehensive' && (
          <div className="w-full max-w-6xl">
            <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
              <div className="text-2xl text-brass font-bold mb-6 text-center">📖 Comprehensive Prayer Learning</div>
              <div className="text-center text-text dark:text-darktext mb-8">
                Learn each step of prayer with detailed instructions, Arabic text, transliterations, and visual guides from authentic Islamic sources.
              </div>
              
              {/* Comprehensive Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(comprehensivePrayerSteps).map(([key, step]) => (
                  <div
                    key={key}
                    className="group relative card p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setSelectedComprehensiveStep(key);
                      setShowComprehensiveStep(true);
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
                    
                    {/* Step Image - Show specific images for each step */}
                    {key === 'takbir' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={takbir1}
                          alt="Takbir - Front view of person raising hands to ears"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {key === 'qiyam' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={qiyam1}
                          alt="Qiyam - Front view of person standing in prayer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {key === 'rukoo' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={raku1}
                          alt="Rukoo - Front view of person bowing in prayer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {key === 'sajda' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={sajjda1}
                          alt="Sajda - Side view of person in prostration"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {key === 'jalsa' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={jalsa1}
                          alt="Jalsa - Front view of person sitting between prostrations"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {key === 'tashahhud' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={Tashahhud1}
                          alt="Tashahhud - Front view of person sitting with index finger raised"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {key === 'salam' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={salam1}
                          alt="Salam - Person in prayer position turning head to right"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {/* Niyyah image */}
                    {key === 'niyyah' && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                        <img
                          src={niyyah1}
                          alt="Niyyah - Elderly man making intention with raised hands in prayer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    {/* Header */}
                    <div className="relative flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brass to-wood flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {key === 'niyyah' ? '1' : key === 'takbir' ? '2' : key === 'qiyam' ? '3' : key === 'rukoo' ? '4' : key === 'sajda' ? '5' : key === 'jalsa' ? '6' : key === 'tashahhud' ? '7' : '8'}
                        </div>
                        <h3 className="text-lg font-bold text-brass">{step.title.split(':')[1]?.trim() || step.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text dark:text-darktext mb-4 leading-relaxed line-clamp-3">{step.description}</p>

                    {/* Arabic Preview */}
                    <div className="p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10 text-center">
                      <div className="text-lg font-arabic text-brass mb-1 leading-relaxed">{step.arabic.split('\n')[0]}</div>
                      <div className="text-xs text-text dark:text-darktext opacity-80">{step.transliteration.split('\n')[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}



        {/* Motivational Reward - Moved from bottom */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-xl text-brass font-bold mb-4 text-center flex items-center justify-center gap-3">
              <span className="text-3xl">💫</span>
              Motivational Reward
              <span className="text-3xl">💫</span>
            </div>
            <div className="text-center">
              <div className="italic text-brass text-center text-lg leading-relaxed font-body">{rewardQuotes[rewardIdx]}</div>
            </div>
          </div>
        </div>

        {/* Prayer Steps Grid - Redesigned */}
        {learningMode === 'steps' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const stepData = prayerSteps[step];
              const audioData = prayerAudioUrls[step];
              const isBookmarked = bookmarks.includes(step);
              const isPlaying = currentPlayingStep === step;

              return (
                <div 
                  key={step} 
                  className="group relative card p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-brass/20 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-brass to-wood pointer-events-none"></div>
                  
                  {/* Header */}
                  <div className="relative flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brass to-wood flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-brass">{stepData.title}</h3>
                    </div>
                    <button
                      className={`text-2xl transition-all duration-300 hover:scale-110 ${isBookmarked ? 'text-brass animate-pulse' : 'text-text dark:text-darktext hover:text-brass'}`}
                      onClick={() => toggleBookmark(step)}
                      aria-label={`Bookmark ${stepData.title}`}
                    >
                      {isBookmarked ? '★' : '☆'}
                    </button>
                  </div>

                  {/* Step Image - Show specific images for each step */}
                  {step === 'takbir' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={takbir1}
                        alt="Takbir - Front view of person raising hands to ears"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {step === 'qiyam' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={qiyam1}
                        alt="Qiyam - Front view of person standing in prayer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {step === 'rukoo' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={raku1}
                        alt="Rukoo - Front view of person bowing in prayer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {step === 'sajda' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={sajjda1}
                        alt="Sajda - Side view of person in prostration"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {step === 'jalsa' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={jalsa1}
                        alt="Jalsa - Front view of person sitting between prostrations"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {step === 'tashahhud' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={Tashahhud1}
                        alt="Tashahhud - Front view of person sitting with index finger raised"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {/* Niyyah image */}
                  {step === 'niyyah' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={niyyah1}
                        alt="Niyyah - Elderly man making intention with raised hands in prayer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {/* Salam image */}
                  {step === 'salam' && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-brass/20 to-wood/20">
                      <img
                        src={salam1}
                        alt="Salam - Person in prayer position turning head to right"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-text dark:text-darktext mb-6 leading-relaxed">{stepData.description}</p>

                  {/* Details Button */}
                  <button
                    className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-brass text-white hover:bg-wood hover:scale-102 transition-all duration-300"
                    onClick={() => showStepDetails(step)}
                    type="button"
                  >
                    <span className="text-lg">📋</span>
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Details Modal */}
        {showDetails && selectedDetailsStep && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">{prayerSteps[selectedDetailsStep].title}</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={closeDetails}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📝 Description</h3>
                  <p className="text-lg leading-relaxed text-text dark:text-darktext">{prayerSteps[selectedDetailsStep].description}</p>
                </div>

                {/* Arabic Text */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📖 Arabic Text</h3>
                  <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10 text-center">
                    <div className="text-2xl font-arabic text-brass mb-2 leading-relaxed">{prayerSteps[selectedDetailsStep].arabic}</div>
                    <div className="text-sm text-text dark:text-darktext italic mb-1">{prayerSteps[selectedDetailsStep].transliteration}</div>
                    <div className="text-sm text-text dark:text-darktext opacity-80">{prayerSteps[selectedDetailsStep].translation}</div>
                  </div>
                </div>

                {/* Audio Section */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">🔊 Audio Recitation</h3>
                  
                  {/* Audio Sequence Progress for qiyam and tashahhud */}
                  {(selectedDetailsStep === 'qiyam' || selectedDetailsStep === 'tashahhud') && audioSequenceInfo && audioSequenceInfo.step === selectedDetailsStep && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-brass">
                          Audio {audioSequenceInfo.currentIndex + 1} of {audioSequenceInfo.totalAudio}
                        </span>
                        <span className="text-xs text-text dark:text-darktext">
                          {Math.round(((audioSequenceInfo.currentIndex + 1) / audioSequenceInfo.totalAudio) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-brass/20 rounded-full h-2">
                        <div 
                          className="bg-brass h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((audioSequenceInfo.currentIndex + 1) / audioSequenceInfo.totalAudio) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-text dark:text-darktext mt-1">
                        {audioSequenceInfo.currentAudio?.description || 'Playing...'}
                      </div>
                    </div>
                  )}
                  
                  <button
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                      currentPlayingStep === selectedDetailsStep
                        ? 'bg-wood text-white shadow-lg scale-105' 
                        : 'bg-brass text-white hover:bg-wood hover:scale-102'
                    }`}
                    onClick={() => playAudio(selectedDetailsStep)}
                  >
                    <span className="text-lg">
                      {currentPlayingStep === selectedDetailsStep ? '⏸️' : '▶️'}
                    </span>
                    {currentPlayingStep === selectedDetailsStep 
                      ? (selectedDetailsStep === 'qiyam' || selectedDetailsStep === 'tashahhud') 
                        ? `Playing Sequence... (${audioSequenceInfo ? audioSequenceInfo.currentIndex + 1 : 1}/${audioSequenceInfo ? audioSequenceInfo.totalAudio : 3})`
                        : 'Playing...' 
                      : (selectedDetailsStep === 'qiyam' || selectedDetailsStep === 'tashahhud') 
                        ? `Play ${audioSequences[selectedDetailsStep]?.length || 3} Audio Sequence`
                        : prayerAudioUrls[selectedDetailsStep].description
                    }
                  </button>
                </div>

                {/* Video Section */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">🎥 Video Tutorial</h3>
                  <button
                    className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-brass text-white hover:bg-wood hover:scale-102 transition-all duration-300"
                    onClick={() => {
                      closeDetails();
                      playVideo(selectedDetailsStep);
                    }}
                  >
                    <span className="text-lg">▶️</span>
                    Watch Demo
                  </button>
                </div>

                {/* Rukoo Images Button (for Rukoo step only) */}
                {selectedDetailsStep === 'rukoo' && (
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                      onClick={() => setShowRukooImages(true)}
                    >
                      <span className="text-lg">🖼️</span>
                      See Rukoo Images
                    </button>
                  </div>
                )}

                {/* Sajda Images Button (for Sajda step only) */}
                {selectedDetailsStep === 'sajda' && (
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                      onClick={() => setShowSajdaImages(true)}
                    >
                      <span className="text-lg">🖼️</span>
                      See Sajda Images
                    </button>
                  </div>
                )}

                {/* Takbir Images Button (for Takbir step only) */}
                {selectedDetailsStep === 'takbir' && (
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                      onClick={() => setShowTakbirImages(true)}
                    >
                      <span className="text-lg">🖼️</span>
                      See Takbir Images
                    </button>
                  </div>
                )}

                {/* Qiyam Images Button (for Qiyam step only) */}
                {selectedDetailsStep === 'qiyam' && (
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                      onClick={() => setShowQiyamImages(true)}
                    >
                      <span className="text-lg">🖼️</span>
                      See Qiyam Images
                    </button>
                  </div>
                )}

                {/* Jalsa Images Button (for Jalsa step only) */}
                {selectedDetailsStep === 'jalsa' && (
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                      onClick={() => setShowJalsaImages(true)}
                    >
                      <span className="text-lg">🖼️</span>
                      See Jalsa Images
                    </button>
                  </div>
                )}

                {/* Tashahhud Images Button (for Tashahhud step only) */}
                {selectedDetailsStep === 'tashahhud' && (
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                      onClick={() => setShowTashahhudImages(true)}
                    >
                      <span className="text-lg">🖼️</span>
                      See Tashahhud Images
                    </button>
                  </div>
                )}

                {/* Salam Images Button (for Salam step only) */}
                {selectedDetailsStep === 'salam' && (
                  <div className="mt-4">
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                      onClick={() => setShowSalamImages(true)}
                    >
                      <span className="text-lg">🖼️</span>
                      See Salam Images
                    </button>
                  </div>
                )}

                {/* Complete Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📋 Complete Instructions</h3>
                  <div className="space-y-3">
                    {prayerSteps[selectedDetailsStep].instructions.map((instruction, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                        <span className="text-brass font-bold text-lg mt-1">{i + 1}.</span>
                        <span className="text-text dark:text-darktext leading-relaxed">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedStep && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">{prayerSteps[selectedStep].title}</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={stopVideo}
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video mb-6 bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={prayerVideoUrls[selectedStep].video}
                  title={prayerSteps[selectedStep].title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="text-text dark:text-darktext space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📖 Description</h3>
                  <p className="text-lg leading-relaxed">{prayerVideoUrls[selectedStep].description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brass mb-3">📝 Step Details</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="font-semibold text-brass mb-2">Arabic:</div>
                      <div className="text-lg font-arabic text-text dark:text-darktext leading-relaxed">{prayerSteps[selectedStep].arabic}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="font-semibold text-brass mb-2">Transliteration:</div>
                      <div className="text-text dark:text-darktext leading-relaxed">{prayerSteps[selectedStep].transliteration}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                      <div className="font-semibold text-brass mb-2">Translation:</div>
                      <div className="text-text dark:text-darktext leading-relaxed">{prayerSteps[selectedStep].translation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Comprehensive Step Details Modal */}
        {showComprehensiveStep && selectedComprehensiveStep && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">{comprehensivePrayerSteps[selectedComprehensiveStep].title}</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowComprehensiveStep(false)}
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image and Description */}
                <div className="space-y-6">
                  {/* Step Image - Show ALL images for each step in a grid */}
                  {selectedComprehensiveStep === 'takbir' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {takbirImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedImageIndex(index); setZoomLevel(1); setShowTakbirImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedComprehensiveStep === 'qiyam' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {qiyamImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedQiyamImageIndex(index); setQiyamZoomLevel(1); setShowQiyamImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedComprehensiveStep === 'rukoo' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {rukooImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedRukooImageIndex(index); setRukooZoomLevel(1); setShowRukooImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedComprehensiveStep === 'sajda' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sajdaImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedSajdaImageIndex(index); setSajdaZoomLevel(1); setShowSajdaImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedComprehensiveStep === 'jalsa' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {jalsaImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedJalsaImageIndex(index); setJalsaZoomLevel(1); setShowJalsaImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedComprehensiveStep === 'tashahhud' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tashahhudImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedTashahhudImageIndex(index); setTashahhudZoomLevel(1); setShowTashahhudImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Niyyah images */}
                  {selectedComprehensiveStep === 'niyyah' && (
                    <div className="grid grid-cols-1 gap-4">
                      {niyyahImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedNiyyahImageIndex(index); setNiyyahZoomLevel(1); setShowNiyyahImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Salam images */}
                  {selectedComprehensiveStep === 'salam' && (
                    <div className="grid grid-cols-1 gap-4">
                      {salamImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                          onClick={() => { setZoomedSalamImageIndex(index); setSalamZoomLevel(1); setShowSalamImages(true); }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-white text-xs font-bold text-center px-2">{image.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                    <h3 className="text-xl font-bold text-brass mb-3">📝 Description</h3>
                    <p className="text-lg text-text dark:text-darktext leading-relaxed">
                      {comprehensivePrayerSteps[selectedComprehensiveStep].description}
                    </p>
                  </div>

                  {/* Tips */}
                  {comprehensivePrayerSteps[selectedComprehensiveStep].tips && (
                    <div className="bg-gradient-to-r from-wood/5 to-brass/5 rounded-xl p-6 border border-wood/20">
                      <h3 className="text-xl font-bold text-wood mb-3">💡 Helpful Tips</h3>
                      <div className="space-y-2">
                        {comprehensivePrayerSteps[selectedComprehensiveStep].tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="text-wood font-bold text-lg mt-1">•</span>
                            <span className="text-text dark:text-darktext leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                  {/* Arabic Text */}
                  <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                    <h3 className="text-xl font-bold text-brass mb-3">📖 Arabic Text</h3>
                    <div className="text-center space-y-3">
                      <div className="text-2xl font-arabic text-brass leading-relaxed">
                        {comprehensivePrayerSteps[selectedComprehensiveStep].arabic.split('\n').map((line, index) => (
                          <div key={index} className="mb-2">{line}</div>
                        ))}
                      </div>
                      <div className="text-sm text-text dark:text-darktext italic">
                        {comprehensivePrayerSteps[selectedComprehensiveStep].transliteration.split('\n').map((line, index) => (
                          <div key={index} className="mb-1">{line}</div>
                        ))}
                      </div>
                      <div className="text-sm text-text dark:text-darktext opacity-80">
                        {comprehensivePrayerSteps[selectedComprehensiveStep].translation.split('\n').map((line, index) => (
                          <div key={index} className="mb-1">{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Audio Section */}
                  <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                    <h3 className="text-xl font-bold text-brass mb-3">🔊 Audio Recitation</h3>
                    
                    {/* Audio Sequence Progress for qiyam and tashahhud */}
                    {(selectedComprehensiveStep === 'qiyam' || selectedComprehensiveStep === 'tashahhud') && audioSequenceInfo && audioSequenceInfo.step === selectedComprehensiveStep && (
                      <div className="mb-3 p-3 bg-gradient-to-r from-brass/10 to-wood/10 rounded-lg border border-brass/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-brass">
                            Audio {audioSequenceInfo.currentIndex + 1} of {audioSequenceInfo.totalAudio}
                          </span>
                          <span className="text-xs text-text dark:text-darktext">
                            {Math.round(((audioSequenceInfo.currentIndex + 1) / audioSequenceInfo.totalAudio) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-brass/20 rounded-full h-2">
                          <div 
                            className="bg-brass h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((audioSequenceInfo.currentIndex + 1) / audioSequenceInfo.totalAudio) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-text dark:text-darktext mt-1">
                          {audioSequenceInfo.currentAudio?.description || 'Playing...'}
                        </div>
                      </div>
                    )}
                    
                    <button
                      className={`w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                        currentPlayingStep === selectedComprehensiveStep
                          ? 'bg-wood text-white shadow-lg scale-105' 
                          : 'bg-brass text-white hover:bg-wood hover:scale-102'
                      }`}
                      onClick={() => playAudio(selectedComprehensiveStep)}
                    >
                      <span className="text-lg">
                        {currentPlayingStep === selectedComprehensiveStep ? '⏸️' : '▶️'}
                      </span>
                      {currentPlayingStep === selectedComprehensiveStep 
                        ? (selectedComprehensiveStep === 'qiyam' || selectedComprehensiveStep === 'tashahhud') 
                          ? `Playing Sequence... (${audioSequenceInfo ? audioSequenceInfo.currentIndex + 1 : 1}/${audioSequenceInfo ? audioSequenceInfo.totalAudio : 3})`
                          : 'Playing...' 
                        : (selectedComprehensiveStep === 'qiyam' || selectedComprehensiveStep === 'tashahhud') 
                          ? `Play ${audioSequences[selectedComprehensiveStep]?.length || 3} Audio Sequence`
                          : prayerAudioUrls[selectedComprehensiveStep]?.description || 'Play Audio'
                      }
                    </button>
                  </div>

                  {/* Video Section */}
                  <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                    <h3 className="text-xl font-bold text-brass mb-3">🎥 Video Tutorial</h3>
                    <button
                      className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-brass text-white hover:bg-wood hover:scale-102 transition-all duration-300"
                      onClick={() => {
                        setShowComprehensiveStep(false);
                        playVideo(selectedComprehensiveStep);
                      }}
                    >
                      <span className="text-lg">▶️</span>
                      Watch Demo
                    </button>
                  </div>

                  {/* Image Gallery Buttons - Show under video section for each step */}
                  {selectedComprehensiveStep === 'takbir' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Takbir Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowTakbirImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Takbir Images
                      </button>
                    </div>
                  )}

                  {selectedComprehensiveStep === 'qiyam' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Qiyam Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowQiyamImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Qiyam Images
                      </button>
                    </div>
                  )}

                  {selectedComprehensiveStep === 'rukoo' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Rukoo Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowRukooImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Rukoo Images
                      </button>
                    </div>
                  )}

                  {selectedComprehensiveStep === 'sajda' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Sajda Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowSajdaImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Sajda Images
                      </button>
                    </div>
                  )}

                  {selectedComprehensiveStep === 'jalsa' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Jalsa Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowJalsaImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Jalsa Images
                      </button>
                    </div>
                  )}

                  {selectedComprehensiveStep === 'tashahhud' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Tashahhud Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowTashahhudImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Tashahhud Images
                      </button>
                    </div>
                  )}

                  {selectedComprehensiveStep === 'salam' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Salam Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowSalamImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Salam Images
                      </button>
                    </div>
                  )}

                  {selectedComprehensiveStep === 'niyyah' && (
                    <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                      <h3 className="text-xl font-bold text-brass mb-3">📸 Niyyah Images</h3>
                      <button
                        className="w-full px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-wood text-white hover:bg-brass hover:scale-102 transition-all duration-300"
                        onClick={() => setShowNiyyahImages(true)}
                      >
                        <span className="text-lg">🖼️</span>
                        View Niyyah Images
                      </button>
                    </div>
                  )}

                  {/* Complete Instructions */}
                  <div className="bg-gradient-to-r from-brass/5 to-wood/5 rounded-xl p-6 border border-brass/20">
                    <h3 className="text-xl font-bold text-brass mb-3">📋 Complete Instructions</h3>
                    <div className="space-y-3">
                      {comprehensivePrayerSteps[selectedComprehensiveStep].instructions.map((instruction, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-brass/5 to-wood/5 rounded-lg border border-brass/10">
                          <span className="text-brass font-bold text-lg mt-1">{i + 1}.</span>
                          <span className="text-text dark:text-darktext leading-relaxed">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        )}

        {/* Takbir Images Gallery Modal */}
        {showTakbirImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Takbir Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowTakbirImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {takbirImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedImageIndex(index); setZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Image Modal */}
        {zoomedImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={takbirImages[zoomedImageIndex].src}
                alt={takbirImages[zoomedImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${zoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {takbirImages[zoomedImageIndex].description}
              </div>
            </div>
          </div>
        )}

        {/* Qiyam Images Gallery Modal */}
        {showQiyamImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Qiyam Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowQiyamImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {qiyamImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedQiyamImageIndex(index); setQiyamZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Qiyam Image Modal */}
        {zoomedQiyamImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedQiyamImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setQiyamZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setQiyamZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={qiyamImages[zoomedQiyamImageIndex].src}
                alt={qiyamImages[zoomedQiyamImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${qiyamZoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {qiyamImages[zoomedQiyamImageIndex].description}
              </div>
            </div>
          </div>
        )}

        {/* Jalsa Images Gallery Modal */}
        {showJalsaImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Jalsa Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowJalsaImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {jalsaImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedJalsaImageIndex(index); setJalsaZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Jalsa Image Modal */}
        {zoomedJalsaImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedJalsaImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setJalsaZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setJalsaZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={jalsaImages[zoomedJalsaImageIndex].src}
                alt={jalsaImages[zoomedJalsaImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${jalsaZoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {jalsaImages[zoomedJalsaImageIndex].description}
              </div>
            </div>
          </div>
        )}

        {/* Sajda Images Gallery Modal */}
        {showSajdaImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Sajda Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowSajdaImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sajdaImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedSajdaImageIndex(index); setSajdaZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Sajda Image Modal */}
        {zoomedSajdaImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedSajdaImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setSajdaZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setSajdaZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={sajdaImages[zoomedSajdaImageIndex].src}
                alt={sajdaImages[zoomedSajdaImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${sajdaZoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {sajdaImages[zoomedSajdaImageIndex].description}
              </div>
            </div>
          </div>
        )}

        {/* Rukoo Images Gallery Modal */}
        {showRukooImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Rukoo Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowRukooImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rukooImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedRukooImageIndex(index); setRukooZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Rukoo Image Modal */}
        {zoomedRukooImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedRukooImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setRukooZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setRukooZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={rukooImages[zoomedRukooImageIndex].src}
                alt={rukooImages[zoomedRukooImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${rukooZoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {rukooImages[zoomedRukooImageIndex].description}
              </div>
            </div>
          </div>
        )}

        {/* Tashahhud Images Gallery Modal */}
        {showTashahhudImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Tashahhud Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowTashahhudImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tashahhudImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedTashahhudImageIndex(index); setTashahhudZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Tashahhud Image Modal */}
        {zoomedTashahhudImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedTashahhudImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setTashahhudZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setTashahhudZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={tashahhudImages[zoomedTashahhudImageIndex].src}
                alt={tashahhudImages[zoomedTashahhudImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${tashahhudZoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {tashahhudImages[zoomedTashahhudImageIndex].description}
              </div>
            </div>
          </div>
        )}

        {/* Salam Images Gallery Modal */}
        {showSalamImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Salam Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowSalamImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {salamImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedSalamImageIndex(index); setSalamZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Salam Image Modal */}
        {zoomedSalamImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedSalamImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setSalamZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setSalamZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={salamImages[zoomedSalamImageIndex].src}
                alt={salamImages[zoomedSalamImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${salamZoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {salamImages[zoomedSalamImageIndex].description}
              </div>
            </div>
          </div>
        )}

        {/* Niyyah Images Gallery Modal */}
        {showNiyyahImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-brass/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brass">Niyyah Images</h2>
                <button
                  className="text-3xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                  onClick={() => setShowNiyyahImages(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {niyyahImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brass/20 to-wood/20 cursor-pointer"
                    onClick={() => { setZoomedNiyyahImageIndex(index); setNiyyahZoomLevel(1); }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-lg font-bold text-center">{image.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoomed Niyyah Image Modal */}
        {zoomedNiyyahImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative flex flex-col items-center">
              <button
                className="absolute top-0 right-0 text-4xl text-brass hover:text-wood transition-all duration-300 hover:scale-110"
                style={{ top: 0, right: 0 }}
                onClick={() => setZoomedNiyyahImageIndex(null)}
              >
                ✕
              </button>
              <div className="flex gap-4 mb-4">
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setNiyyahZoomLevel(z => Math.max(0.5, z - 0.2))}
                >
                  -
                </button>
                <button
                  className="px-4 py-2 bg-brass text-white rounded-lg text-xl font-bold hover:bg-wood transition-all duration-300"
                  onClick={() => setNiyyahZoomLevel(z => Math.min(3, z + 0.2))}
                >
                  +
                </button>
              </div>
              <img
                src={niyyahImages[zoomedNiyyahImageIndex].src}
                alt={niyyahImages[zoomedNiyyahImageIndex].alt}
                style={{ maxHeight: '70vh', maxWidth: '90vw', transform: `scale(${niyyahZoomLevel})`, transition: 'transform 0.3s' }}
                className="rounded-xl shadow-2xl border border-brass/30 bg-white"
              />
              <div className="mt-4 text-white text-lg text-center max-w-xl">
                {niyyahImages[zoomedNiyyahImageIndex].description}
              </div>
            </div>
          </div>
        )}
      </div>
    </MotionDiv>
  );
} 