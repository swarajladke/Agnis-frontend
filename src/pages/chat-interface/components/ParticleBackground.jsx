import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ intensity = 0.5, className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas?.width,
      y: Math.random() * canvas?.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 180 // Blue to cyan range
    });

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas?.width * canvas?.height) / 15000 * intensity);
      for (let i = 0; i < particleCount; i++) {
        particles?.push(createParticle());
      }
      particlesRef.current = particles;
    };

    const updateParticles = () => {
      particles?.forEach(particle => {
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;

        // Subtle pulsing effect
        particle.opacity += Math.sin(Date.now() * 0.001 + particle?.x * 0.01) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.6, particle?.opacity));
      });
    };

    const drawParticles = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw connections
      particles?.forEach((particle, i) => {
        particles?.slice(i + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.1 * intensity;
            ctx.strokeStyle = `hsla(${particle?.hue}, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx?.stroke();
          }
        });
      });

      // Draw particles
      particles?.forEach(particle => {
        ctx.fillStyle = `hsla(${particle?.hue}, 70%, 60%, ${particle?.opacity * intensity})`;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();

        // Add glow effect
        ctx.shadowColor = `hsl(${particle?.hue}, 70%, 60%)`;
        ctx.shadowBlur = particle?.size * 2;
        ctx?.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.3 }}
    />
  );
};

export default ParticleBackground;