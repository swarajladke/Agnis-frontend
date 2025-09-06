import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedMode,
  onModeChange,
  dateRange,
  onDateRangeChange
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const modes = [
    { value: 'all', label: 'All Modes', icon: 'MessageSquare' },
    { value: 'research', label: 'Research', icon: 'Search' },
    { value: 'coding', label: 'Coding', icon: 'Code' },
    { value: 'creative', label: 'Creative', icon: 'Sparkles' }
  ];

  const handleClearFilters = () => {
    onSearchChange('');
    onModeChange('all');
    onDateRangeChange({ start: '', end: '' });
  };

  const hasActiveFilters = searchTerm || selectedMode !== 'all' || dateRange?.start || dateRange?.end;

  return (
    <div className="p-4 border-b border-border bg-card/50">
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name="Search" size={20} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          placeholder="Search conversations..."
          className="
            w-full pl-10 pr-10 py-3 bg-input border border-border rounded-lg 
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
            hover:border-primary/50 transition-all duration-200 ease-in-out
            glow-effect focus:shadow-glow-lg
          "
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange('')}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 hover:bg-muted"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-muted-foreground hover:text-foreground"
          iconName={showFilters ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          Advanced Filters
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="text-sm text-primary hover:text-primary/80"
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border/50">
          {/* Mode Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Conversation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {modes?.map((mode) => (
                <Button
                  key={mode?.value}
                  variant={selectedMode === mode?.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onModeChange(mode?.value)}
                  className={`justify-start ${
                    selectedMode === mode?.value 
                      ? 'glow-effect shadow-glow-md' 
                      : 'hover:border-primary/50'
                  }`}
                  iconName={mode?.icon}
                  iconPosition="left"
                  iconSize={16}
                >
                  {mode?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">From</label>
                <Input
                  type="date"
                  value={dateRange?.start || ''}
                  onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">To</label>
                <Input
                  type="date"
                  value={dateRange?.end || ''}
                  onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {searchTerm && (
            <div className="flex items-center bg-primary/20 text-primary px-2 py-1 rounded-md text-xs">
              <Icon name="Search" size={12} className="mr-1" />
              Search: {searchTerm}
            </div>
          )}
          {selectedMode !== 'all' && (
            <div className="flex items-center bg-accent/20 text-accent px-2 py-1 rounded-md text-xs">
              <Icon name="Filter" size={12} className="mr-1" />
              {modes?.find(m => m?.value === selectedMode)?.label}
            </div>
          )}
          {(dateRange?.start || dateRange?.end) && (
            <div className="flex items-center bg-warning/20 text-warning px-2 py-1 rounded-md text-xs">
              <Icon name="Calendar" size={12} className="mr-1" />
              Date Range
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;