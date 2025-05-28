
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Copy, Download } from 'lucide-react';
import ConversationHistory from './ConversationHistory';
import SettingsModal from './SettingsModal';
import { ProgrammingLanguage } from '../types/languages';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatHeaderProps {
  selectedLanguage: ProgrammingLanguage;
  messages: Message[];
  showFileUpload: boolean;
  onToggleFileUpload: () => void;
  onCopyConversation: () => void;
  onExportConversation: () => void;
  onLoadConversation: (messages: Message[]) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedLanguage,
  messages,
  showFileUpload,
  onToggleFileUpload,
  onCopyConversation,
  onExportConversation,
  onLoadConversation,
}) => {
  return (
    <div className={`bg-gradient-to-r ${selectedLanguage.color} p-4`}>
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">{selectedLanguage.icon}</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">CodeMentor Enhanced</h2>
            <p className="text-sm text-white/80">{selectedLanguage.name} Programming Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFileUpload}
            className="text-white hover:bg-white/20 p-2"
            title="Upload file for review"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <ConversationHistory
            currentMessages={messages}
            currentLanguage={selectedLanguage.name}
            onLoadConversation={onLoadConversation}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopyConversation}
            className="text-white hover:bg-white/20 p-2"
            disabled={messages.length <= 1}
            title="Copy conversation"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExportConversation}
            className="text-white hover:bg-white/20 p-2"
            disabled={messages.length <= 1}
            title="Export conversation"
          >
            <Download className="w-4 h-4" />
          </Button>
          <SettingsModal />
          <div className="flex items-center space-x-2 ml-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Enhanced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
