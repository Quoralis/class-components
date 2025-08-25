import type { UseFormRegisterReturn } from 'react-hook-form';

interface FileInputFieldProps {
  label: string;
  name?: string;
  id?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
}

export default function FileInputField(props: FileInputFieldProps) {
  const { label, name, id, accept, onChange, register } = props;
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
        {...register}
      />
    </div>
  );
}
