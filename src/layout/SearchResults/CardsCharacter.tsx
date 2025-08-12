import styles from './CardCharacter.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { addCards, removeCards } from '../../store/selectSlice';
import { useTheme } from '../../hooks/useTheme';
import type { CharacterDataResponse } from '../../store/types/types.ts';

interface Props {
  items: CharacterDataResponse[];
}

export default function CardCharacter({ items }: Props) {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const { theme: actualTheme } = useTheme();
  const checkBox = useSelector((state: RootState) => state.selector.cards);
  const dispatch = useDispatch();

  const handelCheckBox = (item: CharacterDataResponse, uid: string) => {
    if (!checkBox.some((item) => item.uid === uid)) {
      dispatch(addCards(item));
    } else {
      dispatch(removeCards(uid));
    }
  };

  return (
    <ul className={styles['card-list']}>
      {items.map((item) => (
        <li
          key={item.uid}
          className={`${styles.card} ${actualTheme === 'dark' ? styles.cardDark : ''}`}
        >
          <input
            onChange={() => {
              handelCheckBox(item, item.uid);
            }}
            type="checkbox"
            checked={checkBox.some((elem) => elem.uid === item.uid)}
          />
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
