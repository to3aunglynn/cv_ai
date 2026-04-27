import React from "react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { SlGraduation } from "react-icons/sl";
import { BsSuitcaseLg } from "react-icons/bs";
import { RiToolsFill } from "react-icons/ri";
import { MdDataObject } from "react-icons/md";
import ResumeTabContent from "./ResumeTabContent";

const processTabs = [
  { id: 1, title: "Personal", icon: FaRegUser },
  { id: 2, title: "Education", icon: SlGraduation },
  { id: 3, title: "Experience", icon: BsSuitcaseLg },
  { id: 4, title: "Skills", icon: RiToolsFill },
  { id: 5, title: "Data", icon: MdDataObject },
];

const ResumeTabs = ({ cv, setCv }) => {
  const [toggle, setToggle] = useState(1);
  return (
    <section className="cv-panel">
      <h3 className="cv-panel__title">Your Resume</h3>

      <div className="resume-layout">
        <ul className="resume-tabs">
          {processTabs.map((item) => {
            const IconComponent = item.icon;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`resume-tab-btn ${
                    toggle === item.id ? "resume-tab-btn--active" : ""
                  }`}
                  onClick={() => setToggle(item.id)}
                  title={item.title}
                  aria-label={item.title}
                >
                  <IconComponent />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="resume-tab-content">
          {processTabs.map((item) => (
            <div
              key={item.id}
              className={`resume-tab-content__panel ${
                toggle === item.id ? "resume-tab-content__panel--active" : ""
              }`}
            >
              <ResumeTabContent item={item} cv={cv} setCv={setCv} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeTabs;
