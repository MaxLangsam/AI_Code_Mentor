
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, Sparkles, Copy, Download, Upload } from 'lucide-react';
import MessageBubble from './MessageBubble';
import FileUpload from './FileUpload';
import ConversationHistory from './ConversationHistory';
import SettingsModal from './SettingsModal';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

What ${selectedLanguage.name} challenge would you like to tackle today? Whether you're a beginner or an expert, I'm ready to help! ✨`,
      isUser: false,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  }, [selectedLanguage]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  return (
    <div className="space-y-4">
      {/* File Upload Area */}
      {showFileUpload && (
        <Card className="p-4">
          <FileUpload onFileContent={handleFileContent} />
        </Card>
      )}

      <Card className="max-w-5xl mx-auto h-[650px] flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 dark:ring-gray-700/20 rounded-3xl overflow-hidden">
        {/* Header */}
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
                onClick={() => setShowFileUpload(!showFileUpload)}
                className="text-white hover:bg-white/20 p-2"
                title="Upload file for review"
              >
                <Upload className="w-4 h-4" />
              </Button>
              <ConversationHistory
                currentMessages={messages}
                currentLanguage={selectedLanguage.name}
                onLoadConversation={setMessages}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={copyConversation}
                className="text-white hover:bg-white/20 p-2"
                disabled={messages.length <= 1}
                title="Copy conversation"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={exportConversation}
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

        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-3 text-blue-600 animate-fade-in">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm font-medium">CodeMentor is thinking...</span>
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
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
              onClick={handleSendMessage} 
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
      </Card>
    </div>
  );
};

export default ChatInterface;
