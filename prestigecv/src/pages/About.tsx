import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Heart, Eye } from "lucide-react";

const values = [
  { icon: Target, title: "Precision", desc: "Every pixel, every word, every alignment is intentional. We obsess over the details so you don't have to." },
  { icon: Heart, title: "Empathy", desc: "Job searching is stressful. We build tools that respect your time and reduce anxiety in the process." },
  { icon: Eye, title: "Clarity", desc: "Great design communicates instantly. Our templates ensure your value is understood at first glance." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-prestige-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="prestige-gradient relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 prestige-red-gradient opacity-[0.06] rounded-full -translate-y-1/2" />
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <p className="text-[11px] uppercase tracking-[0.25em] text-prestige-red-light font-semibold mb-4">About Us</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-prestige-white tracking-tight leading-[1.1] max-w-xl text-balance">
              We believe your resume should be as exceptional as you are.
            </h1>
            <p className="mt-6 text-prestige-white/45 text-base max-w-lg leading-relaxed">
              PrestigeCV was founded by designers and recruiters who were tired of seeing brilliant professionals held back by mediocre resumes.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold mb-3">Our Story</p>
            <h2 className="font-display text-3xl font-bold text-prestige-black tracking-tight mb-6 text-balance">
              Born from frustration, built with purpose
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                In 2023, our co-founders — a former hiring manager at a Fortune 100 company and a senior typographer — met at a design conference. They shared a common frustration: most resume builders produce generic, forgettable documents.
              </p>
              <p>
                They set out to build something different. Not just another template library, but a design system specifically engineered for the way recruiters actually scan resumes — the 6-second rule, the F-pattern, the hierarchy of information.
              </p>
              <p>
                Today, PrestigeCV has helped over 12,000 professionals land interviews at companies including Google, McKinsey, Goldman Sachs, and Tesla. Our templates aren't just beautiful — they're strategic.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary/40">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-14">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold mb-3">Our Values</p>
              <h2 className="font-display text-3xl font-bold text-prestige-black tracking-tight text-balance">
                What drives us
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="text-center">
                  <div className="w-12 h-12 prestige-red-gradient rounded-sm flex items-center justify-center mx-auto mb-5">
                    <v.icon className="w-6 h-6 text-prestige-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-prestige-black mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
