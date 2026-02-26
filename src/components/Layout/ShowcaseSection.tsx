import React from 'react';

interface ShowcaseSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
    title,
    description,
    children,
    icon
}) => {
    return (
        <section className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl shadow-sm dark:shadow-2xl dark:shadow-slate-950/50 border border-gray-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
            <div className={`p-8 border-b border-gray-50 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/20 ${!description ? 'pb-6' : ''}`}>
                <div className="flex items-center gap-3 mb-1">
                    {icon && <div className="p-2 bg-blue-600 dark:bg-blue-500 text-white rounded-xl shadow-sm">{icon}</div>}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {title}
                    </h2>
                </div>
                {description && (
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm max-w-2xl mt-3">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex-1 p-6 overflow-hidden bg-white dark:bg-slate-900/50">
                {children}
            </div>
        </section>
    );
};
