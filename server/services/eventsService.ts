import { Event, EventSearchParams } from '@shared/types';
import { fallbackEvents } from '../data/fallbackData';
import fetch from 'node-fetch';

let eventsCache: Event[] = [];
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function searchEvents(params: EventSearchParams): Promise<Event[]> {
  try {
    // Try to fetch from external API
    const events = await fetchFromExternalAPI(params);
    
    if (events.length > 0) {
      // Update cache
      eventsCache = events;
      lastFetchTime = Date.now();
      return events;
    }
    
    // If API returns no results, check cache
    if (eventsCache.length > 0 && Date.now() - lastFetchTime < CACHE_TTL) {
      return filterEvents(eventsCache, params);
    }
    
    // Fallback to local data
    return filterEvents(fallbackEvents, params);
  } catch (error) {
    console.error('Error searching events:', error);
    
    // If API fails, use cache if available and fresh
    if (eventsCache.length > 0 && Date.now() - lastFetchTime < CACHE_TTL) {
      return filterEvents(eventsCache, params);
    }
    
    // Otherwise, use fallback data
    return filterEvents(fallbackEvents, params);
  }
}

async function fetchFromExternalAPI(params: EventSearchParams): Promise<Event[]> {
  try {
    // This would be implemented with a real API
    // For now, we'll just return an empty array to trigger the fallback
    return [];
  } catch (error) {
    console.error('Error fetching events from external API:', error);
    return [];
  }
}

function filterEvents(events: Event[], params: EventSearchParams): Event[] {
  return events.filter(event => {
    // Filter by event type
    if (params.type && event.type !== params.type) {
      return false;
    }
    
    // Filter by date
    if (params.date) {
      const eventDate = new Date(event.date);
      const searchDate = new Date(params.date);
      
      if (eventDate.toDateString() !== searchDate.toDateString()) {
        return false;
      }
    }
    
    // Filter by location
    if (params.location && !event.location.toLowerCase().includes(params.location.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}
