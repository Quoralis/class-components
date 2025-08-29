interface SearchFieldProps {
  onChange: (value: string) => void;
}

export default function SearchField({ onChange }: SearchFieldProps) {
  return (
    <input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter country name..."
      className="form-control bg-dark text-warning border-warning"
      style={{ maxWidth: '320px' }}
    />
  );
}
