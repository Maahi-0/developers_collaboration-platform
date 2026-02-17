'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { syncUser } from '@/lib/user-sync';

/**
 * Server action to sync the currently authenticated Clerk user to Supabase.
 */
export async function syncCurrentUser() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: 'Not authenticated' };
        }

        const user = await currentUser();

        if (!user) {
            return { success: false, error: 'User not found in Clerk' };
        }

        const email = user.emailAddresses[0]?.emailAddress;
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const name = `${firstName} ${lastName}`.trim();
        const imageUrl = user.imageUrl;

        const syncedUser = await syncUser({
            clerkId: userId,
            email,
            name,
            imageUrl,
        });

        return { success: true, user: syncedUser };
    } catch (error) {
        console.error('Failed to sync user:', error);
        return { success: false, error: error.message || 'Internal server error' };
    }
}
