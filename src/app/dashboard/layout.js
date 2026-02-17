import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background">
                <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-black/20 sticky top-0 backdrop-blur-md z-10">
                    <h2 className="text-lg font-semibold">Workspace</h2>
                    <div className="flex items-center gap-4">
                        {/* User button will be in RootLayout but we can add more here */}
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
