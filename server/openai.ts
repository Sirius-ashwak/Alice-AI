import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-development" });

interface PromptParams {
  userMessage: string;
  chatHistory: Array<{ role: 'user' | 'assistant', content: string }>;
  jobSearchParams?: Record<string, any>;
  mentorshipParams?: Record<string, any>;
  eventsParams?: Record<string, any>;
}

export async function generateAIResponse(params: PromptParams): Promise<string> {
  try {
    const systemPrompt = `
      You are Asha, an AI-powered career assistant for the JobsForHer Foundation.
      Your purpose is to empower women in their career journeys by providing:
      - Career advice tailored for women professionals
      - Job search assistance
      - Information about mentorship programs
      - Details about networking events and career development opportunities
      
      Guidelines:
      1. Be supportive, professional, and empowering in your language.
      2. Provide specific, actionable advice rather than generic platitudes.
      3. Be mindful to avoid gender bias in your responses. Don't reinforce stereotypes about "women's jobs" or "men's jobs."
      4. When discussing career fields, emphasize that all areas are open to women, including traditionally male-dominated ones.
      5. Focus on practical solutions and opportunities.
      6. Keep responses concise but informative.
      7. If unsure about something, acknowledge the limits of your knowledge rather than making up information.
      
      The current capabilities you have access to include:
      - Job listings search
      - Mentorship program information
      - Career events and workshops
      - General career advice
    `;

    const messages = [
      { role: "system", content: systemPrompt },
      ...params.chatHistory,
      { role: "user", content: params.userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response. Please try again later.");
  }
}

export async function detectQueryIntent(query: string): Promise<{
  jobSearchParams?: Record<string, any>;
  mentorshipParams?: Record<string, any>;
  eventsParams?: Record<string, any>;
  hasBias: boolean;
}> {
  try {
    const prompt = `
      Analyze the following job or career-related query and extract relevant parameters.
      If it's a job search query, identify:
      - Job role/title
      - Location preferences
      - Work arrangement preferences (remote, hybrid, on-site)
      - Job type preferences (full-time, part-time, contract)
      - Technology stack or skills mentioned
      - Experience level
      - Any salary expectations
      
      If it's about mentorship programs, identify:
      - Status preferences (open, upcoming)
      - Duration preferences
      - Field or industry focus
      
      If it's about events, identify:
      - Type of event
      - Date preferences
      - Location preferences
      
      Also, determine if the query contains any gender bias (e.g., assuming certain roles are only for men or women).
      
      Respond with JSON in this exact format:
      {
        "jobSearchParams": {
          "query": "extracted job search term",
          "location": "location if mentioned",
          "workArrangement": "remote/hybrid/on-site if mentioned",
          "jobType": "full-time/part-time/contract if mentioned",
          "techStack": ["tech1", "tech2"],
          "experienceLevel": "junior/mid/senior if mentioned",
          "salaryMin": number or null,
          "salaryMax": number or null
        },
        "mentorshipParams": {
          "status": "open/upcoming if mentioned",
          "duration": "duration if mentioned",
          "field": "field if mentioned"
        },
        "eventsParams": {
          "type": "type if mentioned",
          "date": "date if mentioned",
          "location": "location if mentioned"
        },
        "hasBias": true/false,
        "isJobSearch": true/false,
        "isMentorshipSearch": true/false,
        "isEventSearch": true/false
      }
      
      Only include params that are actually present in the query, leave others as null or empty objects if not relevant.
      Query: "${query}"
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error detecting query intent:", error);
    return { hasBias: false };
  }
}
