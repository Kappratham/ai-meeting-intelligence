import json
import asyncio
from openai import OpenAI
from config import NVIDIA_API_KEY
from . import prompts

client = OpenAI(
    api_key=NVIDIA_API_KEY,
    base_url="https://integrate.api.nvidia.com/v1"
)


async def analyse(processed_text: str) -> dict:
    """
    Run 4 parallel LLM analysis tasks on the transcript.
    """
    summary_task = run_llm(prompts.summary_prompt(processed_text))
    action_items_task = run_llm(prompts.action_items_prompt(processed_text))
    sentiment_task = run_llm(prompts.sentiment_prompt(processed_text))
    topics_task = run_llm(prompts.topics_prompt(processed_text))

    results = await asyncio.gather(
        summary_task,
        action_items_task,
        sentiment_task,
        topics_task
    )

    summary, action_items, sentiment, topics = results

    return {
        "summary": summary,
        "action_items": action_items.get("action_items", []),
        "sentiment": sentiment.get("sentiment", {
            "overall": "neutral",
            "score": 5,
            "per_speaker": {}
        }),
        "topics": topics.get("topics", [])
    }


async def run_llm(prompt: str) -> dict:
    """
    Call NVIDIA Kimi K2.5 model API and parse JSON response.
    """
    response = client.chat.completions.create(
        model="moonshotai/kimi-k2.5",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
        temperature=0.3,
        max_tokens=16384
    )

    content = response.choices[0].message.content

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {}