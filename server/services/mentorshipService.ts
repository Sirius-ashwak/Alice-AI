import { MentorshipProgram, MentorshipSearchParams } from '@shared/types';
import { fallbackMentorshipPrograms } from '../data/fallbackData';
import fetch from 'node-fetch';

let mentorshipCache: MentorshipProgram[] = [];
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function searchMentorships(params: MentorshipSearchParams): Promise<MentorshipProgram[]> {
  try {
    // Try to fetch from external API
    const mentorships = await fetchFromExternalAPI(params);
    
    if (mentorships.length > 0) {
      // Update cache
      mentorshipCache = mentorships;
      lastFetchTime = Date.now();
      return mentorships;
    }
    
    // If API returns no results, check cache
    if (mentorshipCache.length > 0 && Date.now() - lastFetchTime < CACHE_TTL) {
      return filterMentorships(mentorshipCache, params);
    }
    
    // Fallback to local data
    return filterMentorships(fallbackMentorshipPrograms, params);
  } catch (error) {
    console.error('Error searching mentorships:', error);
    
    // If API fails, use cache if available and fresh
    if (mentorshipCache.length > 0 && Date.now() - lastFetchTime < CACHE_TTL) {
      return filterMentorships(mentorshipCache, params);
    }
    
    // Otherwise, use fallback data
    return filterMentorships(fallbackMentorshipPrograms, params);
  }
}

async function fetchFromExternalAPI(params: MentorshipSearchParams): Promise<MentorshipProgram[]> {
  try {
    // This would be implemented with a real API
    // For now, we'll just return an empty array to trigger the fallback
    return [];
  } catch (error) {
    console.error('Error fetching mentorships from external API:', error);
    return [];
  }
}

function filterMentorships(mentorships: MentorshipProgram[], params: MentorshipSearchParams): MentorshipProgram[] {
  return mentorships.filter(program => {
    // Filter by status
    if (params.status && program.status !== params.status) {
      return false;
    }
    
    // Filter by duration
    if (params.duration && !program.duration.includes(params.duration)) {
      return false;
    }
    
    // Filter by field/industry
    if (params.field && !program.description.toLowerCase().includes(params.field.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}
