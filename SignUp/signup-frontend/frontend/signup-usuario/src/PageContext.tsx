// PageContext.tsx
import { createContext, useContext } from 'react';

type PageContextValue = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const PageContext = createContext<PageContextValue | null>(null);

export const usePageContext = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error('usePageContext debe usarse dentro de PageContext.Provider');
  }

  return context;
};