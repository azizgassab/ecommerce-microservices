import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CartPage from './CartPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import OrdersPage from './OrdersPage';
import ProductDetailsPage from './ProductDetailsPage';
import ProductsPage from './ProductsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
