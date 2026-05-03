import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { IoIosClose } from "react-icons/io";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import formatMonthYear from "../utils/formatMonthYear";

const DownloadCvModal = ({ isOpen, onClose, result, resumeData }) => {
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData?.fullName || "CV"}_CV`,
  });

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

            <span className="cv-preview-header__location">
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
                <h1>Profile</h1>
                <p>{result?.professional_summary}</p>
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
                        {result?.experience_bullets?.length > 0 && (
                          <ul className="cv-preview-bullets">
                            {result.experience_bullets.map((bullet, index) => (
                              <li key={index}>{bullet}</li>
                            ))}
                          </ul>
                        )}
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
            onClick={handlePrint}
          >
            Confirm Download
          </button>
        </div>
      </div>

      {/* This is for printing */}
      <div className="cv-print-only">
        <div ref={printRef} className="cv-print-page">
          <header className="cv-print-header">
            <h1>{resumeData?.fullName || "Your Name"}</h1>

            <div className="cv-print-contact">
              <span>{resumeData?.email || "email@example.com"}</span>
              <span>{resumeData?.phone || "Phone number"}</span>
              <span className="cv-preview-header__location">
                {resumeData?.location || "Location"}
              </span>
            </div>
          </header>

          <section className="cv-print-section">
            <h2>Profile</h2>
            <p>{result?.professional_summary}</p>
          </section>

          <section className="cv-print-section">
            <h2>Education</h2>

            {resumeData.education?.length > 0 ? (
              resumeData.education.map((edu, index) => (
                <div key={index} className="cv-print-entry">
                  <div className="cv-print-entry__main">
                    <h3>{edu.degree || "Degree / Course not provided"}</h3>
                    <p>{edu.university || "University not provided"}</p>
                  </div>

                  <span>
                    {edu.startYear || edu.endYear
                      ? `${formatMonthYear(edu.startYear)} - ${formatMonthYear(edu.endYear)}`
                      : "Date not provided"}
                  </span>
                </div>
              ))
            ) : (
              <p>No education details provided.</p>
            )}
          </section>

          <section className="cv-print-section">
            <h2>Experience</h2>

            {resumeData.experience?.length > 0 ? (
              resumeData.experience.map((exp, index) => (
                <div key={index} className="cv-print-entry">
                  <div className="cv-print-entry__main">
                    <h3>{exp.jobTitle || "Job title not provided"}</h3>
                    <p>{exp.company || "Company not provided"}</p>
                    {result?.experience_bullets?.length > 0 && (
                      <ul>
                        {result.experience_bullets.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <span>
                    {exp.startYear || exp.endYear
                      ? `${formatMonthYear(exp.startYear)} - ${formatMonthYear(exp.endYear)}`
                      : "Date not provided"}
                  </span>
                </div>
              ))
            ) : (
              <p>No experience details provided.</p>
            )}
          </section>

          <section className="cv-print-section">
            <h2>Skills</h2>

            {resumeData.skills?.length > 0 ? (
              <ul>
                {resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : result?.matched_skills?.length > 0 ? (
              <ul>
                {result.matched_skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills provided.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DownloadCvModal;
