import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API with the provided API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyAOm_aYrjpgeE00I_EzG47eapjiHDJc-mc");
const MODEL_NAME = "gemini-1.5-pro";

export async function redirectBiasedQuery(query: string): Promise<string> {
  try {
    const prompt = `
      The following query may contain gender bias or gender stereotypes. 
      Please rewrite it to be gender-neutral and inclusive, while preserving the core information need.
      If it's asking about jobs that are stereotypically associated with a particular gender, 
      rewrite it to be about the profession without gender assumptions.
      
      Original query: "${query}"
      
      Rewritten query:
    `;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Generate a response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 100,
      },
    });

    const response = await result.response;
    const text = response.text();
    return text || query;
  } catch (error) {
    console.error("Error in bias detection:", error);
    // Return original query if bias detection fails
    return query;
  }
}

export async function detectBias(inputText: string): Promise<{ hasBias: boolean; reason?: string }> {
  try {
    const prompt = `
      Analyze the following text for gender bias or stereotypes.
      Specifically look for:
      1. Assumptions about gender roles in careers
      2. Use of gendered language that excludes certain genders
      3. Stereotypes about what women or men can or should do
      4. Implicit bias in descriptions of professional qualities
      
      Text: "${inputText}"
      
      Respond with JSON in this format:
      {
        "hasBias": true/false,
        "reason": "Explanation if bias is detected, otherwise null"
      }
    `;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Generate a structured response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
      },
    });

    const response = await result.response;
    const responseText = response.text();
    
    if (!responseText) {
      return { hasBias: false };
    }

    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing JSON from Gemini response:", parseError);
      return { hasBias: false };
    }
  } catch (error) {
    console.error("Error detecting bias:", error);
    return { hasBias: false };
  }
}