import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ChatSidebar from '../../components/ui/ChatSidebar';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import ParticleBackground from './components/ParticleBackground';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ChatInterface = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentMode, setCurrentMode] = useState('research');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock chat history
  const mockChatHistory = [
    {
      id: 1,
      title: "Python Data Analysis",
      preview: "Help me analyze this dataset using pandas...",
      mode: 'coding',
      createdAt: new Date(Date.now() - 86400000)?.toISOString(), // 1 day ago
      messageCount: 12
    },
    {
      id: 2,
      title: "Climate Change Research",
      preview: "What are the latest findings on global warming...",
      mode: 'research',
      createdAt: new Date(Date.now() - 172800000)?.toISOString(), // 2 days ago
      messageCount: 8
    },
    {
      id: 3,
      title: "Short Story Ideas",
      preview: "I need help brainstorming a sci-fi story...",
      mode: 'creative',
      createdAt: new Date(Date.now() - 259200000)?.toISOString(), // 3 days ago
      messageCount: 15
    },
    {
      id: 4,
      title: "React Component Design",
      preview: "Best practices for component architecture...",
      mode: 'coding',
      createdAt: new Date(Date.now() - 345600000)?.toISOString(), // 4 days ago
      messageCount: 6
    },
    {
      id: 5,
      title: "Marketing Strategy Analysis",
      preview: "Analyze this marketing campaign data...",
      mode: 'research',
      createdAt: new Date(Date.now() - 432000000)?.toISOString(), // 5 days ago
      messageCount: 9
    }
  ];

  // Mock messages for demonstration
  const mockMessages = [
    {
      id: 1,
      content: "Hello! I'm your AI assistant. I can help you with research, coding, and creative projects. What would you like to work on today?",
      isUser: false,
      timestamp: new Date(Date.now() - 300000)?.toISOString(),
      mode: 'research'
    },
    {
      id: 2,
      content: "I\'d like to analyze some climate data and understand the trends in global temperature changes over the past decade.",
      isUser: true,
      timestamp: new Date(Date.now() - 240000)?.toISOString()
    },
    {
      id: 3,
      content: `I'd be happy to help you analyze climate data and temperature trends! Here's what I can assist you with:

**Data Analysis Approach:**
1. **Data Collection**: Identify reliable sources like NOAA, NASA GISS, or IPCC reports
2. **Trend Analysis**: Use statistical methods to identify patterns and anomalies
3. **Visualization**: Create charts and graphs to illustrate temperature changes
4. **Regional Comparison**: Compare global vs regional temperature variations

**Key Metrics to Examine:**
- Global mean temperature anomalies
- Seasonal temperature variations
- Extreme weather event frequency
- Ocean temperature changes
- Arctic ice extent correlation

Would you like me to help you with any specific aspect of this analysis? Do you have a particular dataset in mind, or would you like recommendations for reliable climate data sources?`,
      isUser: false,
      timestamp: new Date(Date.now() - 180000)?.toISOString(),
      mode: 'research',
      codeBlocks: [
        {
          language: 'python',
          code: `import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load climate data
df = pd.read_csv('global_temperature_data.csv')

# Calculate temperature anomalies
df['temp_anomaly'] = df['temperature'] - df['temperature'].mean()

# Plot trends
plt.figure(figsize=(12, 6))
plt.plot(df['year'], df['temp_anomaly'])
plt.title('Global Temperature Anomalies (1880-2023)')
plt.xlabel('Year')
plt.ylabel('Temperature Anomaly (°C)')
plt.show()`
        }
      ]
    }
  ];

  useEffect(() => {
    // Initialize with mock messages if no active chat
    if (!activeChatId && messages?.length === 0) {
      setMessages(mockMessages);
    }
  }, [activeChatId]);

  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: Date.now(),
      content: messageData?.content,
      isUser: true,
      timestamp: messageData?.timestamp,
      files: messageData?.files
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageData?.content, currentMode);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage, mode) => {
    const responses = {
      research: [
        "Based on current research and data analysis, here are the key findings...",
        "Let me break down this topic with evidence-based insights...",
        "According to recent studies and peer-reviewed sources..."
      ],
      coding: [
        "Here\'s a solution to your programming challenge...",
        "Let me help you debug this code and optimize the approach...",
        "I\'ll provide you with best practices and clean code examples..."
      ],
      creative: [
        "What an interesting creative challenge! Let me help you brainstorm...",
        "Here\'s a creative approach to your project...",
        "Let\'s explore some innovative ideas together..."
      ]
    };

    const modeResponses = responses?.[mode] || responses?.research;
    const randomResponse = modeResponses?.[Math.floor(Math.random() * modeResponses?.length)];

    return {
      id: Date.now() + 1,
      content: `${randomResponse}\n\nI understand you're asking about: "${userMessage}"\n\nThis is a fascinating topic that requires careful analysis. Let me provide you with a comprehensive response that addresses your specific needs and offers actionable insights.`,
      isUser: false,
      timestamp: new Date()?.toISOString(),
      mode: mode
    };
  };

  const handleFileUpload = (fileInfo) => {
    console.log('File uploaded:', fileInfo);
    // Handle file upload logic here
  };

  const handleFileUploadClick = () => {
    // Trigger the file input click
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleStartChatting = () => {
    // Set a welcome message when starting a new chat
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        content: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toISOString(),
        mode: currentMode
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleModeChange = (newMode) => {
    setCurrentMode(newMode);
    // Optionally clear messages or show mode change message
  };

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
    if (chatId) {
      // Load messages for selected chat
      setMessages(mockMessages);
    } else {
      // New chat
      setMessages([]);
    }
  };

  const handleRegenerate = (messageId) => {
    const messageIndex = messages?.findIndex(m => m?.id === messageId);
    if (messageIndex > 0) {
      const previousUserMessage = messages?.[messageIndex - 1];
      if (previousUserMessage?.isUser) {
        setIsTyping(true);
        setTimeout(() => {
          const newResponse = generateAIResponse(previousUserMessage?.content, currentMode);
          setMessages(prev => {
            const updated = [...prev];
            updated[messageIndex] = newResponse;
            return updated;
          });
          setIsTyping(false);
        }, 1000);
      }
    }
  };

  const handleSaveMessage = (message) => {
    console.log('Message saved:', message);
    // Handle save message logic here
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground intensity={0.3} />
      
      <Header isAuthenticated={true} user={mockUser} />
      
      <div className="flex h-screen pt-16">
        <ChatSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentMode={currentMode}
          onModeChange={handleModeChange}
          chatHistory={mockChatHistory}
          onChatSelect={handleChatSelect}
          activeChatId={activeChatId}
        />

        <main className={`flex-1 flex flex-col smooth-transition ${
          isSidebarCollapsed ? 'ml-16' : 'ml-80'
        } md:ml-0`}>
          {/* Mode Selector Removed */}

          <ChatArea
            messages={messages}
            isTyping={isTyping}
            currentMode={currentMode}
            onFileUploadClick={handleFileUploadClick}
            onStartChatting={handleStartChatting}
            onRegenerate={handleRegenerate}
            onSaveMessage={handleSaveMessage}
            className="relative z-10"
          />

          <div className="relative z-10">
            <ChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              disabled={isTyping}
              currentMode={currentMode}
            />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Toggle */}
      {isSidebarCollapsed && (
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsSidebarCollapsed(false)}
          className="fixed bottom-6 left-6 z-50 md:hidden w-12 h-12 rounded-full glow-effect shadow-glow-lg"
        >
          <Icon name="MessageSquare" size={24} />
        </Button>
      )}
    </div>
  );
};

export default ChatInterface;