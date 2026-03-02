// AI Multi-Provider Service
// Supports OpenAI (GPT), Anthropic (Claude), and Google (Gemini)

export interface AIRequest {
  prompt: string;
  context?: string;
  code?: string;
}

export interface AIResponse {
  text: string;
  model: string;
  provider: string;
}

export type AIModel = 
  | 'gpt-4'
  | 'gpt-4-turbo'
  | 'gpt-3.5-turbo'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'claude-3-haiku'
  | 'gemini-pro'
  | 'gemini-ultra'
  | 'gemini-flash';

export type AIProvider = 'OpenAI' | 'Anthropic' | 'Google';

export const MODEL_PROVIDER: Record<AIModel, AIProvider> = {
  'gpt-4': 'OpenAI',
  'gpt-4-turbo': 'OpenAI',
  'gpt-3.5-turbo': 'OpenAI',
  'claude-3-opus': 'Anthropic',
  'claude-3-sonnet': 'Anthropic',
  'claude-3-haiku': 'Anthropic',
  'gemini-pro': 'Google',
  'gemini-ultra': 'Google',
  'gemini-flash': 'Google',
};

export function getAPIKey(settings: AISettings, model: AIModel): string | null {
  const provider = MODEL_PROVIDER[model];
  switch (provider) {
    case 'OpenAI':
      return settings.openaiKey || null;
    case 'Anthropic':
      return settings.anthropicKey || null;
    case 'Google':
      return settings.googleKey || null;
  }
}

export interface AISettings {
  openaiKey: string;
  anthropicKey: string;
  googleKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

// OpenAI API Call
async function callOpenAI(prompt: string, apiKey: string, model: string, temperature: number, maxTokens: number): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Anthropic Claude API Call
async function callAnthropic(prompt: string, apiKey: string, model: string, temperature: number, maxTokens: number): Promise<string> {
  const modelMap: Record<string, string> = {
    'claude-3-opus': 'claude-3-opus-20240229',
    'claude-3-sonnet': 'claude-3-sonnet-20240229',
    'claude-3-haiku': 'claude-3-haiku-20240307',
  };

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: modelMap[model] || model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Google Gemini API Call
async function callGemini(prompt: string, apiKey: string, model: string): Promise<string> {
  const modelMap: Record<string, string> = {
    'gemini-pro': 'gemini-pro',
    'gemini-ultra': 'gemini-ultra',
    'gemini-flash': 'gemini-flash',
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${modelMap[model] || model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Google API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Main AI function that routes to the correct provider
export async function callAI(
  prompt: string,
  settings: AISettings
): Promise<AIResponse> {
  const model = settings.model as AIModel;
  const provider = MODEL_PROVIDER[model];
  const apiKey = getAPIKey(settings, model);

  if (!apiKey) {
    throw new Error(`No API key configured for ${provider}. Please add your ${provider} API key in Settings.`);
  }

  let text: string;

  switch (provider) {
    case 'OpenAI':
      text = await callOpenAI(prompt, apiKey, model, settings.temperature, settings.maxTokens);
      break;
    case 'Anthropic':
      text = await callAnthropic(prompt, apiKey, model, settings.temperature, settings.maxTokens);
      break;
    case 'Google':
      text = await callGemini(prompt, apiKey, model);
      break;
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }

  return {
    text,
    model,
    provider,
  };
}
