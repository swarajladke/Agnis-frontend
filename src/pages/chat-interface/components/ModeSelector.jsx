import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModeSelector = ({ currentMode, onModeChange, className = '' }) => {
  const modes = [
    {
      id: 'research',
      name: 'Research',
      icon: 'BookOpen',
      description: 'Academic research and analysis',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      id: 'coding',
      name: 'Coding',
      icon: 'Code',
      description: 'Programming help and code review',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: 'Palette',
      description: 'Creative writing and ideation',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    }
  ];

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {modes?.map((mode) => (
        <Button
          key={mode?.id}
          variant={currentMode === mode?.id ? "default" : "ghost"}
          onClick={() => onModeChange(mode?.id)}
          className={`flex-1 h-auto p-4 ${
            currentMode === mode?.id 
              ? 'glow-effect shadow-glow-lg' 
              : `hover:${mode?.bgColor} hover:${mode?.borderColor} border border-transparent hover:border-opacity-100`
          } micro-interaction smooth-transition`}
        >
          <div className="flex items-center space-x-3 w-full">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              currentMode === mode?.id 
                ? 'bg-primary-foreground/20' 
                : mode?.bgColor
            }`}>
              <Icon 
                name={mode?.icon} 
                size={20} 
                className={currentMode === mode?.id ? 'text-primary-foreground' : mode?.color}
              />
            </div>
            <div className="text-left flex-1">
              <div className={`font-semibold text-sm ${
                currentMode === mode?.id ? 'text-primary-foreground' : 'text-foreground'
              }`}>
                {mode?.name} Mode
              </div>
              <div className={`text-xs mt-1 ${
                currentMode === mode?.id 
                  ? 'text-primary-foreground/80' 
                  : 'text-muted-foreground'
              }`}>
                {mode?.description}
              </div>
            </div>
            {currentMode === mode?.id && (
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ModeSelector;