# AI Meeting Intelligence System

An AI-powered meeting analysis tool that transcribes audio files or analyzes pasted transcripts to provide intelligent insights including summaries, action items, sentiment analysis, and topic extraction.

## Features

- **Audio Transcription**: Upload MP3, WAV, M4A, or WebM files for AI-powered transcription
- **Transcript Analysis**: Paste raw transcripts for instant analysis
- **Summary Generation**: AI-generated TL;DR and key bullet points
- **Action Items Extraction**: Identifies tasks, owners, and deadlines
- **Sentiment Analysis**: Overall meeting sentiment with per-speaker breakdown
- **Topic Extraction**: Automatically identifies main topics discussed
- **Export Options**: Download results as JSON or PDF

## Tech Stack

- **Backend**: FastAPI (Python 3.11)
- **STT**: Whisper-large-v3 via Groq API
- **LLM**: LLaMA-3 70B via Groq API
- **Frontend**: React + Vite + Axios
- **Deployment**: Railway (backend) + Vercel (frontend)

## Architecture

```
┌─────────────────┐      ┌─────────────────┐
│   Frontend      │──────│   Backend       │
│   (React)      │HTTPS │   (FastAPI)     │
└─────────────────┘      └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
              ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
              │ Whisper   │ │  LLaMA    │ │  LLaMA    │
              │ (STT)     │ │  Summary  │ │  Actions  │
              └───────────┘ └───────────┘ └───────────┘
                          ┌───────────┐ ┌───────────┐
                          │  LLaMA    │ │  LLaMA    │
                          │ Sentiment │ │  Topics   │
                          └───────────┘ └───────────┘
```

## Local Development

### Prerequisites

- Python 3.11
- Node.js 18+
- Groq API Key

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env
# Edit .env and add your GROQ_API_KEY

# Run the server
uvicorn main:app --reload
```

The backend will run at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your backend URL (e.g., VITE_API_URL=http://localhost:8000)

# Run development server
npm run dev
```

The frontend will run at `http://localhost:5173`

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `GROQ_API_KEY` | Your Groq API key | Required |
| `ALLOWED_ORIGINS` | CORS allowed origins | `*` |
| `MAX_AUDIO_SIZE_MB` | Max audio file size | `25` |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

## API Endpoints

### Health Check
```
GET /
```

### Transcribe Audio
```
POST /transcribe/
Content-Type: multipart/form-data

Request:
  file: audio file (mp3, wav, m4a, webm)

Response:
  {
    "transcript": "..."
  }
```

### Analyze Transcript
```
POST /analyse/
Content-Type: application/json

Request:
  {
    "transcript": "..."
  }

Response:
  {
    "summary": {
      "tldr": "...",
      "key_points": ["...", "..."]
    },
    "action_items": [
      { "task": "...", "owner": "...", "deadline": "..." }
    ],
    "sentiment": {
      "overall": "positive|neutral|negative",
      "score": 7,
      "per_speaker": {}
    },
    "topics": [
      { "label": "...", "description": "..." }
    ]
  }
```

## Deployment

### Railway (Backend)

1. Create a new Railway project
2. Connect your repository
3. Add the following environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `ALLOWED_ORIGINS`: Your Vercel frontend URL
4. Deploy will start automatically

### Vercel (Frontend)

1. Create a new Vercel project
2. Connect your repository
3. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL
5. Deploy will start automatically

## Getting a Groq API Key

1. Visit [groq.com](https://groq.com)
2. Sign up for an account
3. Navigate to API keys
4. Create a new API key
5. Copy the key to your environment variables

## License

MIT