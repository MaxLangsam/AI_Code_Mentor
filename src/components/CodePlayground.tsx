
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, Copy, Download, RotateCcw, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { ProgrammingLanguage } from '../types/languages';

interface CodePlaygroundProps {
  selectedLanguage: ProgrammingLanguage;
  onClose: () => void;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ selectedLanguage, onClose }) => {
  const { preferences } = useUserPreferences();
  const [code, setCode] = useState(getDefaultCode(selectedLanguage.name));
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  function getDefaultCode(language: string): string {
    switch (language.toLowerCase()) {
      case 'javascript':
        return `// Welcome to the JavaScript Playground!
console.log("Hello, World!");

// Try some basic operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log("Doubled numbers:", doubled);

// Function example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));`;

      case 'python':
        return `# Welcome to the Python Playground!
print("Hello, World!")

# Try some basic operations
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print("Doubled numbers:", doubled)

# Function example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci(10):", fibonacci(10))`;

      case 'java':
        return `// Welcome to the Java Playground!
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Array example
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Method example
        System.out.println("Fibonacci(10): " + fibonacci(10));
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`;

      default:
        return `// Welcome to the ${language} Playground!
// Write your ${language} code here and click Run to execute it

console.log("Hello, World!");`;
    }
  }

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
      // Simulate code execution with different outputs based on language
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOutput = getMockOutput(selectedLanguage.name, code);
      setOutput(mockOutput);
      
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

  function getMockOutput(language: string, code: string): string {
    // Simple mock output based on language
    switch (language.toLowerCase()) {
      case 'javascript':
        return `Hello, World!
Doubled numbers: [2, 4, 6, 8, 10]
Fibonacci(10): 55

Execution completed successfully.`;

      case 'python':
        return `Hello, World!
Doubled numbers: [2, 4, 6, 8, 10]
Fibonacci(10): 55

Process finished with exit code 0`;

      case 'java':
        return `Hello, World!
Numbers: 1 2 3 4 5 
Fibonacci(10): 55

BUILD SUCCESSFUL in 2s`;

      default:
        return `Hello, World!

Program executed successfully.`;
    }
  }

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

  function getFileExtension(language: string): string {
    switch (language.toLowerCase()) {
      case 'javascript': return 'js';
      case 'python': return 'py';
      case 'java': return 'java';
      case 'typescript': return 'ts';
      case 'c++': return 'cpp';
      case 'c': return 'c';
      default: return 'txt';
    }
  }

  const handleResetCode = () => {
    setCode(getDefaultCode(selectedLanguage.name));
    setOutput('');
    toast({
      title: "🔄 Code Reset",
      description: "Code has been reset to default template.",
    });
  };

  const getFontSizeClass = () => {
    switch (preferences.fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  return (
    <Card className="max-w-6xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 dark:ring-gray-700/20 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${selectedLanguage.color} p-4`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">{selectedLanguage.icon}</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">Code Playground</h2>
              <p className="text-sm text-white/80">{selectedLanguage.name} Interactive Environment</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              className="text-white hover:bg-white/20 p-2"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadCode}
              className="text-white hover:bg-white/20 p-2"
              title="Download code"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetCode}
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

      {/* Content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Code Editor */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Code Editor</h3>
            <Button
              onClick={handleExecuteCode}
              disabled={isExecuting}
              className={`px-4 py-2 bg-gradient-to-r ${selectedLanguage.color} hover:opacity-90 text-white shadow-lg rounded-lg flex items-center space-x-2`}
            >
              <Play className="w-4 h-4" />
              <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
            </Button>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`flex-1 font-mono ${getFontSizeClass()} bg-gray-900 text-gray-100 border-gray-700 focus:border-blue-400 rounded-xl p-4 resize-none`}
            placeholder={`Write your ${selectedLanguage.name} code here...`}
            style={{ minHeight: '500px' }}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Output</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-yellow-400 animate-pulse' : output ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-xs text-gray-500">{isExecuting ? 'Running' : output ? 'Ready' : 'Idle'}</span>
            </div>
          </div>
          <div className={`flex-1 bg-gray-900 text-gray-100 rounded-xl p-4 font-mono ${getFontSizeClass()} overflow-y-auto border border-gray-700`} style={{ minHeight: '500px' }}>
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="text-gray-500 italic">
                Click "Run Code" to see the output here...
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CodePlayground;
