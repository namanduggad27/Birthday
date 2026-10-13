import React from 'react';
import { motion } from 'framer-motion';
import photoSunset from '../assets/photo_sunset.jpg';
import photoDaisies from '../assets/photo_daisies.jpg';
import photoTown from '../assets/photo_town.jpg';

export default function HangingPolaroids({ onSelectMemory }) {
  return (
    <div className="polaroids-hang-tree">
      {/* Hanging Strings — thin gold lines */}
      <svg className="string-wires-svg" viewBox="0 0 420 480" fill="none">
        <path d="M 50,20 Q 160,80 260,40" stroke="rgba(201, 168, 76, 0.38)" strokeWidth="1" />
        <path d="M 30,120 Q 140,170 240,140" stroke="rgba(201, 168, 76, 0.32)" strokeWidth="1" />
      </svg>

      {/* Polaroid 1: Sunset */}
      <motion.div
        className="polaroid-card polaroid-top-sunset"
        initial={{ rotate: 5 }}
        animate={{ rotate: [4, 6, 4] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, rotate: 2, zIndex: 35 }}
        onClick={() => onSelectMemory('polaroid1')}
        title="Sunset by the Waters"
      >
        <div className="polaroid-photo-frame">
          <img src={photoSunset} alt="Sunset by the Waters" className="polaroid-img" />
          <div className="photo-gloss-sheen" />
        </div>
      </motion.div>

      {/* Polaroid 2: Daisies */}
      <motion.div
        className="polaroid-card polaroid-mid-daisies"
        initial={{ rotate: -12 }}
        animate={{ rotate: [-13, -11, -13] }}
        transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut', delay: 0.8 }}
        whileHover={{ scale: 1.1, rotate: -8, zIndex: 35 }}
        onClick={() => onSelectMemory('polaroid2')}
        title="Field of White Daisies"
      >
        <div className="polaroid-photo-frame">
          <img src={photoDaisies} alt="Field of Daisies" className="polaroid-img" />
          <div className="photo-gloss-sheen" />
        </div>
      </motion.div>

      {/* Polaroid 3: Historic Town */}
      <motion.div
        className="polaroid-card polaroid-low-town"
        initial={{ rotate: 6 }}
        animate={{ rotate: [5, 7, 5] }}
        transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut', delay: 1.4 }}
        whileHover={{ scale: 1.1, rotate: 3, zIndex: 35 }}
        onClick={() => onSelectMemory('polaroid3')}
        title="Historic Rooftops"
      >
        <div className="polaroid-photo-frame">
          <img src={photoTown} alt="Historic Rooftops" className="polaroid-img" />
          <div className="photo-gloss-sheen" />
        </div>
      </motion.div>
    </div>
  );
}
