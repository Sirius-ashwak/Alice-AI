import { v4 as uuidv4 } from 'uuid';
import { generateAIResponse, detectQueryIntent } from '../gemini';
import { searchJobs } from './jobsService';
import { searchMentorships } from './mentorshipService';
import { searchEvents } from './eventsService';
import { redirectBiasedQuery } from './geminiBiasDetectionService';
import { ChatResponse } from '@shared/types';

// Simple in-memory session storage
const chatSessions: Record<string, Array<{ role: 'user' | 'assistant', content: string }>> = {};

export async function handleChatMessage(
  message: string,
  sessionId?: string
): Promise<ChatResponse> {
  try {
    // Create or retrieve session
    const currentSessionId = sessionId || uuidv4();
    if (!chatSessions[currentSessionId]) {
      chatSessions[currentSessionId] = [];
    }
    
    // Get session history
    const chatHistory = chatSessions[currentSessionId];
    
    // Detect intent and possible bias
    const intentAnalysis = await detectQueryIntent(message);
    
    // Handle biased queries
    if (intentAnalysis.hasBias) {
      message = await redirectBiasedQuery(message);
    }
    
    // Add user message to history
    chatHistory.push({ role: 'user', content: message });
    
    // Fetch job listings if this is a job search query
    let jobs = undefined;
    if (intentAnalysis.jobSearchParams && Object.keys(intentAnalysis.jobSearchParams).length > 0) {
      jobs = await searchJobs(intentAnalysis.jobSearchParams);
    }
    
    // Fetch mentorship programs if this is a mentorship query
    let mentorships = undefined;
    if (intentAnalysis.mentorshipParams && Object.keys(intentAnalysis.mentorshipParams).length > 0) {
      mentorships = await searchMentorships(intentAnalysis.mentorshipParams);
    }
    
    // Fetch events if this is an events query
    let events = undefined;
    if (intentAnalysis.eventsParams && Object.keys(intentAnalysis.eventsParams).length > 0) {
      events = await searchEvents(intentAnalysis.eventsParams);
    }
    
    // Generate AI response
    const aiResponse = await generateAIResponse({
      userMessage: message,
      chatHistory,
      jobSearchParams: intentAnalysis.jobSearchParams,
      mentorshipParams: intentAnalysis.mentorshipParams,
      eventsParams: intentAnalysis.eventsParams
    });
    
    // Add assistant response to history
    chatHistory.push({ role: 'assistant', content: aiResponse });
    
    // Keep chat history to a reasonable size to maintain context
    if (chatHistory.length > 20) {
      // Remove older messages but keep the first message for context
      const firstMessage = chatHistory[0];
      chatSessions[currentSessionId] = [firstMessage, ...chatHistory.slice(-19)];
    }
    
    // Return the response with session ID and any attachments
    return {
      message: aiResponse,
      sessionId: currentSessionId,
      jobs,
      mentorships,
      events
    };
  } catch (error) {
    console.error('Error in handleChatMessage:', error);
    throw new Error('Failed to process your message. Please try again.');
  }
}
