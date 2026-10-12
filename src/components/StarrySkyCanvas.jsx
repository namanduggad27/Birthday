import React, { useEffect, useRef } from 'react';

export default function StarrySkyCanvas() {
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

    // Initialize Twinkling Stars (mostly in top 60% of screen)
    const starCount = Math.floor((width * height) / 4500);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.65),
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      increasing: Math.random() > 0.5,
      color: Math.random() > 0.3 ? '#ffffff' : Math.random() > 0.5 ? '#fef08a' : '#bae6fd'
    }));

    // Floating Warm Embers / Fireflies (around fairy lights & lantern)
    const embers = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: height * 0.3 + Math.random() * (height * 0.65),
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.5 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.03 + 0.01,
      increasing: Math.random() > 0.5
    }));

    // Shooting Stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.35) {
        shootingStars.push({
          x: Math.random() * (width * 0.7) + width * 0.1,
          y: Math.random() * (height * 0.3),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1
        });
      }
    };

    let lastSpawn = 0;

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Render Twinkling Stars
      stars.forEach((star) => {
        if (star.increasing) {
          star.alpha += star.speed;
          if (star.alpha >= 0.95) star.increasing = false;
        } else {
          star.alpha -= star.speed;
          if (star.alpha <= 0.15) star.increasing = true;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Floating Embers
      embers.forEach((ember) => {
        ember.y += ember.speedY;
        ember.x += ember.speedX;

        if (ember.increasing) {
          ember.alpha += ember.pulse;
          if (ember.alpha >= 0.85) ember.increasing = false;
        } else {
          ember.alpha -= ember.pulse;
          if (ember.alpha <= 0.1) ember.increasing = true;
        }

        if (ember.y < height * 0.1) {
          ember.y = height * 0.85 + Math.random() * (height * 0.1);
          ember.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.globalAlpha = ember.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Spawn & Render Shooting Stars
      if (time - lastSpawn > 3200) {
        spawnShootingStar();
        lastSpawn = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.015;

        if (ss.opacity <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}
