'use server';

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createProject(formData) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthorized');

        const name = formData.get('name');
        const description = formData.get('description');
        const repo_url = formData.get('repo_url');

        const { data: project, error: projectError } = await supabaseAdmin
            .from('projects')
            .insert({
                name,
                description,
                repo_url,
                owner_id: userId
            })
            .select()
            .single();

        if (projectError) throw projectError;

        // Add owner to members table
        const { error: memberError } = await supabaseAdmin
            .from('project_members')
            .insert({
                project_id: project.id,
                user_id: userId,
                role: 'owner'
            });

        if (memberError) throw memberError;

        // Log activity
        await supabaseAdmin.from('activity_logs').insert({
            project_id: project.id,
            user_id: userId,
            action: `Created project: ${name}`
        });

        revalidatePath('/dashboard');
        return { success: true, project };
    } catch (error) {
        console.error('Error creating project:', error);
        return { success: false, error: error.message };
    }
}

export async function getProjects() {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthorized');

        const { data, error } = await supabaseAdmin
            .from('projects')
            .select(`
                *,
                project_members!inner(user_id)
            `)
            .eq('project_members.user_id', userId);

        if (error) throw error;
        return { success: true, projects: data };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { success: false, error: error.message };
    }
}
