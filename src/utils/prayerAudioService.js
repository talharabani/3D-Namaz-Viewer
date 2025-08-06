// Prayer Audio Service - Provides authentic Islamic recitations for each prayer step
import { prayerAudioUrls, additionalAudioUrls, audioSequences } from '../data/prayerAudio';

// Alternative audio sources for better reliability - using local downloaded files
export const alternativeAudioUrls = {
  niyyah: '/audio/niyyah.mp3',
  takbir: '/audio/takbir.mp3',
  qiyam: '/audio/qiyam.mp3',
  rukoo: '/audio/rukoo.mp3',
  sajda: '/audio/sajda.mp3',
  jalsa: '/audio/jalsa.mp3',
  tashahhud: '/audio/tashahhud.mp3',
  salam: '/audio/salam.mp3'
};

// Working audio sources for fallback - using local files
export const workingAudioUrls = {
  niyyah: '/audio/niyyah.mp3',
  takbir: '/audio/takbir.mp3',
  qiyam: '/audio/qiyam.mp3',
  rukoo: '/audio/rukoo.mp3',
  sajda: '/audio/sajda.mp3',
  jalsa: '/audio/jalsa.mp3',
  tashahhud: '/audio/tashahhud.mp3',
  salam: '/audio/salam.mp3'
};

// Video demonstrations for each prayer step
export const prayerVideoUrls = {
  niyyah: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to make intention (Niyyah) for prayer',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Niyyah',
    duration: '2:30'
  },
  takbir: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to perform Takbir (raising hands)',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Takbir',
    duration: '1:45'
  },
  qiyam: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to stand properly in Qiyam',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Qiyam',
    duration: '3:15'
  },
  rukoo: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to perform Rukoo (bowing) correctly',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Rukoo',
    duration: '2:00'
  },
  sajda: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to perform Sajda (prostration) properly',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Sajda',
    duration: '2:30'
  },
  jalsa: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to sit between prostrations',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Jalsa',
    duration: '1:30'
  },
  tashahhud: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to recite Tashahhud',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Tashahhud',
    duration: '2:45'
  },
  salam: {
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'How to perform Salam (ending prayer)',
    thumbnail: 'https://via.placeholder.com/300x200/956D37/FFFFFF?text=Salam',
    duration: '1:15'
  }
};

// Audio player utility functions
export class PrayerAudioPlayer {
  constructor() {
    this.audio = null;
    this.currentStep = null;
    this.isPlaying = false;
    this.currentPromise = null;
    this.audioSequence = null;
    this.currentSequenceIndex = 0;
  }

  // Stop any currently playing audio
  stopCurrentAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.isPlaying = false;
    this.currentStep = null;
    this.audioSequence = null;
    this.currentSequenceIndex = 0;
    if (this.currentPromise) {
      this.currentPromise = null;
    }
  }

  // Play audio sequence for qiyam and tashahhud
  async playAudioSequence(step) {
    const sequence = audioSequences[step];
    if (!sequence || sequence.length === 0) {
      return Promise.reject(new Error(`No audio sequence found for step: ${step}`));
    }

    this.audioSequence = sequence;
    this.currentSequenceIndex = 0;
    this.currentStep = step;
    this.isPlaying = true;

    try {
      // Play each audio in the sequence
      for (let i = 0; i < sequence.length; i++) {
        this.currentSequenceIndex = i;
        const audioItem = sequence[i];
        
        await this.playSingleAudio(audioItem.audio, step, audioItem.description);
        
        // If this is not the last audio in sequence, wait a bit before playing the next
        if (i < sequence.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second gap
        }
      }
      
      // Sequence completed
      this.isPlaying = false;
      this.currentStep = null;
      this.audioSequence = null;
      this.currentSequenceIndex = 0;
    } catch (error) {
      this.isPlaying = false;
      this.currentStep = null;
      this.audioSequence = null;
      this.currentSequenceIndex = 0;
      throw error;
    }
  }

  play(step) {
    // Stop any currently playing audio first
    this.stopCurrentAudio();

    // Check if this step has an audio sequence
    if (audioSequences[step]) {
      return this.playAudioSequence(step);
    }

    // Get the primary audio URL for this step
    let audioUrl = null;
    
    // Try primary audio URL first
    if (prayerAudioUrls[step]?.audio) {
      audioUrl = prayerAudioUrls[step].audio;
    }
    // Fallback to alternative URL
    else if (alternativeAudioUrls[step]) {
      audioUrl = alternativeAudioUrls[step];
    }
    // Final fallback to working URL
    else if (workingAudioUrls[step]) {
      audioUrl = workingAudioUrls[step];
    }

    if (!audioUrl) {
      return Promise.reject(new Error(`No audio URL found for step: ${step}`));
    }

    // Create new audio instance
    this.audio = new Audio(audioUrl);
    this.currentStep = step;
    this.isPlaying = true;

    return new Promise((resolve, reject) => {
      let hasResolved = false;
      let hasRejected = false;
      let timeoutId = null;

      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (this.audio) {
          this.audio.onended = null;
          this.audio.onerror = null;
          this.audio.onloadstart = null;
          this.audio.oncanplay = null;
          this.audio.oncanplaythrough = null;
        }
      };

      const resolveAudio = () => {
        if (!hasResolved && !hasRejected) {
          hasResolved = true;
          this.isPlaying = false;
          this.currentStep = null;
          cleanup();
          resolve();
        }
      };

      const rejectAudio = (error) => {
        if (!hasResolved && !hasRejected) {
          hasRejected = true;
          this.isPlaying = false;
          this.currentStep = null;
          cleanup();
          reject(error);
        }
      };

      // Set up event listeners
      this.audio.onended = () => {
        console.log(`Audio finished playing for ${step}`);
        resolveAudio();
      };
      
      this.audio.onerror = (error) => {
        console.error(`Audio error for ${step}:`, error);
        rejectAudio(new Error(`Failed to load audio for ${step}. Please try again later.`));
      };

      this.audio.onloadstart = () => {
        console.log(`Loading audio for ${step}: ${audioUrl}`);
      };

      this.audio.oncanplay = () => {
        console.log(`Audio ready to play for ${step}`);
      };

      this.audio.oncanplaythrough = () => {
        console.log(`Audio can play through for ${step}`);
        // Clear timeout once audio is ready
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      };

      // Set a timeout to handle cases where audio doesn't load
      timeoutId = setTimeout(() => {
        if (!hasResolved && !hasRejected) {
          console.error(`Audio loading timeout for ${step}`);
          rejectAudio(new Error(`Audio loading timeout for ${step}. Please try again.`));
        }
      }, 10000); // 10 second timeout

      // Try to play the audio
      this.audio.play().then(() => {
        console.log(`Audio started playing for ${step}`);
      }).catch((error) => {
        console.error(`Audio play error for ${step}:`, error);
        rejectAudio(new Error(`Unable to play audio for ${step}. Please check your audio files.`));
      });
    });
  }

  // Play a single audio file (used internally for sequences)
  playSingleAudio(audioUrl, step, description = '') {
    return new Promise((resolve, reject) => {
      let hasResolved = false;
      let hasRejected = false;
      let timeoutId = null;

      this.audio = new Audio(audioUrl);

      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (this.audio) {
          this.audio.onended = null;
          this.audio.onerror = null;
          this.audio.onloadstart = null;
          this.audio.oncanplay = null;
          this.audio.oncanplaythrough = null;
        }
      };

      const resolveAudio = () => {
        if (!hasResolved && !hasRejected) {
          hasResolved = true;
          cleanup();
          resolve();
        }
      };

      const rejectAudio = (error) => {
        if (!hasResolved && !hasRejected) {
          hasRejected = true;
          cleanup();
          reject(error);
        }
      };

      // Set up event listeners
      this.audio.onended = () => {
        console.log(`Sequence audio finished: ${description || step}`);
        resolveAudio();
      };
      
      this.audio.onerror = (error) => {
        console.error(`Sequence audio error for ${step}:`, error);
        rejectAudio(new Error(`Failed to load sequence audio for ${step}. Please try again later.`));
      };

      this.audio.onloadstart = () => {
        console.log(`Loading sequence audio: ${description || step}`);
      };

      this.audio.oncanplay = () => {
        console.log(`Sequence audio ready: ${description || step}`);
      };

      this.audio.oncanplaythrough = () => {
        console.log(`Sequence audio can play through: ${description || step}`);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      };

      // Set a timeout to handle cases where audio doesn't load
      timeoutId = setTimeout(() => {
        if (!hasResolved && !hasRejected) {
          console.error(`Sequence audio loading timeout for ${step}`);
          rejectAudio(new Error(`Sequence audio loading timeout for ${step}. Please try again.`));
        }
      }, 10000);

      // Try to play the audio
      this.audio.play().then(() => {
        console.log(`Sequence audio started: ${description || step}`);
      }).catch((error) => {
        console.error(`Sequence audio play error for ${step}:`, error);
        rejectAudio(new Error(`Unable to play sequence audio for ${step}. Please check your audio files.`));
      });
    });
  }

  pause() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  stop() {
    this.stopCurrentAudio();
  }

  getCurrentStep() {
    return this.currentStep;
  }

  isCurrentlyPlaying() {
    return this.isPlaying;
  }

  // Get current sequence information
  getCurrentSequenceInfo() {
    if (this.audioSequence && this.currentSequenceIndex >= 0) {
      return {
        step: this.currentStep,
        sequence: this.audioSequence,
        currentIndex: this.currentSequenceIndex,
        currentAudio: this.audioSequence[this.currentSequenceIndex],
        totalAudio: this.audioSequence.length
      };
    }
    return null;
  }

  // Get all available audio URLs for a step
  getAudioUrls(step) {
    let audioUrls = [];
    
    // Add primary audio URL
    if (prayerAudioUrls[step]?.audio) {
      audioUrls.push(prayerAudioUrls[step].audio);
    }
    
    // Add additional audio URLs if available
    if (additionalAudioUrls[step]) {
      audioUrls.push(...additionalAudioUrls[step]);
    }
    
    // Add alternative audio URL as fallback
    if (alternativeAudioUrls[step]) {
      audioUrls.push(alternativeAudioUrls[step]);
    }
    
    // Add working audio URL as final fallback
    if (workingAudioUrls[step]) {
      audioUrls.push(workingAudioUrls[step]);
    }
    
    // Remove any placeholder or invalid URLs
    return audioUrls.filter(url => url && !url.includes('placeholder') && !url.includes('data:audio/wav'));
  }
}

// Export a singleton instance
export const prayerAudioPlayer = new PrayerAudioPlayer(); 