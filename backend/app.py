from flask import Flask, request, jsonify
from flask_cors import CORS
import groq
from ai_service import analyze_cv

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Resume Tailor backend is running"

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        cv_text = data.get("cv_text", "")
        job_description = data.get("job_description", "")

        if not cv_text or not job_description:
            return jsonify({"error": "Both cv_text and job_description are required."}), 400

        analysis_result = analyze_cv(cv_text, job_description)
        return jsonify(analysis_result)
    
    except groq.RateLimitError as e:
        # Specifically handle "Too many requests" (Free tier common issue)
        return jsonify({"error": "Groq is busy. Please wait a few seconds before trying again."}), 429

    except groq.APIStatusError as e:
        # Handle other API issues (Invalid key, server down)
        return jsonify({"error": f"Groq API error (Status: {e.status_code})"}), e.status_code
    
    except Exception as e:
        # Catch-all for formatting errors or Python bugs
        print(f"General Error: {e}")
        return jsonify({"error": "An unexpected error occurred during analysis."}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
