import React from 'react';

interface SortControlsProps {
  sortBy: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  setSortBy: (value: 'name' | 'population') => void;
  setSortOrder: (value: 'asc' | 'desc') => void;
}

function SortControls({
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}: SortControlsProps) {
  return (
    <div className="d-flex align-items-center gap-3">
      <label htmlFor="sortBy" className="mb-0">
        Sort by:
      </label>
      <select
        id="sortBy"
        className="form-select bg-dark text-warning border-warning"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as 'name' | 'population')}
      >
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>

      <div className="btn-group" role="group">
        <button
          type="button"
          className={`btn btn-sm ${
            sortOrder === 'asc'
              ? 'btn-warning text-dark'
              : 'btn-outline-warning text-warning'
          }`}
          style={
            sortOrder !== 'asc'
              ? { backgroundColor: 'rgba(255, 193, 7, 0.1)' }
              : {}
          }
          onClick={() => setSortOrder('asc')}
        >
          Asc
        </button>
        <button
          type="button"
          className={`btn btn-sm ${
            sortOrder === 'desc'
              ? 'btn-warning text-dark'
              : 'btn-outline-warning text-warning'
          }`}
          style={
            sortOrder !== 'desc'
              ? { backgroundColor: 'rgba(255, 193, 7, 0.1)' }
              : {}
          }
          onClick={() => setSortOrder('desc')}
        >
          Desc
        </button>
      </div>
    </div>
  );
}

export default React.memo(SortControls);
