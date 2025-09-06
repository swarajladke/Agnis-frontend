import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VerificationStatus from './components/VerificationStatus';
import VerificationCodeInput from './components/VerificationCodeInput';
import ResendSection from './components/ResendSection';
import SuccessActions from './components/SuccessActions';
import Icon from '../../components/AppIcon';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state or use mock data
  const emailFromState = location?.state?.email;
  const [email] = useState(emailFromState || "user@example.com");
  
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, verified, expired
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock verification data
  const mockCredentials = {
    validCode: "123456",
    email: "user@example.com"
  };

  useEffect(() => {
    // Auto-expire code after 10 minutes (for demo, we'll use 5 seconds)
    const timer = setTimeout(() => {
      if (verificationStatus === 'pending') {
        setVerificationStatus('expired');
      }
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  }, [verificationStatus]);

  const handleCodeChange = (code) => {
    setVerificationCode(code);
    setError('');
  };

  const handleVerifyCode = async () => {
    if (verificationCode?.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (verificationCode === mockCredentials?.validCode) {
        setVerificationStatus('verified');
        setShowSuccess(true);
      } else {
        setError('Invalid verification code. Please try again or request a new code.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    setVerificationStatus('pending');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Verification code resent to:', email);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToChat = () => {
    navigate('/chat-interface');
  };

  const handleChangeEmail = () => {
    navigate('/user-registration', { 
      state: { 
        returnTo: '/email-verification',
        prefillEmail: email 
      } 
    });
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (showSuccess && verificationStatus === 'verified') {
    return (
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={false} />
        
        <main className="pt-20 pb-12 px-6">
          <div className="max-w-md mx-auto">
            <SuccessActions onContinue={handleContinueToChat} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      <main className="pt-20 pb-12 px-6">
        <div className="max-w-md mx-auto space-y-8">
          {/* Back Navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackToLogin}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground smooth-transition micro-interaction"
            >
              <Icon name="ArrowLeft" size={18} />
              <span className="text-sm">Back to Login</span>
            </button>
          </div>

          {/* Verification Status */}
          <VerificationStatus 
            status={verificationStatus} 
            email={email} 
          />

          {/* Verification Code Input */}
          {verificationStatus !== 'verified' && (
            <VerificationCodeInput
              onCodeChange={handleCodeChange}
              onSubmit={handleVerifyCode}
              isLoading={isLoading}
              error={error}
            />
          )}

          {/* Resend Section */}
          {verificationStatus !== 'verified' && (
            <ResendSection
              onResend={handleResendCode}
              email={email}
              isLoading={isLoading}
            />
          )}

          {/* Mock Credentials Info */}
          <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="TestTube" size={16} />
              <span className="text-sm font-medium">Demo Mode</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Test Email:</strong> {mockCredentials?.email}</p>
              <p><strong>Valid Code:</strong> {mockCredentials?.validCode}</p>
              <p className="text-warning">Use these credentials for testing</p>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center space-y-4">
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-3">
                Having trouble with verification?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleChangeEmail}
                  className="flex items-center justify-center space-x-2 text-primary hover:text-primary/80 text-sm micro-interaction"
                >
                  <Icon name="Edit" size={16} />
                  <span>Change Email</span>
                </button>
                <span className="hidden sm:block text-muted-foreground">•</span>
                <button className="flex items-center justify-center space-x-2 text-primary hover:text-primary/80 text-sm micro-interaction">
                  <Icon name="HelpCircle" size={16} />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-effect">
                <Icon name="Zap" size={16} color="var(--color-primary-foreground)" />
              </div>
              <span className="text-lg font-semibold text-foreground">Agnis AI</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Your Self-Adaptive AI Assistant
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-muted-foreground">
              <button className="hover:text-primary smooth-transition micro-interaction">
                <Icon name="Twitter" size={18} />
              </button>
              <button className="hover:text-primary smooth-transition micro-interaction">
                <Icon name="Github" size={18} />
              </button>
              <button className="hover:text-primary smooth-transition micro-interaction">
                <Icon name="Linkedin" size={18} />
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} Agnis AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmailVerification;