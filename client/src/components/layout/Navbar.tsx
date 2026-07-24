import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all duration-300 bg-black/10">
            <img
              src="/images/resumehub-logo.svg"
              alt="ResumeHub logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="font-mono font-bold text-xl tracking-tight text-foreground">
            Resume<span className="text-primary">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/5">
          <Link href="/builder">
            <Button
              variant={location === "/builder" ? "secondary" : "ghost"}
              className={`gap-2 text-sm font-medium rounded-full px-5 transition-all duration-300 ${location === '/builder' ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'hover:bg-white/5'}`}
            >
              <FileText className="w-4 h-4" />
              Builder
            </Button>
          </Link>
          <Link href="/screener">
            <Button
              variant={location === "/screener" ? "secondary" : "ghost"}
              className={`gap-2 text-sm font-medium rounded-full px-5 transition-all duration-300 ${location === '/screener' ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'hover:bg-white/5'}`}
            >
              <CheckSquare className="w-4 h-4" />
              Screener
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant={location === "/login" ? "secondary" : "ghost"}
              className={`gap-2 text-sm font-medium rounded-full px-5 transition-all duration-300 ${location === '/login' ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'hover:bg-white/5'}`}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
