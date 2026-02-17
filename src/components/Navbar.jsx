"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-none">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold gradient-text">
                    DevCollab
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                    <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">
                                Log in
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-hover transition-all hover:scale-105 cursor-pointer">
                                Sign up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" className="text-sm font-semibold hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
