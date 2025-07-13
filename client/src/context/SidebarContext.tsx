
// SidebarContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarCtx = {
  isOpen: boolean;
  open:  () => void;
  close: () => void;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarCtx>({
  isOpen: false,
  open:  () => {},
  close: () => {},
  toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);

  const value: SidebarCtx = {
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(prev => !prev),
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => useContext(SidebarContext);
