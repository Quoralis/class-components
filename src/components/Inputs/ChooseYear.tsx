import useCountryContext from '../../hook/useCountryContext';

export default function ChooseYear() {
  const { year, setYear } = useCountryContext();

  return (
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
          setYear(Number(e.target.value));
        }}
      />
      <span className="fw-bold text-warning">{year}</span>
    </div>
  );
}
