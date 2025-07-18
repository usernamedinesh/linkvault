import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import data from './link.json';
import { useTheme }    from '../context/ThemeContext';
import { useSidebar }  from '../context/SidebarContext';
import { addLink } from "../lib/addLink";

type LinkItem = {
    id: number;
    url: string;
    title: string;
    tag: string;
    updatedAt?: string;
    publishedAt?: string;
};


const LinkList = forwardRef((props, ref) => {
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


      // Make addLink externally accessible
      useImperativeHandle(ref, () => ({
        async addAndPushLink(newLinkData: { title: string; url: string; tags: string }) {
          const token = localStorage.getItem('linkToken');
          const { success, data } = await addLink(token, newLinkData);
          if (success && data?.data?.new_link) {
            setLinks(prev => [...prev, data.data.new_link]);
          }
          return { success, data };
        }
      }));

    const deleteLink = async(id: number) => {
        try{
           const token = localStorage.getItem("linkToken"); 
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/link/delete-link`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    linkIds: id,
                }),
            })
            const data = await res.json();
            if (res.ok) {
                alert(data.message || "link deleted successfully!");
            } else {
                alert(data.message || "Failed to fetch link!");
                console.error("error", data);
            }
        }catch(err){
            console.error(err);
            alert("Network error, please try again.");
        }
    }


    useEffect(() => {
        async function fetchLinks() {
            try {
                const token = localStorage.getItem("linkToken");
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/link/get-link`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setLinks(data.data.links);
                } else {
                    alert(data.message || "Failed to fetch link");
                    console.error("error", data);
                }
            } catch (err) {
                console.error(err);
                alert("Network error, please try again.");
            }
        }

        fetchLinks(); // call the async function properly
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
{links.length > 0 ? (
  links.map(link => {
    const isActive = link.id === activeId;

    return (
      <div
        key={link.id}
        onClick={() => setActiveId(link.id)}
        className={`
          relative cursor-pointer p-4 rounded-md shadow-xl transition-colors
          h-[150px]
          w-full lg:w-[750px]
          ${theme === 'dark'
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-400 text-black hover:bg-gray-300'}
        `}
      >
        {/* card body */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl sm:text-xl xs:text-lg font-semibold">
            {link.title}
          </h3>
          <span className="text-sm opacity-80">{link.publishedAt}</span>
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
            className="absolute inset-0 z-[70] flex items-center justify-center gap-4 bg-black/60 rounded-md"
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

            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              onClick={() => deleteLink(link.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  })
) : (
  <h1>Feel free to add Links</h1>
)}
                </div>
            </div>
        </>
    );
})

export default LinkList;
