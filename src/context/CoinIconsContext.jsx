import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCoinIconMap } from '../lib/coinIcons';

const CoinIconsContext = createContext({});

export function CoinIconsProvider({ children }) {
  const [iconMap, setIconMap] = useState({});

  useEffect(() => {
    fetchCoinIconMap()
      .then(setIconMap)
      .catch(() => {}); // silently fall back to symbol initials
  }, []);

  return (
    <CoinIconsContext.Provider value={iconMap}>
      {children}
    </CoinIconsContext.Provider>
  );
}

export function useCoinIcons() {
  return useContext(CoinIconsContext);
}
