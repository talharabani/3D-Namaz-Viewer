// Simple script to create placeholder audio files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create audio files directory if it doesn't exist
const audioDir = path.join(__dirname, '../public/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Create simple placeholder audio files
const prayerSteps = [
  'niyyah',
  'takbir', 
  'qiyam',
  'rukoo',
  'sajda',
  'jalsa',
  'tashahhud',
  'salam'
];

console.log('Creating placeholder audio files...');

prayerSteps.forEach(step => {
  // Create a simple text file as placeholder for now
  const filePath = path.join(audioDir, `${step}.mp3`);
  const placeholderContent = `# Placeholder audio file for ${step}
# This is a placeholder file. Replace with actual audio content.
# Duration: ${step === 'qiyam' ? '45s' : step === 'tashahhud' ? '15s' : step === 'rukoo' || step === 'sajda' ? '4s' : step === 'jalsa' ? '2s' : '3s'}
`;
  
  fs.writeFileSync(filePath, placeholderContent);
  console.log(`Created: ${step}.mp3`);
});

console.log('Placeholder audio files created successfully!');
console.log('Files created in:', audioDir);
console.log('Note: These are placeholder files. Replace with actual audio content.'); 