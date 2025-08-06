@echo off
echo 🎵 Audio Setup Helper
echo ====================
echo.
echo This script will help you set up your audio files.
echo.
echo 📁 Current audio directory: public\audio\
echo.

REM Check if audio directory exists
if not exist "public\audio" (
    echo ❌ Audio directory not found!
    echo Creating public\audio directory...
    mkdir "public\audio"
    echo ✅ Created public\audio directory
)

echo.
echo 📋 Required audio files:
echo    - niyyah.mp3
echo    - takbir.mp3
echo    - qiyam.mp3
echo    - rukoo.mp3
echo    - sajda.mp3
echo    - jalsa.mp3
echo    - tashahhud.mp3
echo    - salam.mp3
echo.

echo 🔍 Checking current files...
echo.

set "missing=0"
set "placeholder=0"
set "real=0"

for %%f in (niyyah takbir qiyam rukoo sajda jalsa tashahhud salam) do (
    if exist "public\audio\%%f.mp3" (
        for %%A in ("public\audio\%%f.mp3") do set "size=%%~zA"
        if !size! gtr 1000 (
            echo ✅ %%f.mp3 - Real audio file
            set /a "real+=1"
        ) else (
            echo ⚠️  %%f.mp3 - Placeholder detected
            set /a "placeholder+=1"
        )
    ) else (
        echo ❌ %%f.mp3 - Missing
        set /a "missing+=1"
    )
)

echo.
echo 📊 Summary:
echo    ✅ Real audio files: %real%
echo    ⚠️  Placeholder files: %placeholder%
echo    ❌ Missing files: %missing%
echo.

if %missing% gtr 0 (
    echo 📥 To add missing files:
    echo    1. Download authentic Islamic audio files
    echo    2. Rename them to match the required names above
    echo    3. Copy them to: public\audio\
    echo.
)

if %placeholder% gtr 0 (
    echo 🔄 To replace placeholder files:
    echo    1. Download authentic Islamic audio files
    echo    2. Replace the placeholder files in: public\audio\
    echo    3. Ensure new files are actual MP3 audio files
    echo.
)

if %real% equ 8 (
    echo 🎉 All audio files are properly configured!
    echo 🚀 Your Learn screen should now work with local audio files.
) else (
    echo.
    echo 💡 Tip: Run 'node scripts\verify-audio-files.js' for detailed verification
)

echo.
pause 