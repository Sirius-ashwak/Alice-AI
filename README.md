# Alice AI

Alice AI is an intelligent chatbot designed to provide career assistance and guidance for women returning to the workforce. Built for the JobsForHer Foundation platform, Alice offers real-time, inclusive, and ethical career support through engaging conversations.

## 🌟 Features

- **Contextual Conversations**: Maintains context across multiple interactions for natural dialogue
- **Career Guidance**: Provides personalized career advice and job recommendations
- **Mentorship Connections**: Helps users find relevant mentorship opportunities
- **Event Discovery**: Keeps users informed about workshops, seminars, and networking events
- **Bias Detection**: Actively identifies and redirects gender-biased queries
- **Inclusive Responses**: Ensures all interactions promote gender equality and empowerment

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alice-ai.git
   cd alice-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file to add your API keys:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `OPENAI_API_KEY`: Your OpenAI API key

4. Start the development server:
   ```bash
   npm run dev
   # or for Windows
   npm run dev:windows
   ```

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Shadcn UI components
- Wouter for routing

### Backend
- Express.js
- TypeScript
- Drizzle ORM
- Google Gemini AI API
- OpenAI API

### Data Storage
- NeonDB (PostgreSQL)
- Vector embeddings for semantic search

## 📊 Features in Detail

### Contextual Awareness
- Multi-turn conversations with session memory
- Context-aware responses that reference previous interactions

### System Integration
- Integration with job listing APIs
- Mentorship program recommendations
- Event discovery and notifications

### Ethical AI & Bias Prevention
- Active bias detection in user queries
- Inclusive language and recommendations
- Gender-neutral career guidance

### Security & Privacy
- End-to-end encryption
- GDPR compliance
- User data protection

## 🧪 Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Run the production build
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Update the database schema

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- JobsForHer Foundation for their mission to empower women in their careers
- All contributors who have helped make Alice AI a reality
