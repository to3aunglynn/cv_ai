import json
import re

def build_prompt(cv_text, job_description):
    """
    Builds the prompt that will be sent to the AI model.
    """
    prompt = f"""
        You are an AI Resume Tailor.

        Your task is to compare the candidate's CV with the job description and return helpful feedback.

        Return your answer ONLY in this JSON format:

        {{
        "match_score": 0,
        "summary": "",
        "matched_skills": [],
        "missing_skills": [],
        "recommended_keywords": [],
        "improvement_suggestions": [],
        "tailored_cv_points": []
        }}

       Rules:
        - Respond ONLY in valid JSON format.
        - Do not include markdown code blocks (like ```json).
        - Do not include any extra explanation outside the JSON.

        CV Text: {cv_text}

        Job Description: {job_description}
        """
    return prompt.strip()

def format_response(raw_response):
    """
    Cleans the AI response and converts it into a Python dictionary.
    """
    try:
        # Remove markdown code blocks if the AI adds them
        cleaned_response = re.sub(r'```json|```', '', raw_response).strip()
        
        # Convert the cleaned response into a dictionary
        data = json.loads(cleaned_response)
        return data
        
    except json.JSONDecodeError:
        # Return a safe fallback if the AI response is not valid JSON
        return {
            "match_score": 0,
            "summary": "The AI response could not be formatted as JSON.",
            "matched_skills": [],
            "missing_skills": [],
            "recommended_keywords": [],
            "improvement_suggestions": [],
            "tailored_cv_points": [],
            "error": "Failed to parse AI response",
            "raw_response": raw_response
        }