import { useState } from "react";
import PreviewCV from "./components/PreviewCV";
import Sidebar from "./components/Sidebar";
import "./index.css";
import MainLayout from "./layout/MainLayout";

function App() {
  const [formData, setFormData] = useState({
    cvBgColor: "#1e3a8a",
    cvTextColor: "#ffffff",
    imageUrl: null,
    firstName: "",
    middleInitial: "",
    lastName: "",
    jobTitle: "",
    address: "",
    contact: "",
    email: "",
    github: "",
    website: "",
    skill_input: "",
    skills: [],
    languages_input: "",
    languages: [],
    reference_name: "",
    reference_job: "",
    reference_position: "",
    reference_contact: "",
    profileSummary: "",
    experience: [],
    experienceTitle: "",
    experienceYear: "",
    experienceDescription: "",
    certifications: [],
    certificationTitle: "",
    certificationYear: "",
    issuingOrganization: "",
    education: [],
    degree: "",
    schoolName: "",
    schoolYearStart: "",
    schoolYearEnd: "",
  });

  return (
    <MainLayout
      sidebar={<Sidebar formData={formData} setFormData={setFormData} />}
      main={<PreviewCV formData={formData} />}
    />
  );
}

export default App;
