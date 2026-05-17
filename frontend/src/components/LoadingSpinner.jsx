function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="state-block" role="status" aria-label={label}>
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

export default LoadingSpinner;
