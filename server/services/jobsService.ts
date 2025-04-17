import { JobListing, JobSearchParams } from '@shared/types';
import { fallbackJobListings } from '../data/fallbackData';
import fetch from 'node-fetch';

// Cache for job listings to reduce API calls
let jobListingsCache: JobListing[] = [];
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

export async function searchJobs(params: JobSearchParams): Promise<JobListing[]> {
  try {
    // Try to fetch from external API
    const jobs = await fetchFromExternalAPI(params);
    
    if (jobs.length > 0) {
      // Update cache
      jobListingsCache = jobs;
      lastFetchTime = Date.now();
      return jobs;
    }
    
    // If API returns no results, check cache
    if (jobListingsCache.length > 0 && Date.now() - lastFetchTime < CACHE_TTL) {
      return filterJobs(jobListingsCache, params);
    }
    
    // Fallback to local data
    return filterJobs(fallbackJobListings, params);
  } catch (error) {
    console.error('Error searching jobs:', error);
    
    // If API fails, use cache if available and fresh
    if (jobListingsCache.length > 0 && Date.now() - lastFetchTime < CACHE_TTL) {
      return filterJobs(jobListingsCache, params);
    }
    
    // Otherwise, use fallback data
    return filterJobs(fallbackJobListings, params);
  }
}

async function fetchFromExternalAPI(params: JobSearchParams): Promise<JobListing[]> {
  try {
    // Attempt to use Indeed API
    // Note: This is a placeholder - actual implementation would require registration with the API provider
    const apiKey = process.env.INDEED_API_KEY;
    
    if (!apiKey) {
      // If no API key is available, fall back immediately
      return [];
    }
    
    const queryParams = new URLSearchParams({
      q: params.query || '',
      l: params.location || '',
      limit: String(params.limit || 10),
      start: String(((params.page || 1) - 1) * (params.limit || 10))
    });
    
    if (params.workArrangement) {
      queryParams.append('jt', params.workArrangement === 'Remote' ? 'remote' : params.workArrangement);
    }
    
    // This is a mock URL - replace with actual API URL when available
    const url = `https://api.indeed.com/v2/jobs?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API response to our JobListing type
    // This transformation would need to be adjusted based on the actual API response format
    return data.results.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      workArrangement: job.remote ? 'Remote' : 'On-site',
      jobType: job.jobType || 'Full-time',
      description: job.description,
      postedDate: job.date
    }));
  } catch (error) {
    console.error('Error fetching from external API:', error);
    return [];
  }
}

function filterJobs(jobs: JobListing[], params: JobSearchParams): JobListing[] {
  return jobs.filter(job => {
    // Filter by search query (title, company, description)
    if (params.query && !matches(job, params.query)) {
      return false;
    }
    
    // Filter by location
    if (params.location && !job.location.toLowerCase().includes(params.location.toLowerCase())) {
      return false;
    }
    
    // Filter by work arrangement
    if (params.workArrangement && job.workArrangement !== params.workArrangement) {
      return false;
    }
    
    // Filter by job type
    if (params.jobType && job.jobType !== params.jobType) {
      return false;
    }
    
    // Filter by tech stack
    if (params.techStack && params.techStack.length > 0) {
      const jobTechMatches = params.techStack.some(tech => 
        job.description.toLowerCase().includes(tech.toLowerCase())
      );
      if (!jobTechMatches) return false;
    }
    
    // Filter by salary range if provided and job has salary info
    if (job.salary) {
      if (params.salaryMin !== undefined && job.salary.min < params.salaryMin) {
        return false;
      }
      if (params.salaryMax !== undefined && job.salary.max > params.salaryMax) {
        return false;
      }
    }
    
    return true;
  }).slice(0, params.limit || 10);
}

function matches(job: JobListing, query: string): boolean {
  const searchTerms = query.toLowerCase().split(' ');
  const jobText = `${job.title} ${job.company} ${job.description}`.toLowerCase();
  
  return searchTerms.every(term => jobText.includes(term));
}
