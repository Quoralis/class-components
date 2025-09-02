import CheckboxField from '../Inputs/CheckBoxField';
import { CHECKBOX_FIELDS } from '../../constants/co2Fields.ts';
import * as React from 'react';
import type { DataYear } from '../../types/co2';

interface Props {
  close: () => void;
  saveToState: (selected: (keyof DataYear)[]) => void;
  selected: (keyof DataYear)[];
}

function ColumnSelector({ close, saveToState, selected }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const allColumns = form.getAll('columns') as (keyof DataYear)[];
    saveToState(allColumns);
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      {CHECKBOX_FIELDS.map((field) => (
        <CheckboxField
          fieldName={field.fieldKey}
          label={field.label}
          key={field.fieldKey}
          checked={selected.includes(field.fieldKey as keyof DataYear)}
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
export default React.memo(ColumnSelector);
