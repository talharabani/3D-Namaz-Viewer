import React from 'react';

const mistakes = [
  {
    title: 'Rushing the Prayer',
    mistake: 'Performing the movements and recitations too quickly, without calmness or reflection.',
    fix: 'Pray with calmness and humility. Allow each position to settle before moving to the next.'
  },
  {
    title: 'Incorrect Posture in Rukoo or Sujood',
    mistake: 'Not keeping the back straight in Rukoo, or elbows touching the ground in Sujood.',
    fix: 'Keep your back flat in Rukoo and ensure only your hands, knees, feet, forehead, and nose touch the ground in Sujood.'
  },
  {
    title: 'Lack of Focus (Khushu)',
    mistake: 'Letting the mind wander or thinking about worldly matters during prayer.',
    fix: 'Remind yourself you are standing before Allah. Focus on the meanings of what you recite.'
  },
  {
    title: 'Not Reciting Al-Fatiha Properly',
    mistake: 'Skipping or mispronouncing parts of Surah Al-Fatiha.',
    fix: 'Recite Al-Fatiha slowly and clearly in every unit (rak’ah) of prayer.'
  },
  {
    title: 'Improper Dress',
    mistake: 'Wearing clothes that do not cover the awrah (parts of the body that must be covered).',
    fix: 'Ensure your clothing covers the required areas and is clean.'
  },
  {
    title: 'Not Facing the Qibla',
    mistake: 'Praying without facing the direction of the Kaaba (Qibla).',
    fix: 'Always check your direction before starting prayer.'
  },
  {
    title: 'Skipping the Opening Takbir',
    mistake: 'Not raising hands and saying "Allahu Akbar" at the start.',
    fix: 'Begin every prayer with the opening takbir, raising both hands.'
  },
];

export default function NamazMistakesScreen() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-8">
      <h1 className="text-3xl font-heading text-brass font-bold mb-4 drop-shadow-lg">Common Mistakes in Prayer</h1>
      <div className="flex flex-col gap-6 w-full">
        {mistakes.map((item, idx) => (
          <div key={idx} className="glassmorph-card flex flex-col gap-2 animate-fadeIn">
            <div className="text-xl font-heading text-accent2 font-bold">{item.title}</div>
            <div className="text-mocha font-body"><span className="font-bold text-red-600">Mistake:</span> {item.mistake}</div>
            <div className="text-accent4 font-body"><span className="font-bold text-accent2">Fix:</span> {item.fix}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 