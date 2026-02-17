import { supabaseAdmin } from './supabase';

/**
 * Syncs a Clerk user to the Supabase 'profiles' table.
 */
export async function syncUser(params) {
    const { clerkId, email, name, imageUrl } = params;

    if (!clerkId) {
        throw new Error('Clerk ID is required for user sync');
    }

    const { data, error } = await supabaseAdmin
        .from('profiles')
        .upsert(
            {
                id: clerkId, // Using Clerk ID as the primary key 'id'
                email: email,
                name: name,
                avatar_url: imageUrl,
            },
            {
                onConflict: 'id',
            }
        )
        .select()
        .single();

    if (error) {
        console.error('Error syncing user to Supabase:', error);
        throw error;
    }

    return data;
}
