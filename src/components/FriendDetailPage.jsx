import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, X, Heart, Sparkles, Film, Image as ImageIcon } from 'lucide-react';
import GoldParticleCanvas from './StarrySkyCanvas';

export default function FriendDetailPage({ friend, onBack }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!friend) return null;

  return (
    <main className="scene-viewport friend-detail-viewport">
      {/* Ambient background glow & particles */}
      <div className="page-ambient-glow" />
      <GoldParticleCanvas />

      {/* Back button returning to 11 boxes scatter page */}
      <button className="nav-back-btn" onClick={onBack} title="Back to Friends">
        <ArrowLeft size={16} className="nav-back-icon" />
        <span className="nav-back-text">All Messages</span>
      </button>

      {/* Main Container */}
      <div className="friend-detail-scroll">
        <div className="friend-detail-inner">

          {/* ── Top Header ── */}
          <motion.div
            className="chapter-badge-row"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="chapter-badge-divider" />
            <span className="chapter-badge-text">BOX {friend.slotNum} ✦ A SPECIAL MESSAGE</span>
            <span className="chapter-badge-divider" />
          </motion.div>

          <motion.h1
            className="friend-detail-heading"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            Few Words From <span className="friend-detail-name">{friend.name}</span>
          </motion.h1>

          <motion.p
            className="friend-detail-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.38 }}
          >
            {friend.tagline || 'A reason to celebrate ♡'}
          </motion.p>

          <motion.div
            className="friends-divider"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <span className="bottom-rule-line" />
            <span className="bottom-rule-star">✦</span>
            <span className="bottom-rule-line" />
          </motion.div>

          {/* ── Main Two-Column Content Grid ── */}
          <div className="friend-detail-content-grid">

            {/* Left Column: Descriptive Note */}
            <motion.div
              className="friend-note-card"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              {/* Corner brackets */}
              <span className="slot-corner slot-corner-tl" />
              <span className="slot-corner slot-corner-tr" />
              <span className="slot-corner slot-corner-bl" />
              <span className="slot-corner slot-corner-br" />

              <div className="friend-note-header">
                <div className="friend-note-badge">
                  <Sparkles size={13} className="note-sparkle-icon" />
                  <span>Personal Note</span>
                </div>
                <Heart size={15} className="note-heart-icon" />
              </div>

              {friend.salutation && (
                <p className="friend-note-salutation">{friend.salutation}</p>
              )}

              <div className="friend-note-body">
                {friend.note.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="friend-note-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="friend-note-footer">
                {friend.signoff && (
                  <p className="friend-note-signoff">{friend.signoff}</p>
                )}
                <p className="friend-note-signature">{friend.signature || `${friend.name} ♡`}</p>
              </div>
            </motion.div>

            {/* Right Column: Photo Boxes & Blurred Video Player */}
            <div className="friend-media-column">

              {/* Photos Gallery */}
              <motion.div
                className="friend-photos-section"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
              >
                <div className="section-mini-label">
                  <ImageIcon size={13} />
                  <span>Captured Memories</span>
                </div>

                <div className="friend-photos-grid">
                  {friend.photos && friend.photos.map((photo, index) => (
                    <div key={photo.id || index} className="friend-photo-box">
                      <span className="slot-corner slot-corner-tl" />
                      <span className="slot-corner slot-corner-tr" />
                      <span className="slot-corner slot-corner-bl" />
                      <span className="slot-corner slot-corner-br" />
                      <img src={photo.url} alt={photo.caption || 'Memory'} className="friend-photo-img" />
                      {photo.caption && (
                        <div className="friend-photo-caption">
                          <span>{photo.caption}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Blurred Video Card (Click to open modal) */}
              <motion.div
                className="friend-video-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                <div className="section-mini-label">
                  <Film size={13} />
                  <span>Video Message</span>
                </div>

                <div
                  className="friend-video-preview-card"
                  onClick={() => setIsVideoModalOpen(true)}
                  title="Click to play video"
                >
                  <span className="slot-corner slot-corner-tl" />
                  <span className="slot-corner slot-corner-tr" />
                  <span className="slot-corner slot-corner-bl" />
                  <span className="slot-corner slot-corner-br" />

                  {/* Blurred Background Thumbnail */}
                  <div
                    className="video-blurred-bg"
                    style={{
                      backgroundImage: `url(${friend.video?.thumbnail || (friend.photos && friend.photos[0]?.url)})`
                    }}
                  />

                  {/* Shimmer / Noise tint overlay */}
                  <div className="video-tint-overlay" />

                  {/* Play Button & Call-to-action */}
                  <div className="video-play-action">
                    <div className="video-play-pulse-ring" />
                    <button className="video-play-btn" aria-label="Play Video">
                      <Play size={22} className="video-play-icon" fill="#c9a84c" />
                    </button>
                    <div className="video-play-meta">
                      <span className="video-play-title">{friend.video?.label || `A Message from ${friend.name}`}</span>
                      <span className="video-play-sub">Click to Reveal &amp; Play Video ✦</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>

      {/* ── Video Player Modal Lightbox ── */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              className="video-modal-dialog"
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="video-modal-close-btn"
                onClick={() => setIsVideoModalOpen(false)}
                title="Close Video"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="video-modal-header">
                <div className="video-modal-tag">
                  <Film size={14} className="video-modal-icon" />
                  <span>A Message From {friend.name}</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="video-player-wrapper">
                <video
                  src={friend.video?.url}
                  poster={friend.video?.thumbnail}
                  autoPlay
                  controls
                  playsInline
                  className="modal-active-video"
                />
              </div>

              {/* Modal Footer */}
              <div className="video-modal-footer">
                <p className="video-modal-caption">
                  {friend.salutation || 'For the birthday girl'} ✦ {friend.name} ♡
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
