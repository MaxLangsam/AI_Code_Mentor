
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { ProgrammingLanguage } from '../types/languages';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatUtilitiesProps {
  messages: Message[];
  selectedLanguage: ProgrammingLanguage;
  setInputValue: (value: string) => void;
  setShowFileUpload: (show: boolean) => void;
}

export const useChatUtilities = ({ messages, selectedLanguage, setInputValue, setShowFileUpload }: ChatUtilitiesProps) => {
  const handleFileContent = (content: string, filename: string) => {
    const fileMessage = `Please review this code from ${filename}:\n\n\`\`\`${selectedLanguage.name.toLowerCase()}\n${content}\n\`\`\`\n\nPlease analyze this code and provide feedback on:\n- Code quality and structure\n- Potential bugs or issues\n- Performance optimizations\n- Best practice recommendations`;
    setInputValue(fileMessage);
    setShowFileUpload(false);
  };

  const copyConversation = async () => {
    const conversationText = messages
      .filter(msg => msg.id !== 'welcome')
      .map(msg => `${msg.isUser ? 'You' : 'CodeMentor'}: ${msg.content}`)
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(conversationText);
      toast({
        title: "📋 Copied!",
        description: "Conversation copied to clipboard successfully.",
      });
    } catch (error) {
      toast({
        title: "❌ Copy Failed",
        description: "Failed to copy conversation to clipboard.",
      });
    }
  };

  const exportConversation = () => {
    const conversationText = messages
      .filter(msg => msg.id !== 'welcome')
      .map(msg => `${msg.isUser ? 'You' : 'CodeMentor'} (${msg.timestamp.toLocaleString()}): ${msg.content}`)
      .join('\n\n');

    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codementor-conversation-${selectedLanguage.name.toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "💾 Exported!",
      description: "Conversation exported successfully.",
    });
  };

  return {
    handleFileContent,
    copyConversation,
    exportConversation
  };
};
