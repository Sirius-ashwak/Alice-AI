// API Response Types
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  workArrangement: string; // 'Remote', 'Hybrid', 'On-site'
  jobType: string; // 'Full-time', 'Part-time', 'Contract'
  description: string;
  requirements?: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  applicationUrl?: string;
}

export interface MentorshipProgram {
  id: string;
  title: string;
  status: 'Applications Open' | 'Coming Soon' | 'Closed';
  startDate: string;
  duration: string;
  description: string;
  learnMoreUrl?: string;
  applyUrl?: string;
  speakers?: Array<{
    name: string;
    role?: string;
  }>;
  tags?: string[];
  registrationUrl?: string; // Alias for registerUrl for backward compatibility
}

export interface Event {
  id: string;
  title: string;
  type: string; // 'Workshop', 'Seminar', 'Conference', etc.
  date: string;
  time: string;
  location: string; // Can be physical or 'Online'
  description: string;
  registerUrl?: string;
  speakers?: Array<{
    name: string;
    role?: string;
  }>;
  tags?: string[];
  registrationUrl?: string; // Alias for registerUrl for backward compatibility
}

export interface Resource {
  id: string;
  title: string;
  type: string; // 'Article', 'Video', 'Course', etc.
  description: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Array<{
    type: 'jobs' | 'mentorships' | 'events' | 'resources';
    data: JobListing[] | MentorshipProgram[] | Event[] | Resource[];
  }>;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  title?: string;
  createdAt: Date;
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  jobs?: JobListing[];
  mentorships?: MentorshipProgram[];
  events?: Event[];
  resources?: Resource[];
}

export interface FeedbackRequest {
  messageId: string;
  rating?: number;
  comment?: string;
}

export interface JobSearchParams {
  query?: string;
  location?: string;
  workArrangement?: string;
  jobType?: string;
  techStack?: string[];
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
}

export interface MentorshipSearchParams {
  status?: string;
  duration?: string;
  field?: string;
}

export interface EventSearchParams {
  type?: string;
  date?: string;
  location?: string;
}
