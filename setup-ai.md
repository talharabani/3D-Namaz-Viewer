# AI Assistant Setup Guide

## Current Issue
The API key you provided (`AIzaSyBd3q1oTsLjeB7i0oRWE-DwJIxs9J373WM`) is not valid or has restrictions.

## How to Get a Valid Gemini API Key

### Step 1: Visit Google AI Studio
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account

### Step 2: Create API Key
1. Click "Create API Key"
2. Give it a name (e.g., "Namaz Web AI")
3. Copy the generated API key

### Step 3: Update Your .env File
Replace the current API key in your `.env` file:

```
VITE_GEMINI_API_KEY=your_new_api_key_here
```

### Step 4: Restart the Server
```bash
npm run dev
```

## Alternative: Use Fallback Mode
The app now has a fallback mode that provides basic Islamic guidance even without a valid API key. You can:

1. Ask about Wudu/Ablution
2. Ask about Prayers (Namaz/Salah)
3. Ask about Hadith
4. Get general Islamic guidance

## Testing the API Key
Once you have a valid key, you can test it by asking:
- "How do I perform Wudu?"
- "What are the benefits of praying on time?"
- "How can I improve my concentration in prayer?"

The AI should respond with detailed, personalized guidance instead of fallback responses. 