import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container page page-not-found">
      <section className="state-block">
        <h1>404 - Page not found</h1>
        <p>The requested route does not exist in this frontend application.</p>
        <Link className="btn btn-primary" to="/">
          Back to Home
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;
