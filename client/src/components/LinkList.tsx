
import { useEffect, useState } from 'react';
import data from './link.json';

type LinkItem = {
  id: number;
  url: string;
  name: string;
  tag: string;
  updatedAt: string;
};

const LinksList = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    // Simulate async load
    setTimeout(() => {
      setLinks(data);
    }, 300); // simulate slight delay
  }, []);

  return (
 <div className="max-w-4xl   /* ⬅️ wider than 2xl */
                w-full mx-auto p-4 space-y-4">

      <h2 className="text-2xl font-bold text-center">📚 My Links</h2>

      {/* -------------- scrollable region -------------- */}
      <div className="space-y-4               /* gap between cards  */
                      overflow-y-auto         /* vertical scrollbar */
                      max-h-[70vh]            /* stop growing after 70 % of viewport */
                      pr-2">     

        {links.map(link => (
          <div key={link.id}
               className="h-[150px] w-[1000px] bg-gray-900 border border-gray-700
                          p-4 rounded shadow text-white">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{link.name}</h3>
              <span className="text-xs text-gray-400">{link.updatedAt}</span>
            </div>

            <p className="text-sm text-blue-400 break-all">{link.url}</p>
            <div className="mt-2 text-sm text-gray-300">
              Tag: <span className="font-medium">{link.tag}</span>
            </div>
          </div>
        ))}

      </div>
      {/* -------------- /scrollable region -------------- */}
    </div>
  );
};

export default LinksList;
