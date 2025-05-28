
import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { ProgrammingLanguage } from '../types/languages';

const OPENAI_API_KEY = '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';

export const useMultiLanguageAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(true);

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const generateResponse = useCallback(async (
    userInput: string, 
    selectedLanguage: ProgrammingLanguage
  ): Promise<string> => {
    setIsLoading(true);
    
    try {
      console.log(`Generating response for ${selectedLanguage.name}...`);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: selectedLanguage.prompt
          },
          {
            role: "user",
            content: userInput
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      const response = completion.choices[0]?.message?.content || 
        `I'm having trouble generating a ${selectedLanguage.name} response right now.`;
      console.log(`${selectedLanguage.name} response generated successfully`);
      
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return `I'm having trouble generating a ${selectedLanguage.name} response right now. Please try again.`;
    } finally {
      setIsLoading(false);
    }
  }, [openai]);

  const initializeModel = useCallback(async () => {
    console.log('Multi-language AI is ready to use');
  }, []);

  return {
    generateResponse,
    initializeModel,
    isLoading,
    isModelReady,
  };
};
