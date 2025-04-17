import { ChatMessage, ChatResponse } from '@shared/types';
import { apiRequest } from './queryClient';
import { v4 as uuidv4 } from 'uuid';

export async function sendChatMessage(message: string, sessionId?: string): Promise<ChatResponse> {
  try {
    const response = await apiRequest('POST', '/api/chat', {
      message,
      sessionId,
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: uuidv4(),
    role: 'user',
    content,
    timestamp: new Date(),
  };
}

export function createAssistantMessage(content: string, attachments?: ChatMessage['attachments']): ChatMessage {
  return {
    id: uuidv4(),
    role: 'assistant',
    content,
    timestamp: new Date(),
    attachments,
  };
}

export const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 
    "👋 Hello! I'm Asha, your JobsForHer career assistant. I can help you with:\n" +
    "\n• Finding job opportunities" +
    "\n• Discovering mentorship programs" +
    "\n• Exploring upcoming career events" +
    "\n• Career advice and resources" +
    "\n\nHow can I assist you today?",
  timestamp: new Date(),
};
