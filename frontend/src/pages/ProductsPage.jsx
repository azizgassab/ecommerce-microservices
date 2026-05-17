import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';

function ProductsPage() {
  const { products, isLoading, error, retry } = useProducts();
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (!normalizedSearchTerm) {
      return products;
    }

    return products.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(normalizedSearchTerm)
    );
  }, [products, searchTerm]);

  return (
    <div className="container page page-products">
      <section className="section-header">
        <h1>Products</h1>
        <p>Catalog loaded from backend services through the API layer.</p>
      </section>

      <section className="panel filters-panel">
        <label className="form-field" htmlFor="search-products">
          Search products
        </label>
        <input
          id="search-products"
          className="input"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name or category..."
        />
      </section>

      {isLoading ? <LoadingSpinner label="Loading products..." /> : null}

      {!isLoading && error ? (
        <ErrorState
          title="Unable to fetch products"
          message={`${error} Ensure product endpoints are exposed by backend services.`}
          onRetry={retry}
        />
      ) : null}

      {!isLoading && !error && filteredProducts.length === 0 ? (
        <EmptyState
          title="No products available"
          message="The backend responded but returned no product entries."
          actionLabel="Retry"
          actionTo="/products"
        />
      ) : null}

      {!isLoading && !error && filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(selectedProduct) => addItem(selectedProduct, 1)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ProductsPage;
