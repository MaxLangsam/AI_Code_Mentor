
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play } from 'lucide-react';
import { ProgrammingLanguage } from '../types/languages';

interface CodeEditorProps {
  code: string;
  selectedLanguage: ProgrammingLanguage;
  isExecuting: boolean;
  fontSize: string;
  onCodeChange: (code: string) => void;
  onExecute: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  selectedLanguage,
  isExecuting,
  fontSize,
  onCodeChange,
  onExecute,
}) => {
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Code Editor</h3>
        <Button
          onClick={onExecute}
          disabled={isExecuting}
          className={`px-4 py-2 bg-gradient-to-r ${selectedLanguage.color} hover:opacity-90 text-white shadow-lg rounded-lg flex items-center space-x-2`}
        >
          <Play className="w-4 h-4" />
          <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
        </Button>
      </div>
      <Textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        className={`flex-1 font-mono ${getFontSizeClass()} bg-gray-900 text-gray-100 border-gray-700 focus:border-blue-400 rounded-xl p-4 resize-none`}
        placeholder={`Write your ${selectedLanguage.name} code here...`}
        style={{ minHeight: '500px' }}
      />
    </div>
  );
};

export default CodeEditor;
