import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="prestige-gradient border-t border-prestige-charcoal/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 prestige-red-gradient rounded-sm flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-prestige-white" />
              </div>
              <span className="font-display text-base font-bold text-prestige-white tracking-tight">
                Prestige<span className="text-prestige-red-light">CV</span>
              </span>
            </Link>
            <p className="text-prestige-white/40 text-xs max-w-xs">
              Premium resume builder for professionals who demand excellence.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-prestige-white/30 font-semibold mb-3">Product</h4>
              <div className="space-y-2">
                <Link to="/templates" className="block text-sm text-prestige-white/50 hover:text-prestige-white transition-colors">Templates</Link>
                <Link to="/pricing" className="block text-sm text-prestige-white/50 hover:text-prestige-white transition-colors">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-prestige-white/30 font-semibold mb-3">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-prestige-white/50 hover:text-prestige-white transition-colors">About</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-prestige-charcoal/20 text-center">
          <p className="text-[11px] text-prestige-white/25 tracking-wide">© {new Date().getFullYear()} PrestigeCV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
