import { useEffect, useState } from 'react';
import data from './link.json';
import { useTheme }    from '../context/ThemeContext';
import { useSidebar }  from '../context/SidebarContext';

type LinkItem = {
    id: number;
    url: string;
    name: string;
    tag: string;
    updatedAt: string;
};

export default function LinksList() {
    const [links, setLinks]       = useState<LinkItem[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);

    const { theme } = useTheme();
    const {
        isOpen: sidebarOpen,
        close:  closeSidebar,
        lock,
        unlock,
    } = useSidebar();

    /* lock sidebar whenever a card overlay is active */
    useEffect(() => {
        if (activeId !== null) lock();
            else                   unlock();
    }, [activeId, lock, unlock]);

    /* load demo data */
    useEffect(() => {
        const t = window.setTimeout(() => setLinks(data), 300);
        return () => window.clearTimeout(t);
    }, []);

    /* backdrop z-index: above sidebar (40) but below card overlay (70) */
    const backdropClass = activeId !== null ? 'z-[50]' : 'z-[40]';

    return (
        <>
            {/* dim-screen backdrop */}
            {activeId !== null && (
                <div
                    className="fixed left-0 top-0 h-full w-4 z-[60]  /* 4 px wide shield */
                    pointer-events-auto"
                    onMouseEnter={e => e.stopPropagation()}          /* swallow the hover */
                />
            )}

            {/* scrollable grid of cards */}
            <div className="relative z-30 overflow-y-auto max-h-[70vh] pr-3">
                <div className="
                    grid grid-cols-1        /* phones */
                    sm:grid-cols-2          /* ≥640 px */
                    gap-10
                    ">
                    {links.map(link => {
                        const isActive = link.id === activeId;

                        return (
                            <div
                                key={link.id}
                                onClick={() => setActiveId(link.id)}
                                className={`
                                relative cursor-pointer p-4 rounded-md shadow-xl transition-colors
                                h-[150px]
                                w-full                 /* phones */
                                lg:w-[750px]   
                                ${theme === 'dark'
                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                : 'bg-gray-400 text-black hover:bg-gray-300'}
                                `}
                            >
                                {/* card body */}
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl sm:text-xl xs:text-lg font-semibold">
                                        {link.name}
                                    </h3>
                                    <span className="text-sm opacity-80">{link.updatedAt}</span>
                                </div>

                                <p className="text-base break-all underline text-blue-700">
                                    {link.url}
                                </p>

                                <div className="mt-2 text-base">
                                    Tag: <span className="font-medium">{link.tag}</span>
                                </div>

                                {/* action overlay */}
                                {isActive && (
                                    <div
                                        className="absolute inset-0 z-[70] flex items-center justify-center gap-4
                                        bg-black/60 rounded-md"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <button
                                            className="px-4 py-2 rounded bg-amber-500 text-white"
                                            onClick={() => console.log('Edit', link.id)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="px-4 py-2 rounded bg-emerald-500 text-white"
                                            onClick={() => window.open(link.url, '_blank')}
                                        >
                                            Open
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

