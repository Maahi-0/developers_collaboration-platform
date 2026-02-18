import Sidebar from "@/components/Sidebar";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="flex min-h-screen selection:bg-primary/5">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-white/40">
                <header className="h-20 border-b border-border/60 bg-background/60 sticky top-0 backdrop-blur-xl z-20">
                    <div className="max-w-7xl mx-auto h-full px-8 md:px-12 flex items-center justify-between">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic">Workspace</h2>
                        <div className="flex items-center gap-6">
                            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 shadow-sm">STABLE</div>
                        </div>
                    </div>
                </header>
                <div className="py-16 px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
