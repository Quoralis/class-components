import useCountryContext from '../../hook/useCountryContext';

export default function ChooseYear() {
  const { year, setYear } = useCountryContext();

  const years = Array.from({ length: 2023 - 1960 + 1 }, (_, i) => 1960 + i);

  return (
    <div className="d-flex align-items-center gap-3">
      <label htmlFor="yearSelect" className="mb-0">
        Year:
      </label>
      <select
        id="yearSelect"
        className="form-select bg-dark text-warning border-warning"
        value={year || ''}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        <option value="" disabled>
          Select year...
        </option>
        {years.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
