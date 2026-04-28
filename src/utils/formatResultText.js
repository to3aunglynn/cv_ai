const formatResultText = (data) => {
  if (!data) return "";
  const sections = [
    ["Match Score", `${data.match_score ?? 0}%`],
    ["Summary", data.summary || "No summary available."],
    ["Professional Summary", data.professional_summary || ""],
    ["Matched Skills", data.matched_skills],
    ["Missing Skills", data.missing_skills],
    ["Improvement Suggestions", data.improvement_suggestions],
    ["Tailored CV Points", data.tailored_cv_points],
    ["Uk ATS Advice", data.uk_ats_advice],
  ];

  const result = sections.map(([title, content]) => {
      const body = Array.isArray(content) 
        ? content.map((item) => `• ${item}`).join("\n") 
        : content;
      return `${title}:\n${body || "None"}\n`;
    })
    .join("\n");

  return result;
};

export default formatResultText;