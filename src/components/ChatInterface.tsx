
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Code } from 'lucide-react';
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
      content: "Hello! I'm your Python programming assistant, powered by OpenAI's GPT-3.5. I'm here to help you with:\n\n• Writing clean, PEP8-compliant Python code\n• Debugging and fixing errors\n• Code optimization and best practices\n• Explaining Python concepts and syntax\n• Library recommendations and usage\n\nWhat Python challenge can I help you with today?",
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
      title: "Python Assistant Ready",
      description: "I'm ready to help with your Python coding needs!",
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
        content: "I apologize, but I'm having trouble generating a response right now. Please try again.",
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
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white/90 backdrop-blur-sm shadow-xl border-0 ring-1 ring-blue-100">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-3 text-blue-600">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm font-medium">Analyzing your Python question...</span>
            <Code className="w-4 h-4 animate-pulse" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-blue-100 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="flex space-x-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Python code, debugging, or best practices..."
            className="flex-1 border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-white/80"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Python Code Assistant • Powered by OpenAI GPT-3.5 • PEP8 Best Practices
        </p>
      </div>
    </Card>
  );
};

export default ChatInterface;
