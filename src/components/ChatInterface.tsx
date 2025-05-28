
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import FileUpload from './FileUpload';
import CodePlayground from './CodePlayground';
import ChatViewToggle from './ChatViewToggle';
import { useMessageManagement } from '../hooks/useMessageManagement';
import { useChatUtilities } from './ChatUtilities';
import { ProgrammingLanguage } from '../types/languages';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedLanguage: ProgrammingLanguage;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedLanguage }) => {
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [currentView, setCurrentView] = useState<'chat' | 'playground'>('chat');

  const {
    messages,
    setMessages,
    inputValue,
    setInputValue,
    isTyping,
    handleSendMessage,
    handleKeyPress
  } = useMessageManagement(selectedLanguage);

  const {
    handleFileContent,
    copyConversation,
    exportConversation
  } = useChatUtilities({
    messages,
    selectedLanguage,
    setInputValue,
    setShowFileUpload
  });

  return (
    <div className="space-y-4">
      {/* File Upload Area */}
      {showFileUpload && currentView === 'chat' && (
        <Card className="p-4">
          <FileUpload onFileContent={handleFileContent} />
        </Card>
      )}

      {/* View Toggle */}
      <ChatViewToggle 
        currentView={currentView} 
        onViewSwitch={setCurrentView} 
      />

      {/* Content based on current view */}
      {currentView === 'chat' ? (
        <Card className="max-w-5xl mx-auto h-[650px] flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 dark:ring-gray-700/20 rounded-3xl overflow-hidden">
          <ChatHeader
            selectedLanguage={selectedLanguage}
            messages={messages}
            showFileUpload={showFileUpload}
            onToggleFileUpload={() => setShowFileUpload(!showFileUpload)}
            onCopyConversation={copyConversation}
            onExportConversation={exportConversation}
            onLoadConversation={setMessages}
            onTogglePlayground={() => setCurrentView('playground')}
          />

          <ChatMessages messages={messages} isTyping={isTyping} />

          <ChatInput
            inputValue={inputValue}
            isTyping={isTyping}
            selectedLanguage={selectedLanguage}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
          />
        </Card>
      ) : (
        <CodePlayground 
          initialLanguage={selectedLanguage}
          onClose={() => setCurrentView('chat')} 
        />
      )}
    </div>
  );
};

export default ChatInterface;
