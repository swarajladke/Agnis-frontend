import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationRouter = ({ children, isAuthenticated = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const publicRoutes = [
    '/landing-page',
    '/user-registration', 
    '/login',
    '/email-verification'
  ];

  const protectedRoutes = [
    '/chat-interface',
    '/user-profile-settings'
  ];

  useEffect(() => {
    const checkAuthAndRedirect = () => {
      const currentPath = location?.pathname;
      
      // Handle root path
      if (currentPath === '/') {
        if (isAuthenticated) {
          navigate('/chat-interface', { replace: true });
        } else {
          navigate('/landing-page', { replace: true });
        }
        return;
      }

      // Handle authenticated user accessing public routes
      if (isAuthenticated && publicRoutes?.includes(currentPath)) {
        // Allow access to email verification during registration flow
        if (currentPath === '/email-verification') {
          setIsLoading(false);
          return;
        }
        navigate('/chat-interface', { replace: true });
        return;
      }

      // Handle unauthenticated user accessing protected routes
      if (!isAuthenticated && protectedRoutes?.includes(currentPath)) {
        navigate('/landing-page', { replace: true });
        return;
      }

      // Handle authentication flow progression
      if (!isAuthenticated) {
        const authFlowOrder = [
          '/landing-page',
          '/user-registration',
          '/login', 
          '/email-verification'
        ];

        // Allow natural progression through auth flow
        if (authFlowOrder?.includes(currentPath)) {
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(false);
    };

    // Small delay to prevent flash of wrong content
    const timer = setTimeout(checkAuthAndRedirect, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, location?.pathname, navigate]);

  // Show loading state during route resolution
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-effect animate-pulse">
            <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground text-sm">Loading Agnis AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};

export default AuthenticationRouter;