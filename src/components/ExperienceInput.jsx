import React from "react";
import { IoIosClose } from "react-icons/io";

const ExperienceInput = ({ experience, setExperience }) => {
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;

    const experienceDetail = experience[index];

    const updatedExperienceDetail = {
      ...experienceDetail,
      [name]: value,
    };

    const updatedExperience = experience.map((item, i) =>
      i === index ? updatedExperienceDetail : item,
    );

    setExperience(updatedExperience);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        jobTitle: "",
        company: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const removeExperience = (indexToRemove) => {
    const updatedExperience = experience.filter((experienceItem, index) => {
      return index !== indexToRemove;
    });

    setExperience(updatedExperience);
  };

  return (
    <div className="resume-list-form">
      {experience.map((item, index) => (
        <div className="resume-list-form__item" key={index}>
          <div className="resume-list-form__header">
            <h3>{index + 1}</h3>

            {experience.length > 1 && (
              <button
                type="button"
                className="resume-list-form__remove"
                onClick={() => removeExperience(index)}
              >
                <IoIosClose size={40} />
              </button>
            )}
          </div>

          <div className="resume-form-grid">
            <input
              className="resume-builder__input"
              name="jobTitle"
              value={item.jobTitle}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Job title"
            />

            <input
              className="resume-builder__input"
              name="company"
              value={item.company}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Company"
            />

            <input
              className="resume-builder__input"
              name="startYear"
              value={item.startYear}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Start Year"
            />

            <input
              className="resume-builder__input"
              name="endYear"
              value={item.endYear}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="To Year"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className="cv-btn cv-btn--primary resume-list-form__add"
        onClick={addExperience}
      >
        + Add
      </button>
    </div>
  );
};

export default ExperienceInput;
