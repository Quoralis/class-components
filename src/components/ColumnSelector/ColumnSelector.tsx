import CheckboxField from '../Inputs/CheckBoxField';
import { CHECKBOX_FIELDS } from '../../constants/co2Fields.ts';
import * as React from 'react';

interface Props {
  close: (e: React.MouseEvent) => void;
  saveToState: (selected: string[]) => void;
}

export default function ColumnSelector({ close, saveToState }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const allColumns = form.getAll('columns') as string[];
    saveToState(allColumns);
  };

  return (
    <form onSubmit={handleSubmit}>
      {CHECKBOX_FIELDS.map((field) => (
        <CheckboxField
          fieldName={field.fieldKey}
          label={field.label}
          key={field.fieldKey}
        />
      ))}
      <button
        type="submit"
        className="btn btn-dark text-warning border-warning me-2"
      >
        Submit
      </button>
      <button type="button" onClick={close} className="btn btn-outline-warning">
        Cancel
      </button>
    </form>
  );
}
