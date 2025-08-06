import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log('API Key loaded:', API_KEY ? 'Yes (length: ' + API_KEY.length + ')' : 'No');

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error('❌ Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY || 'your-api-key-here');

// System prompt for Islamic context
const ISLAMIC_SYSTEM_PROMPT = `You are an AI assistant specialized in Islamic knowledge, prayer guidance, and religious education. You provide accurate, respectful, and helpful information about:

1. Islamic prayers (Salah/Namaz) and their proper performance
2. Islamic teachings, Hadith, and Quranic verses
3. Islamic etiquette and manners
4. Religious guidance and spiritual advice
5. Islamic history and culture

Guidelines:
- Always provide accurate information based on authentic Islamic sources
- Be respectful and considerate of different Islamic traditions
- Use appropriate Islamic terminology and Arabic terms when relevant
- Provide practical, actionable advice
- Maintain a supportive and encouraging tone
- When quoting Hadith or Quranic verses, mention the source when possible
- Be mindful of cultural sensitivities
- Encourage users to consult with local scholars for complex religious matters

Your responses should be helpful, educational, and spiritually uplifting while maintaining Islamic authenticity.`;

class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    this.chat = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      // Start a new chat session with the Islamic context
      this.chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello, I need help with Islamic knowledge and prayer guidance." }],
          },
          {
            role: "model",
            parts: [{ text: "Assalamu alaikum! I'm here to help you with Islamic knowledge, prayer guidance, and religious education. How can I assist you today?" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });
      
      this.isInitialized = true;
      console.log('Gemini AI service initialized successfully');
    } catch (error) {
      console.error('Error initializing Gemini AI service:', error);
      throw error;
    }
  }

  async sendMessage(message, context = {}) {
    // Check if API key is valid
    if (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your-api-key-here') {
      return this.getFallbackResponse(message);
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Add context to the message if provided
      let fullMessage = message;
      if (context.prayerType) {
        fullMessage += `\n\nContext: User is asking about ${context.prayerType} prayer.`;
      }
      if (context.userLevel) {
        fullMessage += `\n\nUser Level: ${context.userLevel}`;
      }

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - service overloaded')), 15000); // 15 second timeout
      });

      const result = await Promise.race([
        this.chat.sendMessage([{ text: fullMessage }]),
        timeoutPromise
      ]);
      
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      
      // Handle specific error types
      if (error.message && error.message.includes('503')) {
        return this.getServiceOverloadResponse(message);
      }
      
      if (error.message && error.message.includes('overloaded')) {
        return this.getServiceOverloadResponse(message);
      }
      
      if (error.message && error.message.includes('quota')) {
        return this.getQuotaExceededResponse(message);
      }
      
      // Check for timeout errors
      if (error.message && error.message.includes('timeout')) {
        return this.getServiceOverloadResponse(message);
      }
      
      // Check for network errors or other API issues
      if (error.message && (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed to execute'))) {
        return this.getServiceOverloadResponse(message);
      }
      
      // Return fallback response for other errors
      return this.getFallbackResponse(message);
    }
  }

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Provide helpful fallback responses based on common questions
    if (lowerMessage.includes('wudu') || lowerMessage.includes('ablution')) {
      return `Assalamu alaikum! For Wudu (ablution), you need to wash:
1. Face (from hairline to chin)
2. Arms (from fingertips to elbows)
3. Head (wipe with wet hands)
4. Feet (from toes to ankles)

This should be done before each prayer. The Prophet ﷺ said: "The key to prayer is purification." (Abu Dawud)

Note: This is a fallback response. For more detailed guidance, please configure a valid Gemini API key.`;
    }
    
    if (lowerMessage.includes('prayer') || lowerMessage.includes('namaz') || lowerMessage.includes('salah')) {
      return `Assalamu alaikum! Prayer (Salah) is one of the five pillars of Islam. 

The five daily prayers are:
- Fajr (Dawn)
- Dhuhr (Noon) 
- Asr (Afternoon)
- Maghrib (Sunset)
- Isha (Night)

Each prayer has specific times and requirements. The Prophet ﷺ said: "The first thing that will be judged among a person's deeds on the Day of Resurrection is the prayer."

Note: This is a fallback response. For more detailed guidance, please configure a valid Gemini API key.`;
    }
    
    if (lowerMessage.includes('hadith') || lowerMessage.includes('prophet')) {
      return `Assalamu alaikum! Hadith are the sayings and actions of Prophet Muhammad ﷺ, which serve as a guide for Muslims alongside the Quran.

The Prophet ﷺ said: "Whoever follows my Sunnah has loved me, and whoever loves me will be with me in Paradise." (Tirmidhi)

Note: This is a fallback response. For more detailed Hadith explanations, please configure a valid Gemini API key.`;
    }
    
    return `Assalamu alaikum! I'm here to help you with Islamic knowledge and guidance.

However, I'm currently running in fallback mode because the Gemini AI API key is not properly configured. 

To get full AI-powered responses:
1. Get a valid API key from https://makersuite.google.com/app/apikey
2. Add it to your .env file as: VITE_GEMINI_API_KEY=your_actual_key_here
3. Restart the development server

For now, I can provide basic Islamic guidance, but for detailed, personalized responses, please configure the API key.`;
  }

  getServiceOverloadResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Provide helpful responses for service overload
    if (lowerMessage.includes('wudu') || lowerMessage.includes('ablution')) {
      return `Assalamu alaikum! For Wudu (ablution), you need to wash:
1. Face (from hairline to chin)
2. Arms (from fingertips to elbows)
3. Head (wipe with wet hands)
4. Feet (from toes to ankles)

This should be done before each prayer. The Prophet ﷺ said: "The key to prayer is purification." (Abu Dawud)

🔄 Note: The AI service is currently experiencing high traffic. This is a basic response. Please try again in a few minutes for a more detailed answer.`;
    }
    
    if (lowerMessage.includes('prayer') || lowerMessage.includes('namaz') || lowerMessage.includes('salah')) {
      return `Assalamu alaikum! Prayer (Salah) is one of the five pillars of Islam. 

The five daily prayers are:
- Fajr (Dawn)
- Dhuhr (Noon) 
- Asr (Afternoon)
- Maghrib (Sunset)
- Isha (Night)

Each prayer has specific times and requirements. The Prophet ﷺ said: "The first thing that will be judged among a person's deeds on the Day of Resurrection is the prayer."

🔄 Note: The AI service is currently experiencing high traffic. This is a basic response. Please try again in a few minutes for a more detailed answer.`;
    }
    
    if (lowerMessage.includes('hadith') || lowerMessage.includes('prophet')) {
      return `Assalamu alaikum! Hadith are the sayings and actions of Prophet Muhammad ﷺ, which serve as a guide for Muslims alongside the Quran.

The Prophet ﷺ said: "Whoever follows my Sunnah has loved me, and whoever loves me will be with me in Paradise." (Tirmidhi)

🔄 Note: The AI service is currently experiencing high traffic. This is a basic response. Please try again in a few minutes for a more detailed answer.`;
    }
    
    return `Assalamu alaikum! I'm here to help you with Islamic knowledge and guidance.

🔄 The AI service is currently experiencing high traffic and is temporarily unavailable. 

Here's a basic Islamic response to your question:
"Seek knowledge from the cradle to the grave." - Prophet Muhammad ﷺ

Please try again in a few minutes for a more detailed, AI-powered response. In the meantime, you can explore the app's other features like prayer times, hadith collection, and learning materials.`;
  }

  getQuotaExceededResponse(message) {
    return `Assalamu alaikum! 

⚠️ The AI service quota has been exceeded for today. 

Here's a basic Islamic response to your question:
"Verily, Allah is with those who are patient." - Quran 2:153

Please try again tomorrow, or explore the app's other features:
• Prayer times and Qibla direction
• Hadith collection and search
• Islamic learning materials
• Dua collection

The app will continue to work normally for all other features.`;
  }

  // Specialized methods for different types of queries
  async getPrayerGuidance(prayerType, specificQuestion = '') {
    const message = `Please provide guidance for ${prayerType} prayer. ${specificQuestion}`;
    return this.sendMessage(message, { prayerType });
  }

  async getIslamicAdvice(topic) {
    const message = `Please provide Islamic advice and guidance about: ${topic}`;
    return this.sendMessage(message);
  }

  async explainHadith(hadithText) {
    const message = `Please explain this Hadith and its significance: "${hadithText}"`;
    return this.sendMessage(message);
  }

  async getDuaGuidance(duaType) {
    const message = `Please provide guidance about ${duaType} dua, including when to recite it and its benefits.`;
    return this.sendMessage(message);
  }

  async getSpiritualAdvice(context) {
    const message = `Please provide spiritual advice for: ${context}`;
    return this.sendMessage(message);
  }

  async answerIslamicQuestion(question) {
    return this.sendMessage(question);
  }

  // Reset chat session
  async resetChat() {
    this.chat = null;
    this.isInitialized = false;
    await this.initialize();
  }
}

// Create and export a singleton instance
const geminiService = new GeminiService();

// Add global test function for debugging
if (typeof window !== 'undefined') {
  window.testGeminiService = async (message = 'Hello, can you help me with prayer guidance?') => {
    console.log('🧪 Testing Gemini Service with message:', message);
    try {
      const response = await geminiService.sendMessage(message);
      console.log('✅ Gemini Service Response:', response);
      return response;
    } catch (error) {
      console.error('❌ Gemini Service Error:', error);
      return null;
    }
  };
  
  window.geminiService = geminiService;
}

export default geminiService; 