import React from "react";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const SkillsInput = () => {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const addSkill = () => {
    const newSkill = skillInput.trim();

    if (!newSkill) return;

    if (skills.includes(newSkill)) {
      setSkillInput("");
      return;
    }

    setSkills([...skills, newSkill]);
    setSkillInput("");
  };
  console.log("Skills:", skills);

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="resume-form">
      <div className="resume-form__input-row">
        <input
          type="text"
          className="resume-builder__input"
          placeholder="Example: Python, React, Project management"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />

        <button
          type="button"
          className="cv-btn cv-btn--primary"
          onClick={addSkill}
        >
          <span>+</span>
          Add
        </button>
      </div>

      <div className="skills-builder__chips">
        {skills.map((skill, index) => (
          <span className="skills-builder__chip" key={index}>
            {skill}
            <button type="button" onClick={() => removeSkill(skill)}>
              <IoIosClose />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
