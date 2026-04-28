import React from "react";
import SkillsInput from "./SkillsInput";
import EducationInput from "./EducationInput";
import ExperienceInput from "./ExperienceInput";

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

      {item.id === 1 && (
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

      {item.id === 2 && (
        <EducationInput
          education={resumeData.education}
          setEducation={(updatedEducation) =>
            setResumeData({
              ...resumeData,
              education: updatedEducation,
            })
          }
        />
      )}

      {item.id === 3 && (
        <ExperienceInput
          experience={resumeData.experience}
          setExperience={(updatedExperience) =>
            setResumeData({
              ...resumeData,
              experience: updatedExperience,
            })
          }
        />
      )}

      {item.id === 4 && (
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

      {item.id === 5 && (
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
