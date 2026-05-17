import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';
import './App.css';

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
