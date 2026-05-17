import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/cart', label: 'Cart' },
  { to: '/orders', label: 'Orders' }
];

function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand-title">Ecommerce Frontend</span>
          <span className="brand-subtitle">Microservices UI</span>
        </NavLink>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          type="button"
          onClick={() => setIsMenuOpen((previousValue) => !previousValue)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              end={item.end}
              to={item.to}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            className={({ isActive }) =>
              `nav-link nav-cart ${isActive ? 'active' : ''}`
            }
            to="/cart"
            onClick={closeMenu}
          >
            Cart <span className="badge">{totalItems}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
