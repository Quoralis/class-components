import type { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name?: string;
  id?: string;
  options: Option[];
  defaultValue?: string;
  register?: UseFormRegisterReturn;
}

export default function SelectField(props: SelectFieldProps) {
  const { label, name, id, options, defaultValue, register } = props;
  const selectId = id || name;
  const fieldName = register?.name ?? name;

  return (
    <div className="input-group mb-1">
      <label className="input-group-text" htmlFor={selectId}>
        {label}
      </label>
      <select
        className="form-select form-select-sm"
        id={selectId}
        name={fieldName}
        defaultValue={defaultValue}
        {...register}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
