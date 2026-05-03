import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ArrowLeft } from "lucide-react";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (error) setError(error.message);
      else navigate("/templates");
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
      else navigate("/templates");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 prestige-gradient relative overflow-hidden items-center justify-center">
        <div className="absolute top-0 right-0 w-96 h-96 prestige-red-gradient opacity-10 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 prestige-red-gradient opacity-5 rounded-full translate-y-1/3 -translate-x-1/3" />
        <div className="relative z-10 px-16 text-center">
          <div className="w-16 h-16 prestige-red-gradient rounded-sm flex items-center justify-center mx-auto mb-8">
            <FileText className="w-8 h-8 text-prestige-white" />
          </div>
          <h1 className="font-display text-5xl font-bold text-prestige-white tracking-tight leading-[1.1] text-balance">
            Prestige<span className="text-prestige-red-light">CV</span>
          </h1>
          <p className="mt-4 text-prestige-white/50 text-sm tracking-wide max-w-xs mx-auto">
            Craft resumes that command attention. Designed for professionals who refuse to blend in.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-prestige-white">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to home
          </Link>

          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 prestige-red-gradient rounded-sm flex items-center justify-center">
              <FileText className="w-5 h-5 text-prestige-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Prestige<span className="text-prestige-red-light">CV</span>
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold text-prestige-black tracking-tight">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-muted-foreground text-sm mt-1 mb-8">
            {isSignUp ? "Start building your prestige resume" : "Sign in to access your resumes"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>

            {error && <p className="text-sm text-accent font-medium">{error}</p>}

            <Button type="submit" variant="prestige" size="lg" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => { setIsSignUp(!isSignUp); setError(""); }} className="text-accent font-semibold hover:underline">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}