interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  id?: string;
  defaultValue?: string;
  accept?: string;
  autoComplete?: string;
}

export default function InputField(props: InputFieldProps) {
  const inputId = props.id || props.name;

  return (
    <div className="input_group">
      <label htmlFor={inputId}>{props.label}</label>
      <input
        type={props.type || 'text'}
        id={inputId}
        name={props.name}
        defaultValue={props.defaultValue}
        accept={props.accept}
        autoComplete={props.name}
      />
    </div>
  );
}
