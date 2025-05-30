import FormField from "./FormField";

export default function PersonalInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="text-white">Personal Info</h1>
      <p className="text-gray-400">
        Provide your basic personal details including your full name, contact
        information, job title, and a brief summary to introduce yourself
        professionally.
      </p>
      <form className="grid grid-cols-3 gap-2 mt-4">
        <section className="col-span-3 space-x-4 flex flex-col">
          <label className="text-white">Profile photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-white px-3 py-2 rounded-lg text-gray-400"
          />
        </section>
        <FormField
          label="Firstname"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          type="text"
        />
        <FormField
          label="Middle Initial"
          name="middleInitial"
          value={formData.middleInitial}
          onChange={handleChange}
        />
        <FormField
          label="Lastname"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <FormField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <FormField
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <FormField
          label="Contact no."
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          type="number"
        />
        <FormField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
        <FormField
          label="Github"
          name="github"
          value={formData.github}
          onChange={handleChange}
        />
        <FormField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        <FormField
          label="Profile Summary"
          name="profileSummary"
          value={formData.profileSummary}
          onChange={handleChange}
          rows={4}
          isTextarea={true}
        />
        <div className="w-full col-span-3 mt-4">
          <h2 className="text-white">Character Reference</h2>
          <p className="mb-4 text-gray-400">
            List professional references who can vouch for your skills, work
            ethic, and experience. Include their name, job title, company, and
            contact information.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              label="Name"
              name="reference_name"
              value={formData.reference_name}
              onChange={handleChange}
            />
            <FormField
              label="Company/Job"
              name="reference_job"
              value={formData.reference_job}
              onChange={handleChange}
            />
            <FormField
              label="Position"
              name="reference_position"
              value={formData.reference_position}
              onChange={handleChange}
            />
            <FormField
              label="Contact"
              name="reference_contact"
              value={formData.reference_contact}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
