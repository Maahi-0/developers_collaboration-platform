import { getProjects } from "@/app/actions/projects";
import Link from "next/link";
import { Plus, Folder, Users, Star } from "lucide-react";
import CreateProjectButton from "@/components/CreateProjectButton";

export default async function DashboardPage() {
    const { projects = [], error } = await getProjects();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Projects</h1>
                    <p className="text-muted-foreground">Manage and track your active projects.</p>
                </div>
                <CreateProjectButton />
            </div>

            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-border rounded-3xl bg-card/20">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Plus className="text-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-8 text-center max-w-sm">
                        Ready to start collaborating? Create your first project and invite your team.
                    </p>
                    <CreateProjectButton primary />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:scale-[1.02] transition-all group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Folder size={24} />
                                </div>
                                <button className="text-muted-foreground hover:text-yellow-400 transition-colors">
                                    <Star size={20} />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                                {project.description || "No description provided."}
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-border">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Users size={14} />
                                    <span>3 members</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>Active</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
