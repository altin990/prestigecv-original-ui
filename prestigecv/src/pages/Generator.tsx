import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, LogOut } from "lucide-react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { defaultResumeData, type ResumeData } from "@/types/resume";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export default function Generator() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [showPaywall, setShowPaywall] = useState(false);
  const [searchParams] = useSearchParams();
  const rawTemplate = searchParams.get("template") ?? "executive";
  const template = (["executive", "minimal", "bold"].includes(rawTemplate) ? rawTemplate : "executive") as "executive" | "minimal" | "bold";

  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get("payment") === "success") navigate("/success", { replace: true });
  }, [searchParams, navigate]);

  const handleExportClick = () => {
    if (profile?.isPro) {
      handlePrint();
    } else {
      setShowPaywall(true);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("resume-preview");
    if (!printContent) return;
    const win = window.open("", "_blank");
    if (!win) return;

    // Grab all stylesheets from the current page
    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules).map((r) => r.cssText).join("\n");
        } catch {
          return sheet.href ? `@import url("${sheet.href}");` : "";
        }
      })
      .join("\n");

    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.fullName} - Resume</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            ${styles}
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 0; size: A4; }
          </style>
        </head>
        <body>${printContent.outerHTML}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 prestige-gradient border-b border-prestige-charcoal/30">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 prestige-red-gradient rounded-sm flex items-center justify-center">
              <FileText className="w-4 h-4 text-prestige-white" />
            </div>
            <span className="font-display text-lg font-bold text-prestige-white tracking-tight">
              Prestige<span className="text-prestige-red-light">CV</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="prestige-red" size="lg" onClick={handleExportClick}>
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut} className="text-prestige-white/50 hover:text-prestige-white hover:bg-prestige-charcoal/50">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-0 min-h-[calc(100vh-64px)]">
        <aside className="bg-card border-r border-border overflow-y-auto max-h-[calc(100vh-64px)] lg:sticky lg:top-16">
          <ResumeForm data={data} onChange={setData} />
        </aside>
        <main className="bg-secondary/30 p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-64px)]" ref={previewRef}>
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <ResumePreview data={data} template={template} showWatermark={!profile?.isPro} />
          </div>
        </main>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setShowPaywall(false)}
        >
          <div
            className="relative w-full max-w-md rounded-xl border border-prestige-red/30 shadow-2xl p-8"
            style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 prestige-red-gradient rounded-full flex items-center justify-center shadow-lg">
                <Download className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h2
              className="text-center text-2xl font-bold text-prestige-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Unlock PDF Export
            </h2>

            {/* Subtext */}
            <p className="text-center text-prestige-white/60 text-sm mb-6">
              Download your resume as a polished, print-ready PDF.
            </p>

            {/* Price */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-baseline gap-1 bg-prestige-red/10 border border-prestige-red/40 rounded-lg px-5 py-3">
                <span className="text-prestige-red-light text-sm font-semibold">€</span>
                <span className="text-prestige-red-light text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>9.99</span>
                <span className="text-prestige-white/50 text-sm">one-time</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {[
                "Export your CV as a professional PDF",
                "No watermark on this export",
                "All 3 premium templates",
                "Print-ready A4 formatting",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-prestige-white/70 text-sm">
                  <span className="w-4 h-4 rounded-full bg-prestige-red/20 border border-prestige-red/50 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-prestige-red-light" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant="prestige-red"
              size="lg"
              className="w-full mb-3"
              onClick={() => window.open(import.meta.env.VITE_STRIPE_BASIC_LINK, "_blank")}
            >
              Export My CV — €9.99
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-prestige-white/40 hover:text-prestige-white/70 hover:bg-prestige-charcoal/30"
              onClick={() => setShowPaywall(false)}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}