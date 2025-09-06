import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStatus = ({ status, email }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success',
          title: 'Email Verified Successfully!',
          message: `Your email ${email} has been verified. You can now access all features.`,
          bgColor: 'bg-success/10',
          borderColor: 'border-success/30',
          glowColor: 'shadow-success/20'
        };
      case 'expired':
        return {
          icon: 'XCircle',
          iconColor: 'text-warning',
          title: 'Verification Code Expired',
          message: `The verification code sent to ${email} has expired. Please request a new one.`,
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/30',
          glowColor: 'shadow-warning/20'
        };
      default:
        return {
          icon: 'Clock',
          iconColor: 'text-primary',
          title: 'Verify Your Email Address',
          message: `We've sent a verification code to ${email}. Please check your inbox and enter the code below.`,
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/30',
          glowColor: 'shadow-primary/20'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`p-6 rounded-xl border ${config?.bgColor} ${config?.borderColor} glow-effect ${config?.glowColor} smooth-transition`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-16 h-16 rounded-full bg-card border ${config?.borderColor} flex items-center justify-center glow-effect`}>
          <Icon 
            name={config?.icon} 
            size={32} 
            className={config?.iconColor}
          />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            {config?.title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            {config?.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;