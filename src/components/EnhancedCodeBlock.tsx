
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Play, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

interface EnhancedCodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

const EnhancedCodeBlock: React.FC<EnhancedCodeBlockProps> = ({ 
  code, 
  language, 
  showLineNumbers = true 
}) => {
  const { preferences } = useUserPreferences();
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "📋 Code Copied!",
        description: "Code snippet copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "❌ Copy Failed",
        description: "Failed to copy code to clipboard.",
      });
    }
  };

  const handleExecuteCode = async () => {
    if (!preferences.enableCodeExecution) {
      toast({
        title: "Code Execution Disabled",
        description: "Enable code execution in settings to run code.",
      });
      return;
    }

    setIsExecuting(true);
    try {
      // Simulate code execution for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "🚀 Code Executed",
        description: "Code executed successfully in sandbox environment.",
      });
    } catch (error) {
      toast({
        title: "❌ Execution Failed",
        description: "Failed to execute code. Please check syntax.",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-snippet.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "💾 Downloaded!",
      description: "Code snippet downloaded successfully.",
    });
  };

  const getThemeClasses = () => {
    switch (preferences.codeTheme) {
      case 'vscode':
        return 'bg-gray-900 text-gray-100';
      case 'monokai':
        return 'bg-gray-800 text-green-300';
      default:
        return 'bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100';
    }
  };

  const getFontSizeClass = () => {
    switch (preferences.fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  const lines = code.split('\n');

  return (
    <div className="my-4">
      <div className={`${getThemeClasses()} p-5 rounded-xl font-mono ${getFontSizeClass()} overflow-x-auto shadow-lg border border-gray-700`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
          <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">{language}</div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex space-x-1 ml-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="h-6 w-6 p-0 text-gray-400 hover:text-blue-400"
                title="Copy code"
              >
                <Copy className="w-3 h-3" />
              </Button>
              {language === 'javascript' || language === 'python' ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExecuteCode}
                  disabled={isExecuting}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-green-400"
                  title="Execute code"
                >
                  <Play className="w-3 h-3" />
                </Button>
              ) : null}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadCode}
                className="h-6 w-6 p-0 text-gray-400 hover:text-purple-400"
                title="Download code"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Code content */}
        <div className="relative">
          {showLineNumbers && preferences.showLineNumbers ? (
            <div className="flex">
              <div className="select-none text-gray-500 text-right pr-4 min-w-[3rem]">
                {lines.map((_, index) => (
                  <div key={index} className="leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
              <pre className="whitespace-pre-wrap text-gray-100 flex-1 leading-6">{code}</pre>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap text-gray-100 leading-6">{code}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedCodeBlock;
