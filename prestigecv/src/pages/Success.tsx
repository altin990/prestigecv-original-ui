import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Download } from "lucide-react";
import { defaultResumeData } from "@/types/resume";
import ResumePreview from "@/components/ResumePreview";

export default function Success() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") === "basic" ? "basic" : "pro";

  useEffect(() => {
    if (!user) return;
    if (plan === "pro") {
      updateDoc(doc(db, "users", user.uid), { isPro: true }).catch(console.error);
    }
  }, [user, plan]);

  const handlePrint = () => {
    const printContent = document.getElementById("resume-preview");
    if (!printContent) return;
    const win = window.open("", "_blank");
    if (!win) return;

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
          <title>${defaultResumeData.fullName} - Resume</title>
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
    <div className="min-h-screen prestige-gradient flex flex-col">
      {/* Hidden resume node required by handlePrint */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
        <ResumePreview data={defaultResumeData} showWatermark={false} />
      </div>

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
        <div className="text-center max-w-lg">
          {/* Decorative orb behind icon */}
          <div className="relative flex justify-center mb-8">
            <div className="absolute w-32 h-32 prestige-red-gradient opacity-10 rounded-full blur-2xl" />
            <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl lg:text-5xl font-bold text-prestige-white tracking-tight leading-[1.1] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Payment Successful!
          </h1>

          {/* Divider accent */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[2px] w-10 prestige-red-gradient rounded-full" />
            <span className="text-prestige-red-light text-xs uppercase tracking-[0.2em] font-semibold">
              {plan === "basic" ? "Basic Unlocked" : "Pro Unlocked"}
            </span>
            <div className="h-[2px] w-10 prestige-red-gradient rounded-full" />
          </div>

          {/* Subtext */}
          <p className="text-prestige-white/60 text-base leading-relaxed mb-10">
            {plan === "basic"
              ? "You have 1 export available."
              : "Unlimited exports unlocked forever."}
          </p>

          {/* CTA */}
          <Button
            variant="prestige-red"
            size="lg"
            className="px-10 py-6 text-base font-semibold"
            onClick={handlePrint}
          >
            <Download className="w-5 h-5" />
            Download My CV
          </Button>

          {/* Secondary link */}
          <p className="mt-6 text-prestige-white/30 text-sm">
            Want to edit your resume first?{" "}
            <Link to="/generator" className="text-prestige-red-light hover:text-prestige-white transition-colors underline underline-offset-2">
              Go to the editor
            </Link>
          </p>
        </div>
      </main>

      {/* Bottom accent bar */}
      <div className="h-1 prestige-red-gradient" />
    </div>
  );
}
