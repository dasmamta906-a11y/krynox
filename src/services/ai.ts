export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIRequest {
  task: 'chat' | 'edit';
  prompt: string;
  code?: string;
}

export interface AIResponse {
  status: string;
  source: string;
  message?: string;
  updatedCode?: string;
}

// Use backend API instead of direct API
const API_URL = 'http://localhost:3000';

export async function callAI(task: 'chat' | 'edit', prompt: string, code?: string): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task,
        prompt,
        code
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: 'error',
        source: 'api',
        message: errorData.message || 'API request failed'
      };
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('AI Service Error:', error);
    return {
      status: 'error',
      source: 'api',
      message: error instanceof Error ? error.message : 'Failed to connect to AI service. Make sure API server is running on port 3000.'
    };
  }
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: 'error',
        source: 'api',
        message: errorData.message || 'Chat failed'
      };
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Chat Error:', error);
    return {
      status: 'error',
      source: 'api',
      message: error instanceof Error ? error.message : 'Chat connection failed'
    };
  }
}
