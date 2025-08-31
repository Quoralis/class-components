export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div
        className="spinner-border text-warning"
        role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
