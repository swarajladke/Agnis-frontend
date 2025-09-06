import React, { useEffect, useRef } from 'react';

const LoginBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor((canvas?.width * canvas?.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: 190 + Math.random() * 20 // Blue-cyan range
        });
      }
    };

    const drawParticles = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw gradient background
      const gradient = ctx?.createRadialGradient(
        canvas?.width / 2, canvas?.height / 2, 0,
        canvas?.width / 2, canvas?.height / 2, Math.max(canvas?.width, canvas?.height) / 2
      );
      gradient?.addColorStop(0, 'rgba(15, 15, 35, 0.8)');
      gradient?.addColorStop(1, 'rgba(15, 15, 35, 1)');
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      // Draw particles
      particles?.forEach((particle, index) => {
        // Update position
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;

        // Draw particle with glow
        ctx?.save();
        ctx.globalAlpha = particle?.opacity;
        
        // Outer glow
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle?.hue}, 100%, 50%, 0.1)`;
        ctx?.fill();

        // Inner glow
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle?.hue}, 100%, 60%, 0.3)`;
        ctx?.fill();

        // Core particle
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle?.hue}, 100%, 70%, 0.8)`;
        ctx?.fill();

        ctx?.restore();

        // Draw connections
        particles?.slice(index + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx?.save();
            ctx.globalAlpha = (150 - distance) / 150 * 0.2;
            ctx.strokeStyle = `hsl(${(particle?.hue + otherParticle?.hue) / 2}, 100%, 60%)`;
            ctx.lineWidth = 1;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx?.stroke();
            ctx?.restore();
          }
        });
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'var(--color-background)' }}
    />
  );
};

export default LoginBackground;