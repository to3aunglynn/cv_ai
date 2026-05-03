# AI CV Tailor

AI CV Tailor is a web application that helps users improve their CV based on a job description. The user can enter resume details and a job description, then the system sends the information to an AI backend and returns a tailored analysis such as match score, missing skills, recommended keywords, improvement suggestions, and tailored CV points.

<!--
## Screenshots

### Dark Mode
![AI-CV-DarkMode](./dark.png)

### Light Mode
![AI-CV-LightMode](./light.png)
-->
---

## Technologies Used

### Frontend
- React
- Vite
- CSS
- Axios
- React Icons

### Backend
- Python
- Flask
- Flask-CORS
- Groq API

---

## Project Structure

```bash
cv_ai/
├── backend/
│   ├── app.py
│   ├── ai_service.py
│   ├── prompt_builder.py
│   ├── requirements.txt
│   └── .env
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── theme/
│   ├── utils/
│   └── App.jsx
│   └── index.css
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## How to Run the Project
This project requires both the frontend and backend to run.

### 1. Backend Setup
- First, open the backend folder:
```bash
cd backend
```

- Create a virtual environment:
```bash
python3 -m venv venv
```

- Activate the virtual environment:
  - MacOS/Linux
  ```bash
  source venv/bin/activate
  ```
  - Windows
  ```bash
  venv\Scripts\activate
  ```

- Install backend dependencies:
```bash
pip install -r requirements.txt
```

- Create a .env file inside the backend folder:
```bash
touch .env
```

- Add your Groq API key inside backend/.env:
```bash
AI_API_KEY=your_groq_api_key_here
```

- Start the Flask backend:
```bash
python3 app.py
```

- The backend should run on:
```bash
[python3 app.py](http://127.0.0.1:5000)
```

- Backend URL: http://127.0.0.1:5000


---

### 2. Frontend Setup
- Open a new terminal and go back to the main project folder:
```bash
cd ..
```

- Install frontend dependencies:
```bash
npm install
```

- Start the frontend:
```bash
npm run dev
```

- Open the URL shown in the terminal, usually:
```bash
[npm install](http://localhost:5173)
```

- Frontend URL: http://localhost:5173

---

### Example API Request
- The frontend sends data to the backend using this endpoint:
```bash
POST /api/analyze
```

- Example request body:
```bash
{
  "cv_text": "I am a computing student with Python and React experience.",
  "job_description": "We are looking for a junior developer with Flask and React skills."
}
```

- Example response:
```bash
{
  "match_score": 60,
  "summary": "The candidate has relevant experience with React but lacks Flask experience.",
  "matched_skills": ["React"],
  "missing_skills": ["Flask"],
  "recommended_keywords": ["Junior Developer", "React", "Flask"],
  "improvement_suggestions": ["Add Flask projects or coursework if available."],
  "tailored_cv_points": ["Built React-based frontend projects with reusable components."]
}
```

---

### Production Build
- To build the frontend for production:
```bash
npm run build
```

- To preview the production build locally:
```bash
npm run preview
```

---

### Requirement
- [Node.js](https://nodejs.org/) 18 or newer
- [Python](https://www.python.org) 3.10 or newer
- [Groq API key](https://groq.com)
