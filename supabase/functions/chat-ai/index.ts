
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { userInput, languagePrompt, preferences } = await req.json();

    // Input validation
    if (!userInput || typeof userInput !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid input: userInput is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (userInput.length > 10000) {
      return new Response(
        JSON.stringify({ error: 'Input too long. Maximum 10,000 characters allowed.' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing chat request for language:', languagePrompt?.substring(0, 50) + '...');

    // Prepare the enhanced prompt with preferences
    const enhancedPrompt = preferences 
      ? `${userInput}\n\nResponse preferences: ${preferences.responseLength} length, ${preferences.codeTheme} code style.`
      : userInput;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: languagePrompt || `You are an expert programming assistant, trained to help users write, debug, and understand code. You should follow best practices for readability and performance, and provide concise explanations when necessary.

When responding:
- If the user asks for code, provide a complete, functioning script or snippet.
- If the user shares code with an error, identify and fix the bug, explaining the issue.
- If the user asks for optimization, suggest improvements with reasons.
- If the user asks a question about syntax or libraries, answer concisely with examples.

Always format code blocks properly using markdown syntax. Be helpful, precise, and educational in your responses.`
          },
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate AI response' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || 
      "I'm having trouble generating a response right now.";

    console.log('AI response generated successfully');

    return new Response(
      JSON.stringify({ response: generatedText }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
