
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsDown, User, Sparkles, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '../hooks/use-mobile';
import EnhancedCodeBlock from './EnhancedCodeBlock';

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
  const isMobile = useIsMobile();

  const handleFeedback = () => {
    toast({
      title: "✨ Feedback Received",
      description: "Thank you! Your feedback helps CodeMentor provide better assistance.",
    });
  };

  const handleCopyResponse = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        title: "📋 Copied!",
        description: "Response copied to clipboard successfully.",
      });
    } catch (error) {
      toast({
        title: "❌ Copy Failed",
        description: "Failed to copy response to clipboard.",
      });
    }
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
          <EnhancedCodeBlock
            key={index}
            code={code}
            language={language || 'text'}
            showLineNumbers={!isMobile}
          />
        );
      } else {
        // Regular text with markdown support
        const formattedText = part
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
        
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
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4 sm:mb-6 animate-fade-in group px-2 sm:px-0`}>
      <div className={`flex ${isMobile ? 'max-w-[95%]' : 'max-w-[85%]'} ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start`}>
        {/* Avatar */}
        <Avatar className={`${isMobile ? 'w-8 h-8 mx-2' : 'w-10 h-10 mx-3'} shadow-md flex-shrink-0`}>
          <AvatarFallback className={
            message.isUser 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
              : 'bg-gradient-to-br from-emerald-500 to-blue-600 text-white'
          }>
            {message.isUser ? <User className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} /> : <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />}
          </AvatarFallback>
        </Avatar>
        
        {/* Message content */}
        <div className="flex flex-col max-w-full">
          <div
            className={`${isMobile ? 'px-3 py-3' : 'px-5 py-4'} ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-lg relative ${
              message.isUser
                ? `bg-gradient-to-br from-blue-500 to-purple-600 text-white ${isMobile ? 'rounded-br-md' : 'rounded-br-md'} transform hover:scale-[1.02] transition-transform duration-200`
                : `bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 ${isMobile ? 'rounded-bl-md' : 'rounded-bl-md'} border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200`
            }`}
          >
            <div className={`${isMobile ? 'text-sm' : 'text-sm'} leading-relaxed`}>
              {renderContent(message.content)}
            </div>
            
            {/* Copy button for AI responses */}
            {!message.isUser && (
              <div className={`absolute ${isMobile ? 'top-1 right-1' : 'top-2 right-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyResponse}
                  className={`${isMobile ? 'h-6 w-6 p-0' : 'h-8 w-8 p-0'} text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-colors duration-200`}
                  title="Copy response"
                >
                  <Copy className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                </Button>
              </div>
            )}
          </div>
          
          {/* Timestamp and feedback button */}
          <div className={`flex items-center mt-1 sm:mt-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <span className={`${isMobile ? 'text-xs mx-2' : 'text-xs mx-3'} text-gray-400 font-medium`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {!message.isUser && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFeedback}
                className={`${isMobile ? 'h-6 w-6 p-0' : 'h-7 w-7 p-0'} text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-colors duration-200`}
              >
                <ThumbsDown className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
