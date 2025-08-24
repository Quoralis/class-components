import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name?: string;
  type?: string;
  id?: string;
  defaultValue?: string;
  accept?: string;
  autoComplete?: string;
  register?: UseFormRegisterReturn;
}

export default function InputField(props: InputFieldProps) {
  const {
    label,
    name,
    type,
    id,
    defaultValue,
    accept,
    autoComplete,
    register,
  } = props;
  const inputId = id || name;
  const fieldName = register?.name ?? name;
  return (
    <div className="input-group mb-1">
      <label className="input-group-text" htmlFor={inputId}>
        {label}
      </label>
      <input
        className="form-control"
        type={type || 'text'}
        id={inputId}
        name={fieldName}
        defaultValue={defaultValue}
        accept={accept}
        autoComplete={autoComplete}
        {...register}
      />
    </div>
  );
}
