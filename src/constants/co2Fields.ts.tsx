type CheckboxFieldProps = {
  fieldKey: string;
  label: string;
};

export const CHECKBOX_FIELDS: CheckboxFieldProps[] = [
  { fieldKey: 'co2', label: 'CO₂' },
  { fieldKey: 'co2_per_capita', label: 'CO₂ per capita' },
  { fieldKey: 'methane', label: 'Methane' },
  { fieldKey: 'methane_per_capita', label: 'Methane per capita' },
  { fieldKey: 'oil_co2', label: 'Oil CO₂' },
  { fieldKey: 'oil_co2_per_capita', label: 'Oil CO₂ per capita' },
  { fieldKey: 'nitrous_oxide', label: 'Nitrous oxide' },
  { fieldKey: 'nitrous_oxide_per_capita', label: 'Nitrous oxide per capita' },
  { fieldKey: 'cumulative_co2', label: 'Cumulative CO₂' },
  { fieldKey: 'cumulative_oil_co2', label: 'Cumulative oil CO₂' },
];
