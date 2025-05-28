
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Download, RotateCcw, X, Code2 } from 'lucide-react';
import { ProgrammingLanguage, PROGRAMMING_LANGUAGES } from '../types/languages';

interface PlaygroundHeaderProps {
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (languageName: string) => void;
  onCopyCode: () => void;
  onDownloadCode: () => void;
  onResetCode: () => void;
  onClose: () => void;
}

const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  onCopyCode,
  onDownloadCode,
  onResetCode,
  onClose,
}) => {
  return (
    <div className={`bg-gradient-to-r ${selectedLanguage.color} p-4`}>
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Code Playground</h2>
            <p className="text-sm text-white/80">Interactive Multi-Language Environment</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedLanguage.name} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white focus:ring-white/50">
              <div className="flex items-center space-x-2">
                <span>{selectedLanguage.icon}</span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {PROGRAMMING_LANGUAGES.map((lang) => (
                <SelectItem key={lang.name} value={lang.name}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopyCode}
              className="text-white hover:bg-white/20 p-2"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownloadCode}
              className="text-white hover:bg-white/20 p-2"
              title="Download code"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetCode}
              className="text-white hover:bg-white/20 p-2"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2"
              title="Close playground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundHeader;
