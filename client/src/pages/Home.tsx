import { useState, useEffect, useCallback } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';      // mobile hamburger icon
import Sidebar from '../components/Sidebar';
import { useTheme } from "../context/ThemeContext";
import Hero from "../components/Hero";



function Home() {
  /* ---------------- state ---------------- */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile]           = useState(false);

  const { theme } = useTheme();

  /* detect < 768 px so we can tell Sidebar it’s on “mobile” */
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();                                // run once on mount
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* helpers */
  const open   = useCallback(() => setIsSidebarOpen(true),  []);
  const close  = useCallback(() => setIsSidebarOpen(false), []);
  const toggle = useCallback(() => setIsSidebarOpen(p => !p), []);

  /* desktop: open when mouse hits far-left edge */
  // const handleMouseMove  = e => { if (!isMobile && e.clientX <= 1) open(); };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!isMobile && e.clientX <= 1) open();
};
  const handleMouseLeave = () => { if (!isMobile) close(); };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ height: '100vh' }}
      className={`
        flex relative overflow-hidden
        transition-colors duration-500 ease-in-out
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'}
      `}
        >
      {/* ─────────── SIDEBAR ─────────── */}
      <div
        onMouseLeave={handleMouseLeave}
        className={`
          transition-all duration-500 ease-in-out
          ${isMobile
            ? `fixed top-0 left-0 z-40 h-full transform
               ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
               w-64`
            : `${isSidebarOpen ? 'w-64' : 'w-0'}`
          }
          opacity-${isSidebarOpen ? '100' : '0'}
          scale-${isSidebarOpen ? '100' : '95'}
          overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900
          text-white shadow-lg rounded-r-md backdrop-blur-sm

        `}
        style={{ transitionProperty: 'width, opacity, transform' }}
      >
        <Sidebar onClose={close} isMobile={isMobile} />
      </div>

      {/* mobile backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* ─────────── MAIN CONTENT ─────────── */}
       {/* <div className="flex-1 p-6 md:pl-64"> */}


    <div
      className={`
        flex-1 p-6 transition-all duration-300
        mx-2 sm:mx-1              /* Equal margin on both sides for all screen sizes */
        ${isSidebarOpen ? '' : 'sm:mx-1'}  /* Apply larger side margins when sidebar is closed */
      `}
    >
        {/* hamburger only shows on mobile */}
        {isMobile && (
          <button
            onClick={toggle}
            className="text-3xl mb-4 focus:outline-none"
            aria-label="Open menu"
          >
            <HiMenuAlt3 />
          </button>
        )}

        {/* CONTENT */}
        <Hero/>
      </div>
    </div>
  );
}

export default Home;

