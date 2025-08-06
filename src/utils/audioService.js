// Audio service for prayer notifications
class AudioService {
  constructor() {
    this.audioContext = null;
    this.isSupported = typeof window !== 'undefined' && 'AudioContext' in window;
  }

  // Initialize audio context
  init() {
    if (this.isSupported && !this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Generate a simple "Allahu Akbar" tone
  generateAllahuAkbarTone() {
    if (!this.isSupported) return null;

    this.init();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Create a melodic pattern similar to "Allahu Akbar"
    const frequencies = [440, 523, 659, 523, 440]; // A, C, E, C, A
    const durations = [0.5, 0.3, 0.5, 0.3, 0.5]; // seconds
    
    oscillator.frequency.setValueAtTime(frequencies[0], this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    
    oscillator.start();
    
    // Play the melodic pattern
    let currentTime = this.audioContext.currentTime;
    frequencies.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, currentTime);
      currentTime += durations[index];
    });
    
    oscillator.stop(currentTime);
    
    return oscillator;
  }

  // Play Allahu Akbar sound once
  playAllahuAkbarOnce() {
    const audio = new Audio();
    
    // Multiple sources for Allahu Akbar sound
    const audioSources = [
      '/audio/takbir.mp3', // Primary source - existing file
      '/audio/allahu-akbar.mp3',
      '/audio/azan.mp3',
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Fallback
    ];
    
    let currentSourceIndex = 0;
    
    const playSound = () => {
      if (currentSourceIndex < audioSources.length) {
        audio.src = audioSources[currentSourceIndex];
        audio.volume = 0.8;
        
        // Play the sound once
        audio.play().catch(() => {
          // If play fails, try next source
          currentSourceIndex++;
          if (currentSourceIndex < audioSources.length) {
            playSound();
          } else {
            // If all sources fail, generate a tone
            this.generateAllahuAkbarTone();
          }
        });
      } else {
        // If all sources fail, generate a tone
        this.generateAllahuAkbarTone();
      }
    };
    
    playSound();
    return audio;
  }

  // Play azan sound (kept as is)
  playAzan() {
    const audio = new Audio('/audio/azan.mp3');
    audio.volume = 0.8;
    audio.play().catch(() => {
      console.log('Azan audio not available');
    });
    return audio;
  }

  // Play Allahu Akbar notification (legacy method, now calls playAllahuAkbarOnce)
  playAllahuAkbar() {
    return this.playAllahuAkbarOnce();
  }

  // Play notification sound with vibration (now calls playAllahuAkbarOnce)
  playNotificationWithVibration() {
    this.playAllahuAkbarOnce();
    // Vibrate if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 500, 200]);
    }
  }

  // Stop all audio
  stopAll() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Create singleton instance
const audioService = new AudioService();

export default audioService; 