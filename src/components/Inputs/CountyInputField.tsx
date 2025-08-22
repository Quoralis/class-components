import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';

interface InputFieldProps {
  label: string;
  name: string;
  id?: string;
}

export default function CountyInputField(props: InputFieldProps) {
  const inputId = props.id || props.name;
  const countries = useSelector((state: RootState) => state.countries.list);

  return (
    <div className="input-group mb-1">
      <label className="input-group-text" htmlFor={inputId}>
        {props.label}
      </label>
      <input
        className="form-control"
        type="text"
        id={inputId}
        name={props.name}
        list="country-list"
        autoComplete="country-name"
      />
      <datalist id="country-list">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
    </div>
  );
}
