import React, { useEffect, useRef } from 'react';

export const ChristmasSnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Number of subtle snowflakes (balanced for mobile and desktop performance)
    const flakeCount = window.innerWidth < 768 ? 28 : 55;
    interface Flake {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      wind: number;
      isGolden: boolean;
    }

    const flakes: Flake[] = [];
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1, // 1px to 3px (subtle)
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.25,
        wind: Math.random() * 0.02,
        isGolden: Math.random() > 0.85 // occasional soft gold spark
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.01;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speedY;
        f.x += Math.sin(angle + f.wind) * 0.5 + f.speedX;

        // Reset if off-screen
        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width + 5) {
          f.x = -5;
        } else if (f.x < -5) {
          f.x = width + 5;
        }

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = f.isGolden
          ? `rgba(244, 224, 123, ${f.opacity * 0.9})`
          : `rgba(255, 255, 255, ${f.opacity})`;
        ctx.shadowBlur = f.isGolden ? 4 : 2;
        ctx.shadowColor = f.isGolden ? '#D4AF37' : '#FFFFFF';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 w-full h-full opacity-40"
    />
  );
};
