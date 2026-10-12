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
          initial={{ scale: 0.85, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 25 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fde047', marginBottom: '14px' }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {activeItem.category || 'Special Memory'}
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: '#ffffff', marginBottom: '12px' }}>
            {activeItem.title}
          </h2>

          {activeItem.quote && (
            <div style={{ 
              fontFamily: 'var(--font-hand)', 
              fontSize: '22px', 
              color: '#fef08a', 
              margin: '12px 0 20px',
              fontStyle: 'italic',
              lineHeight: 1.4
            }}>
              "{activeItem.quote}"
            </div>
          )}

          <p style={{ 
            color: 'rgba(241, 245, 249, 0.9)', 
            fontSize: '16px', 
            lineHeight: 1.7, 
            marginBottom: '24px',
            fontFamily: 'var(--font-serif)'
          }}>
            {activeItem.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', color: '#f43f5e' }}>
            <Heart size={20} fill="#f43f5e" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
