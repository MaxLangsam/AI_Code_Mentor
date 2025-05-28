
import React from 'react';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">🐍</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Python Code Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert Python programming assistant powered by OpenAI GPT-3.5. Get help with code writing, debugging, optimization, and understanding Python concepts with PEP8 best practices.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Ready to Help
            </span>
            <span>•</span>
            <span>Python Expert</span>
            <span>•</span>
            <span>PEP8 Compliant</span>
          </div>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
