
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  codeTheme: 'github' | 'vscode' | 'monokai';
  responseLength: 'short' | 'medium' | 'detailed';
  showLineNumbers: boolean;
  enableCodeExecution: boolean;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  fontSize: 'medium',
  codeTheme: 'github',
  responseLength: 'medium',
  showLineNumbers: true,
  enableCodeExecution: true,
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('codementor-preferences');
    return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('codementor-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
