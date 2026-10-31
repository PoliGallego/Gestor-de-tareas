import { createContext, useContext } from "react";
import type { Task } from "./types";
import type { Tablero } from "./services/tablerosService";

type PageContextValue = {
  isCModalOpen: boolean;
  setIsCModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUModalOpen: boolean;
  setIsUModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDModalOpen: boolean;
  setIsDModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  focusTask: Task | null;
  setFocusTask: React.Dispatch<React.SetStateAction<Task | null>>;
  tableroActual: Tablero | null;
  setTableroActual: React.Dispatch<React.SetStateAction<Tablero | null>>;
};

export const PageContext = createContext<PageContextValue | null>(null);

export const usePageContext = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error('usePageContext debe usarse dentro de PageContext.Provider');
  }

  return context;
};