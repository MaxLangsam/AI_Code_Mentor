
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsDown, User, Bot } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
      title: "Feedback Noted",
      description: "Thank you for your feedback. While I can't learn from this conversation, your input helps Anthropic improve Claude.",
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <Avatar className="w-8 h-8 mx-2">
          <AvatarFallback className={message.isUser ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'}>
            {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>
        
        {/* Message content */}
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-lg ${
              message.isUser
                ? 'bg-blue-500 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
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
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
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
