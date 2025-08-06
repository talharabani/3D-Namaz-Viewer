// Script to create placeholder audio files for prayer steps
// This creates simple tone-based audio files for testing

const fs = require('fs');
const path = require('path');

// Create audio files directory if it doesn't exist
const audioDir = path.join(__dirname, '../public/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Generate a simple tone audio file using Web Audio API
function generateToneAudio(frequency, duration, filename) {
  const sampleRate = 44100;
  const samples = Math.floor(sampleRate * duration);
  const audioData = new Float32Array(samples);
  
  for (let i = 0; i < samples; i++) {
    audioData[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
  }
  
  // Convert to WAV format
  const wavBuffer = createWAVBuffer(audioData, sampleRate);
  
  const filePath = path.join(audioDir, filename);
  fs.writeFileSync(filePath, Buffer.from(wavBuffer));
  console.log(`Created: ${filename}`);
}

function createWAVBuffer(audioData, sampleRate) {
  const buffer = new ArrayBuffer(44 + audioData.length * 2);
  const view = new DataView(buffer);
  
  // WAV header
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + audioData.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, audioData.length * 2, true);
  
  // Audio data
  let offset = 44;
  for (let i = 0; i < audioData.length; i++) {
    const sample = Math.max(-1, Math.min(1, audioData[i]));
    view.setInt16(offset, sample * 0x7FFF, true);
    offset += 2;
  }
  
  return buffer;
}

// Generate audio files for each prayer step
const prayerSteps = [
  { name: 'niyyah', frequency: 440, duration: 3 }, // A4 note, 3 seconds
  { name: 'takbir', frequency: 523, duration: 2 }, // C5 note, 2 seconds
  { name: 'qiyam', frequency: 587, duration: 45 }, // D5 note, 45 seconds
  { name: 'rukoo', frequency: 659, duration: 4 }, // E5 note, 4 seconds
  { name: 'sajda', frequency: 698, duration: 4 }, // F5 note, 4 seconds
  { name: 'jalsa', frequency: 784, duration: 2 }, // G5 note, 2 seconds
  { name: 'tashahhud', frequency: 880, duration: 15 }, // A5 note, 15 seconds
  { name: 'salam', frequency: 988, duration: 3 } // B5 note, 3 seconds
];

console.log('Generating prayer audio files...');

prayerSteps.forEach(step => {
  generateToneAudio(step.frequency, step.duration, `${step.name}.wav`);
});

console.log('Audio files generated successfully!');
console.log('Files created in:', audioDir); 