import { createContext, useContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type Proptype = {
  children: ReactNode
}

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDarkMQ = '(prefers-color-scheme: dark)';
const getPreferredTheme = () => (window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT);


function ThemeProvider({ children }: Proptype) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof window !== 'object') {
      return null;
    }

    return getPreferredTheme();
  });

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { Theme, ThemeProvider, useTheme };
