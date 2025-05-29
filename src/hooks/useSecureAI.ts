
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProgrammingLanguage } from '../types/languages';

export const useSecureAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(true);

  const generateResponse = useCallback(async (
    userInput: string, 
    selectedLanguage?: ProgrammingLanguage,
    preferences?: { responseLength: string; codeTheme: string }
  ): Promise<string> => {
    setIsLoading(true);
    
    try {
      console.log(`Generating secure AI response...`);
      
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          userInput,
          languagePrompt: selectedLanguage?.prompt,
          preferences
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.response) {
        throw new Error('No response received from AI service');
      }

      console.log('Secure AI response generated successfully');
      return data.response;

    } catch (error) {
      console.error('Error generating secure response:', error);
      
      // Provide user-friendly error messages
      if (error.message?.includes('OpenAI API key')) {
        return "The AI service is not properly configured. Please contact support.";
      }
      
      return "I'm having trouble generating a response right now. Please try again in a moment.";
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initializeModel = useCallback(async () => {
    console.log('Secure AI service is ready to use');
  }, []);

  return {
    generateResponse,
    initializeModel,
    isLoading,
    isModelReady,
  };
};
