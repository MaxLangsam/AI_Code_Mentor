
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsDown, User, Code } from 'lucide-react';
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
      description: "Thank you for your feedback! This helps improve the Python assistance quality.",
    });
  };

  // Function to render code blocks
  const renderContent = (content: string) => {
    // Split content by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // This is a code block
        const codeContent = part.slice(3, -3);
        const lines = codeContent.split('\n');
        const language = lines[0].trim();
        const code = lines.slice(1).join('\n');
        
        return (
          <div key={index} className="my-3">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {language && (
                <div className="text-xs text-gray-400 mb-2 uppercase">{language}</div>
              )}
              <pre className="whitespace-pre-wrap">{code}</pre>
            </div>
          </div>
        );
      } else {
        // Regular text
        return (
          <span key={index} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      }
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <Avatar className="w-8 h-8 mx-2">
          <AvatarFallback className={message.isUser ? 'bg-blue-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'}>
            {message.isUser ? <User className="w-4 h-4" /> : <Code className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>
        
        {/* Message content */}
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-lg ${
              message.isUser
                ? 'bg-blue-500 text-white rounded-br-sm shadow-lg'
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 rounded-bl-sm shadow-md border border-blue-100'
            }`}
          >
            <div className="text-sm leading-relaxed">
              {renderContent(message.content)}
            </div>
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
                className="h-6 w-6 p-0 text-blue-400 hover:text-blue-600"
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
