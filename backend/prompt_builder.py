import json
import re

def build_prompt(cv_text, job_description):
    """
    Builds the prompt that will be sent to the AI model.
    """
    prompt = f"""
You are an AI Resume Tailor for the UK job market.

Your task is to compare the candidate's CV with the job description and provide ATS-friendly improvement feedback.

Follow these UK CV and ATS rules:
- Use British English.
- Do not suggest adding photo, age, gender, marital status, nationality, or full home address.
- Recommend clear CV sections such as Personal Profile, Key Skills, Education, Experience, Projects, and Technical Skills.
- Use keywords from the job description naturally.
- Suggest concise bullet points with action verbs.
- Avoid tables, columns, images, icons, and complex formatting.
- Focus on skills, experience, education, projects, and measurable achievements.
- The match_score must be an integer from 0 to 100. Do not use decimals.
- Score fairly based on the information provided.
- If the CV contains direct required skills from the job description, the score should reflect that match.
- Do not give an extremely low score only because the CV is short.
- For a junior role, education, projects, and technical skills should count as relevant evidence.
- If key job skills are present but experience details are limited, use a medium score such as 45 to 60.
- If key job skills are present but experience details are missing, use a low score such as 30 to 40.
- If key job skills are missing, use a low score such as 10 to 20.

Return your answer ONLY in this JSON format:

{{
  "match_score": 0,
  "summary": "",
  "matched_skills": [],
  "missing_skills": [],
  "recommended_keywords": [],
  "improvement_suggestions": [],
  "tailored_cv_points": [],
  "uk_ats_advice": []
}}

CV Text:
{cv_text}

Job Description:
{job_description}
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
            "uk_ats_advice": [],
            "error": "Failed to parse AI response",
            "raw_response": raw_response
        }