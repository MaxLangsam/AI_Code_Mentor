
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { ProgrammingLanguage, PROGRAMMING_LANGUAGES } from '../types/languages';
import PlaygroundHeader from './PlaygroundHeader';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import { getDefaultCode, getFileExtension } from '../utils/codeTemplates';
import { processUserCode } from '../utils/codeExecutor';

interface CodePlaygroundProps {
  onClose: () => void;
  initialLanguage?: ProgrammingLanguage;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ onClose, initialLanguage }) => {
  const { preferences } = useUserPreferences();
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
    initialLanguage || PROGRAMMING_LANGUAGES[0]
  );
  const [code, setCode] = useState(getDefaultCode(selectedLanguage.name));
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleLanguageChange = (languageName: string) => {
    const newLanguage = PROGRAMMING_LANGUAGES.find(lang => lang.name === languageName);
    if (newLanguage) {
      setSelectedLanguage(newLanguage);
      setCode(getDefaultCode(newLanguage.name));
      setOutput('');
      toast({
        title: `🔄 Language Changed`,
        description: `Switched to ${newLanguage.name}. Code template updated.`,
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
    setOutput('Executing code...\n');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const processedOutput = processUserCode(selectedLanguage.name, code);
      setOutput(processedOutput);
      
      toast({
        title: "🚀 Code Executed",
        description: "Code executed successfully in sandbox environment.",
      });
    } catch (error) {
      setOutput(`Error: ${error}\n`);
      toast({
        title: "❌ Execution Failed",
        description: "Failed to execute code. Please check syntax.",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "📋 Code Copied!",
        description: "Code copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "❌ Copy Failed",
        description: "Failed to copy code to clipboard.",
      });
    }
  };

  const handleDownloadCode = () => {
    const fileExtension = getFileExtension(selectedLanguage.name);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground-code.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "💾 Downloaded!",
      description: "Code file downloaded successfully.",
    });
  };

  const handleResetCode = () => {
    setCode(getDefaultCode(selectedLanguage.name));
    setOutput('');
    toast({
      title: "🔄 Code Reset",
      description: "Code has been reset to default template.",
    });
  };

  return (
    <Card className="max-w-6xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 dark:ring-gray-700/20 rounded-3xl overflow-hidden">
      <PlaygroundHeader
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onCopyCode={handleCopyCode}
        onDownloadCode={handleDownloadCode}
        onResetCode={handleResetCode}
        onClose={onClose}
      />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        <CodeEditor
          code={code}
          selectedLanguage={selectedLanguage}
          isExecuting={isExecuting}
          fontSize={preferences.fontSize}
          onCodeChange={setCode}
          onExecute={handleExecuteCode}
        />

        <OutputPanel
          output={output}
          isExecuting={isExecuting}
          fontSize={preferences.fontSize}
        />
      </div>
    </Card>
  );
};

export default CodePlayground;
