import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import StarrySkyCanvas from './StarrySkyCanvas';
import MemoryModal from './MemoryModal';

const constellationStars = [
  { id: 1, name: 'The Star of Courage', x: 150, y: 110, virtue: 'Brave Heart', message: 'You never back down from a dream, even when the path is unknown. Your courage lights the way for everyone around you.' },
  { id: 2, name: 'The Star of Kindness', x: 340, y: 260, virtue: 'Gentle Soul', message: 'The warmth and empathy you carry make this world a softer, brighter place for everyone lucky enough to know you.' },
  { id: 3, name: 'The Star of Radiance', x: 530, y: 150, virtue: 'Unstoppable Light', message: 'Your laughter is contagious and your presence is pure sunshine. A beacon of joy at the very center of the cosmos.' },
  { id: 4, name: 'The Star of Wisdom', x: 720, y: 270, virtue: 'Growing Story', message: 'Every phase, every lesson, and every challenge has sculpted you into someone truly remarkable and deeply inspiring.' },
  { id: 5, name: 'The Star of Dreams', x: 900, y: 130, virtue: 'Infinite Horizon', message: 'Same girl, bigger dreams! The future holds adventures and victories beyond your wildest imagination.' }
];

export default function ConstellationPage({ onBackToHome }) {
  const [activeStar, setActiveStar] = useState(null);

  const triggerConstellationExplore = () => {
    // Stardust Fireworks
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      confetti({
        particleCount: 50,
        startVelocity: 35,
        spread: 360,
        ticks: 80,
        origin: {
          x: Math.random() * 0.6 + 0.2,
          y: Math.random() * 0.4 + 0.2
        },
        colors: ['#fde047', '#fef08a', '#eab308', '#f59e0b', '#ffffff', '#c084fc']
      });
    }, 280);

    setActiveStar({
      category: 'Constellation of Her',
      title: 'A World That Believes In You ✨',
      quote: 'Every star in this sky is shining for you tonight...',
      description: 'You are loved beyond words, admired for your boundless strength, and celebrated today and every single day. Keep shining as brightly as you do.'
    });
  };

  return (
    <main className="scene-viewport constellation-page-viewport">
      {/* Background HD Scenery */}
      <div className="scene-background constellation-bg-layer" />

      {/* Atmospheric Vignette & Depth */}
      <div className="sky-depth-overlay" />

      {/* Live Canvas Starfield */}
      <StarrySkyCanvas />

      {/* Dual Lantern Glows (Left & Right) */}
      <div className="lantern-glow-pulse lantern-left-pulse" />
      <div className="lantern-glow-pulse lantern-right-pulse" />

      {/* Back to Home Button (Discreet top-left) */}
      <button 
        className="nav-back-btn"
        onClick={onBackToHome}
        title="Return to Welcome Page"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* UI Overlay Layer */}
      <div className="scene-ui-layer">
        {/* Top-Left Handwritten Poem & Heart */}
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

        {/* Top-Right Handwritten Poem (Under Moon) */}
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

        {/* Centerpiece Container */}
        <div className="constellation-center-showcase">
          {/* Main Titles */}
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

            {/* Decorative Star Divider */}
            <div className="decorative-star-divider">
              <span className="divider-line" />
              <span className="divider-star">⭐</span>
              <span className="divider-line" />
            </div>
          </motion.div>

          {/* Major 5-Star Constellation System */}
          <motion.div 
            className="constellation-stars-system"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <svg viewBox="0 0 1050 380" className="constellation-system-svg" fill="none">
              <defs>
                {/* Luminous Glow Filter for Stars */}
                <filter id="starGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <radialGradient id="starHaloGrad">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="30%" stopColor="#fef08a" stopOpacity="0.75" />
                  <stop offset="65%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Connecting Constellation Starlight Beams */}
              <motion.path
                d="M 150,110 L 340,260 L 530,150 L 720,270 L 900,130"
                stroke="rgba(254, 240, 138, 0.85)"
                strokeWidth="2.4"
                className="constellation-beam-line"
                filter="url(#starGlowFilter)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />

              {/* Secondary delicate starlight connection */}
              <path
                d="M 150,110 L 340,260 L 530,150 L 720,270 L 900,130"
                stroke="#ffffff"
                strokeWidth="1.2"
                opacity="0.9"
              />

              {/* The 5 Brilliant Flare Stars */}
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
                    {/* Radiant Halo Ambient Disc */}
                    <circle cx="0" cy="0" r="34" fill="url(#starHaloGrad)" />

                    {/* 8-Point Golden Diamond Rays */}
                    {/* Vertical Long Rays */}
                    <polygon points="0,-48 4,-9 0,0 -4,-9" fill="#fef08a" filter="url(#starGlowFilter)" />
                    <polygon points="0,48 4,9 0,0 -4,9" fill="#fef08a" filter="url(#starGlowFilter)" />
                    {/* Horizontal Long Rays */}
                    <polygon points="-48,0 -9,-4 0,0 -9,4" fill="#fef08a" filter="url(#starGlowFilter)" />
                    <polygon points="48,0 9,-4 0,0 9,4" fill="#fef08a" filter="url(#starGlowFilter)" />

                    {/* Diagonal Shorter Rays */}
                    <polygon points="-24,-24 -5,-7 0,0 -7,-5" fill="#fde047" opacity="0.95" />
                    <polygon points="24,-24 5,-7 0,0 7,-5" fill="#fde047" opacity="0.95" />
                    <polygon points="-24,24 -5,7 0,0 -7,5" fill="#fde047" opacity="0.95" />
                    <polygon points="24,24 5,7 0,0 7,5" fill="#fde047" opacity="0.95" />

                    {/* Brilliant White-Gold Core */}
                    <circle cx="0" cy="0" r="6" fill="#ffffff" filter="url(#starGlowFilter)" />
                    <circle cx="0" cy="0" r="3.5" fill="#fef08a" />
                  </g>
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Explore My Constellation CTA Button */}
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
              <span className="btn-star-icon">⭐</span>
              <span>Explore My Constellation</span>
              <span style={{ fontSize: '1.25rem' }}>→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Memory / Star Detail Modal */}
      <MemoryModal 
        activeItem={activeStar} 
        onClose={() => setActiveStar(null)} 
      />
    </main>
  );
}
