
import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import LanguageSelector from '../components/LanguageSelector';
import { PROGRAMMING_LANGUAGES, ProgrammingLanguage } from '../types/languages';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
    PROGRAMMING_LANGUAGES[0] // Default to Python
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
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
          
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
            CodeMentor
          </h1>
          
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Your AI Multi-Language Programming Companion
            </p>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Master multiple programming languages with an expert AI mentor. Get personalized help with code writing, 
            debugging, optimization, and learning concepts across Python, JavaScript, TypeScript, Java, C++, and Rust.
          </p>
          
          <div className="flex items-center justify-center flex-wrap gap-6 text-sm">
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium text-gray-700">AI Powered</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium text-gray-700">Multi-Language</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="font-medium text-gray-700">Real-time Help</span>
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
