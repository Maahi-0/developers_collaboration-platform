import { getProjects } from "@/app/actions/projects";
import Link from "next/link";
import { Plus, Folder, Users, Star, ExternalLink } from "lucide-react";
import CreateProjectButton from "@/components/CreateProjectButton";

export default async function ProjectsPage() {
    const { projects = [], error } = await getProjects();

    return (
        <div className="space-y-12">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="hero-heading text-4xl mb-2">All Projects</h1>
                    <p className="text-muted-foreground font-light italic">Detailed list of all your collaborative workspaces.</p>
                </div>
                <CreateProjectButton />
            </div>

            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 border border-border rounded-2xl bg-white/50 backdrop-blur-sm">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6 border border-border">
                        <Plus className="text-primary-hover" size={24} />
                    </div>
                    <h3 className="hero-heading text-2xl mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-8 text-center max-w-sm font-light">
                        Ready to start collaborating? Create your first project and invite your team.
                    </p>
                    <CreateProjectButton primary />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="p-8 rounded-xl border border-border bg-white hover:shadow-lg hover:shadow-primary/5 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary-hover border border-border group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Folder size={20} strokeWidth={1.5} />
                                </div>
                                <div className="flex gap-2">
                                    {project.repo_url && (
                                        <a
                                            href={project.repo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ExternalLink size={18} strokeWidth={1.5} />
                                        </a>
                                    )}
                                    <button className="text-muted-foreground hover:text-amber-500 transition-colors">
                                        <Star size={18} strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>
                            <Link href={`/projects/${project.id}`}>
                                <h3 className="hero-heading text-xl mb-3 hover:text-primary transition-colors">{project.name}</h3>
                            </Link>
                            <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2 mb-8">
                                {project.description || "No description provided."}
                            </p>

                            {project.repo_url && (
                                <div className="mb-6">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2 opacity-50">Repository</span>
                                    <code className="text-[11px] bg-muted px-2 py-1 rounded truncate block border border-border/50">
                                        {project.repo_url}
                                    </code>
                                </div>
                            )}

                            <div className="flex items-center gap-4 pt-6 border-t border-border">
                                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                    <Users size={12} />
                                    <span>3 members</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-auto">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    <span>Active</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
