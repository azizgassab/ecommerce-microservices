import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import StatusBanner from '../components/StatusBanner';
import { useCart } from '../context/CartContext';
import { useOrders } from '../hooks/useOrders';
import { formatCurrency } from '../utils/formatters';

function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { submitCart, isSubmitting, error, successMessage } = useOrders();

  const handleCheckout = async () => {
    const createdOrders = await submitCart(items);
    if (createdOrders.length > 0) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="container page">
        <EmptyState
          title="Your cart is empty"
          message="Add products first to create Kafka-compatible order events."
          actionLabel="Browse products"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="container page page-cart">
      <section className="section-header">
        <h1>Cart</h1>
        <p>Review your items before sending orders to microservices.</p>
      </section>

      <section className="panel cart-panel">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>{formatCurrency(item.price)} each</p>
            </div>

            <div className="cart-controls">
              <input
                className="input input-quantity"
                min="1"
                type="number"
                value={item.quantity}
                onChange={(event) =>
                  updateQuantity(item.id, Math.max(1, Number(event.target.value || 1)))
                }
              />

              <button
                className="btn btn-danger"
                type="button"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="panel checkout-panel">
        <h2>Total: {formatCurrency(totalPrice)}</h2>
        <div className="checkout-actions">
          <button className="btn btn-ghost" type="button" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating order...' : 'Create Order'}
          </button>
        </div>

        {successMessage ? <StatusBanner tone="success">{successMessage}</StatusBanner> : null}
        {error ? (
          <ErrorState
            title="Order creation failed"
            message={error}
            onRetry={handleCheckout}
          />
        ) : null}
      </section>
    </div>
  );
}

export default CartPage;
