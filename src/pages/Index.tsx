
import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import LanguageSelector from '../components/LanguageSelector';
import { PROGRAMMING_LANGUAGES, ProgrammingLanguage } from '../types/languages';
import { useTheme } from '../contexts/ThemeContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Sparkles, Zap, Upload, History, Code2 } from 'lucide-react';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
    PROGRAMMING_LANGUAGES[0] // Default to Python
  );
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const features = [
    {
      icon: <Sparkles className="w-4 h-4" />,
      text: "AI Powered",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Zap className="w-4 h-4" />,
      text: "Code Execution",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <Upload className="w-4 h-4" />,
      text: "File Upload",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <History className="w-4 h-4" />,
      text: "Chat History",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    } relative overflow-hidden`}>
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-violet-600 to-purple-600'
            : 'bg-gradient-to-br from-violet-400 to-purple-400'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-emerald-600 to-teal-600'
            : 'bg-gradient-to-br from-emerald-400 to-teal-400'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-10 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-blue-600 to-indigo-600'
            : 'bg-gradient-to-br from-blue-400 to-indigo-400'
        }`}></div>
      </div>
      
      <div className={`container mx-auto px-3 sm:px-6 py-6 sm:py-12 relative z-10 ${isMobile ? 'max-w-full' : ''}`}>
        <div className={`text-center mb-6 sm:mb-12 animate-fade-in ${isMobile ? 'px-2' : ''}`}>
          {/* Enhanced logo section */}
          <div className="flex items-center justify-center mb-4 sm:mb-8">
            <div className="relative group">
              <div className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} bg-gradient-to-br ${selectedLanguage.color} rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 border border-white/20`}>
                <span className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white drop-shadow-lg`}>{selectedLanguage.icon}</span>
              </div>
              <div className={`absolute -top-2 -right-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg`}>
                <div className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} bg-white rounded-full animate-pulse`}></div>
              </div>
              <div className={`absolute -bottom-1 -left-1 ${isMobile ? 'w-4 h-4' : 'w-6 h-6'} bg-gradient-to-br from-violet-400 to-purple-500 rounded-full animate-bounce delay-300`}></div>
            </div>
          </div>
          
          {/* Enhanced title */}
          <div className={`space-y-2 sm:space-y-4 mb-4 sm:mb-8`}>
            <h1 className={`${isMobile ? 'text-4xl sm:text-5xl' : 'text-7xl'} font-black bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent mb-2 sm:mb-4 tracking-tight leading-tight ${
              theme === 'dark' ? 'from-slate-100 via-slate-300 to-slate-100' : ''
            }`}>
              CodeMentor
            </h1>
            <div className="relative inline-block">
              <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent`}>
                Enhanced
              </span>
              <Sparkles className={`absolute -top-1 sm:-top-2 -right-6 sm:-right-8 ${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-violet-500 animate-pulse`} />
            </div>
          </div>
          
          {/* Enhanced subtitle */}
          <div className={`inline-flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 rounded-2xl mb-4 sm:mb-6 backdrop-blur-md border shadow-lg ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700/50 text-slate-200'
              : 'bg-white/80 border-slate-200/50 text-slate-700'
          }`}>
            <Code2 className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold`}>
              Your Advanced AI {isMobile ? 'Programming' : 'Multi-Language Programming'} Companion
            </p>
          </div>
          
          {/* Enhanced description */}
          <p className={`${isMobile ? 'text-base' : 'text-xl'} max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-8 px-2 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Master multiple programming languages with an expert AI mentor featuring {isMobile ? 'code execution, file upload, and chat history' : 'enhanced code execution, file upload capabilities, conversation history, customizable themes, and advanced debugging tools'}.
          </p>
          
          {/* Enhanced feature badges */}
          <div className={`flex items-center justify-center flex-wrap gap-2 sm:gap-4 ${isMobile ? 'px-2' : ''}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-xl shadow-lg backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' 
                    ? 'bg-slate-800/70 border-slate-700/50 text-slate-200' 
                    : 'bg-white/80 border-slate-200/50 text-slate-700'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                  {feature.icon}
                </div>
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold`}>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-8">
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageSelect={setSelectedLanguage}
          />
          
          <ChatInterface selectedLanguage={selectedLanguage} />
        </div>
      </div>
    </div>
  );
};

export default Index;
