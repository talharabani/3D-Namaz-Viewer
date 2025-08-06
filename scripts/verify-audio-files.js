// Script to verify audio files are properly placed
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, '../public/audio');
const requiredFiles = [
  'niyyah.mp3',
  'takbir.mp3', 
  'qiyam.mp3',
  'rukoo.mp3',
  'sajda.mp3',
  'jalsa.mp3',
  'tashahhud.mp3',
  'salam.mp3'
];

console.log('🔍 Verifying audio files...\n');

// Check if audio directory exists
if (!fs.existsSync(audioDir)) {
  console.error('❌ Audio directory not found:', audioDir);
  console.log('📁 Please create the directory: public/audio/');
  process.exit(1);
}

console.log('✅ Audio directory found:', audioDir);

// Check each required file
let allFilesExist = true;
const existingFiles = [];
const missingFiles = [];

for (const file of requiredFiles) {
  const filePath = path.join(audioDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeInKB = Math.round(stats.size / 1024);
    
    if (stats.size > 1000) { // More than 1KB (likely real audio)
      console.log(`✅ ${file} (${sizeInKB}KB) - Real audio file`);
      existingFiles.push(file);
    } else {
      console.log(`⚠️  ${file} (${sizeInKB}KB) - Placeholder file detected`);
      missingFiles.push(file);
      allFilesExist = false;
    }
  } else {
    console.log(`❌ ${file} - Missing`);
    missingFiles.push(file);
    allFilesExist = false;
  }
}

console.log('\n📊 Summary:');
console.log(`✅ Found: ${existingFiles.length} real audio files`);
console.log(`❌ Missing/Placeholder: ${missingFiles.length} files`);

if (missingFiles.length > 0) {
  console.log('\n📋 Missing or placeholder files:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
  
  console.log('\n🔧 To fix this:');
  console.log('1. Download authentic Islamic audio files for each prayer step');
  console.log('2. Place them in the public/audio/ directory with these exact names:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
  console.log('3. Ensure files are actual MP3 audio files (not placeholders)');
  console.log('4. Run this script again to verify');
} else {
  console.log('\n🎉 All audio files are properly configured!');
  console.log('🚀 Your Learn screen should now work with local audio files.');
}

console.log('\n📁 Expected file structure:');
console.log('public/');
console.log('└── audio/');
requiredFiles.forEach(file => {
  const status = existingFiles.includes(file) ? '✅' : '❌';
  console.log(`    ${status} ${file}`);
}); 