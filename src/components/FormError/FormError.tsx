export type FormErrors = {
  errors: string[];
  properties?: {
    [key: string]: {
      errors: string[];
      properties?: FormErrors['properties'];
    };
  };
};

type FormErrorProps = {
  dataError?: FormErrors;
  field: string;
};

export default function FormError({ dataError, field }: FormErrorProps) {
  const error = dataError?.properties?.[field];
  if (!error) return null;

  return (
    <div className="text-danger mt-1  mb-3">
      {error.errors.map((err, i) => (
        <p key={i} className="mb-0">
          {err}
        </p>
      ))}
    </div>
  );
}
