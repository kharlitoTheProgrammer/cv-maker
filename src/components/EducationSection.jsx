import FormField from "./FormField";

export default function EducationSection({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const trimmedDegree = formData.degree.trim();
    const trimmedSchoolName = formData.schoolName.trim();
    const trimmedSchoolYearStart = formData.schoolYearStart.trim();
    const trimmedSchoolYearEnd = formData.schoolYearEnd.trim();

    if (
      trimmedDegree &&
      trimmedSchoolName &&
      trimmedSchoolYearStart &&
      trimmedSchoolYearEnd
    ) {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          {
            degree: trimmedDegree,
            schoolName: trimmedSchoolName,
            schoolYearStart: trimmedSchoolYearStart,
            schoolYearEnd: trimmedSchoolYearEnd,
          },
        ],
        degree: "",
        schoolName: "",
        schoolYearStart: "",
        schoolYearEnd: "",
      });
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
  };

  return (
    <div>
      <h1 className="text-white">Education</h1>
      <p className="text-gray-400">
        Provide your educational background, including degrees, schools
        attended, and graduation dates. This supports your qualifications and
        academic history.
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <FormField
          label="Degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
        />
        <FormField
          label="School/University"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleChange}
        />
        <div className="flex w-full gap-4 ">
          <FormField
            label="Year Start"
            name="schoolYearStart"
            value={formData.schoolYearStart}
            onChange={handleChange}
          />
          <FormField
            label="Year Graduated"
            name="schoolYearEnd"
            value={formData.schoolYearEnd}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleAddEducation}
          className="p-3 text-white bg-blue-500 rounded-lg"
        >
          Add Education
        </button>
        <ul>
          {formData.education.length === 0 && (
            <span className="text-white">No education added yet</span>
          )}
          {formData.education.map((edu, index) => (
            <li key={index} className="p-3 bg-gray-500 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-white">{edu.degree}</h3>
                  <span className="text-white">{edu.schoolName}</span>
                  <span className="text-white">
                    {edu.schoolYearStart} - {edu.schoolYearEnd}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="px-3 py-1 text-white bg-red-500 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
