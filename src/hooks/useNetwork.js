import { useState, useEffect } from 'react';

export default function useNetwork() {
  const [networkState, setNetworkState] = useState(true);

  useEffect(() => {
    window.addEventListener('offline', (e) => setNetworkState(false), false);
    window.addEventListener('online', (e) => setNetworkState(true), false);

    return () => {
      window.removeEventListener('offline', (e) => setNetworkState(false));
      window.removeEventListener('online', (e) => setNetworkState(true));
    };
  }, [networkState]);
  return networkState;
}
