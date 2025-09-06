import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ 
  message, 
  isUser = false, 
  isTyping = false,
  onRegenerate = null,
  onCopy = null,
  onSave = null 
}) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(message?.content);
    if (onCopy) onCopy();
  };

  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'txt':
        return 'FileText';
      case 'docx':
        return 'FileText';
      case 'jpg': case'jpeg': case'png': case'gif': case'webp':
        return 'Image';
      default:
        return 'Paperclip';
    }
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6 stagger-fade-in">
        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center glow-effect">
          <Icon name="Bot" size={16} className="text-primary" />
        </div>
        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl glow-effect">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex items-start justify-end space-x-3 mb-6 stagger-fade-in">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl rounded-tr-sm px-4 py-3 max-w-2xl text-primary-foreground glow-effect">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message?.content}
          </div>
          
          {/* Multiple Files Display */}
          {message?.files && message?.files?.length > 0 && (
            <div className="mt-3 space-y-2">
              {message?.files?.map((file, index) => (
                <div
                  key={file?.id || index}
                  className="p-3 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20"
                >
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getFileIcon(file?.type)} 
                      size={16} 
                      className="text-primary-foreground/80" 
                    />
                    <span className="text-xs text-primary-foreground/80 truncate">
                      {file?.name}
                    </span>
                    <span className="text-xs text-primary-foreground/60">
                      ({file?.size})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Legacy Single File Support */}
          {message?.file && !message?.files && (
            <div className="mt-3 p-3 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <div className="flex items-center space-x-2">
                <Icon name="Paperclip" size={16} className="text-primary-foreground/80" />
                <span className="text-xs text-primary-foreground/80">{message?.file?.name}</span>
                <span className="text-xs text-primary-foreground/60">({message?.file?.size})</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-end mt-2">
            <span className="text-xs text-primary-foreground/60">
              {formatTimestamp(message?.timestamp)}
            </span>
          </div>
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow-effect">
          <Icon name="User" size={16} className="text-primary-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 mb-6 stagger-fade-in group">
      <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center glow-effect">
        <Icon name="Bot" size={16} className="text-primary" />
      </div>
      <div className="flex-1 max-w-4xl">
        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 glow-effect">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {message?.content}
          </div>
          {message?.codeBlocks && message?.codeBlocks?.map((block, index) => (
            <div key={index} className="mt-3 bg-muted rounded-lg border border-border overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border">
                <span className="text-xs text-muted-foreground font-mono">{block?.language}</span>
                <button
                  onClick={() => navigator.clipboard?.writeText(block?.code)}
                  className="text-xs text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Copy
                </button>
              </div>
              <pre className="p-3 text-xs font-mono text-foreground overflow-x-auto">
                <code>{block?.code}</code>
              </pre>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 smooth-transition">
          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="p-1 text-muted-foreground hover:text-foreground smooth-transition"
              title="Copy message"
            >
              <Icon name="Copy" size={14} />
            </button>
            {onSave && (
              <button
                onClick={() => onSave(message)}
                className="p-1 text-muted-foreground hover:text-foreground smooth-transition"
                title="Save message"
              >
                <Icon name="Bookmark" size={14} />
              </button>
            )}
            {onRegenerate && (
              <button
                onClick={() => onRegenerate(message?.id)}
                className="p-1 text-muted-foreground hover:text-foreground smooth-transition"
                title="Regenerate response"
              >
                <Icon name="RotateCcw" size={14} />
              </button>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(message?.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;