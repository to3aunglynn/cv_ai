import { useEffect, useState } from "react";
import { getInitialTheme, syncThemeToDocument } from "./theme";
import InputPanel from "./components/InputPanel";
import OutputPanel from "./components/OutputPanel";
import analyzeCV from "./api/cvService";

function App() {
  const [cv, setCv] = useState("");
  const [job, setJob] = useState("");
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
        onClear={() => {
          setCv("");
          setJob("");
          setResult(null);
        }}
        onTailor={handleTailor}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <OutputPanel result={result} loading={loading} error={error} />
    </div>
  );
}

export default App;
