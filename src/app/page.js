import Navbar from "@/components/Navbar";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-1.5 mb-10 bg-muted rounded-full text-xs font-medium text-primary-hover border border-border">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Real-time collaboration is here
          </div>

          <h1 className="hero-heading text-5xl md:text-8xl mb-12 tracking-tight">
            Ship faster with <br />
            <span className="italic">DevCollab</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Manage projects, track tasks, and collaborate with your team in one simple,
            delightful platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="btn-primary w-full sm:w-auto text-lg shadow-sm">
                  Start for free
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="btn-secondary w-full sm:w-auto text-lg">
                  View demo
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="btn-primary w-full sm:w-auto text-center text-lg shadow-sm">
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 border-t border-border bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="hero-heading text-2xl">Project Workspaces</h3>
              <p className="text-muted-foreground leading-relaxed">Dedicated environments for each project with role-based access control and team management.</p>
            </div>

            <div className="space-y-6">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="hero-heading text-2xl">Task Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">Modern Kanban boards and list views to keep your team organized and focused on what matters.</p>
            </div>

            <div className="space-y-6">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="hero-heading text-2xl">Real-time Activity</h3>
              <p className="text-muted-foreground leading-relaxed">Live updates and activity feeds ensure everyone is on the same page, at all times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mb-12">Trusted by builders at</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale contrast-125">
            <span className="text-xl font-bold tracking-tighter">GITHUB</span>
            <span className="text-xl font-bold tracking-tighter">VERCEL</span>
            <span className="text-xl font-bold tracking-tighter">SUPABASE</span>
            <span className="text-xl font-bold tracking-tighter">STRIPE</span>
          </div>
        </div>
      </section>
    </div>
  );
}
