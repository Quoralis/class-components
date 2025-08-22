interface FileInputFieldProps {
  label: string;
  name: string;
  id?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInputField({
  label,
  name,
  id,
  accept = 'image/png, image/jpeg',
  onChange,
}: FileInputFieldProps) {
  const inputId = id || name;

  return (
    <div className="mb-1">
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      <input
        type="file"
        id={inputId}
        name={name}
        accept={accept}
        onChange={onChange}
        className="form-control"
        required
      />
    </div>
  );
}
