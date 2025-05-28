
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { ProgrammingLanguage } from '../types/languages';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

interface ChatInputProps {
  inputValue: string;
  isTyping: boolean;
  selectedLanguage: ProgrammingLanguage;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  isTyping,
  selectedLanguage,
  onInputChange,
  onSendMessage,
  onKeyPress,
}) => {
  const { preferences } = useUserPreferences();

  return (
    <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder={`Ask me anything about ${selectedLanguage.name} - code, debugging, concepts... (Shift+Enter for new line)`}
            className={`resize-none border-2 border-gray-200 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-400/20 bg-white dark:bg-gray-800 rounded-2xl py-3 px-4 shadow-sm min-h-[50px] max-h-[120px] ${
              preferences.fontSize === 'small' ? 'text-sm' : 
              preferences.fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}
            disabled={isTyping}
            rows={1}
          />
          <div className="absolute right-3 top-3">
            <span className="text-gray-400 text-xs">⌘↵ Send • ⇧↵ New line</span>
          </div>
        </div>
        <Button 
          onClick={onSendMessage} 
          disabled={!inputValue.trim() || isTyping}
          className={`px-6 py-3 bg-gradient-to-r ${selectedLanguage.color} hover:opacity-90 text-white shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none self-end`}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
        CodeMentor Enhanced • AI Multi-Language Programming Assistant • Powered by OpenAI
      </p>
    </div>
  );
};

export default ChatInput;
