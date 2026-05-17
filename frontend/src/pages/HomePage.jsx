import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUsers } from '../hooks/useUsers';

function HomePage() {
  const { users, isLoading, error, retry } = useUsers();

  return (
    <div className="container page page-home">
      <section className="hero-card">
        <p className="eyebrow">University Microservices Project</p>
        <h1>Professional React Frontend Connected to API Gateway</h1>
        <p>
          This frontend integrates with REST and GraphQL endpoints, supports cart
          and orders, and is designed for a production-like architecture.
        </p>

        <div className="hero-actions">
          <Link className="btn btn-primary" to="/products">
            Browse Products
          </Link>
          <Link className="btn btn-ghost" to="/orders">
            View Orders
          </Link>
        </div>
      </section>

      <section className="integration-grid">
        <article>
          <h3>API Gateway</h3>
          <p>Centralized entry point for frontend calls.</p>
        </article>
        <article>
          <h3>GraphQL</h3>
          <p>Users are loaded via GraphQL when available.</p>
        </article>
        <article>
          <h3>REST</h3>
          <p>Products and orders use REST-first integration.</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Users from backend integration</h2>
          <button className="btn btn-ghost" type="button" onClick={retry}>
            Refresh
          </button>
        </div>

        {isLoading ? <LoadingSpinner label="Loading users from backend..." /> : null}
        {!isLoading && error ? (
          <ErrorState
            title="Users endpoint unavailable"
            message={error}
            onRetry={retry}
          />
        ) : null}

        {!isLoading && !error && users.length === 0 ? (
          <EmptyState
            title="No users returned"
            message="GraphQL/REST user endpoints responded with an empty list."
          />
        ) : null}

        {!isLoading && !error && users.length > 0 ? (
          <ul className="simple-list">
            {users.slice(0, 5).map((user) => (
              <li key={user.id || user.email}>
                <strong>{user.name}</strong> <span>{user.email}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}

export default HomePage;
