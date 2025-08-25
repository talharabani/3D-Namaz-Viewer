// Animation utilities and presets for the Namaz app
import { motion } from 'motion/react';

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -10, scale: 0.9 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 10, scale: 0.9 }
};

// Islamic-themed animations
export const prayerCardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const mosqueGlow = {
  initial: { boxShadow: "0 0 0 rgba(218, 165, 32, 0)" },
  animate: { 
    boxShadow: [
      "0 0 0 rgba(218, 165, 32, 0)",
      "0 0 20px rgba(218, 165, 32, 0.3)",
      "0 0 0 rgba(218, 165, 32, 0)"
    ]
  }
};

export const qiblaCompass = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

// Stagger animations for lists
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Islamic clock animations
export const clockTick = {
  animate: {
    rotate: [0, 6],
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export const prayerTimeGlow = {
  animate: {
    boxShadow: [
      "0 0 5px rgba(34, 197, 94, 0.3)",
      "0 0 20px rgba(34, 197, 94, 0.6)",
      "0 0 5px rgba(34, 197, 94, 0.3)"
    ],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Button animations
export const buttonPress = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.05 }
};

export const floatingButton = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Loading animations
export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }
  }
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Notification animations
export const notificationSlide = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0 }
};

// Prayer direction animations
export const qiblaPointer = {
  animate: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Islamic pattern animations
export const geometricPattern = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity
    }
  }
};

// Text animations
export const typewriter = {
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
};

export const arabicTextGlow = {
  animate: {
    textShadow: [
      "0 0 5px rgba(218, 165, 32, 0.5)",
      "0 0 15px rgba(218, 165, 32, 0.8)",
      "0 0 5px rgba(218, 165, 32, 0.5)"
    ],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Custom motion components
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionCard = motion.div;
export const MotionText = motion.p;
export const MotionHeading = motion.h1;

// Transition presets
export const transitions = {
  spring: { type: "spring", stiffness: 300, damping: 30 },
  smooth: { duration: 0.3, ease: "easeOut" },
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  slow: { duration: 0.8, ease: "easeInOut" }
};
