import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBanner from '../components/StatusBanner';
import { postRest } from '../services/restApi';
import { API_CONFIG } from '../services/config';

function AddProductPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await postRest(`${API_CONFIG.gatewayRestUrl}/products`, { name, price: priceNum });
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Failed to create product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container page">
      <div className="breadcrumbs">
        <Link to="/products">Products</Link> / <span>Add Product</span>
      </div>

      <section className="panel">
        <h2>Add New Product</h2>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <label className="form-field" htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              className="input"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="form-field" htmlFor="product-price">Price</label>
            <input
              id="product-price"
              className="input"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {error ? <StatusBanner tone="error">{error}</StatusBanner> : null}

          <div className="form-actions">
            <Link className="btn btn-ghost" to="/products">Cancel</Link>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddProductPage;
