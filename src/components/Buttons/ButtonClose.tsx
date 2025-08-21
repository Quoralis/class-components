export default function ButtonClose({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="btn-close position-absolute top-0 end-0"
      aria-label="Close"
      onClick={onClick}
    />
  );
}
