import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ConversationList from './components/ConversationList';
import SearchFilters from './components/SearchFilters';
import PreviewPanel from './components/PreviewPanel';
import BulkActions from './components/BulkActions';
import ParticleBackground from '../chat-interface/components/ParticleBackground';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ChatHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedConversations, setSelectedConversations] = useState(new Set());
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock conversation data
  const mockConversations = [
    {
      id: 1,
      title: "Python Data Analysis with Pandas",
      preview: "Help me analyze this dataset using pandas and matplotlib. I need to identify trends in sales data...",
      mode: 'coding',
      createdAt: new Date(Date.now() - 86400000)?.toISOString(),
      updatedAt: new Date(Date.now() - 43200000)?.toISOString(),
      messageCount: 12,
      isFavorite: true,
      tags: ['python', 'data-analysis', 'pandas'],
      snippet: "```python\nimport pandas as pd\ndf = pd.read_csv('sales_data.csv')\nprint(df.head())\n```"
    },
    {
      id: 2,
      title: "Climate Change Research Findings",
      preview: "What are the latest findings on global warming effects on marine ecosystems?",
      mode: 'research',
      createdAt: new Date(Date.now() - 172800000)?.toISOString(),
      updatedAt: new Date(Date.now() - 86400000)?.toISOString(),
      messageCount: 8,
      isFavorite: false,
      tags: ['climate-change', 'marine-biology', 'research'],
      snippet: "Recent studies show significant impacts on coral reef systems..."
    },
    {
      id: 3,
      title: "Sci-Fi Short Story Brainstorming",
      preview: "I need help brainstorming ideas for a sci-fi story about time travel and parallel universes...",
      mode: 'creative',
      createdAt: new Date(Date.now() - 259200000)?.toISOString(),
      updatedAt: new Date(Date.now() - 172800000)?.toISOString(),
      messageCount: 15,
      isFavorite: true,
      tags: ['creative-writing', 'sci-fi', 'storytelling'],
      snippet: "The protagonist discovers a device that allows them to glimpse alternate realities..."
    },
    {
      id: 4,
      title: "React Component Architecture",
      preview: "Best practices for organizing React components in a large-scale application...",
      mode: 'coding',
      createdAt: new Date(Date.now() - 345600000)?.toISOString(),
      updatedAt: new Date(Date.now() - 259200000)?.toISOString(),
      messageCount: 6,
      isFavorite: false,
      tags: ['react', 'architecture', 'best-practices'],
      snippet: "Consider using compound components pattern for better reusability..."
    },
    {
      id: 5,
      title: "Digital Marketing Strategy Analysis",
      preview: "Analyze this marketing campaign performance data and suggest improvements...",
      mode: 'research',
      createdAt: new Date(Date.now() - 432000000)?.toISOString(),
      updatedAt: new Date(Date.now() - 345600000)?.toISOString(),
      messageCount: 9,
      isFavorite: false,
      tags: ['marketing', 'analysis', 'strategy'],
      snippet: "The campaign shows strong engagement in the 25-34 age demographic..."
    },
    {
      id: 6,
      title: "Machine Learning Model Optimization",
      preview: "How to optimize neural network performance for image classification tasks...",
      mode: 'coding',
      createdAt: new Date(Date.now() - 518400000)?.toISOString(),
      updatedAt: new Date(Date.now() - 432000000)?.toISOString(),
      messageCount: 11,
      isFavorite: true,
      tags: ['machine-learning', 'neural-networks', 'optimization'],
      snippet: "Consider using data augmentation and transfer learning techniques..."
    }
  ];

  useEffect(() => {
    // Simulate loading conversations
    setIsLoading(true);
    setTimeout(() => {
      setConversations(mockConversations);
      setTotalPages(Math.ceil(mockConversations?.length / 10));
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window?.innerWidth < 768);
    };

    handleResize();
    window?.addEventListener('resize', handleResize);
    return () => window?.removeEventListener('resize', handleResize);
  }, []);

  // Filter conversations based on search and filters
  const filteredConversations = conversations?.filter(conv => {
    const matchesSearch = !searchTerm || 
      conv?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      conv?.preview?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      conv?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    const matchesMode = selectedMode === 'all' || conv?.mode === selectedMode;
    
    const matchesDateRange = (!dateRange?.start || new Date(conv?.createdAt) >= new Date(dateRange?.start)) &&
      (!dateRange?.end || new Date(conv?.createdAt) <= new Date(dateRange?.end));
    
    return matchesSearch && matchesMode && matchesDateRange;
  });

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobileView) {
      setShowPreview(true);
    }
  };

  const handleConversationToggle = (conversationId, checked) => {
    const newSelected = new Set(selectedConversations);
    if (checked) {
      newSelected?.add(conversationId);
    } else {
      newSelected?.delete(conversationId);
    }
    setSelectedConversations(newSelected);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedConversations(new Set(filteredConversations?.map(c => c?.id)));
    } else {
      setSelectedConversations(new Set());
    }
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        setConversations(prev => prev?.filter(c => !selectedConversations?.has(c?.id)));
        setSelectedConversations(new Set());
        break;
      case 'favorite':
        setConversations(prev => prev?.map(c => 
          selectedConversations?.has(c?.id) ? { ...c, isFavorite: true } : c
        ));
        break;
      case 'unfavorite':
        setConversations(prev => prev?.map(c => 
          selectedConversations?.has(c?.id) ? { ...c, isFavorite: false } : c
        ));
        break;
      case 'export':
        console.log('Exporting conversations:', selectedConversations);
        break;
      default:
        break;
    }
  };

  const handleContinueConversation = (conversationId) => {
    navigate(`/chat-interface?conversation=${conversationId}`);
  };

  const handleBackToList = () => {
    setShowPreview(false);
    setSelectedConversation(null);
  };

  if (isMobileView && showPreview && selectedConversation) {
    return (
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <ParticleBackground intensity={0.2} />
        <Header isAuthenticated={true} user={mockUser} />
        
        <div className="pt-16 h-screen flex flex-col relative z-10">
          <div className="flex items-center p-4 border-b border-border bg-background/95 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToList}
              className="mr-3"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Conversation Preview</h1>
          </div>
          
          <PreviewPanel
            conversation={selectedConversation}
            onContinue={handleContinueConversation}
            className="flex-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground intensity={0.2} />
      <Header isAuthenticated={true} user={mockUser} />
      
      <div className="pt-16 h-screen flex flex-col relative z-10">
        {/* Page Header */}
        <div className="border-b border-border bg-background/95 backdrop-blur-sm p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center">
                  <Icon name="History" size={28} className="mr-3 text-primary" />
                  Chat History
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage and search through your conversation history
                </p>
              </div>
              <Button
                variant="default"
                onClick={() => navigate('/chat-interface')}
                className="glow-effect hover:shadow-glow-lg"
                iconName="Plus"
                iconPosition="left"
              >
                New Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Search & Conversations */}
          <div className={`${isMobileView ? 'w-full' : 'w-1/2 lg:w-2/5'} flex flex-col border-r border-border bg-background/50`}>
            {/* Search & Filters */}
            <SearchFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />

            {/* Bulk Actions */}
            {selectedConversations?.size > 0 && (
              <BulkActions
                selectedCount={selectedConversations?.size}
                onBulkAction={handleBulkAction}
                onSelectAll={handleSelectAll}
                isAllSelected={selectedConversations?.size === filteredConversations?.length}
              />
            )}

            {/* Conversation List */}
            <ConversationList
              conversations={filteredConversations}
              selectedConversations={selectedConversations}
              selectedConversation={selectedConversation}
              onConversationSelect={handleConversationSelect}
              onConversationToggle={handleConversationToggle}
              onContinueConversation={handleContinueConversation}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Right Panel - Preview */}
          {!isMobileView && (
            <div className="flex-1 flex flex-col">
              <PreviewPanel
                conversation={selectedConversation}
                onContinue={handleContinueConversation}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;