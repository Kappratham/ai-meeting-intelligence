from fastapi import APIRouter, UploadFile, File, HTTPException
from config import MAX_AUDIO_SIZE_MB

from services import whisper

router = APIRouter()

ALLOWED_EXTENSIONS = {"mp3", "wav", "m4a", "webm"}


@router.post("/")
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Transcribe an audio file to text using Groq Whisper API.
    """
    if file.size and file.size > MAX_AUDIO_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size is {MAX_AUDIO_SIZE_MB}MB"
        )

    extension = file.filename.split(".")[-1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    try:
        audio_bytes = await file.read()
        transcript = await whisper.transcribe(audio_bytes, file.filename)
        return {"transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")