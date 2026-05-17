import { REST_ENDPOINTS } from './config';
import { getRest, postRest, requestFirstAvailable } from './restApi';

const ORDERS_STORAGE_KEY = 'frontend_order_history_v1';

const readOrdersHistory = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawStorage = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!rawStorage) {
      return [];
    }

    const parsedOrders = JSON.parse(rawStorage);
    return Array.isArray(parsedOrders) ? parsedOrders : [];
  } catch {
    return [];
  }
};

const persistOrderHistory = (orders) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export async function createOrdersFromCart(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return [];
  }

  const createdOrders = [];

  for (const item of cartItems) {
    const payload = {
      productId: parseInt(item.id, 10) || 0,
      quantity: item.quantity,
      total: item.price * item.quantity
    };

    const response = await requestFirstAvailable(REST_ENDPOINTS.orders, (endpoint) =>
      postRest(endpoint, payload)
    );

    createdOrders.push({
      id: response?.id || response?.order?.id || `${Date.now()}-${item.id}`,
      product: item.name,
      quantity: item.quantity,
      total: item.price * item.quantity,
      createdAt: new Date().toISOString(),
      source: response || null
    });
  }

  const previousOrders = readOrdersHistory();
  const mergedOrders = [...createdOrders, ...previousOrders];
  persistOrderHistory(mergedOrders);

  return createdOrders;
}

export async function fetchOrders() {
  try {
    const payload = await requestFirstAvailable(REST_ENDPOINTS.orders, (endpoint) =>
      getRest(endpoint)
    );

    if (Array.isArray(payload)) {
      return payload;
    }

    if (Array.isArray(payload?.orders)) {
      return payload.orders;
    }
  } catch {
    // If backend doesn't expose GET /orders, use local history.
  }

  return readOrdersHistory();
}
