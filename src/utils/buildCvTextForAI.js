const buildCvTextForAI = (resumeData) => {
  const educationText = resumeData.education
    .map((edu, index) => {
      return `
Education ${index + 1}:
Degree/Course: ${edu.degree}
University: ${edu.university}
Start Year: ${edu.startYear}
End Year: ${edu.endYear}
`;
    })
    .join("\n");

  const experienceText = resumeData.experience
    .map((exp, index) => {
      return `
Experience ${index + 1}:
Job Title: ${exp.jobTitle}
Company: ${exp.company}
Start Year: ${exp.startYear}
End Year: ${exp.endYear}
`;
    })
    .join("\n");

  return `

Candidate Summary:
${resumeData.summary}

${educationText}

${experienceText}

Skills:
${resumeData.skills.join(", ")}


`;
};

export default buildCvTextForAI;
