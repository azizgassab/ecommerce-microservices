function StatusBanner({ tone = 'success', children }) {
  return <p className={`status-banner ${tone}`}>{children}</p>;
}

export default StatusBanner;
