import { getProjectData } from "@/app/actions/tasks";
import TaskBoard from "@/components/TaskBoard";
import { Users, Settings, Activity, Clock, Plus, ExternalLink } from "lucide-react";
import CreateTaskButton from "@/components/CreateTaskButton";

export default async function ProjectPage({ params }) {
    const { id } = await params;
    const { project, error } = await getProjectData(id);

    if (error || !project) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-20">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Project Not Found</h2>
                <p className="text-muted-foreground">{error || "The project you are looking for does not exist or you don't have access."}</p>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-border">
                <div className="flex-1">
                    <div className="flex items-center gap-5 mb-8">
                        <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Active
                        </div>
                        <span className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                            <Clock size={12} strokeWidth={2.5} /> Last update 2h ago
                        </span>
                    </div>
                    <h1 className="hero-heading text-5xl mb-6">{project.name}</h1>
                    <div className="flex flex-col gap-4">
                        <p className="text-muted-foreground max-w-2xl font-light italic leading-relaxed text-lg">{project.description}</p>
                        {project.repo_url && (
                            <a
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs font-bold text-primary hover:opacity-80 transition-opacity w-fit bg-muted/50 px-3 py-1.5 rounded-full border border-border/50 uppercase tracking-widest"
                            >
                                <ExternalLink size={14} /> View Repository
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3 mr-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">
                                {String.fromCharCode(65 + i)}
                            </div>
                        ))}
                        <button className="w-10 h-10 rounded-full border-2 border-white bg-muted flex items-center justify-center text-muted-foreground hover:bg-white transition-all shadow-sm">
                            <Plus size={16} />
                        </button>
                    </div>
                    <CreateTaskButton projectId={id} />
                    <button className="p-3 bg-white border border-border rounded-full text-muted-foreground hover:text-foreground hover:shadow-sm transition-all shadow-sm">
                        <Settings size={18} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Tabs / Navigation */}
            <div className="flex items-center gap-10 border-b border-border/50">
                <button className="px-1 py-4 border-b-2 border-primary text-primary font-bold text-xs uppercase tracking-widest">
                    Board
                </button>
                <button className="px-1 py-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest">
                    List
                </button>
                <button className="px-1 py-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest">
                    Team
                </button>
                <button className="px-1 py-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest">
                    Activity
                </button>
            </div>

            {/* Main Board Content */}
            <div className="pt-6">
                <TaskBoard project={project} />
            </div>
        </div>
    );
}
