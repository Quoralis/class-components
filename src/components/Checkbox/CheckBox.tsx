'use client';

import type { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { CharacterDataResponse } from '../../store/types/types.ts';
import { addCards, removeCards } from '../../store/selectSlice';

interface Props {
  item: CharacterDataResponse;
}

export default function CheckBox({ item }: Props) {
  const checkBox = useSelector((state: RootState) => state.selector.cards);
  const dispatch = useDispatch();
  const handleCheckBox = (item: CharacterDataResponse, uid: string) => {
    if (!checkBox.some((item) => item.uid === uid)) {
      dispatch(addCards(item));
    } else {
      dispatch(removeCards(uid));
    }
  };

  return (
    <input
      onChange={() => {
        handleCheckBox(item, item.uid);
      }}
      type="checkbox"
      checked={checkBox.some((elem) => elem.uid === item.uid)}
    />
  );
}
