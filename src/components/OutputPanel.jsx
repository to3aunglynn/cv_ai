import React from "react";

const OutputPanel = ({ result, loading, error }) => {
  if (loading)
    return <div className="cv-panel">AI is analyzing your CV...</div>;

  if (error) return <div className="cv-panel cv-panel--error">{error}</div>;

  if (!result) {
    return (
      <div className="cv-panel">
        No analysis data yet. Please fill in your resume and job description and
        click "Tailor Resume" to start.
      </div>
    );
  }

  console.log(result);

  return (
    <>
      <section className="cv-panel cv-panel--output">
        <h3 className="cv-panel__title">Tailored resume output</h3>
        <textarea
          className="cv-textarea cv-textarea--readonly"
          rows={10}
          value={result?.summary || ""}
          readOnly
        />
      </section>

      <section className="cv-keywords">
        <h3 className="cv-panel__title">Suggested keywords</h3>
        <div className="cv-keywords__row">
          <ul className="cv-keyword-list">
            {result?.recommended_keywords?.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>

          <button
            type="button"
            className="cv-btn cv-btn--secondary cv-keywords__copy"
          >
            Copy resume
          </button>
        </div>
      </section>
    </>
  );
};

export default OutputPanel;
