import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import { useOrders } from '../hooks/useOrders';
import { formatCurrency, formatDateTime } from '../utils/formatters';

function OrdersPage() {
  const { orders, isLoading, error, retry } = useOrders();

  return (
    <div className="container page page-orders">
      <section className="section-header">
        <h1>Orders</h1>
        <p>
          Order history loaded from backend endpoint when available, otherwise from
          local frontend history.
        </p>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Order Timeline</h2>
          <button className="btn btn-ghost" type="button" onClick={retry}>
            Refresh
          </button>
        </div>

        {isLoading ? <LoadingSpinner label="Loading orders..." /> : null}

        {!isLoading && error ? (
          <ErrorState
            title="Orders endpoint unavailable"
            message={error}
            onRetry={retry}
          />
        ) : null}

        {!isLoading && !error && orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            message="Create an order from the cart page to populate this list."
            actionLabel="Go to cart"
            actionTo="/cart"
          />
        ) : null}

        {!isLoading && !error && orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map((order, index) => (
              <li className="order-item" key={order.id || `${order.product}-${index}`}>
                <div>
                  <h3>{order.product || order.name || 'Order item'}</h3>
                  <p>
                    Quantity: {order.quantity || 1}
                    {order.total ? ` • Total: ${formatCurrency(order.total)}` : ''}
                  </p>
                </div>
                <time>{formatDateTime(order.createdAt || order.timestamp)}</time>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}

export default OrdersPage;
