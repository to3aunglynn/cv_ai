from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_service import analyze_cv

app = Flask(__name__)
CORS(app)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    cv_text = data.get("cv_text", "").strip()
    job_description = data.get("job_description", "").strip()

    if not cv_text or not job_description:
        return jsonify({"error": "cv_text and job_description are required"}), 400

    result = analyze_cv(cv_text, job_description)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
