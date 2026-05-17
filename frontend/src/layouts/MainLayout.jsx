import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content" aria-live="polite">
        <Outlet />
      </main>

      <footer className="footer">
        <p>Frontend React connected to microservices architecture.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
