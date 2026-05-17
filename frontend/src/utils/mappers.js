const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80';

const toNumber = (value, fallbackValue = 0) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallbackValue;
};

export function normalizeProduct(rawProduct, index = 0) {
  if (!rawProduct || typeof rawProduct !== 'object') {
    return null;
  }

  const candidateId =
    rawProduct.id ??
    rawProduct.productId ??
    rawProduct._id ??
    rawProduct.slug ??
    `${rawProduct.name || rawProduct.title || 'product'}-${index}`;

  const id = String(candidateId);
  const name =
    rawProduct.name || rawProduct.title || rawProduct.product || `Product ${id}`;

  return {
    id,
    name,
    description:
      rawProduct.description ||
      rawProduct.details ||
      'No description provided by backend.',
    category: rawProduct.category || 'General',
    image: rawProduct.image || rawProduct.imageUrl || rawProduct.thumbnail || DEFAULT_IMAGE,
    price: toNumber(rawProduct.price ?? rawProduct.amount ?? rawProduct.unitPrice, 0),
    stock: toNumber(rawProduct.stock ?? rawProduct.inventory ?? rawProduct.quantityAvailable, 0),
    raw: rawProduct
  };
}

export function normalizeProducts(payload) {
  let candidates = [];

  if (Array.isArray(payload)) {
    candidates = payload;
  } else if (Array.isArray(payload?.products)) {
    candidates = payload.products;
  } else if (Array.isArray(payload?.items)) {
    candidates = payload.items;
  } else if (Array.isArray(payload?.data)) {
    candidates = payload.data;
  } else {
    candidates = [];
  }

  return candidates
    .map((item, index) => normalizeProduct(item, index))
    .filter(Boolean);
}
