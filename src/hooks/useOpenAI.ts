
import { useState, useCallback } from 'react';

// DEPRECATED: This hook has been replaced with useSecureAI for security reasons
// The OpenAI API key has been moved to a secure Supabase Edge Function
export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  const generateResponse = useCallback(async (userInput: string): Promise<string> => {
    console.warn('useOpenAI is deprecated. Please use useSecureAI instead.');
    return "This service has been moved to a secure implementation. Please refresh the page.";
  }, []);

  const initializeModel = useCallback(async () => {
    console.warn('useOpenAI is deprecated. Please use useSecureAI instead.');
  }, []);

  return {
    generateResponse,
    initializeModel,
    isLoading,
    isModelReady,
  };
};
