import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name?: string;
  id?: string;
  register?: UseFormRegisterReturn;
}

export default function CountyInputField(props: InputFieldProps) {
  const countries = useSelector((state: RootState) => state.countries.list);
  const { label, name, id, register } = props;
  const inputId = id || name;

  const fieldName = register?.name ?? name;

  return (
    <div className="input-group mb-1">
      <label className="input-group-text" htmlFor={inputId}>
        {label}
      </label>
      <input
        className="form-control"
        type="text"
        id={inputId}
        name={fieldName}
        list="country-list"
        autoComplete="country-name"
        {...register}
      />
      <datalist id="country-list">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
    </div>
  );
}
