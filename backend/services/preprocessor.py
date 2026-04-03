import re


def process(transcript: str) -> str:
    """
    Clean and chunk transcript text.
    - Strip Whisper artifacts
    - Handle speaker detection
    - Chunk if > 3000 words
    """
    cleaned = clean_text(transcript)

    word_count = len(cleaned.split())
    if word_count > 3000:
        return chunk_text(cleaned)

    return cleaned


def clean_text(text: str) -> str:
    """
    Remove common Whisper artifacts and normalize whitespace.
    """
    text = re.sub(r'\[inaudible\]|\[inaud\]', '', text, flags=re.IGNORECASE)

    text = re.sub(r'\b(\w+)\s+\1\b', r'\1', text)

    text = re.sub(r'\s+', ' ', text)

    text = text.strip()

    return text


def chunk_text(text: str, chunk_size: int = 3000, overlap: int = 200) -> str:
    """
    Split text into overlapping chunks.
    """
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        chunks.append(chunk)

    return "\n\n---CHUNK---\n\n".join(chunks)