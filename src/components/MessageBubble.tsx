
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsDown, User, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const handleFeedback = () => {
    toast({
      title: "Feedback Received",
      description: "Thank you for your feedback! While I can't learn from this specific conversation, your input helps improve future AI systems.",
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <Avatar className="w-8 h-8 mx-2">
          <AvatarFallback className={message.isUser ? 'bg-blue-500 text-white' : 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'}>
            {message.isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>
        
        {/* Message content */}
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-lg ${
              message.isUser
                ? 'bg-blue-500 text-white rounded-br-sm shadow-lg'
                : 'bg-gradient-to-br from-violet-50 to-purple-50 text-gray-800 rounded-bl-sm shadow-md border border-violet-100'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          
          {/* Timestamp and feedback button */}
          <div className={`flex items-center mt-1 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-gray-500 mx-2">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {!message.isUser && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFeedback}
                className="h-6 w-6 p-0 text-violet-400 hover:text-violet-600"
              >
                <ThumbsDown className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
