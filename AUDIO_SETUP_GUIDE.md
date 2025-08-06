# 🎵 Audio Setup Guide

## 📁 File Structure Required

Place your downloaded audio files in the `public/audio/` directory with these exact names:

```
public/
└── audio/
    ├── niyyah.mp3      # Intention/Bismillah audio
    ├── takbir.mp3      # Allahu Akbar audio
    ├── qiyam.mp3       # Surah Al-Fatiha recitation
    ├── rukoo.mp3       # Subhana Rabbiyal Adheem
    ├── sajda.mp3       # Subhana Rabbiyal A'la
    ├── jalsa.mp3       # Sitting between prostrations
    ├── tashahhud.mp3   # Tashahhud recitation
    └── salam.mp3       # Assalamu Alaikum
```

## 🔧 Steps to Set Up Your Audio Files

### 1. **Download Authentic Audio Files**
Download authentic Islamic recitations for each prayer step from reliable sources:
- **Niyyah**: Bismillah recitation
- **Takbir**: Allahu Akbar recitation
- **Qiyam**: Surah Al-Fatiha recitation
- **Rukoo**: Subhana Rabbiyal Adheem
- **Sajda**: Subhana Rabbiyal A'la
- **Jalsa**: Sitting dua
- **Tashahhud**: Complete Tashahhud recitation
- **Salam**: Assalamu Alaikum

### 2. **Rename Your Files**
Rename your downloaded audio files to match the exact names above.

### 3. **Place Files in Directory**
Copy all your renamed audio files to: `public/audio/`

### 4. **Verify Setup**
Run the verification script:
```bash
node scripts/verify-audio-files.js
```

## ✅ Expected Output After Setup

When you run the verification script, you should see:
```
🔍 Verifying audio files...

✅ Audio directory found: C:\Users\123\namaz-web\public\audio
✅ niyyah.mp3 (245KB) - Real audio file
✅ takbir.mp3 (156KB) - Real audio file
✅ qiyam.mp3 (1.2MB) - Real audio file
✅ rukoo.mp3 (89KB) - Real audio file
✅ sajda.mp3 (92KB) - Real audio file
✅ jalsa.mp3 (67KB) - Real audio file
✅ tashahhud.mp3 (2.1MB) - Real audio file
✅ salam.mp3 (134KB) - Real audio file

📊 Summary:
✅ Found: 8 real audio files
❌ Missing/Placeholder: 0 files

🎉 All audio files are properly configured!
🚀 Your Learn screen should now work with local audio files.
```

## 🎯 Benefits of Using Local Audio Files

1. **Faster Loading**: No network delays
2. **Reliable Playback**: Works offline
3. **Better Performance**: No buffering issues
4. **Authentic Content**: Your chosen recitations
5. **No Errors**: No 404 or timeout issues

## 🔄 How It Works

Once set up, your Learn screen will:
1. **Load audio instantly** from local files
2. **Play authentic recitations** for each prayer step
3. **Work offline** without internet connection
4. **Provide consistent experience** across all devices

## 🚨 Troubleshooting

### If audio doesn't play:
1. **Check file names**: Must match exactly (case-sensitive)
2. **Verify file format**: Must be valid MP3 files
3. **Check file size**: Should be >1KB (not placeholders)
4. **Run verification**: `node scripts/verify-audio-files.js`

### If you get errors:
1. **Clear browser cache**: Hard refresh (Ctrl+F5)
2. **Check console**: Look for 404 errors
3. **Verify paths**: Files should be in `public/audio/`
4. **Test manually**: Try opening `/audio/niyyah.mp3` in browser

## 📞 Support

If you need help:
1. Run the verification script first
2. Check the console for specific errors
3. Ensure all files are properly named and placed
4. Verify files are actual MP3 audio files (not placeholders) 