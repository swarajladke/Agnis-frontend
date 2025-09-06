import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThemeCustomizationSection = ({ themeSettings, onThemeChange }) => {
  const [settings, setSettings] = useState(themeSettings);

  const glowIntensityOptions = [
    { value: 'subtle', label: 'Subtle', description: 'Minimal glow effects' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced glow intensity' },
    { value: 'intense', label: 'Intense', description: 'Maximum glow effects' }
  ];

  const bubbleStyles = [
    { 
      id: 'rounded', 
      name: 'Rounded', 
      icon: 'Square',
      preview: 'rounded-lg',
      description: 'Standard rounded corners'
    },
    { 
      id: 'pill', 
      name: 'Pill', 
      icon: 'Circle',
      preview: 'rounded-full',
      description: 'Fully rounded bubble style'
    },
    { 
      id: 'sharp', 
      name: 'Sharp', 
      icon: 'Square',
      preview: 'rounded-none',
      description: 'Sharp rectangular corners'
    }
  ];

  const accentColors = [
    { id: 'blue', name: 'Neon Blue', color: '#00D4FF', isDefault: true },
    { id: 'purple', name: 'Electric Purple', color: '#8B5CF6' },
    { id: 'green', name: 'Cyber Green', color: '#00FF88' },
    { id: 'pink', name: 'Hot Pink', color: '#FF6B6B' },
    { id: 'orange', name: 'Neon Orange', color: '#FFB800' },
    { id: 'red', name: 'Electric Red', color: '#FF4757' }
  ];

  const handleGlowIntensityChange = (intensity) => {
    const newSettings = { ...settings, glowIntensity: intensity };
    setSettings(newSettings);
    onThemeChange(newSettings);
  };

  const handleBubbleStyleChange = (style) => {
    const newSettings = { ...settings, bubbleStyle: style };
    setSettings(newSettings);
    onThemeChange(newSettings);
  };

  const handleAccentColorChange = (colorId) => {
    const newSettings = { ...settings, accentColor: colorId };
    setSettings(newSettings);
    onThemeChange(newSettings);
  };

  const handleAnimationToggle = (animationType) => {
    const newSettings = {
      ...settings,
      animations: {
        ...settings?.animations,
        [animationType]: !settings?.animations?.[animationType]
      }
    };
    setSettings(newSettings);
    onThemeChange(newSettings);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 glow-effect">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Palette" size={20} className="text-success" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Theme Customization</h2>
          <p className="text-sm text-muted-foreground">Personalize your visual experience</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Glow Intensity */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Glow Intensity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {glowIntensityOptions?.map((option) => (
              <div
                key={option?.value}
                onClick={() => handleGlowIntensityChange(option?.value)}
                className={`p-4 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
                  settings?.glowIntensity === option?.value
                    ? 'border-primary bg-primary/5 glow-border' :'border-border hover:border-muted-foreground hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{option?.label}</h4>
                  {settings?.glowIntensity === option?.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{option?.description}</p>
                <div className={`mt-3 h-8 bg-primary/20 rounded ${
                  option?.value === 'subtle' ? 'shadow-sm' :
                  option?.value === 'moderate' ? 'shadow-md glow-effect' :
                  'shadow-lg glow-effect'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bubble Style */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Message Bubble Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bubbleStyles?.map((style) => (
              <div
                key={style?.id}
                onClick={() => handleBubbleStyleChange(style?.id)}
                className={`p-4 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
                  settings?.bubbleStyle === style?.id
                    ? 'border-primary bg-primary/5 glow-border' :'border-border hover:border-muted-foreground hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={style?.icon} size={16} className="text-muted-foreground" />
                    <h4 className="font-medium text-foreground text-sm">{style?.name}</h4>
                  </div>
                  {settings?.bubbleStyle === style?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{style?.description}</p>
                <div className={`h-6 bg-primary/20 ${style?.preview}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Accent Color</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {accentColors?.map((color) => (
              <div
                key={color?.id}
                onClick={() => handleAccentColorChange(color?.id)}
                className={`p-3 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
                  settings?.accentColor === color?.id
                    ? 'border-primary bg-primary/5 glow-border' :'border-border hover:border-muted-foreground hover:bg-muted/30'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div 
                    className="w-8 h-8 rounded-full glow-effect"
                    style={{ backgroundColor: color?.color }}
                  ></div>
                  <span className="text-xs text-foreground font-medium text-center">{color?.name}</span>
                  {settings?.accentColor === color?.id && (
                    <Icon name="Check" size={12} className="text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animation Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Animation Preferences</h3>
          <div className="space-y-4">
            {[
              { key: 'messageAnimations', label: 'Message Animations', description: 'Smooth fade-in effects for new messages' },
              { key: 'hoverEffects', label: 'Hover Effects', description: 'Interactive hover animations on buttons and cards' },
              { key: 'typingIndicator', label: 'Typing Indicator', description: 'Animated dots when AI is responding' },
              { key: 'glowAnimations', label: 'Glow Animations', description: 'Pulsing glow effects on active elements' }
            ]?.map((animation) => (
              <div key={animation?.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div>
                  <h4 className="font-medium text-foreground text-sm">{animation?.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{animation?.description}</p>
                </div>
                <button
                  onClick={() => handleAnimationToggle(animation?.key)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    settings?.animations?.[animation?.key] ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      settings?.animations?.[animation?.key] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-muted/30 rounded-lg border border-border p-4">
          <h3 className="text-lg font-medium text-foreground mb-4">Live Preview</h3>
          <div className="space-y-3">
            <div className="flex justify-end">
              <div className={`max-w-xs p-3 bg-primary text-primary-foreground ${
                settings?.bubbleStyle === 'rounded' ? 'rounded-lg' :
                settings?.bubbleStyle === 'pill' ? 'rounded-full' : 'rounded-none'
              } ${settings?.glowIntensity !== 'subtle' ? 'glow-effect' : ''}`}>
                <p className="text-sm">This is how your messages will look!</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className={`max-w-xs p-3 bg-card border border-border ${
                settings?.bubbleStyle === 'rounded' ? 'rounded-lg' :
                settings?.bubbleStyle === 'pill' ? 'rounded-full' : 'rounded-none'
              } ${settings?.glowIntensity !== 'subtle' ? 'glow-effect' : ''}`}>
                <p className="text-sm text-foreground">And this is how AI responses will appear.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => {
            const defaultSettings = {
              glowIntensity: 'moderate',
              bubbleStyle: 'rounded',
              accentColor: 'blue',
              animations: {
                messageAnimations: true,
                hoverEffects: true,
                typingIndicator: true,
                glowAnimations: true
              }
            };
            setSettings(defaultSettings);
            onThemeChange(defaultSettings);
          }}
        >
          Reset to Default
        </Button>
        <Button
          variant="default"
          iconName="Palette"
          iconPosition="left"
          iconSize={16}
          className="glow-effect hover:shadow-glow-lg"
        >
          Apply Theme
        </Button>
      </div>
    </div>
  );
};

export default ThemeCustomizationSection;