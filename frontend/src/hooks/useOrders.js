import { useCallback, useEffect, useState } from 'react';
import { createOrdersFromCart, fetchOrders } from '../services/orderService';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const submitCart = useCallback(
    async (cartItems) => {
      setError('');
      setSuccessMessage('');
      setIsSubmitting(true);

      try {
        const createdOrders = await createOrdersFromCart(cartItems);
        setSuccessMessage(
          `${createdOrders.length} order event(s) sent to order-service.`
        );
        await loadOrders();
        return createdOrders;
      } catch (requestError) {
        setError(requestError.message || 'Unable to create order.');
        return [];
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadOrders]
  );

  return {
    orders,
    isLoading,
    isSubmitting,
    error,
    successMessage,
    submitCart,
    retry: loadOrders
  };
}
