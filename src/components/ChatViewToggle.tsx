
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Code } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatViewToggleProps {
  currentView: 'chat' | 'playground';
  onViewSwitch: (view: 'chat' | 'playground') => void;
}

const ChatViewToggle: React.FC<ChatViewToggleProps> = ({ currentView, onViewSwitch }) => {
  const handleViewSwitch = (view: 'chat' | 'playground') => {
    onViewSwitch(view);
    toast({
      title: view === 'chat' ? "💬 Chat Mode" : "⚡ Playground Mode",
      description: view === 'chat' 
        ? "Switched to chat - your conversations are preserved!" 
        : "Switched to playground - select any language independently!",
    });
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 border shadow-lg">
        <Button
          variant={currentView === 'chat' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleViewSwitch('chat')}
          className="rounded-full px-6 py-2 flex items-center space-x-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat</span>
        </Button>
        <Button
          variant={currentView === 'playground' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleViewSwitch('playground')}
          className="rounded-full px-6 py-2 flex items-center space-x-2"
        >
          <Code className="w-4 h-4" />
          <span>Playground</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatViewToggle;
