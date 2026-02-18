"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { createTask } from "@/app/actions/tasks";

export default function CreateTaskButton({ projectId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const result = await createTask(projectId, formData);
        setLoading(false);

        if (result.success) {
            setIsOpen(false);
        } else {
            alert(result.error);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn-primary flex items-center gap-2"
            >
                <Plus size={18} />
                New Task
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-white border border-border rounded-2xl p-10 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="hero-heading text-3xl">New Task</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-bold mb-3 text-muted-foreground uppercase tracking-widest">
                                    Task Title
                                </label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="What needs to be done?"
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold mb-3 text-muted-foreground uppercase tracking-widest">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    placeholder="Add more details..."
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none text-sm font-medium"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold mb-3 text-muted-foreground uppercase tracking-widest">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    className="w-full bg-muted/30 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium appearance-none cursor-pointer"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-full border border-border text-sm font-bold uppercase tracking-widest text-muted-foreground hover:bg-muted transition-colors transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    {loading ? "Adding..." : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
