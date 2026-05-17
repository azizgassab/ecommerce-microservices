import { useCallback, useEffect, useState } from 'react';
import { fetchOrders } from '../services/orderService';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const responseOrders = await fetchOrders();
      setOrders(Array.isArray(responseOrders) ? responseOrders : []);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load orders.');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    isLoading,
    error,
    retry: loadOrders
  };
}
