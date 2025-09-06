import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AccountInfoSection from './components/AccountInfoSection';
import AIPersonaSection from './components/AIPersonaSection';
import ThemeCustomizationSection from './components/ThemeCustomizationSection';
import ChatPreferencesSection from './components/ChatPreferencesSection';
import DataPrivacySection from './components/DataPrivacySection';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Mock user data
  const [userInfo, setUserInfo] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "AI enthusiast and software developer passionate about leveraging technology to solve complex problems. Always exploring new ways to integrate AI into daily workflows.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    subscription: {
      plan: "Pro",
      status: "active",
      expiresAt: "2025-12-06"
    }
  });

  const [aiPersona, setAiPersona] = useState('professional');

  const [themeSettings, setThemeSettings] = useState({
    glowIntensity: 'moderate',
    bubbleStyle: 'rounded',
    accentColor: 'blue',
    animations: {
      messageAnimations: true,
      hoverEffects: true,
      typingIndicator: true,
      glowAnimations: true
    }
  });

  const [chatSettings, setChatSettings] = useState({
    density: 'comfortable',
    typingSpeed: 'normal',
    responseLength: 3,
    features: {
      autoSave: true,
      smartSuggestions: true,
      codeHighlighting: true,
      mathRendering: true,
      filePreview: true,
      contextMemory: true
    },
    notifications: {
      newMessage: true,
      fileProcessing: true,
      systemUpdates: true,
      weeklyDigest: false
    }
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    conversationAnalytics: true,
    fileStorage: true,
    shareWithTeam: false,
    thirdPartyIntegrations: true,
    marketingCommunications: false,
    dataRetention: '365'
  });

  const settingsSections = [
    {
      id: 'account',
      name: 'Account Info',
      icon: 'User',
      description: 'Personal details and subscription'
    },
    {
      id: 'persona',
      name: 'AI Persona',
      icon: 'Bot',
      description: 'Customize AI personality'
    },
    {
      id: 'theme',
      name: 'Theme',
      icon: 'Palette',
      description: 'Visual customization'
    },
    {
      id: 'chat',
      name: 'Chat Preferences',
      icon: 'MessageSquare',
      description: 'Chat behavior settings'
    },
    {
      id: 'privacy',
      name: 'Data & Privacy',
      icon: 'Shield',
      description: 'Privacy and data management'
    }
  ];

  useEffect(() => {
    // Simulate checking for unsaved changes
    const checkUnsavedChanges = () => {
      // In a real app, this would compare current state with saved state
      setHasUnsavedChanges(false);
    };

    checkUnsavedChanges();
  }, [userInfo, aiPersona, themeSettings, chatSettings, privacySettings]);

  const handleUserInfoUpdate = (newInfo) => {
    setUserInfo(prev => ({ ...prev, ...newInfo }));
    setHasUnsavedChanges(true);
    showSaveSuccess();
  };

  const handlePersonaChange = (newPersona) => {
    setAiPersona(newPersona);
    setHasUnsavedChanges(true);
    showSaveSuccess();
  };

  const handleThemeChange = (newTheme) => {
    setThemeSettings(newTheme);
    setHasUnsavedChanges(true);
    showSaveSuccess();
  };

  const handleChatSettingsChange = (newSettings) => {
    setChatSettings(newSettings);
    setHasUnsavedChanges(true);
    showSaveSuccess();
  };

  const handlePrivacyChange = (newSettings) => {
    setPrivacySettings(newSettings);
    setHasUnsavedChanges(true);
    showSaveSuccess();
  };

  const showSaveSuccess = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleBackToChat = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    navigate('/chat-interface');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <AccountInfoSection
            userInfo={userInfo}
            onUpdateInfo={handleUserInfoUpdate}
          />
        );
      case 'persona':
        return (
          <AIPersonaSection
            currentPersona={aiPersona}
            onPersonaChange={handlePersonaChange}
          />
        );
      case 'theme':
        return (
          <ThemeCustomizationSection
            themeSettings={themeSettings}
            onThemeChange={handleThemeChange}
          />
        );
      case 'chat':
        return (
          <ChatPreferencesSection
            chatSettings={chatSettings}
            onSettingsChange={handleChatSettingsChange}
          />
        );
      case 'privacy':
        return (
          <DataPrivacySection
            privacySettings={privacySettings}
            onPrivacyChange={handlePrivacyChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} user={userInfo} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToChat}
                className="glow-effect hover:shadow-glow-lg micro-interaction"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                <p className="text-muted-foreground mt-1">
                  Customize your AI assistant experience and manage your account
                </p>
              </div>
            </div>
            
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="AlertCircle" size={16} />
                <span className="text-sm">Unsaved changes</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 glow-effect sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">Settings</h2>
                <nav className="space-y-2">
                  {settingsSections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left smooth-transition micro-interaction ${
                        activeSection === section?.id
                          ? 'bg-primary/10 text-primary border border-primary/20 glow-border' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={section?.icon} size={18} />
                      <div>
                        <div className="font-medium text-sm">{section?.name}</div>
                        <div className="text-xs opacity-80">{section?.description}</div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/chat-interface')}
                      iconName="MessageSquare"
                      iconPosition="left"
                      iconSize={16}
                      className="w-full justify-start text-xs"
                    >
                      Back to Chat
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="HelpCircle"
                      iconPosition="left"
                      iconSize={16}
                      className="w-full justify-start text-xs"
                    >
                      Help & Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="stagger-fade-in">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-success text-success-foreground px-4 py-3 rounded-lg shadow-lg glow-effect flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span className="text-sm font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} color="var(--color-primary-foreground)" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Agnis AI</h3>
                <p className="text-xs text-muted-foreground">Your Self-Adaptive AI Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground smooth-transition">Privacy Policy</button>
              <button className="hover:text-foreground smooth-transition">Terms of Service</button>
              <button className="hover:text-foreground smooth-transition">Support</button>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} Agnis AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfileSettings;