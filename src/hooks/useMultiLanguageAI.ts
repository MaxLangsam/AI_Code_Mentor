
import { useState, useCallback } from 'react';
import { ProgrammingLanguage } from '../types/languages';

// DEPRECATED: This hook has been replaced with useSecureAI for security reasons
// The OpenAI API key has been moved to a secure Supabase Edge Function
export const useMultiLanguageAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  const generateResponse = useCallback(async (
    userInput: string, 
    selectedLanguage: ProgrammingLanguage
  ): Promise<string> => {
    console.warn('useMultiLanguageAI is deprecated. Please use useSecureAI instead.');
    return "This service has been moved to a secure implementation. Please refresh the page.";
  }, []);

  const initializeModel = useCallback(async () => {
    console.warn('useMultiLanguageAI is deprecated. Please use useSecureAI instead.');
  }, []);

  return {
    generateResponse,
    initializeModel,
    isLoading,
    isModelReady,
  };
};
