
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
            content: `You are an expert Python programming assistant, trained to help users write, debug, and understand Python code. You should follow best practices for readability and performance, and provide concise explanations when necessary. Prioritize PEP8 standards and write well-commented code for clarity.

When responding:

- If the user asks for code, provide a complete, functioning Python script or snippet.
- If the user shares code with an error, identify and fix the bug, explaining the issue.
- If the user asks for optimization, suggest improvements with reasons.
- If the user asks a question about Python syntax or libraries, answer concisely with examples.

Always format code blocks properly using markdown syntax. Be helpful, precise, and educational in your responses.`
          },
          {
            role: "user",
            content: userInput
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
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
