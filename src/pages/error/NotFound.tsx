import React from "react";
import { Link } from "react-router-dom";
import { Home, LogIn, ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-screen gradient-hero text-foreground">
      {/* Ambient decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-vivu-cyan/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-vivu-blue/20 blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-20 flex min-h-screen flex-col items-center justify-center text-center">
        <span className="inline-block rounded-full bg-secondary/60 px-4 py-1 text-sm font-medium text-secondary-foreground backdrop-blur transition-smooth hover-glow">
          Oops! Something went missing
        </span>

        <h1 className="mt-6 bg-clip-text text-transparent text-white text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter drop-shadow-md animate-fade-in-up">
          404
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg">
          The page you’re looking for doesn’t exist or was moved. Let’s get you back on track.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-vivu transition-smooth hover-lift hover-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vivu-cyan"
          >
            <LogIn className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            Go to login
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-6 py-3 text-foreground shadow-sm transition-smooth hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vivu-cyan"
          >
            <Home className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            Back to home
          </Link>
        </div>

        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-vivu-cyan hover:underline transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>

        {/* Card-like hint */}
        <div className="mt-14 w-full max-w-xl rounded-xl border border-border bg-card/70 p-6 backdrop-blur shadow-vivu animate-fade-in-up">
          <h2 className="text-lg font-semibold">Need help?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check the URL for typos, or log in again if your session expired.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NotFound;