import styles from './CardCharacter.module.scss';
import Link from 'next/link';
import type { CharacterDataResponse } from '../../store/types/types.ts';

interface Props {
  items: CharacterDataResponse[];
  query: { [key: string]: string | string[] | undefined };
}

const getFirst = (v?: string | string[]) =>
  Array.isArray(v) ? v[0] : (v ?? '');

export default function CardCharacter({ items, query }: Props) {
  return (
    <ul className={styles['card-list']}>
      {items.map((item) => {
        // соберём новый query из текущего + id
        const params = new URLSearchParams();
        const search = getFirst(query.search);
        const page = getFirst(query.page);
        if (search) params.set('search', search);
        if (page) params.set('page', page);
        params.set('id', item.uid); // ← добавляем id

        return (
          <li key={item.uid} className={styles.card}>
            <Link
              href={`?${params.toString()}`} // остаёмся на текущем пути, добавляем ?id=...
              scroll={false}
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
        );
      })}
    </ul>
  );
}
