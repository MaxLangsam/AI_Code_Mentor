
import React from 'react';

interface ClaudeResponseProps {
  content: string;
  onFeedback?: () => void;
}

const ClaudeResponse: React.FC<ClaudeResponseProps> = ({ content, onFeedback }) => {
  // Handle code blocks in responses
  const renderContent = (text: string) => {
    // Simple markdown code block detection
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={lastIndex} className="whitespace-pre-wrap">
            {text.slice(lastIndex, match.index)}
          </span>
        );
      }

      // Add code block
      const language = match[1] || 'text';
      const code = match[2];
      parts.push(
        <div key={match.index} className="my-4">
          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-xs text-gray-400 mb-2">{language}</div>
            <pre>{code}</pre>
          </div>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={lastIndex} className="whitespace-pre-wrap">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : <span className="whitespace-pre-wrap">{text}</span>;
  };

  return (
    <div className="prose prose-sm max-w-none">
      {renderContent(content)}
    </div>
  );
};

export default ClaudeResponse;
