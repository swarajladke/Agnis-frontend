import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessActions = ({ onContinue }) => {
  const navigate = useNavigate();

  const handleContinueToChat = () => {
    if (onContinue) {
      onContinue();
    } else {
      navigate('/chat-interface');
    }
  };

  const handleGoToProfile = () => {
    navigate('/user-profile-settings');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-success/10 border border-success/30 rounded-full flex items-center justify-center glow-effect shadow-success/20">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome to Agnis AI!
          </h2>
          <p className="text-muted-foreground">
            Your email has been successfully verified. You now have full access to all features.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          onClick={handleContinueToChat}
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={18}
          className="w-full glow-effect hover:shadow-glow-lg micro-interaction"
        >
          Start Chatting with AI
        </Button>
        
        <Button
          variant="outline"
          onClick={handleGoToProfile}
          iconName="Settings"
          iconPosition="left"
          iconSize={18}
          className="w-full glow-effect hover:shadow-glow-lg micro-interaction"
        >
          Customize Your Profile
        </Button>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-2 text-primary">
          <Icon name="Sparkles" size={18} />
          <span className="font-medium text-sm">What's Next?</span>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="BookOpen" size={14} className="mt-0.5 text-primary flex-shrink-0" />
            <span>Explore Research Mode for academic assistance</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Code" size={14} className="mt-0.5 text-success flex-shrink-0" />
            <span>Try Coding Assistant for programming help</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Palette" size={14} className="mt-0.5 text-accent flex-shrink-0" />
            <span>Use Creative Studio for writing and ideation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessActions;