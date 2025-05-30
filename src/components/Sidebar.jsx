import {
  Award,
  BookA,
  FilePenLine,
  GraduationCap,
  Hammer,
  PencilRuler,
  User,
} from "lucide-react";
import { useState } from "react";
import CertificationsSection from "./CertificationsSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import LanguagesInfo from "./LanguagesInfo";
import PersonalInfo from "./PersonalInfo";
import SkillsInfo from "./SkillsInfo";

export default function Sidebar({ formData, setFormData }) {
  const [selected, setSelected] = useState("personal");

  const navItems = [
    { label: "personal", icon: <User size={30} />, isSelected: true },
    { label: "skills", icon: <PencilRuler size={30} />, isSelected: false },
    { label: "languages", icon: <BookA size={30} />, isSelected: false },
    { label: "experience", icon: <Hammer size={30} />, isSelected: false },
    {
      label: "certifications",
      icon: <Award size={30} />,
      isSelected: false,
    },
    {
      label: "education",
      icon: <GraduationCap size={30} />,
      isSelected: false,
    },
  ];

  return (
    <div>
      <span className="flex items-center justify-between gap-3 py-10 text-4xl text-white bg-gray-900">
        <span className="flex gap-2 items-center">
          <FilePenLine /> Resume Maker
        </span>
        <div className="flex gap-2 px-2">
          <span className="text-sm flex flex-col">
            <label>CV Background Color</label>
            <input
              type="color"
              name="cvBgColor"
              value={formData.cvBgColor}
              onChange={(e) =>
                setFormData({ ...formData, cvBgColor: e.target.value })
              }
              className="w-full rounded-lg"
            />
          </span>
          <span className="text-sm flex flex-col">
            <label>CV Text Color</label>
            <input
              type="color"
              name="cvTextColor"
              value={formData.cvTextColor}
              onChange={(e) =>
                setFormData({ ...formData, cvTextColor: e.target.value })
              }
              className="w-full rounded-lg"
            />
          </span>
        </div>
      </span>

      <div className="flex items-center w-full bg-gray-900 h-18">
        <ul className="flex w-full justify-evenly ">
          {navItems.map((item) => (
            <li
              key={item.label}
              onClick={() => setSelected(item.label)}
              className={`px-10 py-6 text-white rounded-t-lg ${
                selected === item.label ? "bg-gray-950" : ""
              }`}
            >
              {item.icon}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        {selected === "personal" && (
          <PersonalInfo formData={formData} setFormData={setFormData} />
        )}
        {selected === "skills" && (
          <SkillsInfo formData={formData} setFormData={setFormData} />
        )}
        {selected === "languages" && (
          <LanguagesInfo formData={formData} setFormData={setFormData} />
        )}
        {selected === "experience" && (
          <ExperienceSection formData={formData} setFormData={setFormData} />
        )}
        {selected === "certifications" && (
          <CertificationsSection
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {selected === "education" && (
          <EducationSection formData={formData} setFormData={setFormData} />
        )}
      </div>
    </div>
  );
}
