"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
                    DevCollab
                </Link>

                <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
                    <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
                    <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-6">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer text-muted-foreground hover:text-foreground">
                                Log in
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-primary-hover transition-all cursor-pointer">
                                Sign up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" className="text-sm font-semibold hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                        <div className="scale-90 pb-1">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
