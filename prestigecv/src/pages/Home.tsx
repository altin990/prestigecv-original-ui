import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Shield, title: "ATS-Optimized", desc: "Every template passes automated screening systems with flying colors." },
  { icon: Zap, title: "Instant Export", desc: "Generate polished PDFs in seconds. No watermarks, no delays." },
  { icon: Award, title: "Premium Design", desc: "Crafted by typographers obsessed with visual hierarchy." },
];

const stats = [
  { value: "12,847", label: "Resumes Created" },
  { value: "94%", label: "Interview Rate" },
  { value: "3", label: "Premium Templates" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-prestige-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 prestige-gradient" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] prestige-red-gradient opacity-[0.07] rounded-full translate-x-1/3" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-prestige-white/10 rounded-sm text-[11px] uppercase tracking-[0.2em] text-prestige-white/40 mb-6">
              <Star className="w-3 h-3 text-prestige-red-light" /> Premium Resume Builder
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-prestige-white tracking-tight leading-[1.05] text-balance">
              Resumes that<br />
              <span className="text-prestige-red-light">command</span> respect.
            </h1>
            <p className="mt-6 text-prestige-white/50 text-base lg:text-lg max-w-lg leading-relaxed">
              Stop blending in. PrestigeCV builds resumes designed to make hiring managers pause, read, and reach out.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/auth">
                <Button variant="prestige-red" size="lg">
                  Start Building <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="prestige-outline" size="lg" className="border-prestige-white/20 text-prestige-white hover:bg-prestige-white/10 hover:text-prestige-white">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 mt-16 pt-8 border-t border-prestige-white/10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-prestige-white">{s.value}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-prestige-white/30 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold mb-3">Why PrestigeCV</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-prestige-black tracking-tight text-balance">
            Built for the ambitious
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-8 bg-card border border-border rounded-sm hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="w-10 h-10 prestige-red-gradient rounded-sm flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <f.icon className="w-5 h-5 text-prestige-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-prestige-black mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="prestige-gradient">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-prestige-white tracking-tight text-balance">
            Ready to stand out?
          </h2>
          <p className="mt-4 text-prestige-white/40 max-w-md mx-auto">
            Join thousands of professionals using PrestigeCV to land interviews at top companies.
          </p>
          <Link to="/auth">
            <Button variant="prestige-red" size="lg" className="mt-8">
              Create Your Resume <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
