
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PROGRAMMING_LANGUAGES, ProgrammingLanguage } from '../types/languages';
import { Check } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: ProgrammingLanguage;
  onLanguageSelect: (language: ProgrammingLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageSelect
}) => {
  return (
    <Card className="p-6 mb-6 bg-white/95 backdrop-blur-lg shadow-lg border-0 ring-1 ring-white/20 rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Choose Your Programming Language
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {PROGRAMMING_LANGUAGES.map((language) => (
          <Button
            key={language.id}
            variant="outline"
            onClick={() => onLanguageSelect(language)}
            className={`relative h-auto p-4 border-2 transition-all duration-200 ${
              selectedLanguage.id === language.id
                ? `bg-gradient-to-br ${language.color} text-white border-transparent shadow-lg scale-105`
                : 'bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">{language.icon}</span>
              <span className="font-medium text-sm">{language.name}</span>
              {selectedLanguage.id === language.id && (
                <Check className="w-4 h-4 absolute top-2 right-2" />
              )}
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Selected: <span className="font-semibold">{selectedLanguage.name}</span> - {selectedLanguage.description}
        </p>
      </div>
    </Card>
  );
};

export default LanguageSelector;
