"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Settings,
    Users,
    Activity,
    LogOut
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/projects", label: "All Projects", icon: FolderKanban },
        { href: "/activity", label: "Global Activity", icon: Activity },
        { href: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="w-64 border-r border-border h-screen sticky top-0 bg-card p-6 flex flex-col">
            <div className="mb-10">
                <h2 className="text-xl font-bold gradient-text">DevCollab</h2>
            </div>

            <nav className="space-y-2 flex-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                ? "bg-primary text-white"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-border pt-6">
                <SignOutButton>
                    <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 w-full rounded-xl transition-colors cursor-pointer">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </SignOutButton>
            </div>
        </div>
    );
}
