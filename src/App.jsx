import { useEffect, useState } from "react";
import { getInitialTheme, syncThemeToDocument } from "./theme/theme";
import InputPanel from "./components/InputPanel";
import OutputPanel from "./components/OutputPanel";
import analyzeCV from "./api/cvService";

const emptyResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  education: [
    {
      degree: "",
      university: "",
      startYear: "",
      endYear: "",
    },
  ],
  experience: [
    {
      jobTitle: "",
      company: "",
      startYear: "",
      endYear: "",
    },
  ],
  skills: [],

  summary: "I am a computing student with Python and React experience.",
};

function App() {
  const [resumeData, setResumeData] = useState(emptyResumeData);
  const [job, setJob] = useState(
    "We are looking for a junior developer with Flask and React skills.",
  );
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    syncThemeToDocument(theme);
  }, [theme]);

  const buildCvTextForAI = () => {
    const educationText = resumeData.education
      .map((edu, index) => {
        return `
Education ${index + 1}:
Degree/Course: ${edu.degree}
University: ${edu.university}
Start Year: ${edu.startYear}
End Year: ${edu.endYear}
`;
      })
      .join("\n");

    const experienceText = resumeData.experience
      .map((exp, index) => {
        return `
Experience ${index + 1}:
Job Title: ${exp.jobTitle}
Company: ${exp.company}
Start Year: ${exp.startYear}
End Year: ${exp.endYear}
`;
      })
      .join("\n");

    return `

Candidate Summary:
${resumeData.summary}

${educationText}

${experienceText}

Skills:
${resumeData.skills.join(", ")}


`;
  };

  const handleTailor = async () => {
    const cvTextForAI = buildCvTextForAI();

    if (!cvTextForAI.trim() || !job.trim()) {
      setError("Please fill in both CV text and job description first.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await analyzeCV(cvTextForAI, job);
      setResult(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze CV. Please check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-app">
      <InputPanel
        job={job}
        setJob={setJob}
        loading={loading}
        resumeData={resumeData}
        setResumeData={setResumeData}
        onClear={() => {
          setJob("");
          setResult(null);
          setResumeData(emptyResumeData);
        }}
        onTailor={handleTailor}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <OutputPanel
        result={result}
        loading={loading}
        error={error}
        resumeData={resumeData}
      />
    </div>
  );
}

export default App;
