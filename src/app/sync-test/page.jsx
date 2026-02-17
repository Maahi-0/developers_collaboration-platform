'use client';

import { useState } from 'react';
import { syncCurrentUser } from '@/app/actions/user';

export default function SyncTestPage() {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);

    const handleSync = async () => {
        setStatus('loading');
        setMessage('Syncing user...');

        try {
            const result = await syncCurrentUser();

            if (result.success) {
                setStatus('success');
                setMessage('User synced successfully!');
                setUserData(result.user);
            } else {
                setStatus('error');
                setMessage(`Sync failed: ${result.error}`);
            }
        } catch (err) {
            setStatus('error');
            setMessage(`An unexpected error occurred: ${err.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 text-zinc-100">
            <div className="w-full max-w-md p-6 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl">
                <h1 className="text-2xl font-bold mb-6 text-white">Supabase Connection Test</h1>

                <p className="text-zinc-400 mb-8 leading-relaxed">
                    This page tests the secure server-side connection between Clerk and Supabase by syncing your current profile.
                </p>

                <button
                    onClick={handleSync}
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${status === 'loading'
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]'
                        }`}
                >
                    {status === 'loading' ? (
                        <>
                            <div className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin"></div>
                            Verifying Connection...
                        </>
                    ) : (
                        'Test Connection'
                    )}
                </button>

                {status !== 'idle' && (
                    <div className={`mt-6 p-4 rounded-xl border ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                            status === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                'bg-zinc-800/50 border-zinc-700 text-zinc-300'
                        }`}>
                        <p className="font-medium">{message}</p>
                        {userData && (
                            <pre className="mt-4 p-3 bg-black/40 rounded-lg text-xs overflow-auto max-h-40 text-zinc-400 border border-white/5">
                                {JSON.stringify(userData, null, 2)}
                            </pre>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
