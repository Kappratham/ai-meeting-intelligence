def summary_prompt(transcript: str) -> str:
    return f"""Analyze the following meeting transcript and provide a summary.

Transcript:
{transcript}

Respond with valid JSON only (no preamble or markdown):
{{
  "tldr": "3-5 sentence TL;DR of the meeting",
  "key_points": ["key point 1", "key point 2", "key point 3", "key point 4", "key point 5"]
}}"""


def action_items_prompt(transcript: str) -> str:
    return f"""Analyze the following meeting transcript and extract all action items.

Transcript:
{transcript}

Respond with valid JSON only (no preamble or markdown):
{{
  "action_items": [
    {{"task": "description of task", "owner": "owner name or null", "deadline": "deadline or null"}}
  ]
}}

If no action items are found, return an empty array."""


def sentiment_prompt(transcript: str) -> str:
    return f"""Analyze the following meeting transcript and determine sentiment.

Transcript:
{transcript}

Respond with valid JSON only (no preamble or markdown):
{{
  "sentiment": {{
    "overall": "positive|neutral|negative",
    "score": 1-10,
    "per_speaker": {{"Speaker 1": {{"sentiment": "positive|neutral|negative", "score": 1-10}}}}
  }}
}}

If speakers are not identifiable, per_speaker should be an empty object."""


def topics_prompt(transcript: str) -> str:
    return f"""Analyze the following meeting transcript and extract main topics discussed.

Transcript:
{transcript}

Respond with valid JSON only (no preamble or markdown):
{{
  "topics": [
    {{"label": "topic label", "description": "1-sentence description"}}
  ]
}}

Provide 3-8 topics."""