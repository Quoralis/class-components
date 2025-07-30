import type { Item } from './ResultsFieldFn';
import styles from './CardCharacter.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store.ts';

interface Props {
  items: Item[];
}

export default function CardCharacter({ items }: Props) {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const actualTheme = useSelector((state: RootState) => state.theme.theme);

  return (
    <ul className={styles['card-list']}>
      {items.map((item) => (
        <li
          key={item.uid}
          className={`${styles.card} ${actualTheme === 'dark' ? styles.cardDark : ''}`}
        >
          <Link
            to={`/details/${item.uid}${query ? `?${query}` : ''}`}
            className={styles['card-link']}
          >
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
