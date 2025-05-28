
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

const SettingsModal: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { preferences, updatePreferences } = useUserPreferences();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Theme */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="theme" className="text-right">Theme</Label>
            <div className="col-span-3">
              <Button 
                variant="outline" 
                onClick={toggleTheme}
                className="w-full justify-start"
              >
                {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
              </Button>
            </div>
          </div>

          {/* Font Size */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fontSize" className="text-right">Font Size</Label>
            <div className="col-span-3">
              <Select 
                value={preferences.fontSize} 
                onValueChange={(value: 'small' | 'medium' | 'large') => 
                  updatePreferences({ fontSize: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Code Theme */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="codeTheme" className="text-right">Code Theme</Label>
            <div className="col-span-3">
              <Select 
                value={preferences.codeTheme} 
                onValueChange={(value: 'github' | 'vscode' | 'monokai') => 
                  updatePreferences({ codeTheme: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="vscode">VS Code</SelectItem>
                  <SelectItem value="monokai">Monokai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Response Length */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="responseLength" className="text-right">Response Length</Label>
            <div className="col-span-3">
              <Select 
                value={preferences.responseLength} 
                onValueChange={(value: 'short' | 'medium' | 'detailed') => 
                  updatePreferences({ responseLength: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Line Numbers */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lineNumbers" className="text-right">Line Numbers</Label>
            <div className="col-span-3">
              <Switch
                id="lineNumbers"
                checked={preferences.showLineNumbers}
                onCheckedChange={(checked) => updatePreferences({ showLineNumbers: checked })}
              />
            </div>
          </div>

          {/* Code Execution */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="codeExecution" className="text-right">Code Execution</Label>
            <div className="col-span-3">
              <Switch
                id="codeExecution"
                checked={preferences.enableCodeExecution}
                onCheckedChange={(checked) => updatePreferences({ enableCodeExecution: checked })}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
