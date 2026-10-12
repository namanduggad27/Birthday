import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import StarrySkyCanvas from './components/StarrySkyCanvas';
import HangingPolaroids from './components/HangingPolaroids';
import ConstellationPage from './components/ConstellationPage';
import LetterPage from './components/LetterPage';
import JournalPage from './components/JournalPage';
import MemoryModal from './components/MemoryModal';
import './App.css';

const hotspotsData = {
  polaroid1: {
    category: 'Memory 01',
    title: 'Sunset by the Waters',
    quote: 'Different places... Same dreams... ♡',
    description: 'A quiet evening under the golden sky, watching the horizon change colors and wishing on every distant star.'
  },
  polaroid2: {
    category: 'Memory 02',
    title: 'Field of White Daisies',
    quote: 'To the girl who makes the world brighter ♡',
    description: 'Like wildflowers that bloom effortlessly, your laughter brings warmth to every single room you walk into.'
  },
  polaroid3: {
    category: 'Memory 03',
    title: 'Historic Rooftops & Wandering',
    quote: 'Bigger courage, brighter dreams...',
    description: 'Walking through ancient cobblestone paths, dreaming big and fearless with a heart full of wonder.'
  },
  note: {
    category: 'Handwritten Note',
    title: 'A Little Reminder',
    quote: 'Different places... Same dreams... ♡',
    description: 'No matter where life carries your steps, the dreams in your eyes and the kindness in your soul remain unchanged.'
  },
  journal: {
    category: 'Open Scrapbook',
    title: 'A Story Still in Progress...',
    quote: 'Every chapter getting sweeter, bolder and brighter... ♡',
    description: 'Your life is an unfolding masterpiece of courage, gentle moments, and beautiful adventures. The best chapters are still ahead.'
  },
  books: {
    category: 'Books on the Ledge',
    title: 'Favorite Companions',
    quote: 'A Brighter Me ♡ | Same Girl Bigger Dreams',
    description: 'Hardcover stories filled with late-night reflections, big ambitions, and silent victories that made you who you are today.'
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Transition from Welcome to Constellation Page
  const handleBeginJourney = () => {
    // Grand Golden Stardust Fireworks
    confetti({
      particleCount: 70,
      startVelocity: 35,
      spread: 360,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#fef08a', '#fde047', '#eab308', '#f59e0b', '#ffffff']
    });

    setTimeout(() => {
      setCurrentPage('constellation');
    }, 450);
  };

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'welcome' && (
        <motion.main 
          key="welcome"
          className="scene-viewport"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Scenic Artwork: Edge to Edge (No black borders) */}
          <div className="scene-background" />

          {/* Atmospheric Vignette & Depth */}
          <div className="sky-depth-overlay" />

          {/* Live Canvas Starfield & Twinkling Night */}
          <StarrySkyCanvas />

          {/* Warm Lantern Glow Pulse */}
          <div className="lantern-glow-pulse" />

          {/* Soft Fairy Lights Glow (Left) */}
          <div className="fairy-lights-glow" />

          {/* Realistic Hanging Polaroids & Kraft Note on the Tree */}
          <HangingPolaroids onSelectMemory={(key) => setActiveModalItem(hotspotsData[key])} />

          {/* Interactive UI Overlay Layer */}
          <div className="scene-ui-layer">
            {/* Top-Right Handwritten Poem */}
            <motion.div 
              className="top-right-poem"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <p>Same girl...</p>
              <p>Brighter dreams</p>
              <p>Bigger courage</p>
              <p>So many people</p>
              <p>Proud of you ... ♡</p>
            </motion.div>

            {/* Centerpiece Showcase */}
            <div className="center-showcase">
              {/* Dual Constellation Arcs & Paper Airplane SVG */}
              <div className="constellation-svg-wrap">
                <svg viewBox="0 0 660 250" width="100%" height="100%" fill="none" style={{ overflow: 'visible' }}>
                  {/* Primary Constellation Dashed Arc leading over 'Happy' to the right */}
                  <path
                    d="M 15,190 C 130,35 390,16 560,46"
                    stroke="rgba(254, 240, 138, 0.52)"
                    strokeWidth="1.8"
                    strokeDasharray="6 6"
                    className="constellation-path"
                  />

                  {/* Secondary Delicate Loop on Left */}
                  <path
                    d="M 15,190 C 70,110 130,80 155,120 C 175,150 220,120 260,80"
                    stroke="rgba(254, 240, 138, 0.35)"
                    strokeWidth="1.3"
                    strokeDasharray="4 5"
                  />

                  {/* Floating Hand-Drawn Heart Doodle under the nebula */}
                  <path
                    d="M 500,125 C 500,115 512,110 520,118 C 528,110 540,115 540,125 C 540,138 520,150 520,150 C 520,150 500,138 500,125 Z"
                    stroke="rgba(255, 255, 255, 0.75)"
                    strokeWidth="1.4"
                    fill="none"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(254, 240, 138, 0.6))' }}
                  />

                  {/* Twinkling Star Nodes along the constellation */}
                  <circle cx="85" cy="120" r="2.5" fill="#fef08a" opacity="0.85" />
                  <circle cx="210" cy="54" r="3" fill="#ffffff" opacity="0.9" />
                  <circle cx="370" cy="24" r="3.5" fill="#fde047" opacity="1" />
                  <circle cx="490" cy="33" r="2.5" fill="#ffffff" opacity="0.85" />

                  {/* Hand-Drawn Constellation Star Doodle at peak */}
                  <polygon
                    points="370,16 373,22 380,23 375,28 376,34 370,31 364,34 365,28 360,23 367,22"
                    stroke="#fde047"
                    strokeWidth="1.3"
                    fill="none"
                  />

                  {/* Trailing Starlight Dots behind the Airplane */}
                  <circle cx="538" cy="42" r="1.5" fill="#ffffff" opacity="0.7" />
                  <circle cx="522" cy="46" r="1.2" fill="#fef08a" opacity="0.6" />

                  {/* Floating Paper Airplane right at the tip of the line on the RIGHT */}
                  <g transform="translate(555, 36)">
                    <g className="paper-airplane-float">
                      <polygon
                        points="0,14 30,0 12,24"
                        stroke="#ffffff"
                        strokeWidth="1.6"
                        fill="rgba(255, 255, 255, 0.22)"
                      />
                      <line x1="30" y1="0" x2="10" y2="16" stroke="#ffffff" strokeWidth="1.3" />
                    </g>
                  </g>

                  {/* Small Star Doodles */}
                  <polygon points="210,48 212,52 216,53 213,56 214,60 210,58 206,60 207,56 204,53 208,52" stroke="#fef08a" strokeWidth="1" fill="none" />
                  <polygon points="490,27 491,30 494,31 492,33 493,36 490,34 487,36 488,33 486,31 489,30" stroke="#ffffff" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Title: Happy */}
              <motion.h1 
                className="title-happy"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                Happy
              </motion.h1>

              {/* Title: Birthday + Pulsing Heart */}
              <motion.div 
                className="title-birthday-row"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="title-birthday">Birthday</span>
                <span className="title-heart">♡</span>
              </motion.div>

              {/* Two-Line Compact Vintage Torn Paper Ribbon Badge */}
              <motion.div 
                className="ribbon-banner-twoline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span>to the girl who makes</span>
                <span>the world brighter ♡</span>
              </motion.div>

              {/* Subtitle Paragraph */}
              <motion.p 
                className="subtitle-quote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                A little journey through your story,<br />
                the people who walk with you,<br />
                and everything that makes you, YOU. ♡
              </motion.p>

              {/* Glowing CTA Button */}
              <motion.div 
                style={{ position: 'relative' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1 }}
              >
                {/* Hand-Drawn Glowing Star */}
                <div className="star-doodle-left">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <polygon
                      points="12,2 14.5,8.5 21.5,9.5 16,14.5 17.5,21.5 12,18 6.5,21.5 8,14.5 2.5,9.5 9.5,8.5"
                      stroke="#fde047"
                      strokeWidth="1.8"
                      fill="rgba(253, 224, 71, 0.25)"
                    />
                  </svg>
                </div>

                <button 
                  className="btn-begin-journey"
                  onClick={handleBeginJourney}
                >
                  <span>Let's Begin</span>
                  <span style={{ fontSize: '1.25rem' }}>→</span>
                </button>
              </motion.div>
            </div>

            {/* Open Scrapbook Note Overlay (Bottom Right on Open Journal Page) */}
            <motion.div 
              className="journal-note-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              onClick={() => setActiveModalItem(hotspotsData.journal)}
              title="Click to view journal entry"
            >
              <p>A story</p>
              <p>still in progress... <span className="journal-heart">♡</span></p>
            </motion.div>

            {/* Books Stack Spine Titles Overlay */}
            <motion.div 
              className="books-spines-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              onClick={() => setActiveModalItem(hotspotsData.books)}
              title="Click to explore books"
            >
              <p>A Brighter Me ♡</p>
              <p style={{ marginTop: '4px' }}>Same Girl</p>
              <p>Bigger Dreams</p>
            </motion.div>
          </div>

          {/* Interactive Detail Modal */}
          <MemoryModal 
            activeItem={activeModalItem} 
            onClose={() => setActiveModalItem(null)} 
          />
        </motion.main>
      )}

      {currentPage === 'constellation' && (
        <motion.div
          key="constellation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ConstellationPage 
            onBackToHome={() => setCurrentPage('welcome')} 
            onExplore={() => setCurrentPage('letter')}
          />
        </motion.div>
      )}

      {currentPage === 'letter' && (
        <motion.div
          key="letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <LetterPage 
            onBackToConstellation={() => setCurrentPage('constellation')}
            onMoveForward={() => setCurrentPage('journal')}
          />
        </motion.div>
      )}

      {currentPage === 'journal' && (
        <motion.div
          key="journal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <JournalPage 
            onBackToLetter={() => setCurrentPage('letter')}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
