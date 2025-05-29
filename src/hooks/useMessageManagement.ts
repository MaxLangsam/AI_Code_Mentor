
import { useState, useEffect } from 'react';
import { ProgrammingLanguage } from '../types/languages';
import { useSecureAI } from './useSecureAI';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useMessageManagement = (selectedLanguage: ProgrammingLanguage) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { preferences } = useUserPreferences();
  const { generateResponse } = useSecureAI();

  // Initialize with welcome message only once
  useEffect(() => {
    if (!hasInitialized) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: `👋 Hello! I'm **CodeMentor**, your AI programming companion specialized in **${selectedLanguage.name}**.

I'm here to help you excel at ${selectedLanguage.name} programming with:

${selectedLanguage.icon} **Clean, well-structured code writing**
🔧 **Smart debugging and error fixing**
⚡ **Performance optimization tips**
📚 **Clear explanations of ${selectedLanguage.name} concepts**
📦 **Library recommendations and best practices**
🎯 **Language-specific guidance and patterns**

**New Features Available:**
✨ **Enhanced code blocks** with syntax highlighting and execution
📁 **File upload** for code review (drag & drop or click upload button)
💾 **Conversation history** to save and reload sessions
⚙️ **Customizable settings** for themes, fonts, and preferences
🔄 **Code execution** for JavaScript and Python (enable in settings)
🔀 **Independent code playground** - switch languages freely in playground mode!
🔒 **Secure AI processing** - all requests are now handled securely through encrypted channels

What ${selectedLanguage.name} challenge would you like to tackle today? Whether you're a beginner or an expert, I'm ready to help! ✨`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages([welcomeMessage]);
      setHasInitialized(true);
    }
  }, [selectedLanguage, hasInitialized]);

  // Show ready toast when language changes (but don't reset messages)
  useEffect(() => {
    if (hasInitialized) {
      toast({
        title: `${selectedLanguage.icon} Language Switched!`,
        description: `Now optimized for ${selectedLanguage.name} programming. Your chat history is preserved!`,
      });
    }
  }, [selectedLanguage, hasInitialized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Generate AI response using the secure service
      const aiResponse = await generateResponse(inputValue, selectedLanguage, preferences);
      
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I apologize, but I'm having trouble generating a ${selectedLanguage.name} response right now. Please try again, and I'll do my best to help you! 🔄`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    setMessages,
    inputValue,
    setInputValue,
    isTyping,
    handleSendMessage,
    handleKeyPress
  };
};
