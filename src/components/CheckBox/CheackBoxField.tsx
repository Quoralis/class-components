interface CheckboxFieldProps {
  label: string;
  name: string;
  id?: string;
  defaultChecked?: boolean;
}

export default function CheckboxField({
  label,
  name,
  id,
  defaultChecked,
}: CheckboxFieldProps) {
  const inputId = id || name;

  return (
    <div className="checkbox_group mb-13">
      <input
        className="form-check-input"
        type="checkbox"
        id={inputId}
        name={name}
        defaultChecked={defaultChecked}
      />
      <label className="form-check-label" htmlFor={inputId}>
        {label}
      </label>
    </div>
  );
}
