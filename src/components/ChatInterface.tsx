
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Code } from 'lucide-react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import FileUpload from './FileUpload';
import CodePlayground from './CodePlayground';
import { useMultiLanguageAI } from '../hooks/useMultiLanguageAI';
import { ProgrammingLanguage } from '../types/languages';
import { toast } from '@/hooks/use-toast';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [currentView, setCurrentView] = useState<'chat' | 'playground'>('chat');
  const { preferences } = useUserPreferences();
  
  const { generateResponse, isLoading: modelLoading, isModelReady } = useMultiLanguageAI();

  // Update welcome message when language changes
  useEffect(() => {
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
🔀 **Switch between chat and playground** - your conversations are always saved!

What ${selectedLanguage.name} challenge would you like to tackle today? Whether you're a beginner or an expert, I'm ready to help! ✨`,
      isUser: false,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  }, [selectedLanguage]);

  // Show ready toast when language changes
  useEffect(() => {
    toast({
      title: `${selectedLanguage.icon} CodeMentor Enhanced!`,
      description: `Your ${selectedLanguage.name} programming companion is ready with new features!`,
    });
  }, [selectedLanguage]);

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
      // Generate AI response using the selected language and preferences
      const enhancedPrompt = `${inputValue}\n\nResponse preferences: ${preferences.responseLength} length, ${preferences.codeTheme} code style.`;
      const aiResponse = await generateResponse(enhancedPrompt, selectedLanguage);
      
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

  const handleViewSwitch = (view: 'chat' | 'playground') => {
    setCurrentView(view);
    toast({
      title: view === 'chat' ? "💬 Chat Mode" : "⚡ Playground Mode",
      description: `Switched to ${view} - your conversations are preserved!`,
    });
  };

  return (
    <div className="space-y-4">
      {/* File Upload Area */}
      {showFileUpload && currentView === 'chat' && (
        <Card className="p-4">
          <FileUpload onFileContent={handleFileContent} />
        </Card>
      )}

      {/* View Toggle */}
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
            onTogglePlayground={() => handleViewSwitch('playground')}
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
          selectedLanguage={selectedLanguage} 
          onClose={() => handleViewSwitch('chat')} 
        />
      )}
    </div>
  );
};

export default ChatInterface;
