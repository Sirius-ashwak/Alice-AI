import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-development" });

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

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 100
    });

    return response.choices[0].message.content || query;
  } catch (error) {
    console.error("Error in bias detection:", error);
    // Return original query if bias detection fails
    return query;
  }
}

export async function detectBias(text: string): Promise<{ hasBias: boolean; reason?: string }> {
  try {
    const prompt = `
      Analyze the following text for gender bias or stereotypes.
      Specifically look for:
      1. Assumptions about gender roles in careers
      2. Use of gendered language that excludes certain genders
      3. Stereotypes about what women or men can or should do
      4. Implicit bias in descriptions of professional qualities
      
      Text: "${text}"
      
      Respond with JSON in this format:
      {
        "hasBias": true/false,
        "reason": "Explanation if bias is detected, otherwise null"
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return { hasBias: false };
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error detecting bias:", error);
    return { hasBias: false };
  }
}
