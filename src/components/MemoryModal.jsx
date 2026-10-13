import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';

export default function MemoryModal({ activeItem, onClose }) {
  if (!activeItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content-card"
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={16} />
          </button>

          {/* Category Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c9a84c', marginBottom: '16px' }}>
            <Sparkles size={15} />
            <span style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '2.5px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              opacity: 0.85
            }}>
              {activeItem.category || 'Special Memory'}
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '26px',
            fontStyle: 'italic',
            color: '#f0f0f0',
            marginBottom: '12px',
            fontWeight: 600,
            lineHeight: 1.2
          }}>
            {activeItem.title}
          </h2>

          {/* Gold divider */}
          <div style={{
            width: '48px',
            height: '1px',
            background: 'rgba(201, 168, 76, 0.55)',
            margin: '0 auto 16px auto',
            boxShadow: '0 0 6px rgba(201, 168, 76, 0.3)'
          }} />

          {/* Quote */}
          {activeItem.quote && (
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '19px',
              color: '#c9a84c',
              margin: '0 0 18px',
              fontStyle: 'italic',
              lineHeight: 1.5,
              opacity: 0.9
            }}>
              "{activeItem.quote}"
            </div>
          )}

          {/* Description */}
          <p style={{
            color: 'rgba(220, 220, 220, 0.78)',
            fontSize: '15.5px',
            lineHeight: 1.75,
            marginBottom: '24px',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic'
          }}>
            {activeItem.description}
          </p>

          {/* Gold heart */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', color: '#c9a84c' }}>
            <span style={{ fontSize: '18px', filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.6))' }}>♡</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
