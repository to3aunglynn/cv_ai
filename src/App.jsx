import { useEffect, useState } from "react";
import { getInitialTheme, syncThemeToDocument } from "./theme";

function App() {
  const [cv, setCv] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    syncThemeToDocument(theme);
  }, [theme]);

  return (
    <div className="cv-app">
      <header className="cv-header">
        <div className="cv-header__brand">
          <h1 className="cv-title">AI CV Tailor</h1>
          <p className="cv-subtitle">
            Paste your resume and a job description to align wording and keywords.
          </p>
        </div>
        <div className="cv-header__actions">
          <button
            type="button"
            className="cv-theme-toggle"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            title={theme === "light" ? "Light mode" : "Dark mode"}
          >
            <span className="cv-theme-toggle__emoji" aria-hidden="true">
  {theme === "light" ? "☀️" : "🌙"}
</span>
          </button>
        </div>
      </header>

      <div className="cv-input-row">
        <section className="cv-panel">
          <h3 className="cv-panel__title">Your Resume</h3>
          <textarea
            className="cv-textarea"
            rows={8}
            placeholder="Paste your current CV or bullet points…"
            value={cv}
            onChange={(e) => setCv(e.target.value)}
          />
        </section>

        <section className="cv-panel">
          <h3 className="cv-panel__title">Job Description</h3>
          <textarea
            className="cv-textarea"
            rows={8}
            placeholder="Paste the role description or requirements…"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </section>
      </div>

      <div className="cv-actions">
        <button
          type="button"
          className="cv-btn cv-btn--ghost"
          onClick={() => {
            setCv("");
            setJob("");
          }}
        >
          Clear Upload
        </button>
        <button type="button" className="cv-btn cv-btn--primary">
          Tailor Resume
        </button>
      </div>

      <section className="cv-panel cv-panel--output">
        <h3 className="cv-panel__title">Tailored resume output</h3>
        <textarea
          className="cv-textarea cv-textarea--readonly"
          rows={10}
          placeholder="Tailored copy will appear here…"
          value={result}
          readOnly
        />
      </section>

      <section className="cv-keywords">
        <h3 className="cv-panel__title">Suggested keywords</h3>
        <div className="cv-keywords__row">
          <ul className="cv-keyword-list">
            <li>Keyword one</li>
            <li>Keyword two</li>
            <li>Keyword three</li>
          </ul>
          <button type="button" className="cv-btn cv-btn--secondary cv-keywords__copy">
            Copy resume
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
