import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const basicFeatures = [
  "1 PDF export",
  "All 3 premium templates",
  "Print-ready A4 formatting",
  "No watermark on your export",
];

const proFeatures = [
  "Unlimited PDF exports",
  "All 3 premium templates (Executive, Minimal, Bold Red)",
  "Print-ready A4 formatting",
  "No watermarks ever",
  "Lifetime access — pay once, yours forever",
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-prestige-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold mb-4">Pricing</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-prestige-black tracking-tight text-balance leading-[1.1]">
              One price. Every template. Forever.
            </h1>
            <p className="mt-5 text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
              Most professionals spend hundreds on CV consultants. Get the same result for €9.
            </p>
          </div>

          {/* Cards */}
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 items-stretch">

            {/* Basic */}
            <div className="flex flex-col rounded-xl border border-border bg-card shadow-md overflow-hidden">
              <div className="h-1 bg-prestige-black/20" />
              <div className="flex flex-col flex-1 px-8 pt-8 pb-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-4">Basic</p>
                <div className="flex items-start gap-1 mb-1">
                  <span className="font-display text-xl font-bold text-prestige-black/50 mt-2">€</span>
                  <span
                    className="font-display font-bold text-prestige-black leading-none"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "60px" }}
                  >
                    5
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">one-time payment</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {basicFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-prestige-black/5 border border-prestige-black/15 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-prestige-black/50" />
                      </span>
                      <span className="text-prestige-black/70">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="prestige-outline"
                  size="lg"
                  className="w-full"
                  onClick={() => window.open(import.meta.env.VITE_STRIPE_BASIC_LINK, "_blank")}
                >
                  Get Basic — €5 <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Pro */}
            <div className="flex flex-col rounded-xl border border-prestige-charcoal/30 prestige-gradient shadow-2xl overflow-hidden">
              <div className="h-1 prestige-red-gradient" />

              {/* Decorative orbs */}
              <div className="absolute pointer-events-none" aria-hidden="true" />

              <div className="flex flex-col flex-1 px-8 pt-8 pb-8 relative">
                <div className="absolute top-0 right-0 w-40 h-40 prestige-red-gradient opacity-10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-prestige-white/50 font-semibold">Pro</p>
                  <span className="prestige-red-gradient text-prestige-white text-[9px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm">
                    Best Value
                  </span>
                </div>

                <div className="flex items-start gap-1 mb-1">
                  <span className="font-display text-xl font-bold text-prestige-white/50 mt-2">€</span>
                  <span
                    className="font-display font-bold text-prestige-white leading-none"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "60px" }}
                  >
                    9
                  </span>
                </div>
                <p className="text-prestige-white/50 text-sm mb-6">one-time payment</p>

                <p className="text-prestige-white/60 text-xs italic mb-6 border-t border-prestige-white/10 pt-5">
                  "Your next job could be worth €50,000+. Your resume costs €9."
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-prestige-red/20 border border-prestige-red/50 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-prestige-red-light" />
                      </span>
                      <span className="text-prestige-white/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="prestige-red"
                  size="lg"
                  className="w-full py-6 text-base font-semibold"
                  onClick={() => window.open(import.meta.env.VITE_STRIPE_PRO_LINK, "_blank")}
                >
                  Get Pro — €9 <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <p className="text-center text-muted-foreground text-sm mt-8">
            Join{" "}
            <span className="font-semibold text-prestige-black">12,847 professionals</span>{" "}
            who already landed their dream job.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
