import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/chat-interface', { replace: true });
    }

    // Set page title
    document.title = 'Sign In - Agnis AI';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Sign in to your Agnis AI account and access your personalized AI assistant for research, coding, and creative tasks.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Sign in to your Agnis AI account and access your personalized AI assistant for research, coding, and creative tasks.';
      document.getElementsByTagName('head')?.[0]?.appendChild(meta);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background */}
      <LoginBackground />
      {/* Header */}
      <Header isAuthenticated={false} />
      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-md">
              {/* Welcome Message */}
              <div className="text-center mb-8 stagger-fade-in">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Sign In to{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Agnis AI
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Continue your AI-powered journey
                </p>
              </div>

              {/* Login Form */}
              <div className="stagger-fade-in" style={{ animationDelay: '0.2s' }}>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Agnis AI. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary smooth-transition glow-effect"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary smooth-transition glow-effect"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary smooth-transition glow-effect"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;