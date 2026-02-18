"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Settings,
    Users,
    Activity,
    LogOut,
    CheckSquare
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/projects", label: "All Projects", icon: FolderKanban },
        { href: "/tasks", label: "My Tasks", icon: CheckSquare },
        { href: "/activity", label: "Global Activity", icon: Activity },
        { href: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="w-64 border-r border-border h-screen sticky top-0 bg-background p-6 flex flex-col">
            <div className="mb-10 px-4">
                <Link href="/" className="text-xl font-bold tracking-tight text-foreground">DevCollab</Link>
            </div>

            <nav className="space-y-1 flex-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isActive
                                ? "bg-muted text-primary-hover font-semibold"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                }`}
                        >
                            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-sm">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-border pt-6">
                <SignOutButton>
                    <button className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 w-full rounded-lg transition-colors cursor-pointer">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </SignOutButton>
            </div>
        </div>
    );
}
