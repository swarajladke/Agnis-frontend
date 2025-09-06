import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureCards = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 'research',
      title: 'Research Mode',
      icon: 'BookOpen',
      description: 'Deep academic research with comprehensive analysis, fact-checking, and data insights for scholarly work.',
      highlights: ['Academic Sources', 'Data Analysis', 'Fact Verification', 'Citation Support'],
      color: 'from-primary to-blue-400',
      glowColor: 'rgba(0, 212, 255, 0.3)'
    },
    {
      id: 'coding',
      title: 'Coding Assistant',
      icon: 'Code',
      description: 'Advanced programming support with IDE-like suggestions, debugging help, and code optimization.',
      highlights: ['Code Generation', 'Debug Support', 'Best Practices', 'Multi-Language'],
      color: 'from-success to-green-400',
      glowColor: 'rgba(0, 255, 136, 0.3)'
    },
    {
      id: 'creative',
      title: 'Creative Studio',
      icon: 'Palette',
      description: 'AI-powered creative writing, story generation, and content creation with artistic collaboration.',
      highlights: ['Story Writing', 'Content Ideas', 'Style Adaptation', 'Creative Prompts'],
      color: 'from-accent to-pink-400',
      glowColor: 'rgba(255, 107, 107, 0.3)'
    }
  ];

  const handleCardClick = (featureId) => {
    // Navigate to chat interface with the selected mode
    navigate('/chat-interface', { state: { mode: featureId } });
  };

  const getCardStyle = (feature, isHovered) => ({
    boxShadow: isHovered 
      ? `0 8px 40px ${feature?.glowColor}, 0 0 20px ${feature?.glowColor}`
      : `0 4px 20px rgba(0, 0, 0, 0.3)`,
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    borderColor: isHovered ? feature?.glowColor?.replace('0.3', '0.6') : 'var(--color-border)'
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Choose Your AI Experience
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select from specialized AI modes designed to enhance your productivity across different domains
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features?.map((feature) => {
          const isHovered = hoveredCard === feature?.id;
          
          return (
            <div
              key={feature?.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCard(feature?.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(feature?.id)}
            >
              <div
                className="bg-card border-2 rounded-2xl p-8 h-full smooth-transition"
                style={getCardStyle(feature, isHovered)}
              >
                {/* Icon Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature?.color} rounded-xl flex items-center justify-center smooth-transition ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    <Icon 
                      name={feature?.icon} 
                      size={32} 
                      color="white" 
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature?.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {feature?.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${feature?.color} rounded-full`} />
                      <span className="text-xs text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className={`w-full smooth-transition ${isHovered ? 'glow-effect' : ''}`}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  Try {feature?.title}
                </Button>

                {/* Hover Glow Effect */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none smooth-transition"
                    style={{
                      background: `linear-gradient(135deg, ${feature?.glowColor}, transparent)`
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureCards;