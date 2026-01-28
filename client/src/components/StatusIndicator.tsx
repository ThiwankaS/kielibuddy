import { useState, useEffect } from 'react';

/**
 * StatusIndicator component to show backend connectivity status.
 * Displays a green dot if the backend is reachable, and yellow otherwise.
 */
export default function StatusIndicator() {
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {
        // Check backend health status
        fetch('/api/v1/health')
            .then((res) => {
                if (res.ok) {
                    setIsOnline(true);
                } else {
                    setIsOnline(false);
                }
            })
            .catch(() => setIsOnline(false));
    }, []);

    return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500">
            <span
                className={`h-2.5 w-2.5 rounded-full shadow-sm ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-yellow-400'
                    }`}
                title={isOnline ? 'Backend Connected' : 'Local Mode'}
            ></span>
            <span>{isOnline ? 'Online' : 'Local Mode'}</span>
        </div>
    );
}
