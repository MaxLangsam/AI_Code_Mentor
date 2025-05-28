
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { useOpenAI } from '../hooks/useOpenAI';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hello! I'm **PyMentor**, your dedicated Python programming companion powered by advanced AI.\n\nI'm here to help you excel at Python with:\n\n🐍 **Clean, PEP8-compliant code writing**\n🔧 **Smart debugging and error fixing**\n⚡ **Performance optimization tips**\n📚 **Clear explanations of Python concepts**\n📦 **Library recommendations and best practices**\n\nWhat Python challenge would you like to tackle today? Whether you're a beginner or an expert, I'm ready to help! ✨",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { generateResponse, isLoading: modelLoading, isModelReady } = useOpenAI();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show ready toast when component mounts
  useEffect(() => {
    toast({
      title: "🐍 PyMentor Ready!",
      description: "Your Python programming companion is ready to help you code!",
    });
  }, []);

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
      // Generate AI response using OpenAI
      const aiResponse = await generateResponse(inputValue);
      
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
        content: "I apologize, but I'm having trouble generating a response right now. Please try again, and I'll do my best to help you with your Python question! 🔄",
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

  return (
    <Card className="max-w-5xl mx-auto h-[650px] flex flex-col bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🐍</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">PyMentor</h2>
              <p className="text-sm text-white/80">Python Programming Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
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
            <span className="text-sm font-medium">PyMentor is thinking...</span>
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200/50 p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Python - code, debugging, concepts..."
              className="pr-12 border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white rounded-2xl text-base py-3 px-4 shadow-sm"
              disabled={isTyping}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">⌘↵</span>
            </div>
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          PyMentor • AI Python Programming Assistant • Powered by OpenAI
        </p>
      </div>
    </Card>
  );
};

export default ChatInterface;
