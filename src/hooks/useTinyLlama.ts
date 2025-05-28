
import { useState, useCallback, useRef } from 'react';
import { pipeline, Pipeline } from '@huggingface/transformers';

export const useTinyLlama = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const pipelineRef = useRef<Pipeline | null>(null);

  const initializeModel = useCallback(async () => {
    if (pipelineRef.current) return;
    
    setIsLoading(true);
    try {
      console.log('Loading TinyLlama model...');
      const textGenerator = await pipeline(
        'text-generation',
        'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
        {
          device: 'webgpu', // Use WebGPU if available, fallback to CPU
          dtype: 'fp16',
        }
      );
      
      pipelineRef.current = textGenerator;
      setIsModelReady(true);
      console.log('TinyLlama model loaded successfully!');
    } catch (error) {
      console.error('Error loading TinyLlama model:', error);
      // Fallback to CPU if WebGPU fails
      try {
        console.log('Falling back to CPU...');
        const textGenerator = await pipeline(
          'text-generation',
          'TinyLlama/TinyLlama-1.1B-Chat-v1.0'
        );
        pipelineRef.current = textGenerator;
        setIsModelReady(true);
        console.log('TinyLlama model loaded on CPU!');
      } catch (cpuError) {
        console.error('Failed to load model on CPU:', cpuError);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateResponse = useCallback(async (userInput: string): Promise<string> => {
    if (!pipelineRef.current) {
      await initializeModel();
    }

    if (!pipelineRef.current) {
      return "I apologize, but I'm having trouble loading my language model. Please try again in a moment.";
    }

    try {
      // Format the input as a chat conversation
      const prompt = `<|system|>
You are Aria, an AI companion designed to be thoughtful, creative, and helpful. You engage in meaningful conversations and provide insightful assistance.
<|user|>
${userInput}
<|assistant|>
`;

      const result = await pipelineRef.current(prompt, {
        max_new_tokens: 150,
        temperature: 0.7,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1,
      });

      // Extract the generated text and clean it up
      const generated = result[0].generated_text;
      const response = generated.split('<|assistant|>')[1]?.trim() || generated;
      
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble generating a response right now. Please try again.";
    }
  }, [initializeModel]);

  return {
    generateResponse,
    initializeModel,
    isLoading,
    isModelReady,
  };
};
