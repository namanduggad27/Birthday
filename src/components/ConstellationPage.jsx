import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import GoldParticleCanvas from './StarrySkyCanvas';
import MemoryModal from './MemoryModal';

const constellationStars = [
  { id: 1, name: 'The Star of Courage', x: 150, y: 110, virtue: 'Brave Heart', message: 'You never back down from a dream, even when the path is unknown. Your courage lights the way for everyone around you.' },
  { id: 2, name: 'The Star of Kindness', x: 340, y: 260, virtue: 'Gentle Soul', message: 'The warmth and empathy you carry make this world a softer, brighter place for everyone lucky enough to know you.' },
  { id: 3, name: 'The Star of Radiance', x: 530, y: 150, virtue: 'Unstoppable Light', message: 'Your laughter is contagious and your presence is pure sunshine. A beacon of joy at the very center of the cosmos.' },
  { id: 4, name: 'The Star of Wisdom', x: 720, y: 270, virtue: 'Growing Story', message: 'Every phase, every lesson, and every challenge has sculpted you into someone truly remarkable and deeply inspiring.' },
  { id: 5, name: 'The Star of Dreams', x: 900, y: 130, virtue: 'Infinite Horizon', message: 'Same girl, bigger dreams! The future holds adventures and victories beyond your wildest imagination.' }
];

export default function ConstellationPage({ onBackToHome, onExplore }) {
  const [activeStar, setActiveStar] = useState(null);

  const triggerConstellationExplore = () => {
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f0e0a0', '#ffffff', '#f5e6c8']
    });

    if (onExplore) {
      setTimeout(() => {
        onExplore();
      }, 350);
    }
  };

  return (
    <main className="scene-viewport constellation-page-viewport">
      {/* Ambient Gold Glow */}
      <div className="page-ambient-glow" />

      {/* Gold Particle Canvas */}
      <GoldParticleCanvas />

      {/* Back Button */}
      <button
        className="nav-back-btn"
        onClick={onBackToHome}
        title="Return to Welcome Page"
      >
        <ArrowLeft size={16} className="nav-back-icon" />
        <span className="nav-back-text">Back</span>
      </button>

      {/* UI Overlay Layer */}
      <div className="scene-ui-layer">
        {/* Top-Left Poem */}
        <motion.div
          className="constellation-top-left-poem"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="doodle-heart-left">♡</div>
          <p>Every phase...</p>
          <p>Every person...</p>
          <p>A brighter you... ♡</p>
        </motion.div>

        {/* Top-Right Poem */}
        <motion.div
          className="constellation-top-right-poem"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p>Same girl...</p>
          <p>Brighter dreams...</p>
          <p>Bigger courage...</p>
          <p>So many people...</p>
          <p>Proud of you ... ♡</p>
        </motion.div>

        {/* Centerpiece */}
        <div className="constellation-center-showcase">
          {/* Titles */}
          <motion.div
            className="constellation-titles-wrap"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h1 className="title-world-that">A World That</h1>
            <div className="title-believes-row">
              <span className="title-believes">Believes in Her</span>
              <span className="title-believes-heart">♡</span>
            </div>

            {/* Gold Divider */}
            <div className="decorative-star-divider">
              <span className="divider-line" />
              <span className="divider-star">✦</span>
              <span className="divider-line" />
            </div>
          </motion.div>

          {/* 5-Star Constellation System */}
          <motion.div
            className="constellation-stars-system"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <svg viewBox="0 0 1050 380" className="constellation-system-svg" fill="none">
              <defs>
                <filter id="starGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <radialGradient id="starHaloGrad">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="25%" stopColor="#e8c97a" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Constellation Beam */}
              <motion.path
                d="M 150,110 L 340,260 L 530,150 L 720,270 L 900,130"
                stroke="rgba(201, 168, 76, 0.75)"
                strokeWidth="2.2"
                className="constellation-beam-line"
                filter="url(#starGlowFilter)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />

              {/* Secondary white glow line */}
              <path
                d="M 150,110 L 340,260 L 530,150 L 720,270 L 900,130"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                opacity="1"
              />

              {/* The 5 Stars */}
              {constellationStars.map((star) => (
                <g
                  key={star.id}
                  transform={`translate(${star.x}, ${star.y})`}
                >
                  <g
                    className="star-hover-burst"
                    onClick={() => setActiveStar(star)}
                    title={star.name}
                  >
                    {/* Halo */}
                    <circle cx="0" cy="0" r="32" fill="url(#starHaloGrad)" />

                    {/* 8-Point rays — champagne gold */}
                    <polygon points="0,-44 3.5,-8 0,0 -3.5,-8" fill="#c9a84c" filter="url(#starGlowFilter)" />
                    <polygon points="0,44 3.5,8 0,0 -3.5,8" fill="#c9a84c" filter="url(#starGlowFilter)" />
                    <polygon points="-44,0 -8,-3.5 0,0 -8,3.5" fill="#c9a84c" filter="url(#starGlowFilter)" />
                    <polygon points="44,0 8,-3.5 0,0 8,3.5" fill="#c9a84c" filter="url(#starGlowFilter)" />

                    {/* Diagonal rays */}
                    <polygon points="-22,-22 -4.5,-6 0,0 -6,-4.5" fill="#e8c97a" opacity="0.9" />
                    <polygon points="22,-22 4.5,-6 0,0 6,-4.5" fill="#e8c97a" opacity="0.9" />
                    <polygon points="-22,22 -4.5,6 0,0 -6,4.5" fill="#e8c97a" opacity="0.9" />
                    <polygon points="22,22 4.5,6 0,0 6,4.5" fill="#e8c97a" opacity="0.9" />

                    {/* Core */}
                    <circle cx="0" cy="0" r="5.5" fill="#ffffff" filter="url(#starGlowFilter)" />
                    <circle cx="0" cy="0" r="3" fill="#e8c97a" />
                  </g>
                </g>
              ))}
            </svg>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            style={{ position: 'relative', marginTop: '16px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            <button
              className="btn-begin-journey btn-explore-constellation"
              onClick={triggerConstellationExplore}
            >
              <span className="btn-star-icon">✦</span>
              <span>Explore My Constellation</span>
              <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Star Detail Modal */}
      <MemoryModal
        activeItem={activeStar}
        onClose={() => setActiveStar(null)}
      />
    </main>
  );
}
