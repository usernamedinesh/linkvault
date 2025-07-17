import { useState } from 'react';
import LinkList from "./LinkList";
import {useTheme} from "../context/ThemeContext";
import Footer from  "./Footer";
import { client } from "../lib/client";

type LinkItem = {
    id: number;
    url: string;
    title: string;
    tags?: string;
};

const HomePage: React.FC = () => {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const {theme} = useTheme()

    const handleAddLink = () => {
        const newLink: LinkItem = {
            id: Date.now(),
            url: '',
            title: '',
            tags: '',
        };
        setLinks((prev) => [...prev, newLink]);
        setShowForm(true);
    };

    //TODO: it i wll be paste
    const handlePaste = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('Link Pated!');
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
        setLinks((prev) => prev.filter((link) => link.url !== '' || link.title !== ''));
    }
    //api call
    const handleSaveLink = async () => {
        const token = localStorage.getItem("linkToken");
        const lastLink = links[links.length - 1];
        if (!lastLink) return alert("Link data missing.");


        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/link/add-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: lastLink.title,
                    url: lastLink.url,
                    tags: lastLink.tags,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setLinks((prev) => prev.slice(0, -1));
                setShowForm(false);
                alert(data.message || "Link saved successfully!");
                console.log("response", data);
            } else {
                alert(data.message || "Failed to save link");
                console.error("error", data);
            }
        } catch (err) {
            console.error(err);
            alert("Network error, please try again.");
        }
    };

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
                    if (!showForm && isLast && link.url === '' && link.title === '') {
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
                                    onClick={() => handlePaste(link.url)}
                                >
                                    [paste]
                                </button>
                            </div>

                            {/* NAME row */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm w-12">Name:</label>
                                <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => handleChange(link.id, 'title', e.target.value)}
                                    className="flex-1 px-2 py-1 text-black rounded"
                                    placeholder="Link title"
                                />
                            </div>

                            {/* TAG row */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm w-12">Tag:</label>
                                <input
                                    type="text"
                                    value={link.tags}
                                    onChange={(e) => handleChange(link.id, 'tags', e.target.value)}
                                    className="flex-1 px-2 py-1 text-black rounded"
                                    placeholder="Optional tags"
                                />
                            </div>

                        </div>
                    );
                })}

            </div>
            {showForm && (
                <div className="flex gap-4 mb-5">
                    <button
                        onClick={handleSaveLink}
                        className="mt-4 rounded bg-pink-600 px-5 py-2 text-white hover:bg-pink-700 "
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancelLink}
                        className="mt-4 rounded bg-pink-600 px-5 py-2 text-white hover:bg-pink-700 "
                    >
                        Cancel
                    </button>
                </div>
            )}
            <LinkList />

            {/* push footer to bottom & give it a reliable colour */}
            <div className="">
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;

