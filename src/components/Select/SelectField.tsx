interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  id?: string;
  options: Option[];
  defaultValue?: string;
}

export default function SelectField(props: SelectFieldProps) {
  const selectId = props.id || props.name;

  return (
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor={selectId}>
        {props.label}
      </label>
      <select
        className="form-select form-select-sm"
        id={selectId}
        name={props.name}
        defaultValue={props.defaultValue}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
