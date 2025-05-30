export default function SkillsInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmedSkill = formData.skill_input.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, trimmedSkill],
        skill_input: "",
      });
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({ ...formData, skills: updatedSkills });
  };

  return (
    <>
      <h1 className="text-white">Skills</h1>
      <p className="text-gray-400">
        Add your core competencies, tools, or technologies you are proficient
        in. This helps highlight your technical or soft skills relevant to your
        field.
      </p>
      <form className="mt-4">
        <section className="flex flex-col">
          <label htmlFor="skills" className="text-white">
            Add your skills below
            <span className="text-gray-400">(max 6 skills)</span>
          </label>
          <span className="flex">
            <input
              type="text"
              className={`w-full px-3 py-1 bg-white border rounded-l-lg ${
                formData.skills.length >= 6 ? "cursor-not-allowed" : ""
              }`}
              id="skills"
              name="skill_input"
              disabled={formData.skills.length >= 6}
              value={formData.skill_input}
              onChange={handleChange}
            />
            <button
              className={`w-1/3 px-3 py-1 text-white bg-blue-500 rounded-r-lg ${
                formData.skills.length >= 6
                  ? "cursor-not-allowed bg-gray-500"
                  : ""
              }`}
              disabled={formData.skills.length >= 6}
              onClick={handleAddSkill}
            >
              Add
            </button>
          </span>
        </section>
      </form>

      <ul className="flex flex-col gap-2 mt-4 text-white">
        {formData.skills.length === 0 && "No skills added yet"}
        {formData.skills.map((skill, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{skill}</span>
            <button
              className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg"
              onClick={() => removeSkill(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
