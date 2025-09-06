import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ 
  onSendMessage, 
  onFileUpload, 
  disabled = false,
  currentMode = 'research' 
}) => {
  const [message, setMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const supportedFileTypes = {
    'application/pdf': 'PDF',
    'text/plain': 'TXT',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/webp': 'WEBP'
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const handleFileSelect = useCallback((files) => {
    const validFiles = Array.from(files)?.filter(file => 
      Object.keys(supportedFileTypes)?.includes(file?.type)
    );

    const fileData = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: formatFileSize(file?.size),
      type: supportedFileTypes?.[file?.type] || 'Unknown'
    }));

    setUploadedFiles(prev => [...prev, ...fileData]);
    if (onFileUpload) {
      fileData?.forEach(fileInfo => onFileUpload(fileInfo));
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = e?.dataTransfer?.files;
    handleFileSelect(files);
  }, [handleFileSelect]);

  const handleFileInputChange = (e) => {
    const files = e?.target?.files;
    if (files?.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev?.filter(f => f?.id !== fileId));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || uploadedFiles?.length > 0) {
      onSendMessage({
        content: message?.trim(),
        files: uploadedFiles,
        timestamp: new Date()?.toISOString()
      });
      setMessage('');
      setUploadedFiles([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
    }
  };

  const getModePrompt = () => {
    switch (currentMode) {
      case 'research':
        return 'Ask me anything about research, analysis, or data insights...';
      case 'coding':
        return 'Need help with code? Ask about programming, debugging, or development...';
      case 'creative':
        return 'Let\'s create something amazing together! Stories, poems, ideas...';
      default:
        return 'How can I help you today?';
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur-sm">
      {/* File Upload Area */}
      {uploadedFiles?.length > 0 && (
        <div className="px-6 py-3 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {uploadedFiles?.map((fileInfo) => (
              <div
                key={fileInfo?.id}
                className="flex items-center space-x-2 bg-card border border-border rounded-lg px-3 py-2 text-sm"
              >
                <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{fileInfo?.name}</span>
                <span className="text-muted-foreground">({fileInfo?.size})</span>
                <button
                  onClick={() => removeFile(fileInfo?.id)}
                  className="text-muted-foreground hover:text-destructive smooth-transition"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Input Area */}
      <div
        className={`p-6 ${isDragOver ? 'bg-primary/5 border-primary/20' : ''} smooth-transition`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <Icon name="Upload" size={48} className="text-primary mx-auto mb-2" />
              <p className="text-primary font-medium">Drop files here to upload</p>
              <p className="text-sm text-muted-foreground">PDF, TXT, DOCX, Images</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex justify-center">
          <div className="flex items-end space-x-3 w-full max-w-3xl mx-auto">
            {/* Text Input with embedded file upload icon */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => {
                  setMessage(e?.target?.value);
                  adjustTextareaHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder={getModePrompt()}
                disabled={disabled}
                rows={1}
                className="w-full resize-none bg-input border border-border rounded-2xl px-4 py-3 pr-16 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition min-h-[48px] max-h-[120px]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              />
              
              {/* File Upload Button - Inside input field */}
              <button
                type="button"
                onClick={() => fileInputRef?.current?.click()}
                disabled={disabled}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted"
                title="Upload file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </button>
              <style jsx>{`
                textarea::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={disabled || (!message?.trim() && uploadedFiles?.length === 0)}
              className="flex-shrink-0 w-10 h-10 glow-effect hover:shadow-glow-lg micro-interaction"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </form>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.txt,.docx,.jpg,.jpeg,.png,.gif,.webp"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Mode Indicator */}
        <div className="flex items-center justify-center mt-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>
              {currentMode === 'research' && 'Research Mode Active'}
              {currentMode === 'coding' && 'Coding Assistant Active'}
              {currentMode === 'creative' && 'Creative Studio Active'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;