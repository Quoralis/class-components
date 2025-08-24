import type { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxFieldProps {
  label: string;
  name?: string;
  id?: string;
  defaultChecked?: boolean;
  register?: UseFormRegisterReturn;
}

export default function CheckboxField(props: CheckboxFieldProps) {
  const { label, name, id, defaultChecked, register } = props;
  const inputId = id || name;
  const fieldName = register?.name ?? name;

  return (
    <div className="checkbox_group mb-13">
      <input
        className="form-check-input"
        type="checkbox"
        id={inputId}
        name={fieldName}
        defaultChecked={defaultChecked}
        {...register}
      />
      <label className="form-check-label" htmlFor={inputId}>
        {label}
      </label>
    </div>
  );
}
