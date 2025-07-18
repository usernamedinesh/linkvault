import { useState, useRef } from 'react';
import LinkList from "./LinkList";
import Footer from "./Footer";

type LinkItem = {
  id: number;
  url: string;
  title: string;
  tags?: string;
  updatedAt?: string;
};

type LinkListHandle = {
  addAndPushLink: (newLink: LinkItem) => Promise<{
    success: boolean;
    data?: any;
  }>;
};

const HomePage: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]); // ✅ always an array
  const [showForm, setShowForm] = useState(false);
  const linksRef = useRef<LinkListHandle | null>(null);

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: Date.now(),
      url: '',
      title: '',
      tags: '',
      updatedAt: new Date().toLocaleString(),
    };
    setLinks((prev) => [...prev, newLink]);
    setShowForm(true);
  };

  const handlePaste = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Link pasted!');
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
    setLinks((prev) =>
      prev.filter((link) => link.url !== '' || link.title !== '')
    );
  };

  const handleSaveLink = async () => {
    const lastLink = links[links.length - 1];
    if (!lastLink) return alert("Link data missing.");

    if (!linksRef.current) return alert("Component not ready.");
    const { success, data } = await linksRef.current.addAndPushLink(lastLink);

    if (success) {
      setLinks((prev) => prev.slice(0, -1)); // remove the empty form link
      setShowForm(false);
      alert(data?.message || "Link saved successfully!");
    } else {
      alert(data?.message || "Failed to save link");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full text-center border-b border-gray-700">
        <h1 className="text-3xl font-bold tracking-wide">🔗 LinkVault</h1>
        <p className="text-sm text-gray-400 mt-2">Your personal vault for links</p>
      </header>

      <button
        onClick={handleAddLink}
        className="mt-5 mb-6 rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
      >
        + Add New Link
      </button>

      <div className="w-full max-w-md space-y-4">
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          if (!showForm && isLast && link.url === '' && link.title === '') {
            return null;
          }

          return (
            <div key={link.id} className="rounded border border-white p-4 space-y-2">
              {/* LINK */}
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

              {/* NAME */}
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

              {/* TAG */}
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
            className="mt-4 rounded bg-pink-600 px-5 py-2 text-white hover:bg-pink-700"
          >
            Save
          </button>
          <button
            onClick={handleCancelLink}
            className="mt-4 rounded bg-pink-600 px-5 py-2 text-white hover:bg-pink-700"
          >
            Cancel
          </button>
        </div>
      )}

      <LinkList ref={linksRef} />
      <Footer />
    </div>
  );
};

export default HomePage;

