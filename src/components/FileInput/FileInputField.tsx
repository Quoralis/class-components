interface FileInputFieldProps {
  label: string;
  name: string;
  id?: string;
  accept?: string;
}

export default function FileInputField({
  label,
  name,
  id,
  accept = 'image/png, image/jpeg',
}: FileInputFieldProps) {
  const inputId = id || name;

  return (
    <div className="file_input_group">
      <label htmlFor={inputId}>{label}</label>
      <input type="file" id={inputId} name={name} accept={accept} />
    </div>
  );
}
