const validateInputs = (resumeData, job) => {
  if (!resumeData.fullName.trim()) {
    return "Please enter your full name.";
  }

  if (!resumeData.email.trim()) {
    return "Please enter your email address.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(resumeData.email)) {
    return "Please enter a valid email address.";
  }

  if (!resumeData.phone.trim()) {
    return "Please enter your phone number.";
  }

  if (!resumeData.location.trim()) {
    return "Please enter your location.";
  }

  if (!resumeData.summary.trim()) {
    return "Please describe yourself.";
  }

  const hasEducation = resumeData.education.some(
    (edu) =>
      edu.degree.trim() ||
      edu.university.trim() ||
      edu.startYear.trim() ||
      edu.endYear.trim(),
  );

  if (!hasEducation) {
    return "Please add at least one education entry.";
  }

  const hasExperience = resumeData.experience.some(
    (exp) =>
      exp.jobTitle.trim() ||
      exp.company.trim() ||
      exp.startYear.trim() ||
      exp.endYear.trim(),
  );

  if (!hasExperience) {
    return "Please add at least one experience entry.";
  }

  if (resumeData.skills.length === 0) {
    return "Please add at least one skill.";
  }

  if (!job.trim()) {
    return "Please paste the job description.";
  }

  return "";
};

export default validateInputs;
