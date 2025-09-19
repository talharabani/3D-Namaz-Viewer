// Dua categories
const duaCategories = [
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

// Dummy duas for each category
const duasByCategory = {
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
      arabic: "اللّهُـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ",
      transliteration: "Allahumma anta rabbee la ilaha illa anta",
      translation: "O Allah, You are my Lord, there is no deity except You."
    },
    {
      arabic: "بِسْمِ اللهِ الَّذِي لا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un",
      translation: "In the name of Allah, with whose name nothing is harmed."
    }
  ],
  prayer: [
    {
      arabic: "اللَّهُمَّ رَبَّ هذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلاةِ القَائِمَةِ، آتِ مُحَمَّدًا الوَسِيلَةَ وَالفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
      transliteration: "Allahumma Rabba haadhihi-dda'watit-taammah, wa-s-salaatil-qaa'imah, aati Muhammadan-il-waseelata wal-fadheelah, wab'athhu maqaaman mahmoodan alladhee wa'adtah",
      translation: "O Allah! Lord of this perfect call and the prayer to be established, grant Muhammad the intercession and favor, and raise him to the praised station You have promised him."
    },
    {
      arabic: "اللَّهُمَّ اجعل في قَلْبِي نُورًا، وفي لِسَانِي نُورًا، وَاجْعَلْ في سَمْعِي نُورًا، وَاجْعَلْ في بَصَرِي نُورًا",
      transliteration: "Allahumma aj'al fi qalbi nooran, wa fi lisani nooran, waj'al fi sam'i nooran, waj'al fi basari nooran",
      translation: "O Allah, place light in my heart, light on my tongue, light in my hearing, and light in my sight."
    },
    {
      arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى",
      transliteration: "Subhaana Rabbiyal-A'la",
      translation: "Glory is to my Lord, the Most High."
    },
    {
      arabic: "اللَّهُمَّ أَنْتَ السَّلامُ، ومِنكَ السَّلامُ، تَبَارَكْتَ يَا ذَا الجَلالِ والإِكْرَامِ",
      transliteration: "Allahumma antas-salaam wa minkas-salaam, tabaarakta yaa Dhal-Jalaali wal-Ikraam",
      translation: "O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of Majesty and Honor."
    },
    {
      arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ",
      transliteration: "Rabbi-j'alni muqeemas-salah",
      translation: "My Lord, make me an establisher of prayer."
    }
  ],
  protection: [
    {
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِن شَرِّ مَا خَلَقَ",
      transliteration: "A'oodhu bikalimaatillaahit-taammaati min sharri maa khalaq",
      translation: "I seek refuge in the perfect words of Allah from the evil of what He has created."
    },
    {
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
      transliteration: "Subhaanal-ladhee sakhkhara lanaa haadha wa maa kunnaa lahu muqrineen, wa innaa ilaa Rabbinaa lamunqaliboon",
      translation: "Glory be to the One who has subjected this for us, and we could not have done it by ourselves. And surely, to our Lord we are returning."
    },
    {
      arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
      transliteration: "Allahumma ikfinihim bimaa shi'ta",
      translation: "O Allah, protect me from them in any way You wish."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ",
      transliteration: "Allahumma inni a'oodhu bika minal-barasi wal-junooni wal-judhaami wa min sayyi'il-asqaam",
      translation: "O Allah, I seek refuge with You from leprosy, madness, mutilation, and evil diseases."
    },
    {
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ",
      transliteration: "A'udhu bikalimatillahi tammati",
      translation: "I seek refuge in the perfect words of Allah."
    }
  ],
  hardship: [
    {
      arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
      transliteration: "Rabbi ighfir li wa tub 'alayya, innaka anta at-Tawwābu ar-Raḥīm",
      translation: "My Lord! Forgive me and turn to me in mercy. You are the One who accepts repentance, the Most Merciful."
    },
    {
      arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      transliteration: "Hasbunallahu wa ni'mal wakeel",
      translation: "Allah is sufficient for us, and He is the best disposer of affairs."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'oodhu bika minal-hammi wal-ḥazan",
      translation: "O Allah, I seek refuge in You from worry and sorrow."
    },
    {
      arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو، فَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ",
      transliteration: "Allahumma rahmataka arjoo falaa takilni ila nafsi ṭarfata 'ayn",
      translation: "O Allah, I hope for Your mercy. Do not leave me in charge of my affairs even for the blink of an eye."
    },
    {
      arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
      transliteration: "Allahumma ikfinihim bimaa shi'ta",
      translation: "O Allah, protect me from them in any way You wish."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ",
      transliteration: "Allahumma inni a'oodhu bika minal-barasi wal-junooni wal-judhaami wa min sayyi'il-asqaam",
      translation: "O Allah, I seek refuge with You from leprosy, madness, mutilation, and evil diseases."
    },
    {
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ",
      transliteration: "A'udhu bikalimatillahi tammati",
      translation: "I seek refuge in the perfect words of Allah."
    }
  ],
  relationship: [
    {
      arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      transliteration: "Rabbi irḥamhuma kamaa rabbayaani ṣagheera",
      translation: "My Lord! Have mercy upon them as they raised me when I was small."
    },
    {
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
      transliteration: "Rabbanaa hab lanaa min azwaajinaa wa dhurriyyaatinaa qurrata a'yun",
      translation: "Our Lord, grant us from among our spouses and offspring comfort to our eyes."
    },
    {
      arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
      transliteration: "Rabbi hab li minas-ṣāliḥīn",
      translation: "My Lord, grant me [a child] from among the righteous."
    },
    {
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
      transliteration: "Rabbanaa hab lanaa min azwaajinaa wa dhurriyyaatinaa qurrata a'yun",
      translation: "Our Lord, grant us from among our spouses and offspring comfort to our eyes."
    },
    {
      arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      transliteration: "Rabbi irḥamhuma kamaa rabbayaani ṣagheera",
      translation: "My Lord! Have mercy upon them as they raised me when I was small."
    },
    {
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
      transliteration: "Rabbanaa hab lanaa min azwaajinaa wa dhurriyyaatinaa qurrata a'yun",
      translation: "Our Lord, grant us from among our spouses and offspring comfort to our eyes."
    },
    {
      arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
      transliteration: "Rabbi hab li minas-ṣāliḥīn",
      translation: "My Lord, grant me [a child] from among the righteous."
    }
  ],
  general: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي (أَوْ قَالَ: عَاجِلِ أَمْرِي وَآجِلِهِ) فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي، ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي (أَوْ قَالَ: فِي عَاجِلِ أَمْرِي وَآجِلِهِ) فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي.",
      transliteration: "Allahumma inni astakheeruka bi'ilmik, wa astaqdiruka biqudratik, wa as'aluka min fadlikal-'azheem, fa innaka taqdiru wa la aqdiru, wa ta'lamu wa la a'lamu, wa anta 'allamul-ghuyoob. Allahumma in kunta ta'lamu anna haadhal-amra khayrun li fi deeni wa ma'aashi wa 'aaqibati amri (aw qaala: 'aajili amri wa aajilihi) faqdurhu li wa yassirhu li, thumma baarik li fihi, wa in kunta ta'lamu anna haadhal-amra sharrun li fi deeni wa ma'aashi wa 'aaqibati amri (aw qaala: fi 'aajili amri wa aajilihi) fasrifhu 'anni wasrifni 'anhu, waqdur li al-khayra haythu kaana, thumma ardini.",
      translation: "O Allah, I seek Your guidance [in making a choice] by Your knowledge, and I seek ability by Your power, and I ask You from Your great bounty. For You are able, while I am not, and You know, while I do not, and You are the Knower of the unseen. O Allah, if You know that this matter is good for me in my religion and in my life and for my welfare in the life to come (or he said: in the present and the future), then ordain it for me, make it easy for me, and bless it for me. And if You know that this matter is bad for me in my religion and in my life and for my welfare in the life to come (or he said: in the present and the future), then turn it away from me, and turn me away from it, and ordain for me the good wherever it may be and make me pleased with it."
    },
    {
      arabic: "اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا، مَرِيعًا مَرِيعًا، نَافِعًا غَيْرَ ضَارٍّ",
      transliteration: "Allahumma isqinaa ghaythan mugheethan, maree'an, naafi'an ghayra ḍārr",
      translation: "O Allah, grant us beneficial rain, plentiful and not harmful."
    },
    {
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      transliteration: "Rabbi zidni 'ilma",
      translation: "My Lord, increase me in knowledge."
    },
    {
      arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
      transliteration: "Laa ba'sa ṭahoorun in shaa Allah",
      translation: "No harm, it will be a purification, if Allah wills."
    },
    {
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      transliteration: "Allahumma iftaḥ li abwaaba raḥmatik",
      translation: "O Allah, open the gates of Your mercy for me."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      transliteration: "Allahumma inni as'aluka min faḍlik",
      translation: "O Allah, I ask You from Your bounty."
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
      transliteration: "Rabbana atina fid-dunya hasanah",
      translation: "Our Lord, give us in this world [that which is] good."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ",
      transliteration: "Allahumma inni astakheeruka bi'ilmik, wa astaqdiruka biqudratik",
      translation: "O Allah, I seek Your guidance through Your knowledge, and I seek ability through Your power..."
    },
    {
      arabic: "اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا، مَرِيعًا مَرِيعًا، نَافِعًا غَيْرَ ضَارٍّ",
      transliteration: "Allahumma isqinaa ghaythan mugheethan, maree'an, naafi'an ghayra ḍārr",
      translation: "O Allah, grant us beneficial rain, plentiful and not harmful."
    },
    {
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      transliteration: "Rabbi zidni 'ilma",
      translation: "My Lord, increase me in knowledge."
    },
    {
      arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
      transliteration: "Laa ba'sa ṭahoorun in shaa Allah",
      translation: "No harm, it will be a purification, if Allah wills."
    },
    {
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      transliteration: "Allahumma iftaḥ li abwaaba raḥmatik",
      translation: "O Allah, open the gates of Your mercy for me."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      transliteration: "Allahumma inni as'aluka min faḍlik",
      translation: "O Allah, I ask You from Your bounty."
    }
  ],
  hajj: [
    {
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      transliteration: "Allahumma iftah li abwāba raḥmatik",
      translation: "O Allah, open the gates of Your mercy for me."
    },
    {
      arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
      transliteration: "Bismillah, Allahu Akbar",
      translation: "In the name of Allah, Allah is the Greatest."
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana ātinā fid-dunyā ḥasanah wa fil-ākhirati ḥasanah wa qinā 'adhāban-nār",
      translation: "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire."
    },
    {
      arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
      transliteration: "Innaṣ-ṣafā wal-marwata min sha'ā'irillāh",
      translation: "Indeed, Safa and Marwah are among the symbols of Allah."
    },
    {
      arabic: "لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "Lā ilāha illallāhu waḥdahu lā sharīka lah, lahu'l-mulku wa lahu'l-ḥamdu wa huwa 'alā kulli shay'in qadīr",
      translation: "There is no deity but Allah alone, no partner has He. His is the dominion and His is the praise, and He is over all things competent."
    },
    {
      arabic: "رَبِّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
      transliteration: "Rabbi aj'alnī mina't-tawwābīn waj'alnī mina'l-mutaṭahhirīn",
      translation: "O Allah, make me among those who repent often and purify themselves."
    },
    {
      arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ",
      transliteration: "Labbayk Allahumma labbayk",
      translation: "Here I am, O Allah, here I am."
    }
  ],
  ramadan: [
    {
      arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ",
      transliteration: "Allahumma innī laka ṣumtu, wa bika āmantu, wa 'alayka tawakkaltu, wa 'alā rizqika afṭartu",
      translation: "O Allah! I fasted for You and I believe in You and I put my trust in You and with Your sustenance I break my fast."
    },
    {
      arabic: "",
      transliteration: "Wa bisawmi ghadin nawaytu min shahri Ramadan",
      translation: "I intend to fast tomorrow in the month of Ramadan."
    },
    {
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      transliteration: "Allahumma innaka 'afuwwun tuḥibbul-'afwa fa'fu 'annī",
      translation: "O Allah, You are Most Forgiving, and You love forgiveness; so forgive me."
    },
    {
      arabic: "سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ",
      transliteration: "Subḥāna dhī'l-mulki wal-malakūt",
      translation: "Glory be to the Owner of the Kingdom and the Dominion."
    }
  ],
  weather: [
    {
      arabic: "اللَّهُمَّ أَسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا مَرِيعًا نَافِعًا غَيْرَ ضَارٍّ",
      transliteration: "Allahumma asqinā ghaythan mughīthan marī'an marī'an nāfi'an ghayra ḍārr",
      translation: "O Allah, give us a beneficial rain that is plentiful, wholesome, and not harmful."
    },
    {
      arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
      transliteration: "Subḥān alladhī yusabbiḥur-ra'du biḥamdihī walmalā'ikatu min khīfatih",
      translation: "Glory be to Him Whom thunder and angels glorify due to fear of Him."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْهَا رَحْمَةً وَلَا تَجْعَلْهَا عَذَابًا",
      transliteration: "Allahumma aj'alhā raḥmatan wa lā taj'alhā 'adhāban",
      translation: "O Allah, make it a mercy and do not make it a punishment."
    },
    {
      arabic: "اللَّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا",
      transliteration: "Allahumma ḥawālaynā wa lā 'alaynā",
      translation: "O Allah, around us and not upon us."
    }
  ],
  sickness: [
    {
      arabic: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
      transliteration: "As'alu Allāhal-'Aẓīma Rabbal-'Arshil-'Aẓīm an yashfiyak",
      translation: "I ask Allah, the Mighty, the Lord of the Mighty Throne, to cure you."
    },
    {
      arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ، مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ",
      transliteration: "As-salāmu 'alaykum ahla'd-diyāri min al-mu'minīna wal-muslimīn, wa innā inshā' Allāhu bikum lāḥiqūn",
      translation: "Peace be upon you, O inhabitants of the graves, from among the believers and the Muslims. Indeed, we are, if Allah wills, to join you."
    },
    {
      arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ",
      transliteration: "Allahumma'ghfir lahu warḥamh",
      translation: "O Allah, forgive him and have mercy on him."
    },
    {
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى سَكَرَاتِ الْمَوْتِ",
      transliteration: "Allahumma a'innī 'alā sakarāti'l-mawt",
      translation: "O Allah, help me through the agonies of death."
    },
    {
      arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ",
      transliteration: "Allahummaghfir lahu warfa' darajatahu fi'l-mahdiyyīn",
      translation: "O Allah, forgive him and raise his rank among the guided."
    }
  ],
  social: [
    {
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      transliteration: "As-salāmu 'alaykum wa raḥmatullāhi wa barakātuh",
      translation: "Peace be upon you, and the mercy of Allah and His blessings."
    },
    {
      arabic: "بَارَكَ اللَّهُ لَكَ فِي دِينِكَ",
      transliteration: "Bārakallāhu laka fī dīnik",
      translation: "May Allah bless you in your religion."
    },
    {
      arabic: "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ، وَارْحَمْهُمْ",
      transliteration: "Allāhumma bārik lahum fīmā razaqtahum, waghfir lahum, warḥamhum",
      translation: "O Allah, bless them in what You have provided for them, forgive them, and have mercy upon them."
    },
    {
      arabic: "يَرْحَمُكَ اللَّهُ",
      transliteration: "Yarḥamukallāh",
      translation: "May Allah have mercy on you."
    }
  ],
  rizq: [
    {
      arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
      transliteration: "Allāhumma ikfinī biḥalālika 'an ḥarāmik",
      translation: "O Allah, suffice me with what You have made lawful over what You have made unlawful."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ",
      transliteration: "Allāhumma innī as'aluka khayra hādhā'l-yawm",
      translation: "O Allah, I ask You for the good of this day."
    },
    {
      arabic: "اللَّهُمَّ بَارِكْ لِي فِي رِزْقِي",
      transliteration: "Allāhumma bārik lī fī rizqī",
      translation: "O Allah, bless my provision."
    }
  ],
  repentance: [
    {
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      transliteration: "Astaghfirullāh",
      translation: "I seek forgiveness from Allah."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ",
      transliteration: "Allāhummaj'alnī mina't-tawwābīn",
      translation: "O Allah, make me among those who often repent."
    }
  ],
  enemy: [
    {
      arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
      transliteration: "Allāhumma ikfinīhim bimā shi'ta",
      translation: "O Allah, protect me from them however You will."
    },
    {
      arabic: "اللَّهُمَّ أَهْلِكِ الظَّالِمِينَ بِالظَّالِمِينَ",
      transliteration: "Allāhumma ahlikiz-ẓẓālimīna bi'ẓ-ẓālimīn",
      translation: "O Allah, destroy the oppressors by (the hands of) other oppressors."
    }
  ],
  business: [
    {
      arabic: "اللَّهُمَّ بَارِكْ لِي فِي بَيْعِي وَشِرَائِي",
      transliteration: "Allāhumma bārik lī fī bay'ī wa shirā'ī",
      translation: "O Allah, bless my sales and purchases."
    },
    {
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
      transliteration: "Rabbish raḥli ṣadrī wa yassir lī amrī",
      translation: "My Lord, expand for me my breast [with assurance] and ease for me my task."
    },
    {
      arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
      transliteration: "Allāhumma ikfinī biḥalālika 'an ḥarāmika wa aghninī bi faḍlika 'amman siwāk",
      translation: "O Allah, suffice me with what You have made lawful instead of what You have forbidden, and make me independent of all others besides You."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا وَعِلْمًا نَافِعًا",
      transliteration: "Allāhumma innī as'aluka rizqan ṭayyiban wa 'ilman nāfi'an",
      translation: "O Allah, I ask You for good and pure sustenance and beneficial knowledge."
    }
  ],
  success: [
    {
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      transliteration: "Rabbi zidni 'ilma",
      translation: "My Lord, increase me in knowledge."
    },
    {
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      transliteration: "Ihdināṣ-ṣirāṭal-mustaqīm",
      translation: "Guide us to the Straight Path."
    },
    {
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
      transliteration: "Rabbi ishrah lī ṣadrī wa yassir lī amrī",
      translation: "My Lord, expand for me my breast [with assurance] and ease for me my task."
    },
    {
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
      transliteration: "Allahumma anta rabbī lā ilāha illā anta khalaqtanī wa anā 'abduka",
      translation: "O Allah, You are my Lord, none has the right to be worshiped except You, You created me and I am Your servant."
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      transliteration: "Allahumma innī as'aluka al-hudā wa at-tuqa wa al-'afāfa wa al-ghinā",
      translation: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency."
    },
    {
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration: "Ḥasbiyallāhu lā ilāha illā huwa 'alayhi tawakkaltu wa huwa rabbul-'arshil-'aẓīm",
      translation: "Allah is sufficient for me; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne."
    },
    {
      arabic: "يَا مُسَهِّلَ الْعَسِيرِ، يَا مُلِينَ الْحَدِيدِ، يَا مُنْسِئَ الْبَصَرِ، أَسْأَلُكَ",
      transliteration: "Yā musahhila al-'asīr, yā mulīna al-ḥadīd, yā munsiya al-baṣar, as'aluka",
      translation: "O One who makes the difficult easy, O One who softens the iron, O One who restores sight, I ask You…"
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana ātinā fid-dun'yā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adhāban-nār",
      translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire."
    },
    {
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      transliteration: "Ihdināṣ-ṣirāṭal-mustaqīm",
      translation: "Guide us to the Straight Path."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْنِي هَدَاةً مَهْتَدِينَ، وَاجْعَلْنِي مِنْ عِبَادِكَ الصَّالِحِينَ",
      transliteration: "Allāhummaj'alnī hadātan mahtadīn, waj'alnī min 'ibādikaṣ-ṣāliḥīn",
      translation: "O Allah, make me one of those who guide and are guided, and make me among Your righteous servants."
    }
  ],
  love: [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ، وَحُبَّ مَنْ يُحِبُّكَ، وَالْعَمَلَ الَّذِي يُبَلِّغُنِي حُبَّكَ",
      transliteration: "Allāhumma innī as'aluka ḥubbaka, wa ḥubba man yuḥibbuka, wal-'amala alladhī yuballighunī ḥubbak",
      translation: "O Allah, I ask You for Your love, the love of those who love You, and the deeds that will bring me closer to Your love."
    },
    {
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allāhumma a'innī 'alā dhikrika wa shukrika wa ḥusni 'ibādatik",
      translation: "O Allah, help me to remember You, thank You, and worship You in the best way."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي",
      transliteration: "Allāhummaj'al al-Qur'āna rabī'a qalbī",
      translation: "O Allah, make the Qur'an the spring of my heart."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي",
      transliteration: "Allāhummaj'al al-Qur'āna rabī'a qalbī",
      translation: "O Allah, make the Qur'an the spring of my heart."
    },
    {
      arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
      transliteration: "Wa idhā sa'alaka 'ibādī 'annī fa innī qarīb",
      translation: "And when My servants ask you about Me – indeed I am near."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي",
      transliteration: "Allāhummaj'al al-Qur'āna rabī'a qalbī",
      translation: "O Allah, make the Qur'an the spring of my heart."
    }
  ],
  prophetlove: [
    {
      arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
      transliteration: "Allāhumma ṣalli 'alā Muḥammad wa 'alā āli Muḥammad",
      translation: "O Allah, send peace and blessings upon Muhammad and the family of Muhammad."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْنِي مِنْ مُرَافِقِي النَّبِيِّ ﷺ فِي الْجَنَّةِ",
      transliteration: "Allāhummaj'alnī min murāfiqīn-nabiyyī ṣallallāhu 'alayhi wa sallam fī al-jannah",
      translation: "O Allah, make me among the companions of the Prophet ﷺ in Paradise."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْ حُبَّ نَبِيِّكَ أَحَبَّ إِلَيَّ مِنْ نَفْسِي وَوَالِدِي وَالنَّاسِ أَجْمَعِينَ",
      transliteration: "Allāhummaj'al ḥubba nabiyyika aḥabba ilayya min nafsī wa wālidi wa an-nāsi ajma'īn",
      translation: "O Allah, make the love of Your Prophet more beloved to me than myself, my parents, and all people."
    },
    {
      arabic: "قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ",
      transliteration: "Qul in kuntum tuḥibbūna Allāha fattabi'ūnī yuḥbibkum Allāh",
      translation: 'Say, [O Muhammad], "If you love Allah, then follow me; Allah will love you..."'
    },
    {
      arabic: "اللَّهُمَّ احْشُرْنَا مَعَ النَّبِيِّ ﷺ وَالصَّالِحِينَ",
      transliteration: "Allāhumma aḥshurnā ma'an-nabiyyī ṣallallāhu 'alayhi wa sallam waṣ-ṣāliḥīn",
      translation: "O Allah, gather us with the Prophet ﷺ and the righteous."
    }
  ],
  imaan: [
    {
      arabic: "اللَّهُمَّ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
      transliteration: "Allāhumma thabbit qalbī ʿalā dīnik",
      translation: "O Allah, make my heart firm upon Your religion."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا",
      transliteration: "Allāhumma aj'al fī qalbī nūran",
      translation: "O Allah, place light in my heart."
    },
    {
      arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً",
      transliteration: "Rabbana lā tuzigh qulūbanā baʿda idh hadaytanā wahab lanā min ladunka raḥmah",
      translation: "Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from You."
    },
    {
      arabic: "اللَّهُمَّ زِدْنِي إِيمَانًا وَيَقِينًا",
      transliteration: "Allāhumma zidnī īmānan wa yaqīnan",
      translation: "O Allah, increase me in faith and certainty."
    },
    {
      arabic: "اللَّهُمَّ حَبِّبْ إِلَيْنَا الْإِيمَانَ وَزَيِّنْهُ فِي قُلُوبِنَا، وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوقَ وَالْعِصْيَانَ",
      transliteration: "Allāhumma ḥabbib ilayna al-īmān wa zayyinhū fī qulūbinā, wa karrih ilayna al-kufr wa al-fusūq wa al-ʿiṣyān",
      translation: "O Allah, make faith beloved to us and beautify it in our hearts, and make disbelief, sin, and disobedience hateful to us."
    }
  ],
  dailybooster: [
    {
      arabic: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور",
      transliteration: "Alhamdulillāhi alladhī aḥyānā baʿda mā amātanā wa ilayhin-nushūr",
      translation: "All praise is due to Allah who gave us life after causing us to die, and to Him is the return."
    },
    {
      arabic: "",
      transliteration: "Recite SubḥānAllāh, Alḥamdulillāh, Allāhu Akbar — 33x each. Recite Ayat al-Kursi (2:255) and Surah Ikhlas, Falaq, Nas 3x. Builds a spiritual shield for the day.",
      translation: "Recite SubḥānAllāh, Alḥamdulillāh, Allāhu Akbar — 33x each. Recite Ayat al-Kursi (2:255) and Surah Ikhlas, Falaq, Nas 3x. Builds a spiritual shield for the day."
    },
    {
      arabic: "",
      transliteration: "Pray all 5 Salah on time. Each prayer is a connection and a renewal of your soul. Don't miss it.",
      translation: "Pray all 5 Salah on time. Each prayer is a connection and a renewal of your soul. Don't miss it."
    },
    {
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allāhumma aʿinni ʿalā dhikrika wa shukrika wa ḥusni ʿibādatik",
      translation: "O Allah, help me remember You, thank You, and worship You well."
    },
    {
      arabic: "",
      transliteration: "Read Qur'an – Even 5 verses. Set a goal: Just a few verses daily with understanding is better than none.",
      translation: "Read Qur'an – Even 5 verses. Set a goal: Just a few verses daily with understanding is better than none."
    },
    {
      arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي",
      transliteration: "Allāhumma anfa'ni bimaa ʿalāmtanī wa ʿalimni maa yanfa'unī",
      translation: "O Allah, benefit me through what You have taught me and teach me what will benefit me."
    },
    {
      arabic: "",
      transliteration: 'Stay in Wudhu when possible. The Prophet ﷺ said: "Being in a state of Wudhu breaks the hold of Shaytan." [Muslim]',
      translation: 'Stay in Wudhu when possible. The Prophet ﷺ said: "Being in a state of Wudhu breaks the hold of Shaytan." [Muslim]'
    },
    {
      arabic: "",
      transliteration: "Recite evening Azkar (same as morning Azkar). It guards you through the night.",
      translation: "Recite evening Azkar (same as morning Azkar). It guards you through the night."
    },
    {
      arabic: "",
      transliteration: "Reflect before sleeping: Did I pray all my prayers? Did I make someone smile? Did I sin? If yes, repent.",
      translation: "Reflect before sleeping: Did I pray all my prayers? Did I make someone smile? Did I sin? If yes, repent."
    },
    {
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      transliteration: "Bismika Allāhumma amūtu wa aḥyā",
      translation: "In Your name, O Allah, I live and die."
    },
    {
      arabic: "",
      transliteration: "Daily Mini Goals: Smile at someone (Sadaqah), Say Astaghfirullah 100x (Forgiveness), Help someone (Allah helps you), Make Dua for others (Angels say Ameen for you).",
      translation: "Daily Mini Goals: Smile at someone (Sadaqah), Say Astaghfirullah 100x (Forgiveness), Help someone (Allah helps you), Make Dua for others (Angels say Ameen for you)."
    },
    {
      arabic: "",
      transliteration: "Bonus Tip: Keep a \"Faith Journal\" — Write one lesson or verse daily that touched your heart.",
      translation: "Bonus Tip: Keep a \"Faith Journal\" — Write one lesson or verse daily that touched your heart."
    }
  ],
  consistency: [
    {
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allāhumma aʿinni ʿalā dhikrika wa shukrika wa ḥusni ʿibādatik",
      translation: "O Allah, help me to remember You, thank You, and worship You in the best manner."
    },
    {
      arabic: "يَا مُقَلِّبَ الْقُلُوبِ، ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
      transliteration: "Yā Muqallibal-qulūb, thabbit qalbī ʿalā dīnik",
      translation: "O Turner of the hearts, make my heart steadfast upon Your religion."
    },
    {
      arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
      transliteration: "Rabbana lā tuzigh qulūbanā baʿda idh hadaytanā",
      translation: "Our Lord! Let not our hearts deviate after You have guided us."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْ خَيْرَ أَعْمَالِنَا خَوَاتِيمَهَا",
      transliteration: "Allāhumma ajʿal khayra aʿmālinā khawātīmahā",
      translation: "O Allah, make the best of our deeds the last of them (i.e., let me continue doing good until the end)."
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْ أَعْمَالَنَا صَالِحَةً، وَلِوَجْهِكَ خَالِصَةً، وَلَا تَجْعَلْ فِيهَا لِغَيْرِكَ شَيْئًا",
      transliteration: "Allāhumma ajʿal aʿmālanā ṣāliḥah, wali-wajhika khāliṣah, wa lā tajʿal fīhā lighayrika shay'ā",
      translation: "O Allah, make our deeds righteous, for Your Face alone, and don't let there be anything in them for anyone else."
    }
  ],
  beforesalah: [
    {
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subḥānaka Allāhumma wa biḥamdika, wa tabārakasmuka, wa taʿāla jadduka, wa lā ilāha ghayruka",
      translation: "Glory is to You, O Allah, and praise is to You. Blessed is Your Name, Exalted is Your Majesty, and there is no deity worthy of worship except You."
    },
    {
      arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلاَنِيَتَهُ وَسِرَّهُ",
      transliteration: "Allāhumma'ghfir lī dhanbī kullahu, diqqahu wa jillahu, wa awwalahu wa ākhirahu, wa ʿalāniyatahu wa sirrahu",
      translation: "O Allah, forgive all of my sins — the minor and the major, the first and the last, the open and the hidden."
    },
    {
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ (in Ruku)\nسُبْحَانَ رَبِّيَ الأَعْلَى (in Sujood)",
      transliteration: "Subḥāna Rabbiyal-ʿAẓīm (in bowing)\nSubḥāna Rabbiyal-Aʿlā (in prostration)",
      translation: "Glory is to my Lord, the Most Great (Ruku)\nGlory is to my Lord, the Most High (Sujood)"
    },
    {
      arabic: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
      transliteration: "Rabbighfir lī, Rabbighfir lī",
      translation: "My Lord, forgive me. My Lord, forgive me."
    }
  ],
  aftersalah: [
    {
      arabic: "اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allāhumma aʿinnī ʿalā dhikrika wa shukrika wa ḥusni ʿibādatik",
      translation: "O Allah, help me to remember You, thank You, and worship You properly."
    },
    {
      arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "Lā ilāha illallāhu waḥdahu lā sharīka lahu, lahu'l-mulku wa lahu'l-ḥamdu wa huwa ʿalā kulli shay'in qadīr",
      translation: "There is no god but Allah alone, without partner. His is the kingdom and praise, and He is over all things capable."
    },
    {
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Rabbana taqabbal minnā innaka anta As-Samīʿul-ʿAlīm",
      translation: "Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing."
    },
    {
      arabic: "أَسْتَغْفِرُ اللَّهَ (×3)",
      transliteration: "Astaghfirullāh (×3)",
      translation: "I seek forgiveness from Allah."
    },
    {
      arabic: "اللَّهُمَّ أَنْتَ السَّلامُ، وَمِنْكَ السَّلامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      transliteration: "Allāhumma anta as-salām, wa minka as-salām, tabārakta yā dhā al-jalāli wa'l-ikrām",
      translation: "O Allah, You are peace and from You is peace. Blessed are You, O Possessor of majesty and honor."
    },
    {
      arabic: "SubḥānAllāh ×33\nAlḥamdulillāh ×33\nAllāhu Akbar ×34",
      translation: "Glory be to Allah ×33\nAll praise is due to Allah ×33\nAllah is the Greatest ×34"
    },
    {
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ... (Ayat-ul-Kursi)",
      transliteration: "Allāhu lā ilāha illā huwa al-ḥayyul-qayyūm...",
      translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence..."
    },
    {
      arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ ...\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ ...\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ ...",
      translation: "Recite Surah Al-Ikhlas, Al-Falaq, and An-Nas (once each)"
    },
    {
      arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
      transliteration: "Allāhumma ajirnī mina an-nār",
      translation: "O Allah, save me from the fire. (Repeat 7× after Fajr and Maghrib)"
    },
    {
      translation: "Summary Checklist of Daily Dhikr After Salah: Astaghfirullah ×3, Allahumma Anta As-Salaam ×1, SubhanAllah ×33, Alhamdulillah ×33, Allahu Akbar ×34, Kalima Tawheed ×1–10, Ayat-ul-Kursi ×1, Ikhlas + Falaq + Nas ×1 each, Allahumma Ajirni min an-Nar ×7 (Maghrib/Fajr), Dua for worship (O Allah help me...) ×1."
    }
  ]
};

export default duaCategories;
export { duaCategories, duasByCategory }; 