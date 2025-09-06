import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ChatPreferencesSection = ({ chatSettings, onSettingsChange }) => {
  const [settings, setSettings] = useState(chatSettings);

  const densityOptions = [
    { 
      value: 'compact', 
      label: 'Compact', 
      description: 'More messages visible, tighter spacing',
      preview: 'py-2 px-3'
    },
    { 
      value: 'comfortable', 
      label: 'Comfortable', 
      description: 'Balanced spacing for easy reading',
      preview: 'py-3 px-4'
    },
    { 
      value: 'spacious', 
      label: 'Spacious', 
      description: 'Maximum spacing for relaxed viewing',
      preview: 'py-4 px-5'
    }
  ];

  const typingSpeedOptions = [
    { value: 'instant', label: 'Instant', description: 'No typing animation', speed: 0 },
    { value: 'fast', label: 'Fast', description: '50 words per minute', speed: 50 },
    { value: 'normal', label: 'Normal', description: '30 words per minute', speed: 30 },
    { value: 'slow', label: 'Slow', description: '15 words per minute', speed: 15 }
  ];

  const handleDensityChange = (density) => {
    const newSettings = { ...settings, density };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleTypingSpeedChange = (typingSpeed) => {
    const newSettings = { ...settings, typingSpeed };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleNotificationToggle = (type) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings?.notifications,
        [type]: !settings?.notifications?.[type]
      }
    };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleFeatureToggle = (feature) => {
    const newSettings = {
      ...settings,
      features: {
        ...settings?.features,
        [feature]: !settings?.features?.[feature]
      }
    };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleSliderChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 glow-effect">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Chat Preferences</h2>
          <p className="text-sm text-muted-foreground">Customize your chat experience and behavior</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Message Density */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Message Density</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {densityOptions?.map((option) => (
              <div
                key={option?.value}
                onClick={() => handleDensityChange(option?.value)}
                className={`p-4 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
                  settings?.density === option?.value
                    ? 'border-primary bg-primary/5 glow-border' :'border-border hover:border-muted-foreground hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{option?.label}</h4>
                  {settings?.density === option?.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{option?.description}</p>
                <div className="space-y-1">
                  <div className={`bg-primary/20 rounded ${option?.preview}`}>
                    <div className="text-xs text-foreground/60">Sample message</div>
                  </div>
                  <div className={`bg-muted/50 rounded ${option?.preview}`}>
                    <div className="text-xs text-foreground/60">AI response</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typing Speed */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">AI Typing Speed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {typingSpeedOptions?.map((option) => (
              <div
                key={option?.value}
                onClick={() => handleTypingSpeedChange(option?.value)}
                className={`p-4 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
                  settings?.typingSpeed === option?.value
                    ? 'border-primary bg-primary/5 glow-border' :'border-border hover:border-muted-foreground hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{option?.label}</h4>
                  {settings?.typingSpeed === option?.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{option?.description}</p>
                {option?.speed > 0 && (
                  <div className="mt-2 flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {[1, 2, 3]?.map((dot) => (
                        <div
                          key={dot}
                          className={`w-1.5 h-1.5 bg-primary rounded-full animate-pulse`}
                          style={{ animationDelay: `${dot * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Response Length */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Response Length Preference</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">Default Response Length</span>
                <p className="text-xs text-muted-foreground">Preferred length for AI responses</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-muted-foreground">Brief</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={settings?.responseLength || 3}
                  onChange={(e) => handleSliderChange('responseLength', parseInt(e?.target?.value))}
                  className="w-24 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-xs text-muted-foreground">Detailed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Features */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Chat Features</h3>
          <div className="space-y-4">
            {[
              { 
                key: 'autoSave', 
                label: 'Auto-save Conversations', 
                description: 'Automatically save chat history for future reference' 
              },
              { 
                key: 'smartSuggestions', 
                label: 'Smart Suggestions', 
                description: 'Show suggested follow-up questions and topics' 
              },
              { 
                key: 'codeHighlighting', 
                label: 'Code Syntax Highlighting', 
                description: 'Highlight code blocks with syntax coloring' 
              },
              { 
                key: 'mathRendering', 
                label: 'Math Formula Rendering', 
                description: 'Render mathematical equations and formulas' 
              },
              { 
                key: 'filePreview', 
                label: 'File Preview', 
                description: 'Show preview of uploaded files before sending' 
              },
              { 
                key: 'contextMemory', 
                label: 'Context Memory', 
                description: 'Remember conversation context across sessions' 
              }
            ]?.map((feature) => (
              <div key={feature?.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{feature?.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
                </div>
                <Checkbox
                  checked={settings?.features?.[feature?.key]}
                  onChange={(e) => handleFeatureToggle(feature?.key)}
                  className="ml-4"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { 
                key: 'newMessage', 
                label: 'New Message Alerts', 
                description: 'Get notified when AI responds to your messages' 
              },
              { 
                key: 'fileProcessing', 
                label: 'File Processing Updates', 
                description: 'Notifications when uploaded files are processed' 
              },
              { 
                key: 'systemUpdates', 
                label: 'System Updates', 
                description: 'Important updates about new features and changes' 
              },
              { 
                key: 'weeklyDigest', 
                label: 'Weekly Activity Digest', 
                description: 'Summary of your chat activity and insights' 
              }
            ]?.map((notification) => (
              <div key={notification?.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <Icon name="Bell" size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{notification?.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{notification?.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleNotificationToggle(notification?.key)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    settings?.notifications?.[notification?.key] ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      settings?.notifications?.[notification?.key] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => {
            const defaultSettings = {
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
            };
            setSettings(defaultSettings);
            onSettingsChange(defaultSettings);
          }}
        >
          Reset Defaults
        </Button>
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          iconSize={16}
          className="glow-effect hover:shadow-glow-lg"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default ChatPreferencesSection;