import { useCallback, useEffect, useState } from 'react';
import { fetchProductById, fetchProducts } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const responseProducts = await fetchProducts();
      setProducts(responseProducts);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load products.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    retry: loadProducts
  };
}

export function useProductDetails(productId) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProductDetails = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const responseProduct = await fetchProductById(productId);
      setProduct(responseProduct);
      if (!responseProduct) {
        setError('Product not found in backend endpoints.');
      }
    } catch (requestError) {
      setError(requestError.message || 'Unable to load product details.');
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      setError('Invalid product identifier.');
      return;
    }

    loadProductDetails();
  }, [loadProductDetails, productId]);

  return {
    product,
    isLoading,
    error,
    retry: loadProductDetails
  };
}
