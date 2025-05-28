
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Sparkles, Download } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ClaudeResponse from './ClaudeResponse';
import { useTinyLlama } from '../hooks/useTinyLlama';
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
      content: "Hello! I'm Aria, your AI companion powered by TinyLlama. I'm designed to help you think, create, and explore ideas together. I'm here to assist with thoughtful conversations, answer questions, and collaborate on any project you have in mind. What would you like to explore today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { generateResponse, initializeModel, isLoading: modelLoading, isModelReady } = useTinyLlama();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize the model when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        await initializeModel();
        toast({
          title: "AI Model Ready",
          description: "TinyLlama has been loaded and is ready to chat!",
        });
      } catch (error) {
        toast({
          title: "Model Loading Error",
          description: "There was an issue loading the AI model. Responses may be limited.",
          variant: "destructive",
        });
      }
    };

    loadModel();
  }, [initializeModel]);

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
      // Generate AI response using TinyLlama
      const aiResponse = await generateResponse(inputValue);
      
      const ariaResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, ariaResponse]);
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

  const handleLoadModel = () => {
    initializeModel();
  };

  return (
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white/90 backdrop-blur-sm shadow-xl border-0 ring-1 ring-violet-100">
      {/* Model status header */}
      {!isModelReady && (
        <div className="p-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${modelLoading ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="text-sm text-gray-600">
                {modelLoading ? 'Loading TinyLlama model...' : 'AI model not loaded'}
              </span>
            </div>
            {!modelLoading && (
              <Button
                onClick={handleLoadModel}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                Load Model
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-3 text-violet-600">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm font-medium">Aria is thinking...</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-violet-100 p-4 bg-gradient-to-r from-violet-50/50 to-purple-50/50">
        <div className="flex space-x-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your thoughts with Aria..."
            className="flex-1 border-violet-200 focus:border-violet-400 focus:ring-violet-400 bg-white/80"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Aria AI • Powered by TinyLlama • {isModelReady ? 'Model Ready' : 'Loading...'}
        </p>
      </div>
    </Card>
  );
};

export default ChatInterface;
