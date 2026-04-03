from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services import preprocessor, analyser

router = APIRouter()


class AnalyseRequest(BaseModel):
    transcript: str


@router.post("/")
async def analyse_transcript(request: AnalyseRequest):
    """
    Analyze a transcript text and return insights.
    """
    if not request.transcript or not request.transcript.strip():
        raise HTTPException(
            status_code=400,
            detail="Transcript cannot be empty"
        )

    try:
        processed_text = preprocessor.process(request.transcript)
        insights = await analyser.analyse(processed_text)
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")