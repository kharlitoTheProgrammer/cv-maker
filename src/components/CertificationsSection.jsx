import FormField from "./FormField";

export default function CertificationsSection({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    const trimmedTitle = formData.certificationTitle.trim();
    const trimmedYear = formData.certificationYear.trim();
    const trimmedOrganization = formData.issuingOrganization.trim();
    if (trimmedTitle && trimmedYear && trimmedOrganization) {
      setFormData({
        ...formData,
        certifications: [
          ...formData.certifications,
          {
            title: trimmedTitle,
            year: trimmedYear,
            organization: trimmedOrganization,
          },
        ],
        certificationTitle: "",
        certificationYear: "",
        issuingOrganization: "",
      });
    }
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications.splice(index, 1);
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  return (
    <div>
      <h1 className="text-white">Certifications</h1>
      <p className="text-gray-400">
        Add any certifications or training you've completed. Include the title,
        issuing organization, and the year received to validate your expertise.
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <FormField
          label="Certification Title"
          name="certificationTitle"
          value={formData.certificationTitle}
          onChange={handleChange}
        />
        <FormField
          label="Certification Year"
          name="certificationYear"
          value={formData.certificationYear}
          onChange={handleChange}
        />
        <FormField
          label="Issuing Organization"
          name="issuingOrganization"
          value={formData.issuingOrganization}
          onChange={handleChange}
        />
        <button
          onClick={handleAddCertification}
          className="p-3 text-white bg-blue-500 rounded-lg"
        >
          Add Certificate
        </button>

        <ul>
          {formData.certifications.length === 0 && (
            <span className="text-white">No certifications added yet</span>
          )}
          {formData.certifications.map((cert, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 mb-2 text-white bg-gray-800 rounded-lg "
            >
              <div className="flex flex-col">
                <span>
                  {cert.title} - {cert.year}
                </span>
                <span>{cert.organization}</span>
              </div>
              <button
                onClick={() => handleRemoveCertification(index)}
                className="px-3 py-1 bg-red-500 rounded-lg "
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
