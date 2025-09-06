import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isAuthenticated = false, user = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/chat-interface');
    } else {
      navigate('/landing-page');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Logout logic would be implemented here
    navigate('/landing-page');
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer group"
      onClick={handleLogoClick}
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-effect group-hover:shadow-glow-lg smooth-transition">
          <Icon name="Zap" size={24} color="var(--color-primary-foreground)" strokeWidth={2.5} />
        </div>
      </div>
      <div className="ml-3">
        <h1 className="text-xl font-semibold text-foreground group-hover:text-primary smooth-transition">
          Agnis AI
        </h1>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            <nav className="hidden md:flex items-center space-x-8">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('/login')}
                className={`${isActivePath('/login') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} smooth-transition`}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                onClick={() => handleNavigation('/user-registration')}
                className="glow-effect hover:shadow-glow-lg"
              >
                Get Started
              </Button>
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/login')}
                  className="justify-start"
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigation('/user-registration')}
                  className="justify-start glow-effect"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/chat-interface')}
              className={`${isActivePath('/chat-interface') ? 'text-primary glow-border' : 'text-muted-foreground hover:text-foreground'} smooth-transition`}
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={18}
            >
              Chat
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/chat-history')}
              className={`${isActivePath('/chat-history') ? 'text-primary glow-border' : 'text-muted-foreground hover:text-foreground'} smooth-transition`}
              iconName="History"
              iconPosition="left"
              iconSize={18}
            >
              History
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full bg-card hover:bg-muted glow-effect micro-interaction"
              >
                {user?.avatar ? (
                  <img 
                    src={user?.avatar} 
                    alt={user?.name || 'User'} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} />
                )}
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-lg shadow-glow-lg py-2 z-60">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    onClick={handleProfileClick}
                    className="w-full justify-start px-4 py-2 text-sm hover:bg-muted"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Profile Settings
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start px-4 py-2 text-sm hover:bg-muted text-destructive hover:text-destructive"
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('/chat-interface')}
                className="justify-start"
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={18}
              >
                Chat Interface
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => handleNavigation('/chat-history')}
                className="justify-start"
                iconName="History"
                iconPosition="left"
                iconSize={18}
              >
                Chat History
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleProfileClick}
                className="justify-start"
                iconName="Settings"
                iconPosition="left"
                iconSize={18}
              >
                Profile Settings
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="justify-start text-destructive hover:text-destructive"
                iconName="LogOut"
                iconPosition="left"
                iconSize={18}
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;