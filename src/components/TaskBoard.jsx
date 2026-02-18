"use client";

import { useState } from "react";
import { Plus, GripVertical, Clock, MoreVertical, MessageSquare } from "lucide-react";
import { updateTaskStatus } from "@/app/actions/tasks";

const COLUMNS = [
    { id: "todo", title: "To Do", color: "bg-muted" },
    { id: "in-progress", title: "In Progress", color: "bg-amber-400" },
    { id: "done", title: "Done", color: "bg-emerald-500" },
];

export default function TaskBoard({ project }) {
    const [tasks, setTasks] = useState(project.tasks || []);
    const [movingTaskId, setMovingTaskId] = useState(null);

    const handleStatusChange = async (taskId, newStatus) => {
        // Optimistic update
        const oldTasks = [...tasks];
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

        const result = await updateTaskStatus(project.id, taskId, newStatus);
        if (!result.success) {
            setTasks(oldTasks);
            alert("Failed to update status");
        }
    };

    const tasksByStatus = (status) => tasks.filter(t => t.status === status);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[600px]">
            {COLUMNS.map((column) => (
                <div
                    key={column.id}
                    className="flex flex-col bg-card/30 rounded-2xl border border-border/50 p-4"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => movingTaskId && handleStatusChange(movingTaskId, column.id)}
                >
                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${column.color}`}></div>
                            <h3 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground opacity-70">
                                {column.title}
                            </h3>
                            <span className="bg-muted px-2 py-0.5 rounded text-[10px] font-bold text-muted-foreground">
                                {tasksByStatus(column.id).length}
                            </span>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <MoreVertical size={14} />
                        </button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {tasksByStatus(column.id).map((task) => (
                            <div
                                key={task.id}
                                draggable
                                onDragStart={() => setMovingTaskId(task.id)}
                                onDragEnd={() => setMovingTaskId(null)}
                                className="bg-white border border-border p-5 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-grab active:cursor-grabbing group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${task.priority === 'high' ? 'bg-red-50 text-red-600 border-red-100' :
                                        task.priority === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                        {task.priority}
                                    </span>
                                    <GripVertical size={14} className="text-muted-foreground opacity-0 group-hover:opacity-40 transition-opacity" />
                                </div>

                                <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{task.title}</h4>

                                {task.description && (
                                    <p className="text-xs text-muted-foreground font-light italic line-clamp-2 mb-4 leading-relaxed">
                                        {task.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/40">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                                            <Clock size={11} strokeWidth={2.5} />
                                            {new Date(task.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors">
                                            <MessageSquare size={13} strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-4 border border-dashed border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
                            <Plus size={14} className="group-hover:scale-110 transition-transform" />
                            Add Task
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
