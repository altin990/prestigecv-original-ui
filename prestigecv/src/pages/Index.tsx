import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { defaultResumeData, type ResumeData } from "@/types/resume";

export default function Index() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = document.getElementById("resume-preview");
    if (!printContent) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.fullName} - Resume</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 0; size: A4; }
          </style>
        </head>
        <body>${printContent.outerHTML}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 prestige-gradient border-b border-prestige-charcoal/30 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 prestige-red-gradient rounded-sm flex items-center justify-center">
              <FileText className="w-4 h-4 text-prestige-white" />
            </div>
            <span className="font-display text-lg font-bold text-prestige-white tracking-tight">
              Prestige<span className="text-prestige-red-light">CV</span>
            </span>
          </div>
          <Button variant="prestige-red" size="lg" onClick={handlePrint}>
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-0 min-h-[calc(100vh-64px)]">
        {/* Form Panel */}
        <aside className="bg-card border-r border-border overflow-y-auto max-h-[calc(100vh-64px)] lg:sticky lg:top-16">
          <ResumeForm data={data} onChange={setData} />
        </aside>

        {/* Preview Panel */}
        <main className="bg-secondary/30 p-8 lg:p-12 overflow-y-auto max-h-[calc(100vh-64px)]" ref={previewRef}>
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <ResumePreview data={data} />
          </div>
        </main>
      </div>
    </div>
  );
}
