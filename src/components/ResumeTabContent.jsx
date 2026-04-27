import React from "react";
import SkillsInput from "./SkillsInput";

const ResumeTabContent = ({ item, cv, setCv }) => {
  return (
    <div className="resume-tab-content__panel__body">
      <h2 className="resume-tab-content__panel__title">{item.title}</h2>

      {item.title === "Personal" && (
        <div className="resume-form">
          <input
            className="resume-builder__input resume-builder-input-spacing"
            placeholder="Full name"
          />
          <input
            className="resume-builder__input resume-builder-input-spacing"
            placeholder="Email address"
          />
          <input
            className="resume-builder__input resume-builder-input-spacing"
            placeholder="Phone number"
          />
          <input className="resume-builder__input" placeholder="Location" />
        </div>
      )}

      {item.title === "Education" && (
        <div className="resume-form-grid">
          <input
            className="resume-builder__input"
            placeholder="Degree / Course"
          />
          <input className="resume-builder__input" placeholder="University" />
          <input className="resume-builder__input" placeholder="Year" />
        </div>
      )}

      {item.title === "Experience" && (
        <div className="resume-form-grid">
          <input className="resume-builder__input" placeholder="Job title" />
          <input className="resume-builder__input" placeholder="Company" />
          <input className="resume-builder__input" placeholder="Year" />
        </div>
      )}

      {item.title === "Skills" && <SkillsInput />}

      {item.title === "Data" && (
        <div className="resume-form-grid">
          <textarea
            className="cv-textarea"
            placeholder="Paste your current CV - not including User Data..."
            value={cv}
            onChange={(e) => setCv(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeTabContent;
