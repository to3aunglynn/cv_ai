import { useEffect, useState } from "react";
import formatResultText from "../utils/formatResultText";
import useTypingEffect from "../hooks/useTypingEffect";
import DownloadCvModal from "./DownloadCvModal";

const OutputPanel = ({ result, loading, error, resumeData }) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const fullText = formatResultText(result);

  // this is from /hooks/useTypingEffect.js
  const { displayedText, isTyping } = useTypingEffect(fullText, 15);

  return (
    <>
      <section className="cv-panel cv-panel--output">
        <h3 className="cv-panel__title">Tailored resume output</h3>

        <div className="cv-ai-output">
          {loading ? (
            <div className="cv-ai-output__loading">AI is analyzing...</div>
          ) : error ? (
            <div className="cv-ai-output__error">{error}</div>
          ) : !result ? (
            <div className="cv-ai-output__success">No data yet.</div>
          ) : (
            <>
              {displayedText}
              {isTyping && <span className="cv-typing-cursor">|</span>}
            </>
          )}
        </div>
      </section>

      <section className="cv-keywords">
        <h3 className="cv-panel__title">Suggested keywords</h3>
        <div className="cv-keywords__row">
          {!isTyping && (
            <ul className="cv-keyword-list">
              {result?.recommended_keywords?.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="cv-btn cv-btn--secondary cv-keywords__copy"
            disabled={!result || isTyping}
            onClick={() => setIsDownloadModalOpen(true)}
          >
            {!isTyping ? (
              <span className="download-text is-visible">Download CV</span>
            ) : (
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
          </button>
        </div>
      </section>
      <DownloadCvModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        result={result}
        resumeData={resumeData}
      />
    </>
  );
};

export default OutputPanel;
