import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResendSection = ({ onResend, email, isLoading }) => {
  const [cooldownTime, setCooldownTime] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  const handleResend = async () => {
    try {
      await onResend();
      setResendCount(prev => prev + 1);
      setCooldownTime(60); // 60 second cooldown
    } catch (error) {
      console.error('Resend failed:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?
        </p>
        
        <Button
          variant="outline"
          onClick={handleResend}
          disabled={cooldownTime > 0 || isLoading}
          loading={isLoading}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
          className="glow-effect hover:shadow-glow-lg micro-interaction"
        >
          {cooldownTime > 0 ? `Resend in ${formatTime(cooldownTime)}` : 'Resend Verification Email'}
        </Button>
        
        {resendCount > 0 && (
          <p className="text-xs text-muted-foreground">
            Code resent {resendCount} time{resendCount > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Need to use a different email address?
          </p>
          
          <Button
            variant="ghost"
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
            className="text-primary hover:text-primary/80 micro-interaction"
          >
            Change Email Address
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Info" size={16} />
          <span className="text-sm font-medium">Verification Tips</span>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
          <li>• Check your spam or junk folder</li>
          <li>• Make sure {email} is correct</li>
          <li>• Code expires in 10 minutes</li>
          <li>• Contact support if issues persist</li>
        </ul>
      </div>
    </div>
  );
};

export default ResendSection;