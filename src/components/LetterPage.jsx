import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoldParticleCanvas from './StarrySkyCanvas';

const pagesData = [
  {
    id: 1,
    chapterTag: 'CHAPTER 1',
    headingLine1: 'Cute',
    headingLine2: 'Childhood',
    description: 'Same girl, just a smaller version ♡',
    writing: "These photos are a little reminder of the girl who has always been full of life — from those chubby cheeks to the endless expressions, you've always had a way of making everyone smile. Different phases, same you — full of mischief, warmth and that unforgettable charm. ♥"
  },
  {
    id: 2,
    chapterTag: 'CHAPTER 1',
    headingLine1: 'Cute',
    headingLine2: 'Childhood',
    description: 'Same girl, just a smaller version ♡',
    writing: "Looking at these pictures, I can already imagine how many random expressions, silly moments, and little tantrums came with them 😂❤️ And somehow, every picture has its own little story. Some make you smile, some make you laugh, and some make you wonder how this tiny version of you grew up so fast."
  },
  {
    id: 3,
    chapterTag: 'CHAPTER 1',
    headingLine1: 'Cute',
    headingLine2: 'Childhood',
    description: 'Same girl, just a smaller version ♡',
    writing: "The outfits, the poses, those innocent smiles… everything has its own charm. 🥹💕 I wonder if you look at these pictures and remember any of these moments, or if some of them are just surprises waiting to be rediscovered. Either way, these little snapshots are too precious to leave buried in an old gallery."
  }
];

// Configuration for the 3 columns of infinitely moving Polaroids
const col1Items = [
  { id: '1-1', rot: -2, hasPlay: true },
  { id: '1-2', rot: 3, hasPlay: false },
  { id: '1-3', rot: -1.5, hasPlay: false },
  { id: '1-4', rot: 2.5, hasPlay: true },
  { id: '1-5', rot: -3, hasPlay: false }
];

const col2Items = [
  { id: '2-1', rot: 2, hasPlay: false },
  { id: '2-2', rot: -2.5, hasPlay: false },
  { id: '2-3', rot: 3, hasPlay: false },
  { id: '2-4', rot: -1, hasPlay: false },
  { id: '2-5', rot: 2, hasPlay: false }
];

const col3Items = [
  { id: '3-1', rot: -1.5, hasPlay: false },
  { id: '3-2', rot: 2.5, hasPlay: false },
  { id: '3-3', rot: -3, hasPlay: false },
  { id: '3-4', rot: 1.5, hasPlay: false },
  { id: '3-5', rot: -2, hasPlay: true }
];

export default function LetterPage({ onBackToConstellation, onMoveForward }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const goToNext = () => {
    if (currentPageIndex < pagesData.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    } else {
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f0e0a0', '#ffffff', '#f5e6c8']
      });

      if (onMoveForward) {
        setTimeout(() => {
          onMoveForward();
        }, 350);
      }
    }
  };

  const goToPrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const currentPage = pagesData[currentPageIndex];

  return (
    <main className="scene-viewport letter-page-viewport">
      {/* Ambient Gold Glow */}
      <div className="page-ambient-glow" />

      {/* Gold Particle Canvas */}
      <GoldParticleCanvas />

      {/* Back Button */}
      <button
        className="nav-back-btn"
        onClick={onBackToConstellation}
        title="Back to Constellation"
      >
        <ArrowLeft size={16} className="nav-back-icon" />
        <span className="nav-back-text">Back</span>
      </button>

      {/* Left Panel — Dark Glass Text Container */}
      <div className="parchment-text-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage.id}
            className="parchment-chapter-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Chapter Badge */}
            <div className="chapter-badge-row">
              <span className="chapter-badge-divider" />
              <span className="chapter-badge-text">{currentPage.chapterTag}</span>
              <span className="chapter-badge-divider" />
            </div>

            {/* Main Heading */}
            <h1 className="chapter-main-title">
              <span className="title-row-one">{currentPage.headingLine1}</span>
              <span className="title-row-two">{currentPage.headingLine2}</span>
            </h1>

            {/* Subtitle */}
            <div className="chapter-subtitle-row">
              <span className="chapter-sub-ornament">✦──</span>
              <span className="chapter-subtitle-text">{currentPage.description}</span>
            </div>

            {/* Body Text */}
            <p className="chapter-paragraph-text">
              {currentPage.writing}
            </p>

            {/* Navigation Buttons */}
            <div className="chapter-nav-buttons-row">
              <button
                className="btn-chapter-prev"
                onClick={goToPrev}
                disabled={currentPageIndex === 0}
              >
                ← Previous
              </button>
              <button
                className="btn-chapter-next"
                onClick={goToNext}
              >
                {currentPageIndex === pagesData.length - 1 ? 'Move Forward →' : 'Next →'}
              </button>
            </div>

            {/* Progress Track */}
            <div className="chapter-progress-track">
              <div className="chapter-progress-line" />
              <div className="chapter-dots-container">
                {pagesData.map((_, idx) => (
                  <button
                    key={idx}
                    className={`chapter-track-node ${idx === currentPageIndex ? 'is-active-star' : idx < currentPageIndex ? 'is-past-dot' : 'is-future-dot'}`}
                    onClick={() => setCurrentPageIndex(idx)}
                    title={`Go to Page ${idx + 1}`}
                  >
                    {idx === currentPageIndex ? (
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

      {/* 3 Endlessly Moving Polaroid Columns (Right Side) */}
      <div className="polaroid-streams-container">
        {/* Column 1 — Scrolls Upward */}
        <div className="polaroid-stream-col stream-col-1">
          <div className="fairy-light-wire" />
          <div className="stream-scroll-track scroll-up-anim">
            {col1Items.concat(col1Items).map((item, idx) => (
              <div
                key={`c1-${idx}`}
                className="polaroid-card-item"
                style={{ transform: `rotate(${item.rot}deg)` }}
              >
                <div className="polaroid-clip-bulb" />
                <div className="polaroid-inner-frame">
                  {item.hasPlay && (
                    <div className="polaroid-play-icon">
                      <div className="play-triangle" />
                    </div>
                  )}
                </div>
                <div className="polaroid-bottom-chin" />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 — Scrolls Downward */}
        <div className="polaroid-stream-col stream-col-2">
          <div className="fairy-light-wire" />
          <div className="stream-scroll-track scroll-down-anim">
            {col2Items.concat(col2Items).map((item, idx) => (
              <div
                key={`c2-${idx}`}
                className="polaroid-card-item"
                style={{ transform: `rotate(${item.rot}deg)` }}
              >
                <div className="polaroid-clip-bulb" />
                <div className="polaroid-inner-frame">
                  {item.hasPlay && (
                    <div className="polaroid-play-icon">
                      <div className="play-triangle" />
                    </div>
                  )}
                </div>
                <div className="polaroid-bottom-chin" />
              </div>
            ))}
          </div>
        </div>

        {/* Column 3 — Scrolls Upward (Offset) */}
        <div className="polaroid-stream-col stream-col-3">
          <div className="fairy-light-wire" />
          <div className="stream-scroll-track scroll-up-offset-anim">
            {col3Items.concat(col3Items).map((item, idx) => (
              <div
                key={`c3-${idx}`}
                className="polaroid-card-item"
                style={{ transform: `rotate(${item.rot}deg)` }}
              >
                <div className="polaroid-clip-bulb" />
                <div className="polaroid-inner-frame">
                  {item.hasPlay && (
                    <div className="polaroid-play-icon">
                      <div className="play-triangle" />
                    </div>
                  )}
                </div>
                <div className="polaroid-bottom-chin" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
