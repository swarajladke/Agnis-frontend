import React, { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreviewPanel = ({ conversation, onContinue, className = '' }) => {
  const [showFullSnippet, setShowFullSnippet] = useState(false);

  if (!conversation) {
    return (
      <div className={`flex items-center justify-center bg-muted/20 ${className}`}>
        <div className="text-center p-8">
          <Icon name="MessageSquareText" size={64} className="text-muted-foreground/50 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Select a conversation to preview
          </h3>
          <p className="text-muted-foreground">
            Choose a conversation from the list to see its details and continue chatting.
          </p>
        </div>
      </div>
    );
  }

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'research': return 'Search';
      case 'coding': return 'Code';
      case 'creative': return 'Sparkles';
      default: return 'MessageSquare';
    }
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case 'research': return 'text-blue-400 bg-blue-400/20';
      case 'coding': return 'text-green-400 bg-green-400/20';
      case 'creative': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-primary bg-primary/20';
    }
  };

  const renderSnippet = (snippet) => {
    if (!snippet) return null;

    const isCode = snippet?.startsWith('```');
    
    if (isCode) {
      const lines = snippet?.split('\n');
      const language = lines?.[0]?.replace('```', '') || '';
      const code = lines?.slice(1, -1)?.join('\n');
      
      return (
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-mono">
              {language || 'code'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator?.clipboard?.writeText(code)}
              iconName="Copy"
              iconSize={14}
            >
              Copy
            </Button>
          </div>
          <pre className="text-sm text-foreground font-mono overflow-x-auto whitespace-pre-wrap">
            {showFullSnippet ? code : code?.substring(0, 200) + (code?.length > 200 ? '...' : '')}
          </pre>
          {code?.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullSnippet(!showFullSnippet)}
              className="mt-2"
            >
              {showFullSnippet ? 'Show less' : 'Show more'}
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <p className="text-sm text-foreground leading-relaxed">
          {showFullSnippet ? snippet : snippet?.substring(0, 300) + (snippet?.length > 300 ? '...' : '')}
        </p>
        {snippet?.length > 300 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullSnippet(!showFullSnippet)}
            className="mt-2"
          >
            {showFullSnippet ? 'Show less' : 'Show more'}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col bg-background/50 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground mb-2 leading-tight">
              {conversation?.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className={`flex items-center px-2 py-1 rounded-md ${getModeColor(conversation?.mode)}`}>
                <Icon name={getModeIcon(conversation?.mode)} size={14} className="mr-1" />
                <span className="capitalize font-medium">
                  {conversation?.mode}
                </span>
              </div>
              <div className="flex items-center">
                <Icon name="MessageCircle" size={14} className="mr-1" />
                {conversation?.messageCount} messages
              </div>
              {conversation?.isFavorite && (
                <div className="flex items-center text-warning">
                  <Icon name="Star" size={14} className="mr-1 fill-current" />
                  Favorite
                </div>
              )}
            </div>
          </div>
          
          <Button
            variant="default"
            onClick={() => onContinue?.(conversation?.id)}
            className="glow-effect hover:shadow-glow-lg"
            iconName="Play"
            iconPosition="left"
          >
            Continue Chat
          </Button>
        </div>

        {/* Tags */}
        {conversation?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {conversation?.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md border border-border/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Preview */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Eye" size={16} className="mr-2 text-primary" />
              Preview
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {conversation?.preview}
            </p>
          </div>

          {/* Snippet */}
          {conversation?.snippet && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
                <Icon name="FileText" size={16} className="mr-2 text-primary" />
                Content Sample
              </h3>
              {renderSnippet(conversation?.snippet)}
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <h4 className="text-sm font-medium text-foreground mb-2">Created</h4>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {format(new Date(conversation?.createdAt), 'MMM dd, yyyy')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(conversation?.createdAt), 'h:mm a')}
                </p>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <h4 className="text-sm font-medium text-foreground mb-2">Last Updated</h4>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(conversation?.updatedAt), { addSuffix: true })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(conversation?.updatedAt), 'MMM dd, h:mm a')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-border bg-card/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={() => onContinue?.(conversation?.id)}
            className="flex-1 glow-effect hover:shadow-glow-lg"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Continue Conversation
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hover:border-primary/50"
              iconName="Share"
            >
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="hover:border-primary/50"
              iconName="Download"
            >
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={`hover:border-warning/50 ${conversation?.isFavorite ? 'text-warning border-warning/50' : ''}`}
              iconName="Star"
            >
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;