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
  jobTitle: "",
  company: "",
  experienceStartYear: "",
  experienceEndYear: "",
  skills: [],
};

function App() {
  const [resumeData, setResumeData] = useState(emptyResumeData);
  const [cv, setCv] = useState(
    "I am a computing student with Python and React experience.",
  );
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

  const handleTailor = async () => {
    if (!cv.trim() || !job.trim()) {
      setError("Please fill in both CV text and job description first.");
      setResult(null);
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeCV(cv, job);
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
        cv={cv}
        setCv={setCv}
        job={job}
        setJob={setJob}
        loading={loading}
        resumeData={resumeData}
        setResumeData={setResumeData}
        onClear={() => {
          setCv("");
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
