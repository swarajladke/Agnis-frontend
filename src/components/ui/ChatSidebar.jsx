import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ChatSidebar = ({ 
  isCollapsed = false, 
  onToggle = () => {},
  currentMode = 'research',
  onModeChange = () => {},
  chatHistory = [],
  onChatSelect = () => {},
  activeChatId = null
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(chatHistory);

  const chatModes = [
    {
      id: 'research',
      name: 'Research Mode',
      icon: 'BookOpen',
      description: 'Academic research and analysis',
      color: 'text-primary'
    },
    {
      id: 'coding',
      name: 'Coding Assistant',
      icon: 'Code',
      description: 'Programming help and code review',
      color: 'text-success'
    },
    {
      id: 'creative',
      name: 'Creative Studio',
      icon: 'Palette',
      description: 'Creative writing and ideation',
      color: 'text-accent'
    }
  ];

  useEffect(() => {
    if (searchQuery?.trim()) {
      const filtered = chatHistory?.filter(chat =>
        chat?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        chat?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(chatHistory);
    }
  }, [searchQuery, chatHistory]);

  const handleNewChat = () => {
    onChatSelect(null);
  };

  const handleChatClick = (chatId) => {
    onChatSelect(chatId);
  };

  const handleModeSelect = (modeId) => {
    onModeChange(modeId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString();
  };

  const groupChatsByDate = (chats) => {
    const groups = {};
    chats?.forEach(chat => {
      const dateKey = formatDate(chat?.createdAt);
      if (!groups?.[dateKey]) {
        groups[dateKey] = [];
      }
      groups?.[dateKey]?.push(chat);
    });
    return groups;
  };

  const chatGroups = groupChatsByDate(filteredHistory);

  if (isCollapsed) {
    return (
      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-card border-r border-border z-40 flex flex-col items-center py-4 space-y-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-10 h-10 hover:bg-muted glow-effect micro-interaction"
        >
          <Icon name="PanelLeftOpen" size={20} />
        </Button>
        <div className="w-8 h-px bg-border"></div>
        {chatModes?.map((mode) => (
          <Button
            key={mode?.id}
            variant="ghost"
            size="icon"
            onClick={() => handleModeSelect(mode?.id)}
            className={`w-10 h-10 ${currentMode === mode?.id ? 'bg-primary/10 text-primary glow-border' : 'hover:bg-muted'} micro-interaction`}
            title={mode?.name}
          >
            <Icon name={mode?.icon} size={20} />
          </Button>
        ))}
        <div className="w-8 h-px bg-border"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNewChat}
          className="w-10 h-10 hover:bg-muted glow-effect micro-interaction"
          title="New Chat"
        >
          <Icon name="Plus" size={20} />
        </Button>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden ${!isCollapsed ? 'block' : 'hidden'}`}
        onClick={onToggle}
      />
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-r border-border z-40 flex flex-col smooth-transition ${!isCollapsed ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Agnis AI</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-8 h-8 hover:bg-muted micro-interaction"
          >
            <Icon name="PanelLeftClose" size={18} />
          </Button>
        </div>

        {/* Mode Selection */}
        <div className="p-4 border-b border-border">
          <div className="space-y-2">
            {chatModes?.map((mode) => (
              <Button
                key={mode?.id}
                variant={currentMode === mode?.id ? "default" : "ghost"}
                onClick={() => handleModeSelect(mode?.id)}
                className={`w-full justify-start h-auto p-3 ${currentMode === mode?.id ? 'glow-effect' : 'hover:bg-muted'} micro-interaction`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={mode?.icon} 
                    size={20} 
                    className={currentMode === mode?.id ? 'text-primary-foreground' : mode?.color}
                  />
                  <div className="text-left">
                    <div className="font-medium text-sm">{mode?.name}</div>
                    <div className={`text-xs ${currentMode === mode?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {mode?.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-border">
          <Button
            variant="outline"
            onClick={handleNewChat}
            className="w-full justify-start glow-effect hover:shadow-glow-lg micro-interaction"
            iconName="Plus"
            iconPosition="left"
            iconSize={18}
          >
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {Object.keys(chatGroups)?.length === 0 ? (
            <div className="p-4 text-center">
              <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">No conversations yet</p>
              <p className="text-xs text-muted-foreground mt-1">Start a new chat to begin</p>
            </div>
          ) : (
            <div className="p-2">
              {Object.entries(chatGroups)?.map(([dateGroup, chats]) => (
                <div key={dateGroup} className="mb-4">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-1 mb-2">
                    {dateGroup}
                  </h3>
                  <div className="space-y-1">
                    {chats?.map((chat) => (
                      <Button
                        key={chat?.id}
                        variant="ghost"
                        onClick={() => handleChatClick(chat?.id)}
                        className={`w-full justify-start h-auto p-3 text-left ${activeChatId === chat?.id ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'hover:bg-muted'} micro-interaction`}
                      >
                        <div className="flex items-start space-x-3 w-full">
                          <Icon 
                            name={chatModes?.find(m => m?.id === chat?.mode)?.icon || 'MessageSquare'} 
                            size={16} 
                            className="mt-0.5 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{chat?.title}</div>
                            <div className="text-xs text-muted-foreground truncate mt-1">
                              {chat?.preview}
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;