// SidebarContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarCtx = {
  isOpen:  boolean;
  isLocked:boolean;
  open:    () => void;
  close:   () => void;
  toggle:  () => void;
  lock:    () => void;   // NEW
  unlock:  () => void;   // NEW
};

const SidebarContext = createContext<SidebarCtx>(undefined!);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen,  setOpen]   = useState(false);
  const [isLocked,setLocked] = useState(false);

  const open   = () => { if (!isLocked) setOpen(true); };
  const toggle = () => { if (!isLocked) setOpen(o => !o); };

  const value: SidebarCtx = {
    isOpen,
    isLocked,
    open,
    close:  () => setOpen(false),
    toggle,
    lock:   () => setLocked(true),
    unlock: () => setLocked(false),
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => useContext(SidebarContext);

