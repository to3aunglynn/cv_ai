import os
from pathlib import Path
from groq import Groq
from dotenv import load_dotenv
from prompt_builder import build_prompt, format_response

load_dotenv(Path(__file__).parent / ".env")


def analyze_cv(cv_text, job_description):
    api_key = os.getenv("AI_API_KEY") or open(Path(__file__).parent / ".env").read().split("=", 1)[1].strip()
    client = Groq(api_key=api_key)
    prompt = build_prompt(cv_text, job_description)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    raw_text = response.choices[0].message.content
    return format_response(raw_text)
