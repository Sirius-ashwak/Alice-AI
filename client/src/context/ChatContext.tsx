import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, ChatSession } from '@shared/types';
import { sendChatMessage, createUserMessage, createAssistantMessage, WELCOME_MESSAGE } from '@/lib/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sessionId: string | undefined;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [inputMessage, setInputMessage] = useState('');
  
  // Initialize chat session
  useEffect(() => {
    const initSession = () => {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
    };
    
    initSession();
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage = createUserMessage(content);
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Send message to API
      const response = await sendChatMessage(content, sessionId);
      
      // Create attachments array if jobs or mentorships are present
      const attachments: ChatMessage['attachments'] = [];
      
      if (response.jobs?.length) {
        attachments.push({
          type: 'jobs',
          data: response.jobs
        });
      }
      
      if (response.mentorships?.length) {
        attachments.push({
          type: 'mentorships',
          data: response.mentorships
        });
      }
      
      if (response.events?.length) {
        attachments.push({
          type: 'events',
          data: response.events
        });
      }
      
      // Add assistant response to chat
      const assistantMessage = createAssistantMessage(
        response.message,
        attachments.length > 0 ? attachments : undefined
      );
      
      // Update session ID if needed
      if (response.sessionId && !sessionId) {
        setSessionId(response.sessionId);
      }
      
      // Add response after a short delay to simulate typing
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 500);
      
    } catch (error) {
      console.error('Error in chat exchange:', error);
      
      // Add error message
      const errorMessage = createAssistantMessage(
        "I'm sorry, I encountered an error processing your request. Please try again later."
      );
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 500);
    }
  }, [sessionId]);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
  }, []);

  return (
    <ChatContext.Provider 
      value={{
        messages,
        isTyping,
        sessionId,
        inputMessage,
        setInputMessage,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  
  return context;
}
