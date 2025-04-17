import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChatMessage } from "./services/chatService";
import { searchJobs } from "./services/jobsService";
import { searchMentorships } from "./services/mentorshipService";
import { searchEvents } from "./services/eventsService";
import { z } from "zod";

// Request validation schemas
const chatRequestSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().optional()
});

const jobSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  workArrangement: z.string().optional(),
  jobType: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  experienceLevel: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  page: z.number().default(1),
  limit: z.number().default(10)
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const validatedData = chatRequestSchema.parse(req.body);
      const response = await handleChatMessage(
        validatedData.message, 
        validatedData.sessionId
      );
      res.json(response);
    } catch (error) {
      console.error('Error handling chat request:', error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Invalid request'
      });
    }
  });
  
  // Job search endpoint
  app.get('/api/jobs', async (req, res) => {
    try {
      const params = jobSearchSchema.parse({
        query: req.query.query as string | undefined,
        location: req.query.location as string | undefined,
        workArrangement: req.query.workArrangement as string | undefined,
        jobType: req.query.jobType as string | undefined,
        techStack: req.query.techStack ? (req.query.techStack as string).split(',') : undefined,
        experienceLevel: req.query.experienceLevel as string | undefined,
        salaryMin: req.query.salaryMin ? Number(req.query.salaryMin) : undefined,
        salaryMax: req.query.salaryMax ? Number(req.query.salaryMax) : undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10
      });
      
      const jobs = await searchJobs(params);
      res.json(jobs);
    } catch (error) {
      console.error('Error searching jobs:', error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Invalid request'
      });
    }
  });
  
  // Mentorship programs endpoint
  app.get('/api/mentorships', async (req, res) => {
    try {
      const params = {
        status: req.query.status as string | undefined,
        duration: req.query.duration as string | undefined,
        field: req.query.field as string | undefined
      };
      
      const mentorships = await searchMentorships(params);
      res.json(mentorships);
    } catch (error) {
      console.error('Error searching mentorships:', error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Invalid request'
      });
    }
  });
  
  // Events endpoint
  app.get('/api/events', async (req, res) => {
    try {
      const params = {
        type: req.query.type as string | undefined,
        date: req.query.date as string | undefined,
        location: req.query.location as string | undefined
      };
      
      const events = await searchEvents(params);
      res.json(events);
    } catch (error) {
      console.error('Error searching events:', error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Invalid request'
      });
    }
  });

  return httpServer;
}
