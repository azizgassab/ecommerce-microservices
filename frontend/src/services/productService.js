import { runGraphQLQuery } from './graphqlApi';
import { REST_ENDPOINTS } from './config';
import { getRest, requestFirstAvailable } from './restApi';
import { normalizeProduct, normalizeProducts } from '../utils/mappers';

const PRODUCTS_QUERY = `
  query Products {
    products {
      id
      name
      title
      description
      image
      price
      category
      stock
    }
  }
`;

const PRODUCT_DETAILS_QUERY = `
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      title
      description
      image
      price
      category
      stock
    }
  }
`;

async function fetchProductsViaRest() {
  const payload = await requestFirstAvailable(REST_ENDPOINTS.products, (endpoint) =>
    getRest(endpoint)
  );

  return normalizeProducts(payload);
}

async function fetchProductsViaGraphql() {
  const data = await runGraphQLQuery(PRODUCTS_QUERY);
  return normalizeProducts(data);
}

export async function fetchProducts() {
  let restError = null;
  try {
    const restProducts = await fetchProductsViaRest();
    if (restProducts.length > 0) {
      return restProducts;
    }
  } catch (error) {
    restError = error;
  }

  let graphqlError = null;
  try {
    const graphqlProducts = await fetchProductsViaGraphql();
    return graphqlProducts;
  } catch (error) {
    graphqlError = error;
  }

  if (restError && graphqlError) {
    throw new Error('Product APIs are unreachable (REST and GraphQL).');
  }

  return [];
}

async function fetchProductByIdViaRest(productId) {
  const payload = await requestFirstAvailable(
    REST_ENDPOINTS.productDetails(productId),
    (endpoint) => getRest(endpoint)
  );

  if (payload && !Array.isArray(payload)) {
    return normalizeProduct(payload);
  }

  const products = normalizeProducts(payload);
  return products[0] || null;
}

async function fetchProductByIdViaGraphql(productId) {
  const data = await runGraphQLQuery(PRODUCT_DETAILS_QUERY, { id: productId });
  return normalizeProduct(data?.product);
}

export async function fetchProductById(productId) {
  let restError = null;
  try {
    const restProduct = await fetchProductByIdViaRest(productId);
    if (restProduct) {
      return restProduct;
    }
  } catch (error) {
    restError = error;
  }

  try {
    return await fetchProductByIdViaGraphql(productId);
  } catch (graphqlError) {
    if (restError) {
      throw new Error('Product details endpoint is unreachable.');
    }
    return null;
  }
}
