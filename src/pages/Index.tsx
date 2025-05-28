
import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import LanguageSelector from '../components/LanguageSelector';
import { PROGRAMMING_LANGUAGES, ProgrammingLanguage } from '../types/languages';
import { useTheme } from '../contexts/ThemeContext';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
    PROGRAMMING_LANGUAGES[0] // Default to Python
  );
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100'
    } relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30'
            : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-emerald-900/30 to-blue-900/30'
            : 'bg-gradient-to-br from-emerald-400/20 to-blue-400/20'
        }`}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className={`w-20 h-20 bg-gradient-to-br ${selectedLanguage.color} rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-300`}>
                <span className="text-3xl font-bold text-white">{selectedLanguage.icon}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <h1 className={`text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight ${
            theme === 'dark' ? 'drop-shadow-lg' : ''
          }`}>
            CodeMentor Enhanced
          </h1>
          
          <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-emerald-900/50 to-blue-900/50 backdrop-blur-sm border border-gray-700'
              : 'bg-gradient-to-r from-emerald-100 to-blue-100'
          }`}>
            <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Your Advanced AI Multi-Language Programming Companion
            </p>
          </div>
          
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Master multiple programming languages with an expert AI mentor featuring enhanced code execution, 
            file upload capabilities, conversation history, customizable themes, and advanced debugging tools.
          </p>
          
          <div className="flex items-center justify-center flex-wrap gap-6 text-sm">
            <div className={`flex items-center px-4 py-2 rounded-full shadow-md ${
              theme === 'dark' 
                ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm'
            }`}>
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>AI Powered</span>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-full shadow-md ${
              theme === 'dark' 
                ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm'
            }`}>
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Enhanced Features</span>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-full shadow-md ${
              theme === 'dark' 
                ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm'
            }`}>
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Code Execution</span>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-full shadow-md ${
              theme === 'dark' 
                ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm'
            }`}>
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>File Upload</span>
            </div>
          </div>
        </div>
        
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageSelect={setSelectedLanguage}
        />
        
        <ChatInterface selectedLanguage={selectedLanguage} />
      </div>
    </div>
  );
};

export default Index;
