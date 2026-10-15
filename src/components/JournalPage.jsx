import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoldParticleCanvas from './StarrySkyCanvas';

const journalEntries = [
  {
    id: 1,
    tag: 'CHAPTER 2',
    titleLine1: 'Growing',
    titleLine2: 'Up',
    pageSubtitle: 'Page 1 — School Days',
    subtitle: 'Same girl, just a little older ♡',
    text: "From school bags and classrooms to those random laughs with friends, these were the days when even the smallest things could become a whole memory 😂❤️ New faces, new experiences, and probably a few stories that still make you laugh whenever you think about them."
  },
  {
    id: 2,
    tag: 'CHAPTER 2',
    titleLine1: 'Growing',
    titleLine2: 'Up',
    pageSubtitle: 'Page 2 — The People & The Memories',
    subtitle: 'Same girl, just a little older ♡',
    text: "Somewhere between classes, conversations, group pictures, and all those little everyday moments, people started becoming an important part of your story. Some memories might be blurry now, but the people in them will always remind you of a version of life that was a little different. 🤍"
  },
  {
    id: 3,
    tag: 'CHAPTER 2',
    titleLine1: 'Growing',
    titleLine2: 'Up',
    pageSubtitle: 'Page 3 — Slowly Growing Up',
    subtitle: 'Same girl, just a little older ♡',
    text: "And without really noticing, you started growing into the person you are today. A little more confident, a little more independent, with new dreams and a lot more stories to tell. The little girl is still there somewhere — just with better pictures and probably more attitude now. 😂✨"
  }
];

// 8 Teen photos from /public/teen/ arranged on a 2-tier fairy-light garland wall
const tier1Photos = [
  { id: 't-1', src: '/teen/IMG-20221114-WA0102.jpg', rot: -3, note: 'Memories ♡' },
  { id: 't-2', src: '/teen/IMG-20221210-WA0057.jpg', rot: 3.5, note: 'School days' },
  { id: 't-3', src: '/teen/IMG-20230126-WA0017.jpg', rot: -2, note: 'Good times ✨' },
  { id: 't-4', src: '/teen/IMG-20230211-WA0213.jpg', rot: 4, note: 'Unplanned ♡' }
];

const tier2Photos = [
  { id: 't-5', src: '/teen/IMG20230329161807.jpg', rot: 2.5, note: 'Growing up' },
  { id: 't-6', src: '/teen/IMG20260712222246.jpg', rot: -3.5, note: 'Smiles ✦' },
  { id: 't-7', src: '/teen/IMG20260712222300.jpg', rot: 2, note: 'Chapters ♡' },
  { id: 't-8', src: '/teen/IMG20260712222644.jpg', rot: -1.5, note: 'Forever ✨' }
];

export default function JournalPage({ onBackToLetter, onCelebrate }) {
  const [entryIndex, setEntryIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleCelebrate = () => {
    confetti({
      particleCount: 85,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f0e0a0', '#ffffff', '#f5e6c8']
    });
    // Navigate to Friends page after a short delay
    if (onCelebrate) {
      setTimeout(() => onCelebrate(), 500);
    }
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

            {/* Subtitle / Description */}
            <div className="chapter-subtitle-row">
              <span className="chapter-sub-ornament">✦──</span>
              <span className="chapter-subtitle-text">{currentEntry.subtitle}</span>
            </div>

            {/* Page Subtitle / Topic */}
            {currentEntry.pageSubtitle && (
              <div className="chapter-page-section-title">
                {currentEntry.pageSubtitle}
              </div>
            )}

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

      {/* ── Right Side: 2-Tier Fairy-Light Polaroid Garland Wall (Non-scrolling) ── */}
      <div className="journal-garland-wall">

        {/* Tier 1 - Top String */}
        <div className="garland-tier-row">
          <div className="garland-wire-line" />
          {tier1Photos.map((photo) => (
            <div
              key={photo.id}
              className="garland-polaroid-item"
              style={{ transform: `rotate(${photo.rot}deg)` }}
              onClick={() => setSelectedPhoto(photo.src)}
              title="Click to view full photo"
            >
              <div className="garland-clip-pin" />
              <div className="polaroid-inner-frame">
                <img
                  src={photo.src}
                  alt="Growing up memory"
                  className="polaroid-photo-img"
                  loading="lazy"
                />
              </div>
              <span className="garland-polaroid-chin">{photo.note}</span>
            </div>
          ))}
        </div>

        {/* Tier 2 - Bottom String */}
        <div className="garland-tier-row">
          <div className="garland-wire-line" />
          {tier2Photos.map((photo) => (
            <div
              key={photo.id}
              className="garland-polaroid-item"
              style={{ transform: `rotate(${photo.rot}deg)` }}
              onClick={() => setSelectedPhoto(photo.src)}
              title="Click to view full photo"
            >
              <div className="garland-clip-pin" />
              <div className="polaroid-inner-frame">
                <img
                  src={photo.src}
                  alt="Growing up memory"
                  className="polaroid-photo-img"
                  loading="lazy"
                />
              </div>
              <span className="garland-polaroid-chin">{photo.note}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Full View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="childhood-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="childhood-modal-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="childhood-modal-close-btn"
                onClick={() => setSelectedPhoto(null)}
                title="Close"
              >
                <X size={18} />
              </button>
              <img
                src={selectedPhoto}
                alt="Growing Up Memory Enlarged"
                className="childhood-modal-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
