import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import GoldParticleCanvas from './StarrySkyCanvas';

// ── Place your family photo here when ready ──
// import familyPhoto from '../assets/family_photo.jpg';
const familyPhoto = null; // Set to your image import when ready

export default function FamilyPage({ onBackToFriends }) {
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 160,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#c9a84c', '#d4af6f', '#e8c97a', '#f5e6c8', '#ffffff']
      });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="scene-viewport family-page-viewport">
      {/* Ambient Gold Glow & Particles */}
      <div className="page-ambient-glow" />
      <GoldParticleCanvas />

      {/* Back Button to return to Friends Page */}
      <button className="nav-back-btn" onClick={onBackToFriends} title="Back to Friends">
        <ArrowLeft size={16} className="nav-back-icon" />
        <span className="nav-back-text">Friends</span>
      </button>

      {/* Main Container */}
      <div className="family-page-scroll">
        <div className="family-page-inner">

          {/* ── Chapter Badge ── */}
          <motion.div
            className="chapter-badge-row"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="chapter-badge-divider" />
            <span className="chapter-badge-text">CHAPTER 5 ✦ THE FINAL CHAPTER</span>
            <span className="chapter-badge-divider" />
          </motion.div>

          {/* ── Main Heading at Top ── */}
          <motion.h1
            className="family-heading"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            The Place Where Love Begins
          </motion.h1>

          {/* ── Cursive Subtitle ── */}
          <motion.p
            className="family-cursive-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            Where life begins &amp; love never ends ♡
          </motion.p>

          {/* ── Gold Divider ── */}
          <motion.div
            className="friends-divider"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            <span className="bottom-rule-line" />
            <span className="bottom-rule-star">✦</span>
            <span className="bottom-rule-line" />
          </motion.div>

          {/* ── Direct Full-Size Photo Area (No box container) ── */}
          <motion.div
            className="family-photo-wrapper"
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65 }}
          >
            {familyPhoto ? (
              <img
                src={familyPhoto}
                alt="Family - Where Love Begins"
                className="family-full-img"
              />
            ) : (
              <div className="family-photo-placeholder">
                <Heart size={38} className="family-placeholder-heart" />
                <span className="family-placeholder-title">Family Portrait</span>
                <span className="family-placeholder-sub">
                  Direct full-size photo will appear here
                </span>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
}
