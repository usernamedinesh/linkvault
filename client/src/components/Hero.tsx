import { useState } from 'react';
import LinkList from "./LinkList";
import {useTheme} from "../context/ThemeContext";
import Footer from  "./Footer";

type LinkItem = {
    id: number;
    url: string;
    name: string;
    tag?: string;
    updatedAt: string;
    createdAt: string;
};

const HomePage: React.FC = () => {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const {theme} = useTheme()

    const handleAddLink = () => {
        const newLink: LinkItem = {
            id: Date.now(),
            url: '',
            name: '',
            tag: '',
            updatedAt: new Date().toLocaleString(),
            createdAt: new Date().toLocaleString(),
        };
        setLinks((prev) => [...prev, newLink]);
        setShowForm(true);
    };

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('Link copied!');
    };

    const handleEdit = (id: number) => {
        console.log('Edit link with ID:', id);
    };

    const handleChange = (id: number, field: keyof LinkItem, value: string) => {
        setLinks((prev) =>
            prev.map((link) =>
                link.id === id
                    ? { ...link, [field]: value, updatedAt: new Date().toLocaleString() }
                    : link
            )
        );
    };
    const handleCancelLink = () => {
        setShowForm(false);
        setLinks((prev) => prev.filter((link) => link.url !== '' || link.name !== ''));
    }

    return (
        <div className="min-h-screen flex flex-col items-center ">

            <header className="w-full  text-center border-b border-gray-700">
                <h1 className="text-3xl font-bold tracking-wide">🔗 LinkVault</h1>
                <p className="text-sm text-gray-400 mt-2">Your personal vault for links</p>
            </header>
            <button
                onClick={handleAddLink}
                className=" mt-5 mb-6 rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
            >
                + Add New Link
            </button>

            <div className="w-full max-w-md space-y-4">
                {links.map((link, index) => {
                    const isLast = index === links.length - 1;
                    if (!showForm && isLast && link.url === '' && link.name === '') {
                        return null; // don't show the empty form if it's canceled
                    }

                    return (
                        <div
                            key={link.id}
                            className="rounded border border-white p-4 space-y-2"
                        >
                            {/* LINK row */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm w-12">LINK:</label>
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => handleChange(link.id, 'url', e.target.value)}
                                    className="flex-1 px-2 py-1 text-black rounded"
                                    placeholder="Enter link..."
                                />
                                <button
                                    className="text-sm text-blue-400 hover:underline"
                                    onClick={() => handleCopy(link.url)}
                                >
                                    [copy]
                                </button>
                            </div>

                            {/* NAME row */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm w-12">Name:</label>
                                <input
                                    type="text"
                                    value={link.name}
                                    onChange={(e) => handleChange(link.id, 'name', e.target.value)}
                                    className="flex-1 px-2 py-1 text-black rounded"
                                    placeholder="Link name"
                                />
                            </div>

                            {/* TAG row */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm w-12">Tag:</label>
                                <input
                                    type="text"
                                    value={link.tag}
                                    onChange={(e) => handleChange(link.id, 'tag', e.target.value)}
                                    className="flex-1 px-2 py-1 text-black rounded"
                                    placeholder="Optional tag"
                                />
                            </div>

                            {/* SAVE + EDIT row */}
                            <div className="flex items-center justify-between text-sm pt-2">
                                <span className="text-gray-400">Save:</span>
                                <button
                                    onClick={() => handleEdit(link.id)}
                                    className="text-pink-500 hover:underline"
                                >
                                    Edit
                                </button>
                            </div>

                            <p className="text-[10px] text-right text-gray-500 italic">
                                Updated: {link.updatedAt}
                            </p>
                        </div>
                    );
                })}

            </div>
            { showForm && 
                <button
                    onClick={handleCancelLink}
                    className="mt-4 rounded bg-pink-600 px-5 py-2 text-white hover:bg-pink-700"
                >
                    Cancel
                </button>
            }
                <LinkList />

    {/* push footer to bottom & give it a reliable colour */}
            <div className="">
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;

