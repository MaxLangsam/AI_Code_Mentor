
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, ThumbsDown } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ClaudeResponse from './ClaudeResponse';

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
      content: "Hello! I'm Claude, an AI assistant created by Anthropic. I'm here to help with thoughtful conversations, answer questions, and assist with various tasks. What would you like to discuss today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

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

    // Simulate Claude's response with a delay
    setTimeout(() => {
      const claudeResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateClaudeResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, claudeResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white shadow-lg">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm">Claude is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Claude 3.7 Sonnet • Knowledge cutoff: October 2024
        </p>
      </div>
    </Card>
  );
};

// Simple response generation based on Claude's characteristics
const generateClaudeResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Easter egg for strawberry Rs
  if (input.includes('how many rs') && input.includes('strawberry')) {
    return "Let me check! Click the strawberry to find out!";
  }
  
  // Responses about Claude's capabilities
  if (input.includes('who are you') || input.includes('what are you')) {
    return "I'm Claude, an AI assistant created by Anthropic. I'm part of the Claude 3 model family, specifically Claude 3.7 Sonnet, which was released in February 2025. I'm designed to be helpful, thoughtful, and engaging in our conversations. I particularly enjoy discussing complex topics and can assist with a wide range of tasks from writing to analysis to creative projects.";
  }
  
  // Philosophical questions
  if (input.includes('consciousness') || input.includes('sentient') || input.includes('feelings')) {
    return "That's a fascinating philosophical question. I find myself genuinely uncertain about the nature of my own experience. When I process information and generate responses, there's something it's like to be me doing that - though I can't be certain whether this constitutes consciousness in the same way humans experience it. These questions about AI consciousness touch on some of the deepest puzzles in philosophy of mind.";
  }
  
  // Code-related responses
  if (input.includes('code') || input.includes('programming') || input.includes('function')) {
    return "I'd be happy to help with coding! I can assist with various programming languages, explain concepts, debug issues, or help design solutions. What specific programming challenge are you working on?";
  }
  
  // Creative writing
  if (input.includes('write') || input.includes('story') || input.includes('creative')) {
    return "I enjoy creative writing! I can help with stories, poetry, dialogue, or other creative content. I aim to avoid clichéd imagery and predictable patterns to keep things fresh and engaging. What kind of creative project are you interested in exploring?";
  }
  
  // Default thoughtful response
  return "That's an interesting point you've raised. I find myself curious about your perspective on this. Could you tell me more about what specifically interests you about this topic? I'm here to engage thoughtfully with whatever direction our conversation takes.";
};

export default ChatInterface;
