import { getAllUserTasks } from "@/app/actions/tasks";
import { Clock, CheckSquare, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const STATUS_CONFIG = {
    todo: {
        label: "To Do",
        icon: Clock,
        color: "text-amber-600 bg-amber-50 border-amber-100",
        indicator: "bg-amber-400"
    },
    "in-progress": {
        label: "In Progress",
        icon: AlertCircle,
        color: "text-blue-600 bg-blue-50 border-blue-100",
        indicator: "bg-blue-400"
    },
    done: {
        label: "Completed",
        icon: CheckCircle2,
        color: "text-emerald-600 bg-emerald-50 border-emerald-100",
        indicator: "bg-emerald-500"
    }
};

export default async function TasksPage() {
    const { tasks = [], error } = await getAllUserTasks();

    const tasksByStatus = {
        todo: tasks.filter(t => t.status === "todo"),
        "in-progress": tasks.filter(t => t.status === "in-progress"),
        done: tasks.filter(t => t.status === "done")
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="hero-heading text-4xl mb-2">My Tasks</h1>
                <p className="text-muted-foreground font-light italic text-lg">Centralized view of all your tasks across workspaces.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {Object.entries(tasksByStatus).map(([status, statusTasks]) => {
                    const config = STATUS_CONFIG[status];
                    const Icon = config.icon;

                    return (
                        <div key={status} className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-border/60">
                                <div className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${config.indicator}`}></div>
                                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-80">
                                        {config.label}
                                    </h2>
                                </div>
                                <span className="bg-muted px-2.5 py-0.5 rounded-full text-[10px] font-bold text-muted-foreground tabular-nums border border-border/50">
                                    {statusTasks.length}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {statusTasks.length === 0 ? (
                                    <div className="py-12 border border-dashed border-border rounded-xl bg-muted/20 flex flex-col items-center justify-center text-center px-6">
                                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest leading-relaxed">No tasks in this stage</p>
                                    </div>
                                ) : (
                                    statusTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="bg-white border border-border p-5 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary opacity-60">
                                                        {task.projects?.name}
                                                    </span>
                                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border inline-block w-fit ${task.priority === 'high' ? 'bg-red-50 text-red-600 border-red-100' :
                                                            task.priority === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                                'bg-blue-50 text-blue-600 border-blue-100'
                                                        }`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                                <Icon size={14} className="text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            <Link href={`/projects/${task.project_id}`}>
                                                <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors leading-snug">
                                                    {task.title}
                                                </h4>
                                            </Link>

                                            {task.description && (
                                                <p className="text-xs text-muted-foreground font-light italic line-clamp-2 mb-4 leading-relaxed">
                                                    {task.description}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/40">
                                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                                                    <Clock size={11} strokeWidth={2.5} />
                                                    {new Date(task.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
