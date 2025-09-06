import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleStartChatting = () => {
    navigate('/chat-interface');
  };

  const handleGetStarted = () => {
    navigate('/user-registration');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const glowStyle = isHovered ? {
    boxShadow: `
      0 0 30px rgba(0, 212, 255, 0.4),
      0 0 60px rgba(0, 212, 255, 0.2),
      0 0 90px rgba(0, 212, 255, 0.1)
    `,
    transform: 'scale(1.05)'
  } : {};

  return (
    <div className="w-full max-w-4xl mx-auto px-6 text-center">
      {/* Main CTA */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Ready to Experience the Future?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already leveraging AI to enhance their research, coding, and creative work.
        </p>

        <div
          className="inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button
            variant="default"
            size="lg"
            onClick={handleStartChatting}
            className="text-lg px-12 py-4 smooth-transition"
            style={glowStyle}
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={24}
          >
            Start Chatting Now
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          No registration required • Free to try • Instant access
        </p>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
        <Button
          variant="outline"
          size="lg"
          onClick={handleGetStarted}
          className="w-full sm:w-auto glow-effect hover:shadow-glow-lg micro-interaction"
          iconName="UserPlus"
          iconPosition="left"
          iconSize={20}
        >
          Create Account
        </Button>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <div className="w-8 h-px bg-border"></div>
          <span className="text-sm">or</span>
          <div className="w-8 h-px bg-border"></div>
        </div>

        <Button
          variant="ghost"
          size="lg"
          onClick={handleSignIn}
          className="w-full sm:w-auto hover:text-primary micro-interaction"
          iconName="LogIn"
          iconPosition="left"
          iconSize={20}
        >
          Sign In
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-success" />
          </div>
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground">Secure & Private</h4>
            <p className="text-xs text-muted-foreground">End-to-end encryption</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Zap" size={24} className="text-primary" />
          </div>
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground">Lightning Fast</h4>
            <p className="text-xs text-muted-foreground">Instant AI responses</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
            <Icon name="Users" size={24} className="text-accent" />
          </div>
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground">Trusted by 10K+</h4>
            <p className="text-xs text-muted-foreground">Active users worldwide</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 glow-effect">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Conversations Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime Reliability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">AI Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;