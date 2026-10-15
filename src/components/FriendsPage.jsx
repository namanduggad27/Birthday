import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoldParticleCanvas from './StarrySkyCanvas';
import FriendDetailPage from './FriendDetailPage';
import { FRIENDS_DATA } from '../data/friendsData';

// ─── 11 slot positions (top/left as % of scatter canvas) ───────
// Center slot (index 5) is bigger; all others are small
const SLOTS = [
  { i: 0,  center: false, top: '6%',  left: '1.5%'  },  // far-left — top
  { i: 1,  center: false, top: '52%', left: '1.5%'  },  // far-left — bottom
  { i: 2,  center: false, top: '29%', left: '14.5%' }, // mid-left — floating
  { i: 3,  center: false, top: '4%',  left: '27.5%' }, // inner-left — top
  { i: 4,  center: false, top: '52%', left: '27.5%' }, // inner-left — bottom
  { i: 5,  center: true,  top: '14%', left: '42%'   }, // BIG CENTER — heart
  { i: 6,  center: false, top: '4%',  left: '60.5%' }, // inner-right — top
  { i: 7,  center: false, top: '52%', left: '60.5%' }, // inner-right — bottom
  { i: 8,  center: false, top: '29%', left: '73.5%' }, // mid-right — floating
  { i: 9,  center: false, top: '6%',  left: '86.5%' }, // far-right — top
  { i: 10, center: false, top: '52%', left: '86.5%' }, // far-right — bottom
];

function PhotoSlot({ slot, friend, onSelect }) {
  return (
    <div
      className={`photo-slot${slot.center ? ' photo-slot-center' : ''}`}
      style={{ top: slot.top, left: slot.left }}
      onClick={() => onSelect(friend)}
      title={`Open message from ${friend?.name || 'Friend'}`}
    >
      <span className="slot-corner slot-corner-tl" />
      <span className="slot-corner slot-corner-tr" />
      <span className="slot-corner slot-corner-bl" />
      <span className="slot-corner slot-corner-br" />
      <div className="photo-slot-placeholder">
        <span className="photo-slot-sparkle">✦</span>
        {slot.center ? (
          <>
            <span className="photo-slot-center-label">{friend?.name || 'Center ♡'}</span>
            <span style={{ fontSize: '10px', color: 'rgba(201,168,76,0.3)', fontFamily: 'var(--font-sans)', letterSpacing: '1px' }}>
              TAP TO OPEN
            </span>
          </>
        ) : (
          <>
            <span className="photo-slot-num">{String(slot.i + 1).padStart(2, '0')}</span>
            <span className="photo-slot-friend-name">{friend?.name}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function FriendsPage({ onBackToJournal, onContinue }) {
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    const t1 = setTimeout(() => confetti({ particleCount: 80, spread: 150, origin: { x: 0.3, y: 0.5 }, colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f0e0a0', '#ffffff'] }), 350);
    const t2 = setTimeout(() => confetti({ particleCount: 80, spread: 150, origin: { x: 0.7, y: 0.5 }, colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f5e6c8', '#ffffff'] }), 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleContinue = () => {
    confetti({
      particleCount: 90,
      spread: 130,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#ffffff', '#f5e6c8']
    });
    if (onContinue) {
      setTimeout(() => {
        onContinue();
      }, 450);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {selectedFriend ? (
        <motion.div
          key={`detail-${selectedFriend.id}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%' }}
        >
          <FriendDetailPage
            friend={selectedFriend}
            onBack={() => setSelectedFriend(null)}
          />
        </motion.div>
      ) : (
        <motion.main
          key="scatter-overview"
          className="scene-viewport friends-page-viewport"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="page-ambient-glow" />
          <GoldParticleCanvas />

          {/* Top-Left Back Button */}
          <button className="nav-back-btn" onClick={onBackToJournal} title="Back to Journal">
            <ArrowLeft size={16} className="nav-back-icon" />
            <span className="nav-back-text">Back</span>
          </button>

          {/* Content area */}
          <div className="friends-page-inner">

            {/* ── Header ── */}
            <motion.div className="chapter-badge-row"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              <span className="chapter-badge-divider" />
              <span className="chapter-badge-text">CHAPTER 4</span>
              <span className="chapter-badge-divider" />
            </motion.div>

            <motion.h1 className="friends-heading"
              initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}>
              The People Who Made It Special
            </motion.h1>

            <motion.p className="friends-cursive-sub"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}>
              Different people, same beautiful story ♡
            </motion.p>

            <motion.div className="friends-divider"
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}>
              <span className="bottom-rule-line" />
              <span className="bottom-rule-star">✦</span>
              <span className="bottom-rule-line" />
            </motion.div>

            {/* ── Scatter Canvas ── */}
            <motion.div
              className="scatter-canvas"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {SLOTS.map(slot => (
                <PhotoSlot
                  key={slot.i}
                  slot={slot}
                  friend={FRIENDS_DATA[slot.i]}
                  onSelect={setSelectedFriend}
                />
              ))}
            </motion.div>

            {/* ── Closing Bottom Message ── */}
            <motion.p
              className="friends-closing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
            >
              Every single face in these frames has a reason to celebrate &amp; something to say. ♡
            </motion.p>

          </div>

          {/* ── Bottom-Right Corner Continue Button (Specifically for Friends Page only) ── */}
          <button
            className="friends-corner-continue-btn"
            onClick={handleContinue}
            title="Continue to Next Phase"
          >
            <span className="corner-continue-text">Continue</span>
            <ArrowRight size={16} className="corner-continue-icon" />
          </button>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
