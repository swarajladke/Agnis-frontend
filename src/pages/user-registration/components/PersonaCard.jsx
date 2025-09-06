import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonaCard = ({ persona, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(persona?.id)}
      className={`relative p-4 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
        isSelected
          ? 'border-primary bg-primary/10 glow-border' :'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={persona?.icon} size={20} />
        </div>
        <div className="flex-1">
          <h3 className={`font-medium text-sm ${
            isSelected ? 'text-primary' : 'text-foreground'
          }`}>
            {persona?.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {persona?.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {persona?.traits?.map((trait, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded-full ${
                  isSelected
                    ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                }`}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2">
            <Icon name="Check" size={16} className="text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaCard;