import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AnimatedLogo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const glowStyle = {
    boxShadow: `
      0 0 ${20 + Math.sin(glowIntensity * 0.1) * 10}px rgba(0, 212, 255, 0.4),
      0 0 ${40 + Math.sin(glowIntensity * 0.1) * 20}px rgba(0, 212, 255, 0.2),
      0 0 ${80 + Math.sin(glowIntensity * 0.1) * 40}px rgba(0, 212, 255, 0.1)
    `,
    transform: `scale(${1 + Math.sin(glowIntensity * 0.05) * 0.02})`
  };

  return (
    <div className={`flex flex-col items-center space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Animated Logo */}
      <div className="relative">
        <div 
          className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center smooth-transition"
          style={glowStyle}
        >
          <Icon 
            name="Zap" 
            size={window.innerWidth < 768 ? 48 : 64} 
            color="var(--color-primary-foreground)" 
            strokeWidth={2.5}
            className="animate-pulse"
          />
        </div>
        
        {/* Orbital rings */}
        <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute inset-[-8px] rounded-2xl border border-primary/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
      </div>
      {/* Brand Name */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2 tracking-tight">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            Agnis AI
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide">
          Your Self-Adaptive AI Assistant
        </p>
        
        {/* Subtitle */}
        <p className="text-sm md:text-base text-muted-foreground/80 mt-2 max-w-md mx-auto">
          Empowering creativity, research, and development with intelligent assistance
        </p>
      </div>
      {/* Pulsing dots indicator */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2]?.map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedLogo;