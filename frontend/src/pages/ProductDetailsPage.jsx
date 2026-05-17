import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBanner from '../components/StatusBanner';
import { useCart } from '../context/CartContext';
import { useProductDetails } from '../hooks/useProducts';
import { formatCurrency } from '../utils/formatters';

function ProductDetailsPage() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const { product, isLoading, error, retry } = useProductDetails(productId);
  const [quantity, setQuantity] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, quantity);
    setFeedbackMessage(`${product.name} added to cart.`);
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

            <button className="btn btn-primary" type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          {feedbackMessage ? (
            <StatusBanner tone="success">{feedbackMessage}</StatusBanner>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default ProductDetailsPage;
