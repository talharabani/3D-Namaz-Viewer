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
    },
    {
      arabic: "اللَّهُمَّ أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
      transliteration: "Allahumma asbahna wa asbahal-mulku lillah",
      translation: "O Allah, we have reached the morning and the kingdom belongs to Allah."
    },
    {
      arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ فَمِنْكَ وَحْدَكَ",
      transliteration: "Allahumma ma asbaha bi min ni'matin faminka wahdaka",
      translation: "O Allah, whatever blessing I have this morning is from You alone."
    }
  ],
  prayer: [
    {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruka",
      translation: "Glory be to You, O Allah, and praise be to You, blessed is Your name, and exalted is Your majesty, and there is no deity except You."
    },
    {
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      transliteration: "A'oodhu billahi minash-shaytanir-rajeem",
      translation: "I seek refuge with Allah from Satan, the accursed."
    },
    {
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      transliteration: "Bismillahir-rahmanir-raheem",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
    },
    {
      arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ",
      transliteration: "Allahumma ba'id bayni wa bayna khataayaya kama ba'adta baynal-mashriqi wal-maghrib",
      translation: "O Allah, distance me from my sins as You have distanced the East from the West."
    },
    {
      arabic: "اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ",
      transliteration: "Allahumma naqqini minal-khataaya kama yunaqqath-thawbul-abyadu minad-danas",
      translation: "O Allah, cleanse me of my sins as a white garment is cleansed of dirt."
    },
    {
      arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      transliteration: "Subhanallahi walhamdulillahi wa la ilaha illallahu wallahu akbar",
      translation: "Glory be to Allah, and praise be to Allah, and there is no deity except Allah, and Allah is the Greatest."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr",
      translation: "O Allah, I seek refuge with You from the punishment of the grave."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi jahannam",
      translation: "O Allah, I seek refuge with You from the punishment of Hell."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-faqr",
      translation: "O Allah, I seek refuge with You from poverty."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ يَوْمِ الدِّينِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi yawmid-deen",
      translation: "O Allah, I seek refuge with You from the punishment of the Day of Judgment."
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      translation: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire."
    },
    {
      arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
      transliteration: "Allahumma-ghfir li dhanbi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa 'alaniyatahu wa sirrahu",
      translation: "O Allah, forgive me all my sins, small and great, first and last, open and secret."
    }
  ],
  protection: [
    {
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      transliteration: "A'oodhu billahi minash-shaytanir-rajeem",
      translation: "I seek refuge with Allah from Satan, the accursed."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma khalaqta",
      translation: "O Allah, I seek refuge with You from the evil of what You have created."
    },
    {
      arabic: "بِسْمِ اللهِ الَّذِي لا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلا فِي السَّمَاءِ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i",
      translation: "In the name of Allah, with whose name nothing can harm on earth or in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-bukhl",
      translation: "O Allah, I seek refuge with You from cowardice and miserliness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr wa min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the punishment of the grave and from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'oodhu bika minal-hammi wal-hazan",
      translation: "O Allah, I seek refuge with You from anxiety and grief."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-'ajzi wal-kasal",
      translation: "O Allah, I seek refuge with You from inability and laziness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْهَرَمِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-haram",
      translation: "O Allah, I seek refuge with You from cowardice and old age."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri al-waswasil-khannas",
      translation: "O Allah, I seek refuge with You from the evil of the whispering devil."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي الأَرْضِ وَمِنْ شَرِّ مَا فِي السَّمَاءِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma fil-ardi wa min sharri ma fis-sama'i",
      translation: "O Allah, I seek refuge with You from the evil of what is on earth and from the evil of what is in heaven."
    },
    {
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul-'arshil-'azeem",
      translation: "Allah is sufficient for me. There is no deity except Him. I have placed my trust in Him, and He is the Lord of the Great Throne."
    }
  ],
  hardship: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'oodhu bika minal-hammi wal-hazan",
      translation: "O Allah, I seek refuge with You from anxiety and grief."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-'ajzi wal-kasal",
      translation: "O Allah, I seek refuge with You from inability and laziness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-bukhl",
      translation: "O Allah, I seek refuge with You from cowardice and miserliness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      transliteration: "Allahumma inni a'oodhu bika min ghalabatid-dayn wa qahrir-rijal",
      translation: "O Allah, I seek refuge with You from being overcome by debt and from being overpowered by men."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي الأَرْضِ وَمِنْ شَرِّ مَا فِي السَّمَاءِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma fil-ardi wa min sharri ma fis-sama'i",
      translation: "O Allah, I seek refuge with You from the evil of what is on earth and from the evil of what is in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr",
      translation: "O Allah, I seek refuge with You from the punishment of the grave."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi jahannam",
      translation: "O Allah, I seek refuge with You from the punishment of Hell."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ يَوْمِ الدِّينِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi yawmid-deen",
      translation: "O Allah, I seek refuge with You from the punishment of the Day of Judgment."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-faqr",
      translation: "O Allah, I seek refuge with You from poverty."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-kufri wal-faqr",
      translation: "O Allah, I seek refuge with You from disbelief and poverty."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma khalaqta",
      translation: "O Allah, I seek refuge with You from the evil of what You have created."
    }
  ],
  relationship: [
    {
      arabic: "اللَّهُمَّ أَحْسِنْ خُلُقِي كَمَا أَحْسَنْتَ خَلْقِي",
      transliteration: "Allahumma ahsin khuluqi kama ahsanta khalqi",
      translation: "O Allah, make my character good as You have made my creation good."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
      transliteration: "Allahumma inni as'aluka hubbaka wa hubba man yuhibbuka",
      translation: "O Allah, I ask You for Your love and the love of those who love You."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي",
      transliteration: "Allahumma aslih li deeni alladhi huwa 'ismatu amri",
      translation: "O Allah, rectify my religion which is the safeguard of my affairs."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي",
      transliteration: "Allahumma aslih li dunyaya allati fiha ma'ashi",
      translation: "O Allah, rectify my worldly affairs in which is my livelihood."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
      transliteration: "Allahumma aslih li akhirati allati fiha ma'adi",
      translation: "O Allah, rectify my Hereafter in which is my return."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ",
      transliteration: "Allahumma-j'alil-hayata ziyadatan li fi kulli khayr",
      translation: "O Allah, make life for me an increase in every good."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ",
      transliteration: "Allahumma-j'alil-mawta rahatan li min kulli sharr",
      translation: "O Allah, make death for me a relief from every evil."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ",
      transliteration: "Allahumma inni a'oodhu bika min 'ilmin la yanfa'",
      translation: "O Allah, I seek refuge with You from knowledge that does not benefit."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ قَلْبٍ لَا يَخْشَعُ",
      transliteration: "Allahumma inni a'oodhu bika min qalbin la yakhsha'",
      translation: "O Allah, I seek refuge with You from a heart that does not fear."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ نَفْسٍ لَا تَشْبَعُ",
      transliteration: "Allahumma inni a'oodhu bika min nafsin la tashba'",
      translation: "O Allah, I seek refuge with You from a soul that is not satisfied."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا",
      transliteration: "Allahumma inni a'oodhu bika min da'watin la yustajabu laha",
      translation: "O Allah, I seek refuge with You from a supplication that is not answered."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا أَعْطَيْتَنَا",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma a'taytana",
      translation: "O Allah, I seek refuge with You from the evil of what You have given us."
    }
  ],
  general: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي وَعَقْلِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi wa 'aqli",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, my heart, and my mind."
    }
  ],
  hajj: [
    {
      arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ",
      transliteration: "Labbaik Allahumma labbaik, labbaik la shareeka laka labbaik",
      translation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ",
      transliteration: "Allahumma inni as'aluka ridaka wal-jannah",
      translation: "O Allah, I ask You for Your pleasure and Paradise."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَسَعْيًا مَشْكُورًا",
      transliteration: "Allahumma-j'alhu hajjan mabrooran wa sa'yan mashkooran",
      translation: "O Allah, make it an accepted Hajj and a rewarded effort."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-'ajzi wal-kasal",
      translation: "O Allah, I seek refuge with You from inability and laziness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-bukhl",
      translation: "O Allah, I seek refuge with You from cowardice and miserliness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      transliteration: "Allahumma inni a'oodhu bika min ghalabatid-dayn wa qahrir-rijal",
      translation: "O Allah, I seek refuge with You from being overcome by debt and from being overpowered by men."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي الأَرْضِ وَمِنْ شَرِّ مَا فِي السَّمَاءِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma fil-ardi wa min sharri ma fis-sama'i",
      translation: "O Allah, I seek refuge with You from the evil of what is on earth and from the evil of what is in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr",
      translation: "O Allah, I seek refuge with You from the punishment of the grave."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi jahannam",
      translation: "O Allah, I seek refuge with You from the punishment of Hell."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ يَوْمِ الدِّينِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi yawmid-deen",
      translation: "O Allah, I seek refuge with You from the punishment of the Day of Judgment."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-faqr",
      translation: "O Allah, I seek refuge with You from poverty."
    }
  ],
  ramadan: [
    {
      arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
      transliteration: "Allahumma ahillahu 'alayna bil-amni wal-eemani was-salamati wal-islam",
      translation: "O Allah, bring it upon us with security, faith, safety, and Islam."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ",
      transliteration: "Allahumma inni as'aluka birahmatika allati wasi'at kulla shay'in",
      translation: "O Allah, I ask You by Your mercy which encompasses everything."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    }
  ],
  weather: [
    {
      arabic: "اللَّهُمَّ أَسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا مَرِيعًا نَافِعًا غَيْرَ ضَارٍّ",
      transliteration: "Allahumma asqina ghaythan mughithan mari'an mari'an nafi'an ghayra dar",
      translation: "O Allah, give us beneficial rain, not harmful."
    },
    {
      arabic: "اللَّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا",
      transliteration: "Allahumma hawalan wa la 'alayna",
      translation: "O Allah, around us and not upon us."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي الأَرْضِ وَمِنْ شَرِّ مَا فِي السَّمَاءِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma fil-ardi wa min sharri ma fis-sama'i",
      translation: "O Allah, I seek refuge with You from the evil of what is on earth and from the evil of what is in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma khalaqta",
      translation: "O Allah, I seek refuge with You from the evil of what You have created."
    },
    {
      arabic: "بِسْمِ اللهِ الَّذِي لا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلا فِي السَّمَاءِ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i",
      translation: "In the name of Allah, with whose name nothing can harm on earth or in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-bukhl",
      translation: "O Allah, I seek refuge with You from cowardice and miserliness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr wa min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the punishment of the grave and from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'oodhu bika minal-hammi wal-hazan",
      translation: "O Allah, I seek refuge with You from anxiety and grief."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-'ajzi wal-kasal",
      translation: "O Allah, I seek refuge with You from inability and laziness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْهَرَمِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-haram",
      translation: "O Allah, I seek refuge with You from cowardice and old age."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri al-waswasil-khannas",
      translation: "O Allah, I seek refuge with You from the evil of the whispering devil."
    }
  ],
  sickness: [
    {
      arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ وَاشْفِ أَنْتَ الشَّافِي",
      transliteration: "Allahumma rabban-nasi adhhibil-ba'sa washfi anta ash-shafi",
      translation: "O Allah, Lord of the people, remove the harm and cure, You are the Healer."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'oodhu bika minal-hammi wal-hazan",
      translation: "O Allah, I seek refuge with You from anxiety and grief."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-'ajzi wal-kasal",
      translation: "O Allah, I seek refuge with You from inability and laziness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-bukhl",
      translation: "O Allah, I seek refuge with You from cowardice and miserliness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      transliteration: "Allahumma inni a'oodhu bika min ghalabatid-dayn wa qahrir-rijal",
      translation: "O Allah, I seek refuge with You from being overcome by debt and from being overpowered by men."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي الأَرْضِ وَمِنْ شَرِّ مَا فِي السَّمَاءِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma fil-ardi wa min sharri ma fis-sama'i",
      translation: "O Allah, I seek refuge with You from the evil of what is on earth and from the evil of what is in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr",
      translation: "O Allah, I seek refuge with You from the punishment of the grave."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi jahannam",
      translation: "O Allah, I seek refuge with You from the punishment of Hell."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ يَوْمِ الدِّينِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi yawmid-deen",
      translation: "O Allah, I seek refuge with You from the punishment of the Day of Judgment."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-faqr",
      translation: "O Allah, I seek refuge with You from poverty."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-kufri wal-faqr",
      translation: "O Allah, I seek refuge with You from disbelief and poverty."
    }
  ],
  social: [
    {
      arabic: "اللَّهُمَّ أَحْسِنْ خُلُقِي كَمَا أَحْسَنْتَ خَلْقِي",
      transliteration: "Allahumma ahsin khuluqi kama ahsanta khalqi",
      translation: "O Allah, make my character good as You have made my creation good."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
      transliteration: "Allahumma inni as'aluka hubbaka wa hubba man yuhibbuka",
      translation: "O Allah, I ask You for Your love and the love of those who love You."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي",
      transliteration: "Allahumma aslih li deeni alladhi huwa 'ismatu amri",
      translation: "O Allah, rectify my religion which is the safeguard of my affairs."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي",
      transliteration: "Allahumma aslih li dunyaya allati fiha ma'ashi",
      translation: "O Allah, rectify my worldly affairs in which is my livelihood."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
      transliteration: "Allahumma aslih li akhirati allati fiha ma'adi",
      translation: "O Allah, rectify my Hereafter in which is my return."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ",
      transliteration: "Allahumma-j'alil-hayata ziyadatan li fi kulli khayr",
      translation: "O Allah, make life for me an increase in every good."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ",
      transliteration: "Allahumma-j'alil-mawta rahatan li min kulli sharr",
      translation: "O Allah, make death for me a relief from every evil."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ",
      transliteration: "Allahumma inni a'oodhu bika min 'ilmin la yanfa'",
      translation: "O Allah, I seek refuge with You from knowledge that does not benefit."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ قَلْبٍ لَا يَخْشَعُ",
      transliteration: "Allahumma inni a'oodhu bika min qalbin la yakhsha'",
      translation: "O Allah, I seek refuge with You from a heart that does not fear."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ نَفْسٍ لَا تَشْبَعُ",
      transliteration: "Allahumma inni a'oodhu bika min nafsin la tashba'",
      translation: "O Allah, I seek refuge with You from a soul that is not satisfied."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا",
      transliteration: "Allahumma inni a'oodhu bika min da'watin la yustajabu laha",
      translation: "O Allah, I seek refuge with You from a supplication that is not answered."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا أَعْطَيْتَنَا",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma a'taytana",
      translation: "O Allah, I seek refuge with You from the evil of what You have given us."
    }
  ],
  rizq: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي وَعَقْلِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi wa 'aqli",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, my heart, and my mind."
    }
  ],
  repentance: [
    {
      arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
      transliteration: "Allahumma-ghfir li dhanbi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa 'alaniyatahu wa sirrahu",
      translation: "O Allah, forgive me all my sins, small and great, first and last, open and secret."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'oodhu bika minal-hammi wal-hazan",
      translation: "O Allah, I seek refuge with You from anxiety and grief."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-'ajzi wal-kasal",
      translation: "O Allah, I seek refuge with You from inability and laziness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-bukhl",
      translation: "O Allah, I seek refuge with You from cowardice and miserliness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      transliteration: "Allahumma inni a'oodhu bika min ghalabatid-dayn wa qahrir-rijal",
      translation: "O Allah, I seek refuge with You from being overcome by debt and from being overpowered by men."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي الأَرْضِ وَمِنْ شَرِّ مَا فِي السَّمَاءِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma fil-ardi wa min sharri ma fis-sama'i",
      translation: "O Allah, I seek refuge with You from the evil of what is on earth and from the evil of what is in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr",
      translation: "O Allah, I seek refuge with You from the punishment of the grave."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi jahannam",
      translation: "O Allah, I seek refuge with You from the punishment of Hell."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ يَوْمِ الدِّينِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi yawmid-deen",
      translation: "O Allah, I seek refuge with You from the punishment of the Day of Judgment."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-faqr",
      translation: "O Allah, I seek refuge with You from poverty."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-kufri wal-faqr",
      translation: "O Allah, I seek refuge with You from disbelief and poverty."
    }
  ],
  enemy: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma khalaqta",
      translation: "O Allah, I seek refuge with You from the evil of what You have created."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا فِي الأَرْضِ وَمِنْ شَرِّ مَا فِي السَّمَاءِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma fil-ardi wa min sharri ma fis-sama'i",
      translation: "O Allah, I seek refuge with You from the evil of what is on earth and from the evil of what is in heaven."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      transliteration: "Allahumma inni a'oodhu bika min sharri al-waswasil-khannas",
      translation: "O Allah, I seek refuge with You from the evil of the whispering devil."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-bukhl",
      translation: "O Allah, I seek refuge with You from cowardice and miserliness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      transliteration: "Allahumma inni a'oodhu bika min ghalabatid-dayn wa qahrir-rijal",
      translation: "O Allah, I seek refuge with You from being overcome by debt and from being overpowered by men."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'oodhu bika minal-hammi wal-hazan",
      translation: "O Allah, I seek refuge with You from anxiety and grief."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration: "Allahumma inni a'oodhu bika minal-'ajzi wal-kasal",
      translation: "O Allah, I seek refuge with You from inability and laziness."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْهَرَمِ",
      transliteration: "Allahumma inni a'oodhu bika minal-jubni wal-haram",
      translation: "O Allah, I seek refuge with You from cowardice and old age."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration: "Allahumma inni a'oodhu bika min fitnatil-mahya wal-mamat",
      translation: "O Allah, I seek refuge with You from the trials of life and death."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr",
      translation: "O Allah, I seek refuge with You from the punishment of the grave."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi jahannam",
      translation: "O Allah, I seek refuge with You from the punishment of Hell."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ يَوْمِ الدِّينِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi yawmid-deen",
      translation: "O Allah, I seek refuge with You from the punishment of the Day of Judgment."
    }
  ],
  business: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي وَعَقْلِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi wa 'aqli",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, my heart, and my mind."
    }
  ],
  success: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي وَعَقْلِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi wa 'aqli",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, my heart, and my mind."
    }
  ],
  love: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
      transliteration: "Allahumma inni as'aluka hubbaka wa hubba man yuhibbuka",
      translation: "O Allah, I ask You for Your love and the love of those who love You."
    },
    {
      arabic: "اللَّهُمَّ أَحْسِنْ خُلُقِي كَمَا أَحْسَنْتَ خَلْقِي",
      transliteration: "Allahumma ahsin khuluqi kama ahsanta khalqi",
      translation: "O Allah, make my character good as You have made my creation good."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي",
      transliteration: "Allahumma aslih li deeni alladhi huwa 'ismatu amri",
      translation: "O Allah, rectify my religion which is the safeguard of my affairs."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي",
      transliteration: "Allahumma aslih li dunyaya allati fiha ma'ashi",
      translation: "O Allah, rectify my worldly affairs in which is my livelihood."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
      transliteration: "Allahumma aslih li akhirati allati fiha ma'adi",
      translation: "O Allah, rectify my Hereafter in which is my return."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ",
      transliteration: "Allahumma-j'alil-hayata ziyadatan li fi kulli khayr",
      translation: "O Allah, make life for me an increase in every good."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ",
      transliteration: "Allahumma-j'alil-mawta rahatan li min kulli sharr",
      translation: "O Allah, make death for me a relief from every evil."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ",
      transliteration: "Allahumma inni a'oodhu bika min 'ilmin la yanfa'",
      translation: "O Allah, I seek refuge with You from knowledge that does not benefit."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ قَلْبٍ لَا يَخْشَعُ",
      transliteration: "Allahumma inni a'oodhu bika min qalbin la yakhsha'",
      translation: "O Allah, I seek refuge with You from a heart that does not fear."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ نَفْسٍ لَا تَشْبَعُ",
      transliteration: "Allahumma inni a'oodhu bika min nafsin la tashba'",
      translation: "O Allah, I seek refuge with You from a soul that is not satisfied."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا",
      transliteration: "Allahumma inni a'oodhu bika min da'watin la yustajabu laha",
      translation: "O Allah, I seek refuge with You from a supplication that is not answered."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا أَعْطَيْتَنَا",
      transliteration: "Allahumma inni a'oodhu bika min sharri ma a'taytana",
      translation: "O Allah, I seek refuge with You from the evil of what You have given us."
    }
  ],
  prophetlove: [
    {
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad",
      translation: "O Allah, send blessings upon Muhammad and upon the family of Muhammad."
    },
    {
      arabic: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      transliteration: "Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad",
      translation: "O Allah, send blessings upon Muhammad and upon the family of Muhammad."
    },
    {
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahim wa 'ala ali Ibrahim",
      translation: "O Allah, send blessings upon Muhammad and upon the family of Muhammad as You sent blessings upon Ibrahim and upon the family of Ibrahim."
    },
    {
      arabic: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ",
      transliteration: "Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin kama barakta 'ala Ibrahim wa 'ala ali Ibrahim",
      translation: "O Allah, send blessings upon Muhammad and upon the family of Muhammad as You sent blessings upon Ibrahim and upon the family of Ibrahim."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
      transliteration: "Allahumma inni as'aluka hubbaka wa hubba man yuhibbuka",
      translation: "O Allah, I ask You for Your love and the love of those who love You."
    },
    {
      arabic: "اللَّهُمَّ أَحْسِنْ خُلُقِي كَمَا أَحْسَنْتَ خَلْقِي",
      transliteration: "Allahumma ahsin khuluqi kama ahsanta khalqi",
      translation: "O Allah, make my character good as You have made my creation good."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي",
      transliteration: "Allahumma aslih li deeni alladhi huwa 'ismatu amri",
      translation: "O Allah, rectify my religion which is the safeguard of my affairs."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي",
      transliteration: "Allahumma aslih li dunyaya allati fiha ma'ashi",
      translation: "O Allah, rectify my worldly affairs in which is my livelihood."
    },
    {
      arabic: "اللَّهُمَّ أَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
      transliteration: "Allahumma aslih li akhirati allati fiha ma'adi",
      translation: "O Allah, rectify my Hereafter in which is my return."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ",
      transliteration: "Allahumma-j'alil-hayata ziyadatan li fi kulli khayr",
      translation: "O Allah, make life for me an increase in every good."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ",
      transliteration: "Allahumma-j'alil-mawta rahatan li min kulli sharr",
      translation: "O Allah, make death for me a relief from every evil."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ",
      transliteration: "Allahumma inni a'oodhu bika min 'ilmin la yanfa'",
      translation: "O Allah, I seek refuge with You from knowledge that does not benefit."
    }
  ],
  imaan: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي وَعَقْلِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi wa 'aqli",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, my heart, and my mind."
    }
  ],
  dailybooster: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي وَعَقْلِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi wa 'aqli",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, my heart, and my mind."
    }
  ],
  consistency: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي وَعَقْلِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi wa 'aqli",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, my heart, and my mind."
    }
  ],
  beforesalah: [
    {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruka",
      translation: "Glory be to You, O Allah, and praise be to You, blessed is Your name, and exalted is Your majesty, and there is no deity except You."
    },
    {
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      transliteration: "A'oodhu billahi minash-shaytanir-rajeem",
      translation: "I seek refuge with Allah from Satan, the accursed."
    },
    {
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      transliteration: "Bismillahir-rahmanir-raheem",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
    },
    {
      arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ",
      transliteration: "Allahumma ba'id bayni wa bayna khataayaya kama ba'adta baynal-mashriqi wal-maghrib",
      translation: "O Allah, distance me from my sins as You have distanced the East from the West."
    },
    {
      arabic: "اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ",
      transliteration: "Allahumma naqqini minal-khataaya kama yunaqqath-thawbul-abyadu minad-danas",
      translation: "O Allah, cleanse me of my sins as a white garment is cleansed of dirt."
    },
    {
      arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      transliteration: "Subhanallahi walhamdulillahi wa la ilaha illallahu wallahu akbar",
      translation: "Glory be to Allah, and praise be to Allah, and there is no deity except Allah, and Allah is the Greatest."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabil-qabr",
      translation: "O Allah, I seek refuge with You from the punishment of the grave."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi jahannam",
      translation: "O Allah, I seek refuge with You from the punishment of Hell."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ",
      transliteration: "Allahumma inni a'oodhu bika minal-faqr",
      translation: "O Allah, I seek refuge with You from poverty."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ يَوْمِ الدِّينِ",
      transliteration: "Allahumma inni a'oodhu bika min 'adhabi yawmid-deen",
      translation: "O Allah, I seek refuge with You from the punishment of the Day of Judgment."
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      translation: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire."
    },
    {
      arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
      transliteration: "Allahumma-ghfir li dhanbi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa 'alaniyatahu wa sirrahu",
      translation: "O Allah, forgive me all my sins, small and great, first and last, open and secret."
    }
  ],
  aftersalah: [
    {
      arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      transliteration: "Subhanallahi walhamdulillahi wa la ilaha illallahu wallahu akbar",
      translation: "Glory be to Allah, and praise be to Allah, and there is no deity except Allah, and Allah is the Greatest."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
      translation: "O Allah, I ask You for guidance, piety, chastity, and independence."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirati",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya",
      translation: "O Allah, I ask You for pardon and well-being in my religion and my worldly affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي أَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my family and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my body and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي سَمْعِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi sam'i wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my hearing and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي جَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, and my sight."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, and my hearing."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي وَجَسَدِي وَبَصَرِي وَسَمْعِي وَقَلْبِي",
      transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyata fi deeni wa dunyaya wa ahli wa mali wa jasadi wa basari wa sam'i wa qalbi",
      translation: "O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, my wealth, my body, my sight, my hearing, and my heart."
    }
  ]
};

export default duaCategories;
