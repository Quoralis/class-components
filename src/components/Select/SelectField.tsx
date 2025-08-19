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
    <div className="input_group">
      <label htmlFor={selectId}>{props.label}</label>
      <select id={selectId} name={props.name} defaultValue={props.defaultValue}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
