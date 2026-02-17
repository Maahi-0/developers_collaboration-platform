'use server';

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createTask(projectId, formData) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthorized');

        const title = formData.get('title');
        const description = formData.get('description');
        const priority = formData.get('priority') || 'medium';

        const { data: task, error } = await supabaseAdmin
            .from('tasks')
            .insert({
                project_id: projectId,
                title,
                description,
                priority,
                status: 'todo'
            })
            .select()
            .single();

        if (error) throw error;

        // Log activity
        await supabaseAdmin.from('activity_logs').insert({
            project_id: projectId,
            user_id: userId,
            action: `Created task: ${title}`
        });

        revalidatePath(`/projects/${projectId}`);
        return { success: true, task };
    } catch (error) {
        console.error('Error creating task:', error);
        return { success: false, error: error.message };
    }
}

export async function updateTaskStatus(projectId, taskId, status) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthorized');

        const { data: task, error } = await supabaseAdmin
            .from('tasks')
            .update({ status })
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;

        // Log activity
        await supabaseAdmin.from('activity_logs').insert({
            project_id: projectId,
            user_id: userId,
            action: `Moved task "${task.title}" to ${status}`
        });

        revalidatePath(`/projects/${projectId}`);
        return { success: true, task };
    } catch (error) {
        console.error('Error updating task status:', error);
        return { success: false, error: error.message };
    }
}

export async function getProjectData(projectId) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthorized');

        // Check if user is member
        const { data: member, error: memberError } = await supabaseAdmin
            .from('project_members')
            .select('*')
            .eq('project_id', projectId)
            .eq('user_id', userId)
            .single();

        if (memberError && memberError.code !== 'PGRST116') throw memberError;
        if (!member) throw new Error('You do not have access to this project');

        const { data: project, error: projectError } = await supabaseAdmin
            .from('projects')
            .select(`
                *,
                tasks(*),
                activity_logs(*, profiles(name, avatar_url))
            `)
            .eq('id', projectId)
            .single();

        if (projectError) throw projectError;

        return { success: true, project };
    } catch (error) {
        console.error('Error fetching project data:', error);
        return { success: false, error: error.message };
    }
}
