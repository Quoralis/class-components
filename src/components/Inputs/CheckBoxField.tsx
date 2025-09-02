interface CheckboxFieldProps {
  fieldName: string;
  label: string;
  checked: boolean;
}

export default function CheckBoxField({
  fieldName,
  label,
  checked,
}: CheckboxFieldProps) {
  return (
    <div className="form-check mb-2">
      <input
        className="form-check-input bg-dark border-warning"
        type="checkbox"
        id={fieldName}
        name="columns"
        value={fieldName}
        defaultChecked={checked}
      />
      <label className="form-check-label text-warning ms-2" htmlFor={fieldName}>
        {label}
      </label>
    </div>
  );
}
