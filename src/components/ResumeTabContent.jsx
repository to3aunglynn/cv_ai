import React from "react";
import SkillsInput from "./SkillsInput";
import EducationInput from "./EducationInput";

const ResumeTabContent = ({ item, cv, setCv, resumeData, setResumeData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the input
    setResumeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="resume-tab-content__panel__body">
      <h2 className="resume-tab-content__panel__title">{item.title}</h2>

      {item.title === "Personal" && (
        <div className="resume-form">
          <input
            className="resume-builder__input resume-builder-input-spacing"
            name="fullName"
            value={resumeData.fullName}
            onChange={handleChange}
            placeholder="Full name"
          />
          <input
            className="resume-builder__input resume-builder-input-spacing"
            name="email"
            value={resumeData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <input
            className="resume-builder__input resume-builder-input-spacing"
            name="phone"
            value={resumeData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
          <input
            className="resume-builder__input resume-builder-input-spacing"
            name="location"
            value={resumeData.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
      )}

      {item.title === "Education" && (
        <EducationInput
          education={resumeData.education}
          setEducation={(updatedEducation) =>
            setResumeData({
              ...resumeData,
              education: updatedEducation,
            })
          }
        />
        /* <div className="resume-form-grid">
          <input
            className="resume-builder__input"
            name="degree"
            value={resumeData.degree}
            onChange={handleChange}
            placeholder="Degree / Course"
          />
          <input
            className="resume-builder__input"
            name="university"
            value={resumeData.university}
            onChange={handleChange}
            placeholder="University"
          />
          <input
            className="resume-builder__input"
            name="educationStartYear"
            value={resumeData.educationStartYear}
            onChange={handleChange}
            placeholder="Start Year"
          />
          <input
            className="resume-builder__input"
            name="educationEndYear"
            value={resumeData.educationEndYear}
            onChange={handleChange}
            placeholder="To Year"
          />
        </div> */
      )}

      {item.title === "Experience" && (
        <div className="resume-form-grid">
          <input
            className="resume-builder__input"
            name="jobTitle"
            value={resumeData.jobTitle}
            onChange={handleChange}
            placeholder="Job title"
          />
          <input
            className="resume-builder__input"
            name="company"
            value={resumeData.company}
            onChange={handleChange}
            placeholder="Company"
          />
          <input
            className="resume-builder__input"
            name="experienceStartYear"
            value={resumeData.experienceStartYear}
            onChange={handleChange}
            placeholder="Start Year"
          />
          <input
            className="resume-builder__input"
            name="experienceEndYear"
            value={resumeData.experienceEndYear}
            onChange={handleChange}
            placeholder="To Year"
          />
        </div>
      )}

      {item.title === "Skills" && (
        <SkillsInput
          skills={resumeData.skills}
          setSkills={(updatedSkills) =>
            setResumeData({
              ...resumeData,
              skills: updatedSkills,
            })
          }
        />
      )}

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
