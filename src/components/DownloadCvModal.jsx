import React from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import formatMonthYear from "../utils/formatMonthYear";

const DownloadCvModal = ({ isOpen, onClose, result, resumeData }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="cv-modal-overlay">
      <div className="cv-modal">
        {/* <div className="cv-modal__header">
          <div>
            <h2 className="cv-modal__title">Download Tailored CV</h2>
            <p className="cv-modal__subtitle">
              Review the tailored CV content before downloading.
            </p>
          </div>

          <button type="button" className="cv-modal__close" onClick={onClose}>
            <IoIosClose />
          </button>
        </div> */}

        <div className="cv-modal__header cv-preview-header">
          <button type="button" className="cv-modal__close" onClick={onClose}>
            <IoIosClose />
          </button>

          <h2 className="cv-preview-header__name">
            {resumeData?.fullName || "Your Name"}
          </h2>

          <div className="cv-preview-header__contact">
            <span>
              <FiMail />
              {resumeData?.email || "email@example.com"}
            </span>

            <span>
              <FiPhone />
              {resumeData?.phone || "Phone number"}
            </span>

            <span>
              <FiMapPin />
              {resumeData?.location || "Location"}
            </span>
          </div>
        </div>

        <div className="cv-modal__body">
          {!result ? (
            <p>No tailored CV data available yet.</p>
          ) : (
            <>
              <section className="cv-modal__section cv-preview-section">
                <h1>Summary</h1>
                <p>{result?.summary}</p>
              </section>

              <section className="cv-modal__section cv-preview-section">
                <h1 className="cv-preview-section__title">Education</h1>

                {resumeData.education?.length > 0 ? (
                  resumeData.education.map((edu, index) => (
                    <div key={index} className="cv-preview-entry">
                      <div className="cv-preview-entry__main">
                        <h2>{edu.degree || "Degree / Course not provided"}</h2>
                        <p>{edu.university || "University not provided"}</p>
                      </div>

                      <span className="cv-preview-entry__date">
                        {edu.startYear || edu.endYear
                          ? `${formatMonthYear(edu.startYear)} - ${formatMonthYear(edu.endYear)}`
                          : "Date not provided"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="cv-preview-empty">
                    No education details provided.
                  </p>
                )}
              </section>

              <section className="cv-modal__section cv-preview-section">
                <h1 className="cv-preview-section__title">Experience</h1>

                {resumeData.experience?.length > 0 ? (
                  resumeData.experience.map((exp, index) => (
                    <div key={index} className="cv-preview-entry">
                      <div className="cv-preview-entry__main">
                        <h2>{exp.jobTitle || "no"}</h2>
                        <p>{exp.company || "no"}</p>
                      </div>

                      <span className="cv-preview-entry__date">
                        {exp.startYear || exp.endYear
                          ? `${formatMonthYear(exp.startYear)} - ${formatMonthYear(exp.endYear)}`
                          : "Date not provided"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="cv-preview-empty">
                    No experience details provided.
                  </p>
                )}
              </section>

              <section className="cv-modal__section cv-preview-section">
                <h1 className="cv-preview-section__title">Skills</h1>

                {resumeData.skills?.length > 0 ? (
                  <ul className="cv-preview-skills">
                    {resumeData.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : result?.matched_skills?.length > 0 ? (
                  <ul className="cv-preview-skills">
                    {result.matched_skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="cv-preview-empty">No skills provided.</p>
                )}
              </section>

              {result && (
                <section className="cv-modal__section">
                  <h1>AI Tailored Suggestions</h1>
                  <p>
                    <strong>Match Score:</strong> {result.match_score}%
                  </p>
                  <p>{result?.summary}</p>

                  <h4>Tailored CV Points</h4>
                  <ul>
                    {result?.tailored_cv_points?.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>

        <div className="cv-modal__footer">
          <button
            type="button"
            className="cv-btn cv-btn--ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="cv-btn cv-btn--primary"
            disabled={!result}
            onClick={() => {
              // Later you can replace this with PDF/DOCX download logic
              alert("Download feature will be added later.");
            }}
          >
            Confirm Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadCvModal;
