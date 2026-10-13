import React, { useEffect, useRef } from 'react';

export default function GoldParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating gold dust particles — slow, ambient, premium
    const particleCount = Math.min(45, Math.floor((width * height) / 28000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.3,
      speedY: -(Math.random() * 0.18 + 0.04),
      speedX: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.45 + 0.1,
      alphaTarget: Math.random() * 0.45 + 0.1,
      alphaSpeed: Math.random() * 0.004 + 0.001,
      // gold tones: champagne to warm gold
      hue: Math.random() * 20 + 38, // 38–58 = gold range
    }));

    // Subtle horizontal shimmer lines (very faint gold scanlines)
    const shimmerLines = Array.from({ length: 3 }, () => ({
      y: Math.random() * height,
      alpha: 0,
      targetAlpha: Math.random() * 0.04 + 0.01,
      speed: Math.random() * 0.12 + 0.04,
      width: Math.random() * width * 0.4 + width * 0.2,
      x: Math.random() * width * 0.5,
    }));

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint ambient radial center-bottom glow
      const grad = ctx.createRadialGradient(width / 2, height * 1.1, 0, width / 2, height * 1.1, height * 0.65);
      grad.addColorStop(0, 'rgba(201, 168, 76, 0.04)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        // Drift alpha toward target
        if (p.alpha < p.alphaTarget) p.alpha = Math.min(p.alphaTarget, p.alpha + p.alphaSpeed);
        else p.alpha = Math.max(0.05, p.alpha - p.alphaSpeed * 0.6);

        // Occasionally pick new target alpha
        if (Math.random() < 0.003) {
          p.alphaTarget = Math.random() * 0.45 + 0.08;
        }

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw gold particle as a tiny glowing dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grd.addColorStop(0, `hsla(${p.hue}, 65%, 72%, ${p.alpha})`);
        grd.addColorStop(1, `hsla(${p.hue}, 65%, 55%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // Draw shimmer lines
      shimmerLines.forEach((line) => {
        line.alpha += (line.targetAlpha - line.alpha) * 0.02;
        line.y += line.speed;
        if (line.y > height + 5) {
          line.y = -5;
          line.x = Math.random() * width * 0.5;
          line.targetAlpha = Math.random() * 0.04 + 0.01;
        }
        const lg = ctx.createLinearGradient(line.x, 0, line.x + line.width, 0);
        lg.addColorStop(0, `rgba(201,168,76,0)`);
        lg.addColorStop(0.3, `rgba(201,168,76,${line.alpha})`);
        lg.addColorStop(0.7, `rgba(201,168,76,${line.alpha})`);
        lg.addColorStop(1, `rgba(201,168,76,0)`);
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.width, line.y);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      frame++;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 1,
      }}
    />
  );
}
