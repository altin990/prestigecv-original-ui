import { Mail, Phone, MapPin } from "lucide-react";
import type { ResumeData } from "@/types/resume";

type Template = "executive" | "minimal" | "bold";

interface ResumePreviewProps {
  data: ResumeData;
  template?: Template;
  showWatermark?: boolean;
}

const styles: Record<Template, {
  headerBg: string;
  nameCls: string;
  accentLine: string;
  subtitleCls: string;
  contactCls: string;
  iconCls: string;
  showOrbs: boolean;
  footerCls: string;
}> = {
  executive: {
    headerBg: "prestige-gradient",
    nameCls: "text-prestige-white",
    accentLine: "prestige-red-gradient",
    subtitleCls: "text-prestige-red-light",
    contactCls: "text-prestige-white/70",
    iconCls: "text-prestige-red-light",
    showOrbs: true,
    footerCls: "prestige-red-gradient",
  },
  minimal: {
    headerBg: "bg-prestige-white border-b border-prestige-black/20",
    nameCls: "text-prestige-black",
    accentLine: "bg-prestige-black/30",
    subtitleCls: "text-prestige-charcoal/60",
    contactCls: "text-prestige-charcoal/60",
    iconCls: "text-prestige-charcoal/30",
    showOrbs: false,
    footerCls: "bg-prestige-black",
  },
  bold: {
    headerBg: "prestige-red-gradient",
    nameCls: "text-prestige-white",
    accentLine: "bg-prestige-white/50",
    subtitleCls: "text-prestige-white/90",
    contactCls: "text-prestige-white/70",
    iconCls: "text-prestige-white/80",
    showOrbs: true,
    footerCls: "prestige-gradient",
  },
};

export default function ResumePreview({ data, template = "executive", showWatermark = false }: ResumePreviewProps) {
  const s = styles[template] ?? styles.executive;

  return (
    <div className="relative w-full max-w-[816px] mx-auto bg-prestige-white shadow-2xl" id="resume-preview">
      {/* Header */}
      <div className={`${s.headerBg} px-10 pt-12 pb-10 relative overflow-hidden`}>
        {s.showOrbs && (
          <>
            <div className="absolute top-0 right-0 w-48 h-48 prestige-red-gradient opacity-20 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 prestige-red-gradient opacity-10 rounded-full translate-y-1/2 -translate-x-1/4" />
          </>
        )}
        <div className="relative z-10">
          <h1 className={`font-display text-4xl font-bold ${s.nameCls} tracking-tight leading-[1.1] text-balance`}>
            {data.fullName || "Your Name"}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <div className={`h-[3px] w-12 ${s.accentLine} rounded-full`} />
            <p className={`${s.subtitleCls} text-sm font-medium uppercase tracking-[0.2em]`}>
              {data.title || "Professional Title"}
            </p>
          </div>
          <div className={`flex flex-wrap gap-x-6 gap-y-2 mt-6 ${s.contactCls} text-xs tracking-wide`}>
            {data.email && (
              <span className="flex items-center gap-1.5">
                <Mail className={`w-3.5 h-3.5 ${s.iconCls}`} />
                {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className={`w-3.5 h-3.5 ${s.iconCls}`} />
                {data.phone}
              </span>
            )}
            {data.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className={`w-3.5 h-3.5 ${s.iconCls}`} />
                {data.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 py-8 space-y-8">
        {/* Summary */}
        {data.summary && (
          <section>
            <SectionHeading>Profile</SectionHeading>
            <p className="text-sm text-prestige-charcoal/80 leading-relaxed font-body">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <section>
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-5">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="relative pl-5 border-l-2 border-prestige-black/10">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent" />
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h4 className="font-display text-base font-semibold text-prestige-black">{exp.role}</h4>
                      <p className="text-sm text-accent font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground tracking-wide whitespace-nowrap ml-4">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-sm text-prestige-charcoal/70 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between">
                  <div>
                    <h4 className="font-display text-sm font-semibold text-prestige-black">{edu.degree}</h4>
                    <p className="text-xs text-prestige-charcoal/60">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-muted-foreground tracking-wide">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <SectionHeading>Skills</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] border border-prestige-black/15 text-prestige-black rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer bar */}
      <div className={`h-2 ${s.footerCls}`} />

      {/* Watermark */}
      {showWatermark && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "220%",
              transform: "translate(-50%, -50%) rotate(-35deg)",
              display: "flex",
              flexDirection: "column",
              gap: "52px",
            }}
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <p
                key={i}
                className="font-display font-bold text-prestige-black/[0.16] whitespace-nowrap text-center"
                style={{ fontSize: "26px", letterSpacing: "0.06em" }}
              >
                PrestigeCV — Unlock to Download &nbsp;&nbsp;&nbsp; PrestigeCV — Unlock to Download &nbsp;&nbsp;&nbsp; PrestigeCV — Unlock to Download
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-prestige-black">
        {children}
      </h3>
      <div className="flex-1 h-px bg-prestige-black/10" />
    </div>
  );
}
