import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image product-image-placeholder">No image</div>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{formatCurrency(product.price)}</p>
      </div>

      <div className="product-actions">
        <Link className="btn btn-primary" to={`/products/${product.id}`}>
          Details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
