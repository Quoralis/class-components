import styles from './CardCharacter.module.scss';
import Link from 'next/link';
import type { CharacterDataResponse } from '../../store/types/types.ts';
import CheckBox from '../../components/Checkbox/CheckBox';
import { getTranslations } from 'next-intl/server';

interface Props {
  items: CharacterDataResponse[];
  query: { [key: string]: string | string[] | undefined };
}

const getFirst = (v?: string | string[]) =>
  Array.isArray(v) ? v[0] : (v ?? '');

export default async function CardCharacter({ items, query }: Props) {
  const search = getFirst(query.search);
  const page = getFirst(query.page);
  const t = await getTranslations('Cards');
  return (
    <ul className={styles['card-list']}>
      {items.map((item) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (page) params.set('page', page);
        params.set('id', item.uid); // ← добавляем id

        return (
          <li key={item.uid} className={styles.card}>
            <CheckBox item={item} />
            <Link
              href={`?${params.toString()}`}
              scroll={false}
              className={styles['card-link']}
            >
              <h3>{item.name}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>{t('gender')}:</strong>
                    </td>
                    <td>{item.gender ?? 'unknown'}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{t('birthDate')}:</strong>
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
