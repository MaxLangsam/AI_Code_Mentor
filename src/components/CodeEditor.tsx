
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Play, Code2, Loader2 } from 'lucide-react';
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
    <Card className="h-full flex flex-col border-slate-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${selectedLanguage.color} rounded-xl flex items-center justify-center shadow-md`}>
              <span className="text-white text-lg font-bold">{selectedLanguage.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg flex items-center space-x-2">
                <Code2 className="w-5 h-5" />
                <span>Code Editor</span>
              </h3>
              <p className="text-sm text-slate-500">{selectedLanguage.name}</p>
            </div>
          </div>
          
          <Button
            onClick={onExecute}
            disabled={isExecuting}
            className={`px-6 py-2.5 bg-gradient-to-r ${selectedLanguage.color} hover:opacity-90 text-white shadow-lg rounded-xl flex items-center space-x-2 font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-60`}
          >
            {isExecuting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isExecuting ? 'Executing...' : 'Run Code'}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className={`h-full font-mono ${getFontSizeClass()} bg-slate-900 text-slate-100 border-0 border-t border-slate-200 focus:border-slate-200 rounded-none rounded-b-lg p-6 resize-none leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0`}
          placeholder={`Write your ${selectedLanguage.name} code here...`}
          style={{ minHeight: '400px' }}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
