import React from "react";
import ResumeTabs from "./ResumeTabs";

const InputPanel = ({
  job,
  setJob,
  resumeData,
  setResumeData,
  onClear,
  onTailor,
  loading,
  theme,
  toggleTheme,
}) => {
  return (
    <>
      <header className="cv-header">
        <div className="cv-header__brand">
          <h1 className="cv-title">AI CV Tailor</h1>
          <p className="cv-subtitle">
            Paste your resume and a job description to align wording and
            keywords.
          </p>
        </div>
        <div className="cv-header__actions">
          <button
            type="button"
            className="cv-theme-toggle"
            onClick={toggleTheme}
            title={theme === "light" ? "Light mode" : "Dark mode"}
          >
            <span className="cv-theme-toggle__emoji">
              {theme === "light" ? "☀️" : "🌙"}
            </span>
          </button>
        </div>
      </header>

      <div className="cv-input-row">
        <ResumeTabs
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <section className="cv-panel">
          <h3 className="cv-panel__title">Job Description</h3>
          <textarea
            className="cv-textarea cv-textarea--height-fixed"
            placeholder="Paste the role description..."
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </section>
      </div>

      <div className="cv-actions">
        <button
          type="button"
          className="cv-btn cv-btn--ghost"
          onClick={onClear}
        >
          Clear Output
        </button>
        <button
          type="button"
          className="cv-btn cv-btn--primary"
          onClick={onTailor}
          disabled={loading}
        >
          {loading ? "Tailoring..." : "Tailor Resume"}
        </button>
      </div>
    </>
  );
};

export default InputPanel;
