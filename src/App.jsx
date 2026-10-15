import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoldParticleCanvas from './components/StarrySkyCanvas';
import HangingPolaroids from './components/HangingPolaroids';
import ConstellationPage from './components/ConstellationPage';
import LetterPage from './components/LetterPage';
import JournalPage from './components/JournalPage';
import FriendsPage from './components/FriendsPage';
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
    category: 'A Note for You',
    title: 'A Little Reminder',
    quote: 'Different places... Same dreams... ♡',
    description: 'No matter where life carries your steps, the dreams in your eyes and the kindness in your soul remain unchanged.'
  },
  journal: {
    category: 'Open Journal',
    title: 'A Story Still in Progress...',
    quote: 'Every chapter getting sweeter, bolder and brighter... ♡',
    description: 'Your life is an unfolding masterpiece of courage, gentle moments, and beautiful adventures. The best chapters are still ahead.'
  },
  books: {
    category: 'Favorite Reads',
    title: 'Favorite Companions',
    quote: 'A Brighter Me ♡ | Same Girl Bigger Dreams',
    description: 'Hardcover stories filled with late-night reflections, big ambitions, and silent victories that made you who you are today.'
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('friends');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const handleBeginJourney = () => {
    confetti({
      particleCount: 70,
      startVelocity: 35,
      spread: 360,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f0e0a0', '#ffffff', '#f5e6c8']
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
          transition={{ duration: 0.7 }}
        >
          {/* Ambient Gold Glow Layer */}
          <div className="page-ambient-glow" />

          {/* Floating Gold Particle Canvas */}
          <GoldParticleCanvas />

          {/* Hanging Polaroids (Left) */}
          <HangingPolaroids onSelectMemory={(key) => setActiveModalItem(hotspotsData[key])} />

          {/* Interactive UI Overlay Layer */}
          <div className="scene-ui-layer">
            {/* Top-Center Editorial Page Label */}
            <motion.div
              className="page-label-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              ✦&nbsp;&nbsp;A BIRTHDAY STORY&nbsp;&nbsp;✦
            </motion.div>

            {/* Right-Side Poem — sits beside title block */}
            <motion.div
              className="top-right-poem"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <p>Same girl...</p>
              <p>Brighter dreams</p>
              <p>Bigger courage</p>
              <p>So many people</p>
              <p>Proud of you ... ♡</p>
            </motion.div>

            {/* Centerpiece Showcase */}
            <div className="center-showcase">
              {/* Scattered Gold Sparkles */}
              <div className="sparkles-float-wrap">
                <svg viewBox="0 0 640 140" width="100%" height="100%" fill="none" style={{ overflow: 'visible' }}>
                  <defs>
                    <filter id="sparkGlow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Large top-center sparkle */}
                  <polygon points="320,12 322.5,20 330,22 322.5,24 320,32 317.5,24 310,22 317.5,20"
                    fill="#c9a84c" filter="url(#sparkGlow)" className="sparkle-b1" />

                  {/* Medium left sparkle */}
                  <polygon points="160,52 162,58 168,60 162,62 160,68 158,62 152,60 158,58"
                    fill="#e8c97a" opacity="0.75" filter="url(#sparkGlow)" className="sparkle-b2" />

                  {/* Medium right sparkle */}
                  <polygon points="482,44 484,51 491,53 484,55 482,62 480,55 473,53 480,51"
                    fill="#c9a84c" opacity="0.78" filter="url(#sparkGlow)" className="sparkle-b2" />

                  {/* Small upper-left */}
                  <polygon points="222,20 223.2,24 227,25 223.2,26 222,30 220.8,26 217,25 220.8,24"
                    fill="#c9a84c" opacity="0.55" className="sparkle-b3" />

                  {/* Small upper-right */}
                  <polygon points="418,16 419.2,20 423,21 419.2,22 418,26 416.8,22 413,21 416.8,20"
                    fill="#e8c97a" opacity="0.52" className="sparkle-b1" />

                  {/* Far-left small */}
                  <polygon points="80,38 81,42 85,43 81,44 80,48 79,44 75,43 79,42"
                    fill="#c9a84c" opacity="0.42" className="sparkle-b3" />

                  {/* Far-right small */}
                  <polygon points="558,30 559,34 563,35 559,36 558,40 557,36 553,35 557,34"
                    fill="#e8c97a" opacity="0.44" className="sparkle-b2" />

                  {/* Micro dots — scattered depth */}
                  <circle cx="255" cy="72" r="1.8" fill="#c9a84c" opacity="0.38" />
                  <circle cx="385" cy="68" r="2.2" fill="#e8c97a" opacity="0.35" />
                  <circle cx="130" cy="75" r="1.3" fill="#c9a84c" opacity="0.28" />
                  <circle cx="510" cy="70" r="1.5" fill="#c9a84c" opacity="0.3" />
                  <circle cx="50" cy="58" r="1" fill="#e8c97a" opacity="0.25" />
                  <circle cx="590" cy="52" r="1.2" fill="#c9a84c" opacity="0.26" />
                  <circle cx="320" cy="85" r="1.4" fill="#c9a84c" opacity="0.22" />
                </svg>
              </div>

              {/* Title row: Laurel | Happy | Laurel */}
              <motion.div
                className="title-with-laurels"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                {/* Left botanical laurel sprig */}
                <svg className="laurel-sprig-left" viewBox="0 0 120 56" fill="none">
                  {/* Main stem curving inward */}
                  <path d="M 108,30 C 80,28 52,24 18,26" stroke="#c9a84c" strokeWidth="1.1" fill="none" opacity="0.6" strokeLinecap="round"/>
                  {/* Leaf pair 1 — nearest */}
                  <path d="M 88,29 C 86,18 74,16 78,27" stroke="#c9a84c" strokeWidth="0.95" fill="none" opacity="0.58" strokeLinecap="round"/>
                  <path d="M 88,30 C 86,41 74,42 78,31" stroke="#c9a84c" strokeWidth="0.95" fill="none" opacity="0.52" strokeLinecap="round"/>
                  {/* Leaf pair 2 — middle */}
                  <path d="M 62,27 C 59,16 47,15 51,25" stroke="#c9a84c" strokeWidth="0.9" fill="none" opacity="0.52" strokeLinecap="round"/>
                  <path d="M 62,28 C 59,38 47,39 51,29" stroke="#c9a84c" strokeWidth="0.9" fill="none" opacity="0.46" strokeLinecap="round"/>
                  {/* Leaf pair 3 — far */}
                  <path d="M 36,26 C 32,17 22,17 26,25" stroke="#c9a84c" strokeWidth="0.85" fill="none" opacity="0.44" strokeLinecap="round"/>
                  <path d="M 36,27 C 32,36 22,36 26,28" stroke="#c9a84c" strokeWidth="0.85" fill="none" opacity="0.38" strokeLinecap="round"/>
                  {/* Tip bud */}
                  <path d="M 16,26 C 12,21 8,22 10,25" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.32" strokeLinecap="round"/>
                </svg>

                <h1 className="title-happy">Happy</h1>

                {/* Right botanical laurel sprig — mirrored */}
                <svg className="laurel-sprig-right" viewBox="0 0 120 56" fill="none">
                  {/* Main stem */}
                  <path d="M 12,30 C 40,28 68,24 102,26" stroke="#c9a84c" strokeWidth="1.1" fill="none" opacity="0.6" strokeLinecap="round"/>
                  {/* Leaf pair 1 */}
                  <path d="M 32,29 C 34,18 46,16 42,27" stroke="#c9a84c" strokeWidth="0.95" fill="none" opacity="0.58" strokeLinecap="round"/>
                  <path d="M 32,30 C 34,41 46,42 42,31" stroke="#c9a84c" strokeWidth="0.95" fill="none" opacity="0.52" strokeLinecap="round"/>
                  {/* Leaf pair 2 */}
                  <path d="M 58,27 C 61,16 73,15 69,25" stroke="#c9a84c" strokeWidth="0.9" fill="none" opacity="0.52" strokeLinecap="round"/>
                  <path d="M 58,28 C 61,38 73,39 69,29" stroke="#c9a84c" strokeWidth="0.9" fill="none" opacity="0.46" strokeLinecap="round"/>
                  {/* Leaf pair 3 */}
                  <path d="M 84,26 C 88,17 98,17 94,25" stroke="#c9a84c" strokeWidth="0.85" fill="none" opacity="0.44" strokeLinecap="round"/>
                  <path d="M 84,27 C 88,36 98,36 94,28" stroke="#c9a84c" strokeWidth="0.85" fill="none" opacity="0.38" strokeLinecap="round"/>
                  {/* Tip bud */}
                  <path d="M 104,26 C 108,21 112,22 110,25" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.32" strokeLinecap="round"/>
                </svg>
              </motion.div>

              {/* Title: Birthday + Heart */}
              <motion.div
                className="title-birthday-row"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="title-birthday">Birthday</span>
                <span className="title-heart">♡</span>
              </motion.div>

              {/* Gold separator rule */}
              <motion.div
                className="title-gold-rule"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.55 }}
              />

              {/* Gold pill badge */}
              <motion.div
                className="ribbon-banner-twoline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span>to the girl who makes</span>
                <span>the world brighter ♡</span>
              </motion.div>

              {/* Subtitle */}
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

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1 }}
              >
                <button
                  className="btn-begin-journey"
                  onClick={handleBeginJourney}
                >
                  <span>Let's Begin</span>
                  <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>→</span>
                </button>
              </motion.div>
            </div>

            {/* Bottom Decorative Rule */}
            <motion.div
              className="bottom-decorative-rule"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            >
              <span className="bottom-rule-line" />
              <span className="bottom-rule-star">✦</span>
              <span className="bottom-rule-line" />
            </motion.div>
          </div>

          {/* Memory Modal */}
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
            onCelebrate={() => setCurrentPage('friends')}
          />
        </motion.div>
      )}

      {currentPage === 'friends' && (
        <motion.div
          key="friends"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FriendsPage
            onBackToJournal={() => setCurrentPage('journal')}
            onContinue={() => setCurrentPage('nextPhase')}
          />
        </motion.div>
      )}

      {currentPage === 'nextPhase' && (
        <motion.main
          key="nextPhase"
          className="scene-viewport"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="page-ambient-glow" />
          <GoldParticleCanvas />

          <button
            className="nav-back-btn"
            onClick={() => setCurrentPage('friends')}
            title="Back to Friends"
          >
            <ArrowLeft size={16} className="nav-back-icon" />
            <span className="nav-back-text">Back</span>
          </button>

          <div className="friends-page-inner" style={{ justifyContent: 'center' }}>
            <div className="chapter-badge-row">
              <span className="chapter-badge-divider" />
              <span className="chapter-badge-text">CHAPTER 5 ✦ THE FINALE</span>
              <span className="chapter-badge-divider" />
            </div>

            <h1 className="friends-heading">The Next Phase</h1>

            <p className="friends-cursive-sub">
              Every chapter gets brighter &amp; sweeter... ♡
            </p>

            <div className="friends-divider">
              <span className="bottom-rule-line" />
              <span className="bottom-rule-star">✦</span>
              <span className="bottom-rule-line" />
            </div>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
