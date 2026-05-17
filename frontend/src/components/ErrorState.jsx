function ErrorState({
  title = 'Unable to load data',
  message = 'Please try again in a few seconds.',
  onRetry,
  retryLabel = 'Retry'
}) {
  return (
    <section className="state-block state-error" role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry ? (
        <button className="btn btn-primary" type="button" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </section>
  );
}

export default ErrorState;
