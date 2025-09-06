import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 50;
      
      for (let i = 0; i < particleCount; i++) {
        particles?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: 180 + Math.random() * 40 // Blue to cyan range
        });
      }
      particlesRef.current = particles;
    };

    const drawParticle = (particle) => {
      ctx?.save();
      ctx.globalAlpha = particle?.opacity;
      ctx.fillStyle = `hsl(${particle?.hue}, 100%, 60%)`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${particle?.hue}, 100%, 60%)`;
      ctx?.beginPath();
      ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
      ctx?.fill();
      ctx?.restore();
    };

    const drawConnections = () => {
      const particles = particlesRef?.current;
      ctx?.save();
      
      for (let i = 0; i < particles?.length; i++) {
        for (let j = i + 1; j < particles?.length; j++) {
          const dx = particles?.[i]?.x - particles?.[j]?.x;
          const dy = particles?.[i]?.y - particles?.[j]?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.2;
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx?.beginPath();
            ctx?.moveTo(particles?.[i]?.x, particles?.[i]?.y);
            ctx?.lineTo(particles?.[j]?.x, particles?.[j]?.y);
            ctx?.stroke();
          }
        }
      }
      ctx?.restore();
    };

    const animate = () => {
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

      // Update and draw particles
      particlesRef?.current?.forEach(particle => {
        particle.x += particle?.vx;
        particle.y += particle?.vy;
        
        // Bounce off edges
        if (particle?.x < 0 || particle?.x > canvas?.width) particle.vx *= -1;
        if (particle?.y < 0 || particle?.y > canvas?.height) particle.vy *= -1;
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas?.width, particle?.x));
        particle.y = Math.max(0, Math.min(canvas?.height, particle?.y));
        
        drawParticle(particle);
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
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
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #16213E 50%, #1A1A2E 100%)' }}
    />
  );
};

export default AnimatedBackground;