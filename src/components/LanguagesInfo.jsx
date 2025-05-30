export default function LanguagesInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddLanguage = (e) => {
    e.preventDefault();
    const trimmedLanguage = formData.languages_input.trim();
    if (
      trimmedLanguage &&
      !formData.languages.includes(trimmedLanguage) &&
      formData.languages.length < 3
    ) {
      setFormData({
        ...formData,
        languages: [...formData.languages, trimmedLanguage],
        languages_input: "",
      });
    }
  };

  const removeLanguage = (index) => {
    const updatedLanguage = [...formData.languages];
    updatedLanguage.splice(index, 1);
    setFormData({ ...formData, languages: updatedLanguage });
  };

  return (
    <>
      <h1 className="text-white">Languages</h1>
      <p className="text-gray-400">
        List the languages you speak or write proficiently. This can include
        native, fluent, or basic proficiency levels, and is especially helpful
        if you're applying for roles that require communication in multiple
        languages.
      </p>
      <form className="mt-4">
        <section className="flex flex-col">
          <label htmlFor="languages" className="text-white">
            Add language here
            <span className="text-gray-400"> (max 3 languages)</span>
          </label>
          <span className="flex">
            <input
              type="text"
              className={`w-full px-3 py-1 bg-white border rounded-l-lg ${
                formData.languages.length >= 3
                  ? "cursor-not-allowed bg-gray-500"
                  : ""
              }`}
              id="languages"
              name="languages_input"
              disabled={formData.languages.length >= 3}
              value={formData.languages_input}
              onChange={handleChange}
            />
            <button
              className={`w-1/3 px-3 py-1 text-white bg-blue-500 rounded-r-lg ${
                formData.languages.length >= 3
                  ? "bg-gray-500 cursor-not-allowed"
                  : ""
              }`}
              disabled={formData.languages.length >= 3}
              onClick={handleAddLanguage}
            >
              Add
            </button>
          </span>
        </section>
      </form>

      <ul className="flex flex-col gap-2 mt-4 text-white">
        {formData.languages.length === 0 && "No languages added yet"}
        {formData.languages.map((skill, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{skill}</span>
            <button
              className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg"
              onClick={() => removeLanguage(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
