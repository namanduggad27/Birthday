import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX } from 'lucide-react';
import StarrySkyCanvas from './components/StarrySkyCanvas';
import MemoryModal from './components/MemoryModal';
import './App.css';

// Web Audio Ambient Synthesizer for cozy night melody
const playMelodyChord = (step = 0) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00]  // G
    ];

    const currentNotes = chords[step % chords.length];

    currentNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const delay = idx * 0.12;
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + delay + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 2.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 3.0);
    });
  } catch {
    // Autoplay restrictions handle
  }
};

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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Periodic subtle ambient melody when sound is enabled
  useEffect(() => {
    if (!soundEnabled) return;
    let step = 0;
    playMelodyChord(step);

    const interval = setInterval(() => {
      step++;
      playMelodyChord(step);
    }, 4500);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Grand Golden Celebration Trigger
  const handleBeginJourney = () => {
    if (soundEnabled) {
      playMelodyChord(0);
      setTimeout(() => playMelodyChord(1), 800);
    }

    // Grand Golden Stardust Fireworks
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      confetti({
        particleCount: 55,
        startVelocity: 35,
        spread: 360,
        ticks: 80,
        origin: {
          x: Math.random() * 0.6 + 0.2,
          y: Math.random() * 0.4 + 0.2
        },
        colors: ['#fef08a', '#fde047', '#eab308', '#f59e0b', '#ffffff', '#ffd166']
      });
    }, 280);

    setActiveModalItem({
      category: 'The Journey Begins',
      title: 'Happy Birthday, Sunshine! ✨',
      quote: 'Here begins the most magical year yet...',
      description: 'May every step you take this year be illuminated with love, courage, vibrant health, and infinite happiness! You make this world infinitely brighter.'
    });
  };

  return (
    <main className="scene-viewport">
      {/* Background Scenic Artwork */}
      <div className="scene-background" />

      {/* Atmospheric Vignette & Depth */}
      <div className="sky-depth-overlay" />

      {/* Live Canvas Starfield & Twinkling Night */}
      <StarrySkyCanvas />

      {/* Warm Lantern Glow Pulse */}
      <div className="lantern-glow-pulse" />

      {/* Soft Fairy Lights Glow (Left) */}
      <div className="fairy-lights-glow" />

      {/* Top Right Sound Toggle */}
      <button 
        className="ambient-sound-btn"
        onClick={() => setSoundEnabled(!soundEnabled)}
        title={soundEnabled ? "Mute night melody" : "Play night melody"}
      >
        {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span>{soundEnabled ? "Music: On" : "Music: Off"}</span>
      </button>

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

        {/* Left Sticky Note Handwritten Text Overlay */}
        <motion.div 
          className="left-note-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={() => setActiveModalItem(hotspotsData.note)}
          title="Click note"
        >
          <p>Different</p>
          <p>places...</p>
          <p>Same dreams... ♡</p>
        </motion.div>

        {/* Centerpiece Showcase */}
        <div className="center-showcase">
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

          {/* Vintage Textured Paper Ribbon Badge */}
          <motion.div 
            className="ribbon-banner"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            to the girl who makes the world brighter ♡
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

        {/* Open Scrapbook Note Overlay (Bottom Right) */}
        <motion.div 
          className="journal-note-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          onClick={() => setActiveModalItem(hotspotsData.journal)}
          title="Click to view journal entry"
        >
          <p>A story</p>
          <p>still in progress... ♡</p>
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

        {/* Interactive Hotspots for Polaroid Photos on Tree (Left) */}
        <div 
          className="hotspot-target hotspot-polaroid-1"
          onClick={() => setActiveModalItem(hotspotsData.polaroid1)}
          title="Click to view memory: Sunset by the Waters"
        />

        <div 
          className="hotspot-target hotspot-polaroid-2"
          onClick={() => setActiveModalItem(hotspotsData.polaroid2)}
          title="Click to view memory: Field of Daisies"
        />

        <div 
          className="hotspot-target hotspot-polaroid-3"
          onClick={() => setActiveModalItem(hotspotsData.polaroid3)}
          title="Click to view memory: Historic Town"
        />
      </div>

      {/* Interactive Detail Modal */}
      <MemoryModal 
        activeItem={activeModalItem} 
        onClose={() => setActiveModalItem(null)} 
      />
    </main>
  );
}
