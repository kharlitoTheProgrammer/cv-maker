import FormField from "./FormField";

export default function ExperienceSection({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    const trimmedExperienceTitle = formData.experienceTitle.trim();
    const trimmedExperienceYear = formData.experienceYear.trim();
    const trimmedExperienceDescription = formData.experienceDescription.trim();
    if (
      trimmedExperienceTitle &&
      trimmedExperienceYear &&
      trimmedExperienceDescription
    ) {
      setFormData({
        ...formData,
        experience: [
          ...formData.experience,
          {
            title: trimmedExperienceTitle,
            year: trimmedExperienceYear,
            description: trimmedExperienceDescription,
          },
        ],
        experienceTitle: "",
        experienceYear: "",
        experienceDescription: "",
      });
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    setFormData({ ...formData, experience: updatedExperience });
  };

  return (
    <section className="flex flex-col">
      <h2 className="text-white">Experience</h2>
      <p className="text-gray-400">
        Detail your past work experiences, including job title, duration, and
        responsibilities. This shows your professional background and
        achievements.
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <FormField
            name="experienceTitle"
            label="Job Title"
            value={formData.experienceTitle}
            onChange={handleChange}
          />
          <FormField
            name="experienceYear"
            label="Year"
            value={formData.experienceYear}
            onChange={handleChange}
          />
          <FormField
            name="experienceDescription"
            label="Job Description"
            value={formData.experienceDescription}
            onChange={handleChange}
            isTextarea={true}
          />
        </div>
      </div>
      <button
        onClick={handleAddExperience}
        className="p-3 mt-4 text-white bg-blue-500 rounded-lg"
        disabled={formData.experience.length >= 2}
      >
        Add Experience
      </button>
      <ul>
        {formData.experience.length === 0 && "No experience added yet."}
        {formData.experience.map((exp, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 mt-3 bg-white rounded-lg"
          >
            <div className="flex flex-col text-gray-500">
              <span className="flex text-black">
                {exp.title} - {exp.year}
              </span>
              {exp.description}
            </div>
            <button
              onClick={() => handleRemoveExperience(index)}
              className="px-3 py-1 text-white bg-red-500 rounded-lg"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
