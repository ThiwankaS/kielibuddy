import StatusIndicator from './StatusIndicator';

/**
 * Standard Footer component used across the application.
 * Includes copyright info, version, and the backend status indicator.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-auto py-8 border-t border-slate-100 flex flex-col items-center gap-4 bg-white/50 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
                <p className="text-slate-500 text-sm font-medium">
                    © {currentYear} Kielibuddy | Built by Thiwanka Somachandra
                </p>
                <p className="font-mono text-[0.70rem] mt-1 text-slate-400 uppercase tracking-widest">
                    Version 0.1.0-alpha
                </p>
            </div>

            {/* Backend Connection Status */}
            <StatusIndicator />
        </footer>
    );
}
