import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, User, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import type { ResumeData, Experience, Education } from "@/types/resume";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const SectionTitle = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
    <div className="w-8 h-8 rounded-sm bg-accent flex items-center justify-center">
      <Icon className="w-4 h-4 text-accent-foreground" />
    </div>
    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{children}</h3>
  </div>
);

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [skillInput, setSkillInput] = useState("");

  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const addExperience = () => {
    update("experiences", [
      ...data.experiences,
      { id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    update("experiences", data.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const removeExperience = (id: string) => {
    update("experiences", data.experiences.filter((e) => e.id !== id));
  };

  const addEducation = () => {
    update("education", [
      ...data.education,
      { id: crypto.randomUUID(), institution: "", degree: "", year: "" },
    ]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    update("education", data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const removeEducation = (id: string) => {
    update("education", data.education.filter((e) => e.id !== id));
  };

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      update("skills", [...data.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", data.skills.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">Build Your Resume</h2>
        <p className="text-muted-foreground text-sm mt-1">Fill in your details to generate a prestigious resume</p>
      </div>

      {/* Personal Info */}
      <section>
        <SectionTitle icon={User}>Personal Details</SectionTitle>
        <div className="space-y-3">
          <Input placeholder="Full Name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} />
          <Input placeholder="Professional Title" value={data.title} onChange={(e) => update("title", e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Email" value={data.email} onChange={(e) => update("email", e.target.value)} />
            <Input placeholder="Phone" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <Input placeholder="Location" value={data.location} onChange={(e) => update("location", e.target.value)} />
          <Textarea placeholder="Professional summary..." value={data.summary} onChange={(e) => update("summary", e.target.value)} className="min-h-[100px]" />
        </div>
      </section>

      {/* Experience */}
      <section>
        <SectionTitle icon={Briefcase}>Experience</SectionTitle>
        <div className="space-y-4">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="p-4 bg-secondary/50 rounded-sm space-y-3 relative group">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-accent"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
              <Input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} />
                <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} />
              </div>
              <Textarea placeholder="Description..." value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} />
            </div>
          ))}
          <Button variant="prestige-outline" size="sm" onClick={addExperience} className="w-full">
            <Plus className="w-4 h-4" /> Add Experience
          </Button>
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionTitle icon={GraduationCap}>Education</SectionTitle>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-secondary/50 rounded-sm space-y-3 relative group">
              <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-accent"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                <Input placeholder="Year" value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} />
              </div>
            </div>
          ))}
          <Button variant="prestige-outline" size="sm" onClick={addEducation} className="w-full">
            <Plus className="w-4 h-4" /> Add Education
          </Button>
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionTitle icon={Sparkles}>Skills</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Add a skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <Button variant="prestige" size="default" onClick={addSkill}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-prestige-black text-prestige-white rounded-sm cursor-pointer hover:bg-accent transition-colors"
              onClick={() => removeSkill(skill)}
            >
              {skill}
              <Trash2 className="w-3 h-3 opacity-60" />
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
