import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIPersonaSection = ({ currentPersona, onPersonaChange }) => {
  const [selectedPersona, setSelectedPersona] = useState(currentPersona);

  const personas = [
    {
      id: 'professional',
      name: 'Professional Assistant',
      icon: 'Briefcase',
      description: 'Formal, structured responses with business-focused insights and professional tone.',
      traits: ['Analytical', 'Precise', 'Goal-oriented'],
      color: 'text-primary'
    },
    {
      id: 'creative',
      name: 'Creative Companion',
      icon: 'Palette',
      description: 'Imaginative, inspiring responses that encourage creative thinking and artistic expression.',
      traits: ['Innovative', 'Expressive', 'Inspiring'],
      color: 'text-accent'
    },
    {
      id: 'friendly',
      name: 'Friendly Guide',
      icon: 'Heart',
      description: 'Warm, conversational tone with empathetic responses and casual communication style.',
      traits: ['Empathetic', 'Supportive', 'Approachable'],
      color: 'text-success'
    },
    {
      id: 'technical',
      name: 'Technical Expert',
      icon: 'Code',
      description: 'Detail-oriented responses with technical accuracy and comprehensive explanations.',
      traits: ['Precise', 'Thorough', 'Logical'],
      color: 'text-warning'
    },
    {
      id: 'mentor',
      name: 'Learning Mentor',
      icon: 'GraduationCap',
      description: 'Educational approach with step-by-step guidance and encouraging feedback.',
      traits: ['Patient', 'Educational', 'Encouraging'],
      color: 'text-purple-400'
    },
    {
      id: 'researcher',
      name: 'Research Scholar',
      icon: 'BookOpen',
      description: 'Academic tone with evidence-based responses and comprehensive research insights.',
      traits: ['Scholarly', 'Evidence-based', 'Comprehensive'],
      color: 'text-blue-400'
    }
  ];

  const handlePersonaSelect = (personaId) => {
    setSelectedPersona(personaId);
    onPersonaChange(personaId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 glow-effect">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Bot" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Persona</h2>
          <p className="text-sm text-muted-foreground">Choose how your AI assistant communicates with you</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personas?.map((persona) => (
          <div
            key={persona?.id}
            onClick={() => handlePersonaSelect(persona?.id)}
            className={`relative p-4 rounded-lg border cursor-pointer smooth-transition micro-interaction ${
              selectedPersona === persona?.id
                ? 'border-primary bg-primary/5 glow-border' :'border-border hover:border-muted-foreground hover:bg-muted/30'
            }`}
          >
            {selectedPersona === persona?.id && (
              <div className="absolute top-3 right-3">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${persona?.color}`}>
                <Icon name={persona?.icon} size={16} />
              </div>
              <h3 className="font-medium text-foreground text-sm">{persona?.name}</h3>
            </div>

            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {persona?.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {persona?.traits?.map((trait, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Persona Preview</h4>
            <p className="text-xs text-muted-foreground">
              {personas?.find(p => p?.id === selectedPersona)?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Changes apply to new conversations
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={16}
          className="glow-effect hover:shadow-glow-lg"
        >
          Test Persona
        </Button>
      </div>
    </div>
  );
};

export default AIPersonaSection;