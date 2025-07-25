import type { Item } from './ResultsFieldFn.tsx';
import styles from './CardCharacter.module.scss';

interface Props {
  items: Item[];
}

function CardCharacter({ items }: Props) {
  return (
    <ul className={styles['card-list']}>
      {items.map((item) => (
        <li key={item.uid} className={styles['card']}>
          <h3>{item.name}</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Gender:</strong>
                </td>
                <td>{item.gender ?? 'unknown'}</td>
              </tr>
              <tr>
                <td>
                  <strong>Birth Date:</strong>
                </td>
                <td>{item.birthDate ?? 'unknown'}</td>
              </tr>
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  );
}

export default CardCharacter;
