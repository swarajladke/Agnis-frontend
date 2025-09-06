import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationList = ({
  conversations,
  selectedConversations,
  selectedConversation,
  onConversationSelect,
  onConversationToggle,
  onContinueConversation,
  isLoading,
  currentPage,
  totalPages,
  onPageChange
}) => {
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
      case 'research': return 'text-blue-400';
      case 'coding': return 'text-green-400';
      case 'creative': return 'text-purple-400';
      default: return 'text-primary';
    }
  };

  const ConversationCard = ({ conversation }) => {
    const isSelected = selectedConversations?.has(conversation?.id);
    const isActive = selectedConversation?.id === conversation?.id;

    return (
      <div
        className={`
          group relative p-4 border-b border-border/50 cursor-pointer
          hover:bg-muted/50 transition-all duration-200
          ${isActive ? 'bg-primary/10 border-l-4 border-l-primary' : ''}
        `}
        onClick={() => onConversationSelect(conversation)}
      >
        {/* Selection Checkbox */}
        <div 
          className="absolute top-4 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e?.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onConversationToggle(conversation?.id, e?.target?.checked)}
            className="w-4 h-4 rounded border border-border bg-background text-primary focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className={`${selectedConversations?.size > 0 ? 'ml-6' : ''} transition-all duration-200`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {conversation?.title}
              </h3>
              <div className="flex items-center mt-1 space-x-2">
                <Icon
                  name={getModeIcon(conversation?.mode)}
                  size={14}
                  className={getModeColor(conversation?.mode)}
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {conversation?.mode}
                </span>
                <span className="text-xs text-muted-foreground">
                  •
                </span>
                <span className="text-xs text-muted-foreground">
                  {conversation?.messageCount} messages
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {conversation?.isFavorite && (
                <Icon name="Star" size={16} className="text-warning fill-current" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e?.stopPropagation();
                  onContinueConversation(conversation?.id);
                }}
                className="w-8 h-8 hover:bg-primary/20"
              >
                <Icon name="Play" size={14} />
              </Button>
            </div>
          </div>

          {/* Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {conversation?.preview}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {conversation?.tags?.slice(0, 2)?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {conversation?.tags?.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{conversation?.tags?.length - 2} more
                </span>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(conversation?.updatedAt), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mb-4 mx-auto" />
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (conversations?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Icon name="MessageSquareOff" size={48} className="text-muted-foreground mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-foreground mb-2">No conversations found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters to find conversations.
          </p>
          <Button
            variant="default"
            onClick={() => window?.location?.reload()}
            className="glow-effect"
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Results Count */}
      <div className="px-4 py-2 bg-muted/30 border-b border-border/50">
        <p className="text-sm text-muted-foreground">
          {conversations?.length} conversation{conversations?.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations?.map((conversation) => (
          <ConversationCard
            key={conversation?.id}
            conversation={conversation}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border bg-card/50">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {Array?.from({ length: Math?.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className={currentPage === page ? "glow-effect" : ""}
                  >
                    {page}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-muted-foreground">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationList;