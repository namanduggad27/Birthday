import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoldParticleCanvas from './StarrySkyCanvas';

const journalEntries = [
  {
    id: 1,
    tag: 'CHAPTER 2',
    titleLine1: 'Golden',
    titleLine2: 'Moments',
    subtitle: 'Sunsets, laughter, and timeless adventures ♡',
    text: "From the quiet talks under the dusk sky to the unplanned moments that turned into our favorite stories, every memory with you is dipped in gold. You turn ordinary days into unforgettable adventures just by being your vibrant self. ♥"
  },
  {
    id: 2,
    tag: 'CHAPTER 2',
    titleLine1: 'Unwritten',
    titleLine2: 'Horizons',
    subtitle: 'Every sunrise brings a new dream to chase ♡',
    text: "Looking out towards the horizon, watching the first light touch the mountains, it feels like the world is pausing just to wish you a wonderful year ahead. Keep that wild spark in your eyes, that gentle kindness in your heart, and keep shining brighter than every star in this sky. ♥"
  }
];

export default function JournalPage({ onBackToLetter }) {
  const [entryIndex, setEntryIndex] = useState(0);

  const handleCelebrate = () => {
    confetti({
      particleCount: 85,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f0e0a0', '#ffffff', '#f5e6c8']
    });
  };

  const currentEntry = journalEntries[entryIndex];

  return (
    <main className="scene-viewport journal-page-viewport">
      {/* Ambient Gold Glow */}
      <div className="page-ambient-glow" />

      {/* Gold Particle Canvas */}
      <GoldParticleCanvas />

      {/* Back Button */}
      <button
        className="nav-back-btn"
        onClick={onBackToLetter}
        title="Back to Letter"
      >
        <ArrowLeft size={16} className="nav-back-icon" />
        <span className="nav-back-text">Back</span>
      </button>

      {/* Left Dark Glass Panel */}
      <div className="journal-parchment-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEntry.id}
            className="journal-entry-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Chapter Tag */}
            <div className="chapter-badge-row">
              <span className="chapter-badge-divider" />
              <span className="chapter-badge-text">{currentEntry.tag}</span>
              <span className="chapter-badge-divider" />
            </div>

            {/* Title */}
            <h1 className="chapter-main-title">
              <span className="title-row-one">{currentEntry.titleLine1}</span>
              <span className="title-row-two">{currentEntry.titleLine2}</span>
            </h1>

            {/* Subtitle */}
            <div className="chapter-subtitle-row">
              <span className="chapter-sub-ornament">✦──</span>
              <span className="chapter-subtitle-text">{currentEntry.subtitle}</span>
            </div>

            {/* Journal Body Text */}
            <p className="chapter-paragraph-text">
              {currentEntry.text}
            </p>

            {/* Navigation & Action Buttons */}
            <div className="chapter-nav-buttons-row">
              <button
                className="btn-chapter-prev"
                onClick={() => setEntryIndex((prev) => Math.max(0, prev - 1))}
                disabled={entryIndex === 0}
              >
                ← Previous
              </button>
              <button
                className="btn-chapter-next"
                onClick={() => {
                  if (entryIndex < journalEntries.length - 1) {
                    setEntryIndex((prev) => prev + 1);
                  } else {
                    handleCelebrate();
                  }
                }}
              >
                {entryIndex === journalEntries.length - 1 ? 'Celebrate ✦' : 'Next →'}
              </button>
            </div>

            {/* Progress Track */}
            <div className="chapter-progress-track">
              <div className="chapter-progress-line" />
              <div className="chapter-dots-container">
                {journalEntries.map((_, idx) => (
                  <button
                    key={idx}
                    className={`chapter-track-node ${idx === entryIndex ? 'is-active-star' : idx < entryIndex ? 'is-past-dot' : 'is-future-dot'}`}
                    onClick={() => setEntryIndex(idx)}
                    title={`Page ${idx + 1}`}
                  >
                    {idx === entryIndex ? (
                      <span className="track-golden-star">✦</span>
                    ) : (
                      <span className="track-dot-circle" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
