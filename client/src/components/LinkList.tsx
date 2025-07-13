import { useEffect, useState } from 'react';
import data from './link.json';
import { useTheme } from "../context/ThemeContext";

type LinkItem = {
    id: number;
    url: string;
    name: string;
    tag: string;
    updatedAt: string;
};

const LinksList = () => {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const { theme } = useTheme();

    useEffect(() => {
        setTimeout(() => {
            setLinks(data);
        }, 300);
    }, []);

    return (
        <div className=" max-h-[70vh] pr-2 pb-5">
            <h2 className=" text-2xl font-bold text-center">📚 My Links</h2>

            <div className="overflow-y-auto max-h-[70vh] pr-2 ">
                <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
                    {links.map(link => (
                        <div
                            key={link.id}
                            className={`
                            group                                  
                            mb-5
                            mt-4
                            h-[150px] w-[700px]
                            p-4 rounded-[2px] shadow-xl
                            transition-colors
                            ${theme === 'dark'
                            ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white'
                            : 'bg-gray-400 text-black hover:bg-gray-300 hover:text-black'}
                            `}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">{link.name}</h3> {/* text-lg → text-xl */}
                                <span className="text-sm opacity-80">{link.updatedAt}</span> {/* text-xs → text-sm */}
                            </div>

                            <p className="
                                text-base break-all underline
                                text-blue-700
                                group-hover:underline
                                ">
                                {link.url}
                            </p>

                            <div className="mt-2 text-base"> {/* text-sm → text-base */}
                                Tag: <span className="font-medium">{link.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LinksList;

