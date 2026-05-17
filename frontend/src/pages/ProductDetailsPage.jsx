import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBanner from '../components/StatusBanner';
import { useProductDetails } from '../hooks/useProducts';
import { formatCurrency } from '../utils/formatters';
import { postRest } from '../services/restApi';
import { API_CONFIG } from '../services/config';

function ProductDetailsPage() {
  const { productId } = useParams();
  const { product, isLoading, error, retry } = useProductDetails(productId);
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  const handleOrderNow = async () => {
    if (!product) return;

    setIsOrdering(true);
    setOrderSuccess('');
    setOrderError('');

    try {
      const payload = {
        productId: parseInt(product.id, 10) || 0,
        quantity,
        total: product.price * quantity
      };

      await postRest(`${API_CONFIG.gatewayRestUrl}/orders`, payload);
      setOrderSuccess(`Order placed for ${product.name} x${quantity}!`);
    } catch (err) {
      setOrderError(err.message || 'Failed to create order.');
    } finally {
      setIsOrdering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container page">
        <LoadingSpinner label="Loading product details..." />
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container page">
        <ErrorState
          title="Unable to load product details"
          message={error}
          onRetry={retry}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container page">
        <EmptyState
          title="Product not found"
          message="No matching product was returned by backend APIs."
          actionLabel="Back to products"
          actionTo="/products"
        />
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="container page page-product-details">
      <div className="breadcrumbs">
        <Link to="/products">Products</Link> / <span>{product.name}</span>
      </div>

      <section className="product-details-card">
        <img src={product.image} alt={product.name} className="details-image" />

        <div className="details-content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="details-price">{formatCurrency(product.price)}</p>

          <div className="details-actions">
            <label htmlFor="quantity" className="form-field">
              Quantity
            </label>
            <div className="quantity-controls">
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                id="quantity"
                className="input input-quantity"
                min="1"
                type="number"
                value={quantity}
                onChange={(event) =>
                  setQuantity(Math.max(1, Number(event.target.value || 1)))
                }
              />
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="total-price">Total: {formatCurrency(totalPrice)}</p>

            <button
              className="btn btn-primary btn-order"
              type="button"
              onClick={handleOrderNow}
              disabled={isOrdering}
            >
              {isOrdering ? 'Processing...' : 'Order Now'}
            </button>
          </div>

          {orderSuccess ? (
            <StatusBanner tone="success">{orderSuccess}</StatusBanner>
          ) : null}

          {orderError ? (
            <StatusBanner tone="error">{orderError}</StatusBanner>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default ProductDetailsPage;
