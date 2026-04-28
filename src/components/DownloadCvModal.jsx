import React from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

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
        <div className="cv-modal__header">
          <div>
            <h2 className="cv-modal__title">Download Tailored CV</h2>
            <p className="cv-modal__subtitle">
              Review the tailored CV content before downloading.
            </p>
          </div>

          <button type="button" className="cv-modal__close" onClick={onClose}>
            <IoIosClose />
          </button>
        </div>

        <div className="cv-modal__body">
          {!result ? (
            <p>No tailored CV data available yet.</p>
          ) : (
            <>
              <section className="cv-modal__section">
                <h3>Personal Information</h3>
                <p>
                  <strong>Name:</strong> {resumeData.fullName || "Not provided"}
                </p>
                <p>
                  <strong>Email:</strong> {resumeData.email || "Not provided"}
                </p>
                <p>
                  <strong>Phone:</strong> {resumeData.phone || "Not provided"}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {resumeData.location || "Not provided"}
                </p>
              </section>

              <section className="cv-modal__section">
                <h3>Education</h3>
                {/* <p>{resumeData.degree || "Not provided"}</p>
                <p>{resumeData.university || ""}</p>
                <p>{resumeData.educationYear || ""}</p> */}
                {resumeData.education?.length > 0 ? (
                  resumeData.education.map((edu, index) => (
                    <div key={index} className="cv-modal__education-item">
                      <p>
                        <strong>Degree:</strong> {edu.degree || "Not provided"}
                      </p>
                      <p>
                        <strong>University:</strong>{" "}
                        {edu.university || "Not provided"}
                      </p>
                      <p>
                        <strong>Years:</strong> {edu.startYear || ""} -{" "}
                        {edu.endYear || ""}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No education details provided.</p>
                )}
              </section>

              <section className="cv-modal__section">
                <h3>Experience</h3>
                <p>{resumeData.jobTitle || "Not provided"}</p>
                <p>{resumeData.company || ""}</p>
                <p>
                  {resumeData.experienceStartYear || ""} -{" "}
                  {resumeData.experienceEndYear || ""}
                </p>
              </section>

              <section className="cv-modal__section">
                <h3>Skills</h3>
                {resumeData.skills?.length > 0 ? (
                  <ul>
                    {resumeData.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{(result && result.matched_skills) || "Not provided"}</p>
                )}
              </section>

              {/* <section className="cv-modal__section">
                <h3>Additional CV Data</h3>
                <p>{cv || "Not provided"}</p>
              </section> */}

              {result && (
                <section className="cv-modal__section">
                  <h3>AI Tailored Suggestions</h3>
                  <p>
                    <strong>Match Score:</strong> {result.match_score}%
                  </p>
                  <p>{result.summary}</p>

                  <h4>Tailored CV Points</h4>
                  <ul>
                    {result.tailored_cv_points?.map((point, index) => (
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
