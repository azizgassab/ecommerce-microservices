const stripTrailingSlash = (value) => value.replace(/\/+$/, '');

const toNumber = (value, fallbackValue) => {
  const convertedNumber = Number(value);
  return Number.isFinite(convertedNumber) ? convertedNumber : fallbackValue;
};

export const API_CONFIG = Object.freeze({
  gatewayRestUrl: stripTrailingSlash(
    process.env.REACT_APP_GATEWAY_REST_URL || 'http://localhost:3000/api'
  ),
  gatewayGraphqlUrl: stripTrailingSlash(
    process.env.REACT_APP_GATEWAY_GRAPHQL_URL || 'http://localhost:3000/graphql'
  ),
  productsServiceUrl: stripTrailingSlash(
    process.env.REACT_APP_PRODUCTS_SERVICE_URL || 'http://localhost:3001'
  ),
  ordersServiceUrl: stripTrailingSlash(
    process.env.REACT_APP_ORDERS_SERVICE_URL || 'http://localhost:3002'
  ),
  requestTimeoutMs: toNumber(process.env.REACT_APP_REQUEST_TIMEOUT_MS, 12000)
});

export const REST_ENDPOINTS = Object.freeze({
  products: [
    `${API_CONFIG.gatewayRestUrl}/products`,
    `${API_CONFIG.productsServiceUrl}/products`,
    `${API_CONFIG.productsServiceUrl}`
  ],
  productDetails: (productId) => [
    `${API_CONFIG.gatewayRestUrl}/products/${productId}`,
    `${API_CONFIG.productsServiceUrl}/products/${productId}`
  ],
  orders: [
    `${API_CONFIG.gatewayRestUrl}/orders`,
    `${API_CONFIG.ordersServiceUrl}/orders`
  ]
});
