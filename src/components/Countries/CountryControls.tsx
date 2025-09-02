import SearchField from '../Inputs/SearchField';
import ChooseYear from '../Inputs/ChooseYear';
import SortControls from '../SortControl/SortControl';

interface CountryControlsProps {
  search: (value: string) => void;
  sortBy: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  setSortBy: (value: 'name' | 'population') => void;
  setSortOrder: (value: 'asc' | 'desc') => void;
}

export default function CountryControls({
  search,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}: CountryControlsProps) {
  return (
    <div className="container bg-dark text-warning border border-warning rounded mb-3">
      <div className="d-flex align-items-center justify-content-between p-3 gap-3 flex-wrap">
        <h2 className="h5 mb-0">Country Selector</h2>
        <SearchField onChange={search} />
        <ChooseYear />
        <SortControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </div>
    </div>
  );
}
