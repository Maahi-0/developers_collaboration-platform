import Navbar from "@/components/Navbar";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 glass rounded-full text-sm font-medium text-primary">
            New: Real-time task collaboration out now!
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            The Central Workspace for <br />
            <span className="gradient-text">Modern Developer Teams</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Manage projects, track tasks, and collaborate with your team in one powerful,
            streamlined platform designed specifically for developers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="btn-primary w-full sm:w-auto">
                  Get Started for Free
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="btn-secondary w-full sm:w-auto">
                  View Demo
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="btn-primary w-full sm:w-auto text-center">
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-black/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 px-4">
            Everything you need to <span className="gradient-text">ship faster</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors text-left group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Project Workspaces</h3>
              <p className="text-muted-foreground">Dedicated environments for each project with role-based access control and team management.</p>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors text-left group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Task Tracking</h3>
              <p className="text-muted-foreground">Modern Kanban boards and list views to keep your team organized and focused on what matters.</p>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors text-left group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time Activity</h3>
              <p className="text-muted-foreground">Live updates and activity feeds ensure everyone is on the same page, at all times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground uppercase tracking-widest text-sm font-semibold mb-8">Trusted by developers from</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-bold">GITHUB</span>
            <span className="text-2xl font-bold">VERCEL</span>
            <span className="text-2xl font-bold">SUPABASE</span>
            <span className="text-2xl font-bold">STRIPE</span>
          </div>
        </div>
      </section>
    </div>
  );
}
