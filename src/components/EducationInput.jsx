import React from "react";
import { IoIosClose } from "react-icons/io";

const EducationInput = ({ education, setEducation }) => {
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;

    const educationDetail = education[index];

    const updatedEducationDetail = {
      ...educationDetail,
      [name]: value,
    };

    const updatedEducation = education.map((item, i) =>
      i === index ? updatedEducationDetail : item,
    );

    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        university: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const removeEducation = (indexToRemove) => {
    const updatedEducation = education.filter((educationItem, index) => {
      return index !== indexToRemove;
    });

    setEducation(updatedEducation);
  };

  return (
    <div className="resume-list-form">
      {education.map((item, index) => (
        <div className="resume-list-form__item" key={index}>
          <div className="resume-list-form__header">
            <h3>{index + 1}</h3>

            {education.length > 1 && (
              <button
                type="button"
                className="resume-list-form__remove"
                onClick={() => removeEducation(index)}
              >
                <IoIosClose size={40} />
              </button>
            )}
          </div>

          <div className="resume-form-grid">
            <input
              className="resume-builder__input"
              name="degree"
              value={item.degree}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Degree"
            />

            <input
              className="resume-builder__input"
              name="university"
              value={item.university}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="University"
            />

            <input
              type="month"
              className="resume-builder__input"
              name="startYear"
              value={item.startYear}
              onChange={(e) => handleEducationChange(index, e)}
            />

            <input
              type="month"
              className="resume-builder__input"
              name="endYear"
              value={item.endYear}
              onChange={(e) => handleEducationChange(index, e)}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className="cv-btn cv-btn--primary resume-list-form__add"
        onClick={addEducation}
      >
        + Add
      </button>
    </div>
  );
};

export default EducationInput;
