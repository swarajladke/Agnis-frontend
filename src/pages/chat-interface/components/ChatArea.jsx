import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Icon from '../../../components/AppIcon';

const ChatArea = ({ 
  messages = [], 
  isTyping = false, 
  currentMode = 'research',
  onRegenerate,
  onSaveMessage,
  onFileUploadClick,
  onStartChatting,
  className = '' 
}) => {
  const messagesEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getModeWelcomeMessage = () => {
    switch (currentMode) {
      case 'research':
        return {
          title: 'Research Mode Active',
          description: 'I can help you with academic research, data analysis, fact-checking, and providing detailed insights on any topic.',
          icon: 'BookOpen',
          color: 'text-primary'
        };
      case 'coding':
        return {
          title: 'Coding Assistant Ready',
          description: 'I\'m here to help with programming, debugging, code reviews, architecture decisions, and technical problem-solving.',
          icon: 'Code',
          color: 'text-success'
        };
      case 'creative':
        return {
          title: 'Creative Studio Activated',
          description: 'Let\'s create something amazing! I can help with creative writing, storytelling, brainstorming, and artistic projects.',
          icon: 'Palette',
          color: 'text-accent'
        };
      default:
        return {
          title: 'AI Assistant Ready',
          description: 'How can I help you today?',
          icon: 'Bot',
          color: 'text-primary'
        };
    }
  };

  const welcomeMessage = getModeWelcomeMessage();

  if (messages?.length === 0 && !isTyping) {
    return (
      <div className={`flex-1 flex items-center justify-center p-6 ${className}`}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
            <Icon name={welcomeMessage?.icon} size={32} className={welcomeMessage?.color} />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            {welcomeMessage?.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {welcomeMessage?.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <button 
              onClick={onFileUploadClick}
              className="bg-card hover:bg-muted/50 border border-border rounded-lg p-3 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <Icon name="Upload" size={16} className="text-primary mb-2" />
              <div className="font-medium text-foreground">Upload Files</div>
              <div className="text-muted-foreground text-xs">PDF, DOCX, images</div>
            </button>
            <button 
              onClick={onStartChatting}
              className="bg-card hover:bg-muted/50 border border-border rounded-lg p-3 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <Icon name="MessageSquare" size={16} className="text-primary mb-2" />
              <div className="font-medium text-foreground">Start Chatting</div>
              <div className="text-muted-foreground text-xs">Ask me anything</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 overflow-y-auto ${className}`} ref={chatAreaRef}>
      <div className="max-w-4xl mx-auto p-6">
        {messages?.map((message) => (
          <MessageBubble
            key={message?.id}
            message={message}
            isUser={message?.isUser}
            onRegenerate={onRegenerate}
            onCopy={() => {
              // Handle copy feedback
              console.log('Message copied');
            }}
            onSave={onSaveMessage}
          />
        ))}
        {isTyping && (
          <MessageBubble 
            isTyping={true} 
            message={{}} 
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;