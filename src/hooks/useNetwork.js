import { useState, useEffect } from 'react';

export default function useNetwork() {
  const [networkState, setNetworkState] = useState('online');

  useEffect(() => {
    console.log('hello from use effect');
    window.addEventListener('offline', (e) => setNetworkState(e.type), false);
    window.addEventListener('online', (e) => setNetworkState(e.type), false);

    return () => {
      window.removeEventListener('offline', (e) => setNetworkState(e.type));
      window.removeEventListener('online', (e) => setNetworkState(e.type));
    };
  }, [networkState]);
  return networkState;
}
