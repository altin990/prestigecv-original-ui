import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, FileText, Check } from "lucide-react";

const features = [
  "CV saved to your account forever",
  "Edit anytime from any device",
  "Unlimited exports",
  "Never see a paywall again",
];

export default function Upsell() {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    window.open(import.meta.env.VITE_STRIPE_PRO_LINK, "_blank");
    navigate("/success?plan=basic");
  };

  return (
    <div className="min-h-screen prestige-gradient flex flex-col">
      {/* Top bar */}
      <header className="border-b border-prestige-charcoal/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 prestige-red-gradient rounded-sm flex items-center justify-center">
              <FileText className="w-4 h-4 text-prestige-white" />
            </div>
            <span className="font-display text-lg font-bold text-prestige-white tracking-tight">
              Prestige<span className="text-prestige-red-light">CV</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="relative flex justify-center mb-8">
            <div className="absolute w-32 h-32 prestige-red-gradient opacity-10 rounded-full blur-2xl" />
            <div className="relative w-20 h-20 prestige-red-gradient rounded-full flex items-center justify-center shadow-xl">
              <Crown className="w-9 h-9 text-prestige-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Headings */}
          <h1
            className="text-center text-4xl font-bold text-prestige-white tracking-tight leading-[1.1] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your CV is ready!
          </h1>
          <p className="text-center text-prestige-white/60 text-lg mb-10">
            Want to keep it forever?
          </p>

          {/* Upsell card */}
          <div className="rounded-xl border border-prestige-red/40 bg-prestige-red/[0.05] overflow-hidden mb-5">
            <div className="h-1 prestige-red-gradient" />
            <div className="p-7">
              {/* Card heading */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-prestige-white font-display font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Add Lifetime Access
                </p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-prestige-white/50 text-sm font-semibold">€</span>
                  <span className="font-display text-2xl font-bold text-prestige-white" style={{ fontFamily: "'Playfair Display', serif" }}>4.99</span>
                  <span className="text-prestige-white/40 text-sm ml-0.5">/mo</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-7">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-prestige-red/20 border border-prestige-red/50 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-prestige-red-light" />
                    </span>
                    <span className="text-prestige-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Primary CTA */}
              <Button
                variant="prestige-red"
                size="lg"
                className="w-full py-6 text-base font-semibold"
                onClick={handleUpgrade}
              >
                Yes, Add Lifetime Access — €4.99/mo
              </Button>
            </div>
          </div>

          {/* Skip link */}
          <div className="text-center">
            <Link
              to="/success?plan=basic"
              className="text-prestige-white/30 text-sm hover:text-prestige-white/60 transition-colors"
            >
              No thanks, just download my CV
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom accent bar */}
      <div className="h-1 prestige-red-gradient" />
    </div>
  );
}
