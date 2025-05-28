
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Terminal, Activity, CheckCircle, Clock } from 'lucide-react';

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

  const getStatusIcon = () => {
    if (isExecuting) return <Activity className="w-4 h-4 text-amber-500 animate-pulse" />;
    if (output) return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    return <Clock className="w-4 h-4 text-slate-400" />;
  };

  const getStatusText = () => {
    if (isExecuting) return 'Executing...';
    if (output) return 'Complete';
    return 'Ready';
  };

  const getStatusColor = () => {
    if (isExecuting) return 'text-amber-600 bg-amber-50 border-amber-200';
    if (output) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    return 'text-slate-500 bg-slate-50 border-slate-200';
  };

  return (
    <Card className="h-full flex flex-col border-slate-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold text-slate-800 text-lg">Output Console</h3>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            <span>{getStatusText()}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <div className={`h-full bg-slate-900 text-slate-100 font-mono ${getFontSizeClass()} overflow-y-auto border-t border-slate-200`} style={{ minHeight: '400px' }}>
          <div className="p-6">
            {output ? (
              <pre className="whitespace-pre-wrap leading-relaxed">{output}</pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <Terminal className="w-12 h-12 text-slate-600" />
                <div className="text-slate-400">
                  <p className="text-lg font-medium mb-1">Ready for execution</p>
                  <p className="text-sm">Click "Run Code" to see the output here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputPanel;
