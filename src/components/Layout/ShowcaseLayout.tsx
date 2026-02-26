import React, { useState, useEffect } from 'react';
import { Github, Sun, Moon } from 'lucide-react';

interface ShowcaseLayoutProps {
    children: React.ReactNode;
}

export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
            {/* Professional Header */}
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-50">
                <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all">
                            EZ
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
                                Frontend Assignment Submission
                            </h1>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">
                                Prathmesh Shukla • EzWorks Assessment
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-md"
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <a
                            href="https://github.com/Prthmsh7/EzWorks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-md flex items-center gap-2"
                            title="View Repository"
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline">Source Code</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content Area - Custom Responsive Split */}
            <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-8 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(350px,35%)_1fr] gap-8 h-full">
                    {children}
                </div>
            </main>


        </div>
    );
};
