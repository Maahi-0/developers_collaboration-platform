import { getProjectData } from "@/app/actions/tasks";
import TaskBoard from "@/components/TaskBoard";
import { Users, Settings, Activity, Clock, Plus } from "lucide-react";
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
        <div className="space-y-8">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Active
                        </div>
                        <span className="text-muted-foreground text-sm font-medium flex items-center gap-1">
                            <Clock size={14} /> Updated 2 hours ago
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
                    <p className="text-muted-foreground max-w-2xl">{project.description}</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 mr-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center text-xs font-bold text-muted-foreground">
                                {String.fromCharCode(65 + i)}
                            </div>
                        ))}
                        <button className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground hover:bg-white/10 transition-colors">
                            <Plus size={16} />
                        </button>
                    </div>
                    <CreateTaskButton projectId={id} />
                    <button className="p-3 bg-card border border-border rounded-xl text-muted-foreground hover:text-white transition-colors">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* Tabs / Navigation */}
            <div className="flex items-center gap-8 border-b border-border/50">
                <button className="px-1 py-4 border-b-2 border-primary text-primary font-bold flex items-center gap-2">
                    Board View
                </button>
                <button className="px-1 py-4 border-b-2 border-transparent text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                    List View
                </button>
                <button className="px-1 py-4 border-b-2 border-transparent text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                    Team Members
                </button>
                <button className="px-1 py-4 border-b-2 border-transparent text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                    Activity Feed
                </button>
            </div>

            {/* Main Board Content */}
            <div className="pt-4">
                <TaskBoard project={project} />
            </div>
        </div>
    );
}
