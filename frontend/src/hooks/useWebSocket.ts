import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { addRealtimeTransaction } from '@/store/slices/transactionSlice';
import { generateTransactions } from '@/services/mockData';

export function useWebSocket(tenantId?: string) {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isConnected = useRef(false);

  const connect = useCallback(() => {
    if (isConnected.current) return;
    isConnected.current = true;
    // Simulate WebSocket with periodic mock data
    intervalRef.current = setInterval(() => {
      const [tx] = generateTransactions(1, tenantId);
      dispatch(addRealtimeTransaction(tx));
    }, 5000);
  }, [dispatch, tenantId]);

  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isConnected.current = false;
  }, []);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { connect, disconnect, isConnected: isConnected.current };
}
