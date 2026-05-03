export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
}

export const defaultResumeData: ResumeData = {
  fullName: "Alexandra Chen",
  title: "Senior Product Manager",
  email: "alexandra.chen@email.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  summary: "Strategic product leader with 8+ years driving growth at Series B to public-stage companies. Launched 3 products that collectively generated $40M ARR.",
  experiences: [
    {
      id: "1",
      company: "Meridian Technologies",
      role: "Senior Product Manager",
      startDate: "Jan 2021",
      endDate: "Present",
      description: "Led cross-functional team of 12 to ship flagship analytics platform, driving 40% increase in enterprise customer retention.",
    },
    {
      id: "2",
      company: "Vertex Solutions",
      role: "Product Manager",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      description: "Defined and executed product roadmap for B2B SaaS platform serving 500+ enterprise clients.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "MBA, Strategy & Product",
      year: "2018",
    },
  ],
  skills: ["Product Strategy", "Roadmapping", "SQL", "Figma", "Agile", "OKRs"],
};
