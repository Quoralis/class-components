interface ChooseYearProps {
  year: string;
  onYearChange: (year: number) => void;
}
export default function CountryControls({
  year,
  onYearChange,
}: ChooseYearProps) {
  return (
    <div className="container bg-dark text-warning border border-warning rounded mb-3">
      <div className="d-flex align-items-center justify-content-between p-3">
        <h2 className="h5 mb-0">Country Selector</h2>

        <div className="d-flex align-items-center gap-3">
          <label htmlFor="yearRange" className="mb-0">
            Year:
          </label>
          <input
            type="range"
            id="yearRange"
            className="form-range"
            min="1960"
            max="2023"
            step="1"
            value={year}
            onChange={(e) => {
              onYearChange(Number(e.target.value));
            }}
          />
          <span className="fw-bold text-warning">{year}</span>
        </div>
      </div>
    </div>
  );
}
