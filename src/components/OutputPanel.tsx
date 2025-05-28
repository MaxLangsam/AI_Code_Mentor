
import React from 'react';

interface OutputPanelProps {
  output: string;
  isExecuting: boolean;
  fontSize: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  output,
  isExecuting,
  fontSize,
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
  );
};

export default OutputPanel;
