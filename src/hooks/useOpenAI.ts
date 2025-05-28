
import { useState, useCallback } from 'react';
import OpenAI from 'openai';

const OPENAI_API_KEY = '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';

export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(true); // OpenAI API is always ready

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const generateResponse = useCallback(async (userInput: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      console.log('Generating response with OpenAI...');
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Aria, an AI companion designed to be thoughtful, creative, and helpful. You engage in meaningful conversations and provide insightful assistance. Keep your responses conversational and helpful."
          },
          {
            role: "user",
            content: userInput
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "I'm having trouble generating a response right now.";
      console.log('OpenAI response generated successfully');
      
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble generating a response right now. Please try again.";
    } finally {
      setIsLoading(false);
    }
  }, [openai]);

  const initializeModel = useCallback(async () => {
    // OpenAI API doesn't need initialization
    console.log('OpenAI API is ready to use');
  }, []);

  return {
    generateResponse,
    initializeModel,
    isLoading,
    isModelReady,
  };
};
