import styles from './CardCharacter.module.scss';
import Link from 'next/link';

import type { CharacterDataResponse } from '../../store/types/types.ts';

interface Props {
  items: CharacterDataResponse[];
  query: { [key: string]: string | string[] | undefined };
}

export default function CardCharacter({ items, query }: Props) {
  return (
    <ul className={styles['card-list']}>
      {items.map((item) => (
        <li key={item.uid} className={`${styles.card}`}>
          <Link
            href={{ pathname: `/details/${item.uid}`, query }}
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
