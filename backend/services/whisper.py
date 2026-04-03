import io
import base64
from openai import OpenAI
from config import NVIDIA_API_KEY

client = OpenAI(
    api_key=NVIDIA_API_KEY,
    base_url="https://integrate.api.nvidia.com/v1"
)


async def transcribe(audio_bytes: bytes, filename: str) -> str:
    """
    Transcribe audio file using NVIDIA Whisper API.
    """
    audio_file = io.BytesIO(audio_bytes)
    audio_file.name = filename

    # Encode audio to base64
    audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')

    response = client.audio.transcriptions.create(
        model="nvidia/param-strato-whisper-large-v2-flash",
        file=audio_file,
        response_format="text"
    )

    return response.text