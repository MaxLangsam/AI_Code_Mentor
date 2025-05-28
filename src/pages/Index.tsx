
import React from 'react';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Aria AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your intelligent companion for thoughtful conversations, creative collaboration, and insightful assistance
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Online
            </span>
            <span>•</span>
            <span>Powered by advanced AI</span>
          </div>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
