import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedCount, 
  onBulkAction, 
  onSelectAll, 
  isAllSelected 
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteConfirm = () => {
    onBulkAction('delete');
    setShowConfirmDelete(false);
  };

  if (showConfirmDelete) {
    return (
      <div className="p-4 bg-destructive/10 border-b border-destructive/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-destructive">
            <Icon name="AlertTriangle" size={20} className="mr-2" />
            <span className="font-medium">
              Delete {selectedCount} conversation{selectedCount !== 1 ? 's' : ''}?
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmDelete(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteConfirm}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-primary/5 border-b border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectAll(!isAllSelected)}
            iconName={isAllSelected ? "CheckSquare" : "Square"}
            iconPosition="left"
            iconSize={16}
          >
            {isAllSelected ? 'Deselect All' : 'Select All'}
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {selectedCount} selected
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('favorite')}
            iconName="Star"
            iconPosition="left"
            iconSize={14}
            className="hover:border-warning/50 hover:text-warning"
          >
            Favorite
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('unfavorite')}
            iconName="StarOff"
            iconPosition="left"
            iconSize={14}
            className="hover:border-muted-foreground/50"
          >
            Unfavorite
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('export')}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            className="hover:border-primary/50 hover:text-primary"
          >
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfirmDelete(true)}
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
            className="hover:border-destructive/50 hover:text-destructive"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;