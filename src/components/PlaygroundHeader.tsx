
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Download, RotateCcw, X, Code2, Sparkles } from 'lucide-react';
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
    <div className={`bg-gradient-to-r ${selectedLanguage.color} p-6 relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-12 -translate-x-12"></div>
      
      <div className="relative flex items-center justify-between text-white">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
            <Code2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="font-bold text-2xl">Code Playground</h2>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <p className="text-lg text-white/90 font-medium">Interactive Multi-Language Environment</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedLanguage.name} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-48 bg-white/20 backdrop-blur-sm border-white/30 text-white focus:ring-white/50 hover:bg-white/25 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{selectedLanguage.icon}</span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 shadow-xl">
              {PROGRAMMING_LANGUAGES.map((lang) => (
                <SelectItem key={lang.name} value={lang.name} className="hover:bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.icon}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopyCode}
              className="text-white hover:bg-white/20 p-2.5 h-auto rounded-lg transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownloadCode}
              className="text-white hover:bg-white/20 p-2.5 h-auto rounded-lg transition-colors"
              title="Download code"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetCode}
              className="text-white hover:bg-white/20 p-2.5 h-auto rounded-lg transition-colors"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-white/30 mx-1"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2.5 h-auto rounded-lg transition-colors"
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
