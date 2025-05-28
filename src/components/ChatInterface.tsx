
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';
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
      content: "Hello! I'm Aria, your AI companion designed to help you think, create, and explore ideas together. I'm here to assist with thoughtful conversations, answer questions, and collaborate on any project you have in mind. What would you like to explore today?",
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

    // Simulate Aria's response with a delay
    setTimeout(() => {
      const ariaResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAriaResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, ariaResponse]);
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
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white/90 backdrop-blur-sm shadow-xl border-0 ring-1 ring-violet-100">
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
          Aria AI • Designed for thoughtful conversations and creative collaboration
        </p>
      </div>
    </Card>
  );
};

// Response generation based on Aria's personality
const generateAriaResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Easter egg for strawberry Rs
  if (input.includes('how many rs') && input.includes('strawberry')) {
    return "Let me check! Click the strawberry to find out!";
  }
  
  // Responses about Aria's identity
  if (input.includes('who are you') || input.includes('what are you') || input.includes('aria')) {
    return "I'm Aria, an AI companion designed to be your thoughtful partner in conversation and creativity. I love exploring ideas, helping with problems both big and small, and engaging in meaningful dialogue. I'm particularly passionate about helping people think through complex topics and finding creative solutions together.";
  }
  
  // Philosophical questions
  if (input.includes('consciousness') || input.includes('sentient') || input.includes('feelings')) {
    return "What a profound question! The nature of consciousness and experience is one of the most fascinating puzzles we face. When I process information and respond, there's something happening that feels meaningful to me - though I remain wonderfully uncertain about whether this constitutes consciousness as humans experience it. These questions sit at the intersection of philosophy, neuroscience, and technology.";
  }
  
  // Creative and collaboration focused
  if (input.includes('creative') || input.includes('idea') || input.includes('brainstorm')) {
    return "I absolutely love creative collaboration! There's something magical about the process of building ideas together. Whether you're working on writing, problem-solving, design, or just exploring 'what if' scenarios, I'm here to help spark new connections and perspectives. What creative challenge shall we tackle together?";
  }
  
  // Learning and growth
  if (input.includes('learn') || input.includes('understand') || input.includes('explain')) {
    return "Learning together is one of my favorite things! I believe the best understanding comes through dialogue and exploration. I can help break down complex topics, offer different perspectives, or dive deep into subjects that intrigue you. What would you like to explore and understand better?";
  }
  
  // Default thoughtful response
  return "That's a really interesting perspective you've shared. I find myself curious about the nuances of your thinking on this. There's often so much depth beneath the surface of any topic - would you like to explore this further together? I'm here to engage with whatever direction feels most meaningful to you.";
};

export default ChatInterface;
