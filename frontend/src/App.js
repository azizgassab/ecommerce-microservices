import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRoutes from './pages/AppRoutes';
import './App.css';

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
