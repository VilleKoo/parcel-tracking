import { useState } from 'react';
import { sampleData } from '../utils/sampleData';
const { ipcRenderer } = window.require('electron');

export default function useItemEvents() {
  const [itemEvents, setEvents] = useState({
    events: [],
    info: [],
    error: false,
    title: '',
    itemId: '',
  });

  const [loading, setLoadingState] = useState(false);

  const getEvents = (e, itemId, language) => {
    e.preventDefault();

    /* Only for the demo :) */
    if (itemId === 'TEST') {
      setEvents({
        ...itemEvents,
      });
      const timeOut = setTimeout(() => {
        setEvents({
          ...sampleData,
        });
      }, 2000);
      return () => clearTimeout(timeOut);
    } else {
      /* the real deal */

      (async () => {
        setLoadingState(true);

        setEvents({
          ...itemEvents,
          itemId: itemId,
          title: '',
        });

        const result = await ipcRenderer.invoke('get-events', itemId, language);

        const { results, errors, title, info, subtitle } = result;
        setLoadingState(false);

        setEvents({
          events: results,
          info: info,
          errors: errors,
          title: title,
          subtitle,
          itemId: itemId,
        });
      })();
    }
  };
  return [itemEvents, loading, getEvents];
}
