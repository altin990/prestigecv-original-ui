import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";

const templates = [
  {
    id: "executive",
    name: "Executive",
    desc: "Bold header with dark gradient. Ideal for leadership and senior roles.",
    color: "bg-prestige-black",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Clean lines, maximum white space. Let your accomplishments speak.",
    color: "bg-prestige-white border border-border",
  },
  {
    id: "bold",
    name: "Bold Red",
    desc: "Red accents that demand attention. For creative and ambitious professionals.",
    color: "prestige-red-gradient",
  },
];

function MiniResumePreview({ variant }: { variant: string }) {
  const d = defaultResumeData;
  const headerClass =
    variant === "executive"
      ? "prestige-gradient"
      : variant === "bold"
      ? "prestige-red-gradient"
      : "bg-prestige-white border-b-2 border-prestige-black";
  const textClass = variant === "minimal" ? "text-prestige-black" : "text-prestige-white";
  const subtextClass = variant === "minimal" ? "text-prestige-charcoal/60" : "text-prestige-white/50";
  const accentColor = variant === "bold" ? "text-prestige-white/70" : variant === "minimal" ? "text-accent" : "text-prestige-red-light";

  return (
    <div className="bg-prestige-white shadow-lg rounded-sm overflow-hidden text-left w-full aspect-[8.5/11] flex flex-col">
      {/* Header */}
      <div className={`${headerClass} px-5 pt-6 pb-5`}>
        <h3 className={`font-display text-base font-bold ${textClass} leading-tight`}>{d.fullName}</h3>
        <p className={`text-[9px] uppercase tracking-[0.15em] mt-1 ${accentColor}`}>{d.title}</p>
        <div className={`flex gap-3 mt-3 text-[8px] ${subtextClass}`}>
          <span className="flex items-center gap-1"><Mail className="w-2 h-2" />{d.email}</span>
          <span className="flex items-center gap-1"><Phone className="w-2 h-2" />{d.phone}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex-1 space-y-3">
        <div>
          <p className="text-[7px] uppercase tracking-[0.2em] text-prestige-black font-bold mb-1">Experience</p>
          {d.experiences.slice(0, 2).map((exp) => (
            <div key={exp.id} className="mb-2">
              <p className="text-[8px] font-semibold text-prestige-black">{exp.role}</p>
              <p className={`text-[7px] ${variant === "bold" ? "text-accent" : "text-muted-foreground"}`}>{exp.company}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[7px] uppercase tracking-[0.2em] text-prestige-black font-bold mb-1">Skills</p>
          <div className="flex flex-wrap gap-1">
            {d.skills.slice(0, 4).map((s) => (
              <span key={s} className="text-[6px] px-1.5 py-0.5 border border-prestige-black/15 rounded-sm text-prestige-black">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer accent */}
      <div className={`h-1 ${variant === "bold" ? "prestige-red-gradient" : variant === "executive" ? "prestige-gradient" : "bg-prestige-black"}`} />
    </div>
  );
}

export default function Templates() {
  return (
    <div className="min-h-screen bg-prestige-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold mb-3">Templates</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-prestige-black tracking-tight text-balance">
              Choose your style
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Three meticulously crafted templates, each designed to make your resume unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {templates.map((t) => (
              <div key={t.id} className="group">
                <div className="p-4 bg-secondary/30 rounded-sm mb-4 hover:bg-secondary/50 transition-colors">
                  <MiniResumePreview variant={t.id} />
                </div>
                <h3 className="font-display text-lg font-semibold text-prestige-black">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{t.desc}</p>
                <Link to={`/generator?template=${t.id}`}>
                  <Button variant="prestige-outline" size="sm" className="w-full">
                    Use Template <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
