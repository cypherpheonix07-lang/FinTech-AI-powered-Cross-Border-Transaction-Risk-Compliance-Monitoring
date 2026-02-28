import { useState, useEffect, useMemo } from 'react';
import realtimeService from '../services/realtime';
import useStore from '../app/store';

/**
 * hooks/usePresence.js
 * Tracks other analysts active on the platform.
 */
export const usePresence = () => {
  const [analysts, setAnalysts] = useState([]);
  const user = useStore(state => state.user);

  useEffect(() => {
    // Announce self
    const interval = setInterval(() => {
      realtimeService.sendCollabEvent('presence', { 
        id: user?.apiKey, 
        role: user?.role,
        lastActive: new Date().toISOString()
      });
    }, 5000);

    const unsubscribe = realtimeService.subscribeCollab((event) => {
      if (event.type === 'presence') {
        setAnalysts(prev => {
          const others = prev.filter(a => a.id !== event.payload.id);
          return [...others, event.payload];
        });
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [user]);

  // Filter out stale analysts (>15s)
  const activeAnalysts = useMemo(() => 
    analysts.filter(a => Date.now() - new Date(a.lastActive).getTime() < 15000),
    [analysts]
  );

  return activeAnalysts;
};
