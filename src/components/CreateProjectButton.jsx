"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { createProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";

export default function CreateProjectButton({ primary }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const result = await createProject(formData);
        setLoading(false);

        if (result.success) {
            setIsOpen(false);
            router.push(`/projects/${result.project.id}`);
        } else {
            alert(result.error);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={primary ? "btn-primary" : "btn-secondary py-2 flex items-center gap-2"}
            >
                <Plus size={18} />
                {primary ? "Create Your First Project" : "New Project"}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Create Project</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                                    Project Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="e.g. NextGen Web Platform"
                                    className="w-full bg-black/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                                    Description (Optional)
                                </label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    placeholder="Describe your project goals..."
                                    className="w-full bg-black/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-border font-semibold hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Creating..." : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
