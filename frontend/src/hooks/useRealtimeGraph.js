import { useEffect } from 'react';
import realtimeService from '../services/realtime';
import useStore from '../app/store';

/**
 * hooks/useRealtimeGraph.js
 * Listens for realtime graph events and updates the global Zustand store.
 */
export const useRealtimeGraph = () => {
  const setGraphData = useStore(state => state.setGraphData);

  useEffect(() => {
    realtimeService.connect();

    const unsubscribe = realtimeService.subscribe((event) => {
      console.log('Realtime Event Received:', event.type);

      switch (event.type) {
        case 'node_created':
          // Add mandatory animaion flag for GraphCanvas
          const newNode = { ...event.payload, isNew: true };
          setGraphData([...useStore.getState().nodes, newNode], useStore.getState().edges);
          break;

        case 'edge_created':
          const newEdge = { ...event.payload, isNew: true };
          setGraphData(useStore.getState().nodes, [...useStore.getState().edges, newEdge]);
          break;

        case 'path_risk_update':
          // Update specific path risk if we have selective logic here
          // For now, we update the global risk score if applicable
          if (useStore.getState().selectedTracePath?.id === event.payload.path_id) {
            useStore.setState({ 
              riskScore: event.payload.overall_risk,
              riskReasons: event.payload.reasons
            });
          }
          break;

        default:
          console.warn('Unknown event type:', event.type);
      }
    });

    return () => {
      unsubscribe();
      realtimeService.disconnect();
    };
  }, [setGraphData]);
};
