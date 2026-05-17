import { Link } from 'react-router-dom';

function EmptyState({
  title = 'Nothing here yet',
  message = 'No data is available for this section.',
  actionLabel,
  actionTo
}) {
  return (
    <section className="state-block state-empty">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && actionTo ? (
        <Link className="btn btn-primary" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}

export default EmptyState;
