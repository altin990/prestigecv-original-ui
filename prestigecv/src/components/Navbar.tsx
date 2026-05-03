import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/templates", label: "Templates" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 prestige-gradient border-b border-prestige-charcoal/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 prestige-red-gradient rounded-sm flex items-center justify-center">
            <FileText className="w-4 h-4 text-prestige-white" />
          </div>
          <span className="font-display text-lg font-bold text-prestige-white tracking-tight">
            Prestige<span className="text-prestige-red-light">CV</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
                location.pathname === link.to ? "text-prestige-red-light" : "text-prestige-white/60 hover:text-prestige-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/generator">
                <Button variant="prestige-red" size="sm">Open Generator</Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={signOut} className="text-prestige-white/50 hover:text-prestige-white hover:bg-prestige-charcoal/50">
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth"><Button variant="ghost" size="sm" className="text-prestige-white/70 hover:text-prestige-white hover:bg-prestige-charcoal/50">Sign In</Button></Link>
              <Link to="/auth"><Button variant="prestige-red" size="sm">Get Started</Button></Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-prestige-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden prestige-gradient border-t border-prestige-charcoal/20 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-prestige-white/70 hover:text-prestige-white py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-prestige-charcoal/20">
            {user ? (
              <div className="flex gap-2">
                <Link to="/generator" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="prestige-red" size="sm" className="w-full">Open Generator</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => { signOut(); setMobileOpen(false); }} className="text-prestige-white/50">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button variant="prestige-red" size="sm" className="w-full">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
