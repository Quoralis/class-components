import SearchField from '../Inputs/SearchField';
import ChooseYear from '../Inputs/ChooseYear';
import React from 'react';

interface SearchFieldProps {
  search: (value: string) => void;
}

function CountryControls({ search }: SearchFieldProps) {
  return (
    <div className="container bg-dark text-warning border border-warning rounded mb-3">
      <div className="d-flex align-items-center justify-content-between p-3 gap-3 flex-wrap">
        <h2 className="h5 mb-0">Country Selector</h2>
        <SearchField onChange={search} />
        <ChooseYear />
      </div>
    </div>
  );
}
export default React.memo(CountryControls);
