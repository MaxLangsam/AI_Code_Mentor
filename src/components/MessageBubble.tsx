
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsDown, User, Code, Sparkles } from 'lucide-react';
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
      title: "✨ Feedback Received",
      description: "Thank you! Your feedback helps PyMentor provide better Python assistance.",
    });
  };

  // Function to render code blocks and markdown
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
          <div key={index} className="my-4">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-5 rounded-xl font-mono text-sm overflow-x-auto shadow-lg border border-gray-700">
              {language && (
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
                  <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">{language}</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              )}
              <pre className="whitespace-pre-wrap text-gray-100">{code}</pre>
            </div>
          </div>
        );
      } else {
        // Regular text with markdown support
        const formattedText = part
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 text-purple-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
        
        return (
          <span 
            key={index} 
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      }
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}>
      <div className={`flex max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start`}>
        {/* Avatar */}
        <Avatar className="w-10 h-10 mx-3 shadow-md">
          <AvatarFallback className={
            message.isUser 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
              : 'bg-gradient-to-br from-emerald-500 to-blue-600 text-white'
          }>
            {message.isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </AvatarFallback>
        </Avatar>
        
        {/* Message content */}
        <div className="flex flex-col max-w-full">
          <div
            className={`px-5 py-4 rounded-2xl shadow-lg ${
              message.isUser
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md transform hover:scale-[1.02] transition-transform duration-200'
                : 'bg-white text-gray-800 rounded-bl-md border border-gray-100 hover:shadow-xl transition-shadow duration-200'
            }`}
          >
            <div className="text-sm leading-relaxed">
              {renderContent(message.content)}
            </div>
          </div>
          
          {/* Timestamp and feedback button */}
          <div className={`flex items-center mt-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-gray-400 mx-3 font-medium">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {!message.isUser && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFeedback}
                className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
