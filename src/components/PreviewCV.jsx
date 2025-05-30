import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Github, Globe, Mail, Phone } from "lucide-react";
import { useRef } from "react";

export default function PreviewCV({ formData }) {
  const cvRef = useRef();

  const downloadPNG = () => {
    if (!cvRef.current) return;
    toPng(cvRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "cv.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to generate PNG", err);
      });
  };

  async function downloadPDF() {
    const element = cvRef.current;

    if (!element) {
      console.error("CV element not found");
      return;
    }

    try {
      const dataUrl = await toPng(element, { cacheBust: true });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);

      // A4 size in mm
      const pdfWidth = 210;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cv.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center w-full h-full p-4">
      <h2>Resume Preview</h2>
      <div className="flex gap-4 my-4">
        <button
          onClick={downloadPNG}
          className="bg-black text-white px-3 py-1 rounded-lg"
        >
          Download as PNG
        </button>
        <button
          onClick={downloadPDF}
          className="bg-black text-white px-3 py-1 rounded-lg"
        >
          Download as PDF
        </button>
      </div>
      <div
        className="w-[800px] min-h-screen border border-gray-500 flex rounded-lg"
        ref={cvRef}
        id="cv"
      >
        <aside
          className="flex flex-col w-1/2 h-full gap-6 p-4 rounded-l-lg"
          style={{
            backgroundColor: formData.cvBgColor,
            color: formData.cvTextColor,
          }}
        >
          <div className="flex items-center justify-center pt-4">
            <div className="flex items-center justify-center text-sm text-white border border-white rounded-full w-35 h-35">
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="rounded-full w-35 h-35 object-cover"
                />
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="px-4 space-y-3 ">
            <h2 className="text-xl">Contact information</h2>
            <div className="border-b border-white"></div>
            <p className="flex items-center gap-2">
              <Phone size={20} />
              {formData.contact ? formData.contact : "Your contact number"}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={20} />
              {formData.email ? formData.email : "Your email"}
            </p>
            {formData.github && (
              <p className="flex items-center gap-2">
                <Github size={20} />
                {formData.github}
              </p>
            )}
            {formData.website && (
              <p className="flex items-center gap-2">
                <Globe size={20} />
                {formData.website}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="px-4 space-y-3 ">
            <h2 className="text-xl">Skills</h2>
            <div className="border-b border-white"></div>
            <ul>
              {formData.skills.map((skill) => (
                <li key={skill} className="ml-5 list-disc">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="px-4 space-y-3 ">
            <h2 className="text-xl">Languages</h2>
            <div className="border-b border-white"></div>
            <ul>
              {formData.languages.map((lang) => (
                <li key={lang} className="ml-5 list-disc">
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 space-y-3 ">
            <h3 className="text-xl">Reference</h3>
            <div className="border-b border-white"></div>
            {formData.reference_name ? (
              <div>
                <p>{formData.reference_name}</p>
                <p>{formData.reference_job}</p>
                <p>{formData.reference_position}</p>
                <p>{formData.reference_contact}</p>
              </div>
            ) : (
              <span>Reference available upon request</span>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="w-full">
          <header
            className="flex flex-col w-full px-4 pt-10  h-1/8 text-end"
            style={{
              backgroundColor: formData.cvBgColor,
              color: formData.cvTextColor,
            }}
          >
            <h1 className="text-4xl ">
              {formData.firstName
                ? `${formData.firstName} ${formData.middleInitial} ${formData.lastName}`
                : "Your Name"}
            </h1>
            <h2 className="text-2xl text-gray-300">
              {formData.jobTitle ? formData.jobTitle : "Your Job Title"}
            </h2>
          </header>
          <main className="p-4 space-y-6 bg-white h-screen">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Summary</h3>
              <div className="border-b border-black"></div>
              <p className="w-full text-gray-700 break-words whitespace-pre-wrap text-sm text-justify">
                {formData.profileSummary
                  ? formData.profileSummary
                  : "Write a brief summary about yourself, your skills, and your career goals."}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Experience</h3>
              <div className="border-b border-black"></div>
              <p className="w-full text-gray-700 break-words whitespace-pre-wrap text-justify text-sm">
                {formData.experience.length > 0
                  ? formData.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="text-lg font-semibold flex justify-between">
                          <span>{exp.title}</span>
                          <span>{exp.year}</span>
                        </h4>
                        <span className="text-gray-600">{exp.description}</span>
                      </div>
                    ))
                  : "Briefly describe your previous work or internship experience, including your role, responsibilities, and key achievements"}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Certifications</h3>
              <div className="border-b border-black"></div>
              <p className="w-full text-gray-700 break-words whitespace-pre-wrap">
                {formData.certifications.length > 0
                  ? formData.certifications.map((cert, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="text-lg font-semibold flex justify-between">
                          <span>{cert.title}</span>
                          <span>{cert.year}</span>
                        </h4>
                        <p className="text-gray-600">{cert.organization}</p>
                      </div>
                    ))
                  : "List any certifications you’ve earned, including the title, issuing organization, and the year obtained."}
              </p>
            </div>
            <div className="space-y-2 pb-5">
              <h3 className="text-2xl font-semibold">Education</h3>
              <div className="border-b border-black"></div>
              <p className="w-full text-gray-700 break-words whitespace-pre-wrap">
                {formData.education.length > 0
                  ? formData.education.map((educ, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="text-lg font-semibold flex justify-between items-center">
                          <span>{educ.degree}</span>
                          <span className="text-sm">
                            {educ.schoolYearStart} - {educ.schoolYearEnd}
                          </span>
                        </h4>
                        <p className="text-gray-600">{educ.schoolName}</p>
                      </div>
                    ))
                  : "Include your educational background, such as your degree, school name, and year of graduation."}
              </p>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
