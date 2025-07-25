import type { Item } from './ResultsFieldFn.tsx';

interface Props {
  items: Item[];
}

function CardCharacter({ items }: Props) {
  return (
    <ul className="card-list">
      {items.map((item) => (
        <li key={item.uid} className="card">
          <h3>{item.name}</h3>
          {item.gender && <p>Gender: {item.gender}</p>}
          {item.birthDate && <p>Birth Date: {item.birthDate}</p>}
        </li>
      ))}
    </ul>
  );
}

export default CardCharacter;
