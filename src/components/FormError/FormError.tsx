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
  return error ? <p className="error">{error.errors}</p> : null;
}
