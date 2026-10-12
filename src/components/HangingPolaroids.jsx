import React from 'react';
import { motion } from 'framer-motion';
import photoSunset from '../assets/photo_sunset.jpg';
import photoDaisies from '../assets/photo_daisies.jpg';
import photoTown from '../assets/photo_town.jpg';

export default function HangingPolaroids({ onSelectMemory }) {
  return (
    <div className="polaroids-hang-tree">
      {/* Hanging Strings from Branches */}
      <svg className="string-wires-svg" viewBox="0 0 420 480" fill="none">
        <path d="M 50,20 Q 160,80 260,40" stroke="rgba(255, 235, 180, 0.45)" strokeWidth="1.2" />
        <path d="M 30,120 Q 140,170 240,140" stroke="rgba(255, 235, 180, 0.4)" strokeWidth="1.2" />
      </svg>

      {/* Polaroid 1: Sunset Bridge (Top Right of the cluster) */}
      <motion.div
        className="polaroid-card polaroid-top-sunset"
        initial={{ rotate: 5 }}
        animate={{ rotate: [4, 6, 4] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, rotate: 2, zIndex: 35 }}
        onClick={() => onSelectMemory('polaroid1')}
        title="Sunset by the Waters"
      >
        <div className="wooden-clip" />
        <div className="polaroid-photo-frame">
          <img src={photoSunset} alt="Sunset by the Waters" className="polaroid-img" />
          <div className="photo-gloss-sheen" />
        </div>
      </motion.div>

      {/* Polaroid 2: Daisies (Middle Left, Overlapping Sunset) */}
      <motion.div
        className="polaroid-card polaroid-mid-daisies"
        initial={{ rotate: -12 }}
        animate={{ rotate: [-13, -11, -13] }}
        transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut', delay: 0.8 }}
        whileHover={{ scale: 1.1, rotate: -8, zIndex: 35 }}
        onClick={() => onSelectMemory('polaroid2')}
        title="Field of White Daisies"
      >
        <div className="wooden-clip" />
        <div className="polaroid-photo-frame">
          <img src={photoDaisies} alt="Field of Daisies" className="polaroid-img" />
          <div className="photo-gloss-sheen" />
        </div>
      </motion.div>

      {/* Polaroid 3: Historic Town (Lower, Tucked Under Daisies) */}
      <motion.div
        className="polaroid-card polaroid-low-town"
        initial={{ rotate: 6 }}
        animate={{ rotate: [5, 7, 5] }}
        transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut', delay: 1.4 }}
        whileHover={{ scale: 1.1, rotate: 3, zIndex: 35 }}
        onClick={() => onSelectMemory('polaroid3')}
        title="Historic Rooftops"
      >
        <div className="tape-strip tape-town-top" />
        <div className="polaroid-photo-frame">
          <img src={photoTown} alt="Historic Rooftops" className="polaroid-img" />
          <div className="photo-gloss-sheen" />
        </div>
      </motion.div>

      {/* Kraft Paper Sticky Note (Overlapping Lower Cluster) */}
      <motion.div
        className="kraft-sticky-note"
        initial={{ rotate: -3 }}
        animate={{ rotate: [-4, -2, -4] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 0.5 }}
        whileHover={{ scale: 1.08, rotate: 0, zIndex: 40 }}
        onClick={() => onSelectMemory('note')}
        title="Read Note: Different places... Same dreams... ♡"
      >
        <div className="tape-strip tape-note-top" />
        <div className="tape-strip tape-note-left" />
        <p className="note-text-hand">Different</p>
        <p className="note-text-hand">places...</p>
        <p className="note-text-hand">Same dreams...</p>
        <p className="note-text-heart">♡</p>
      </motion.div>
    </div>
  );
}
