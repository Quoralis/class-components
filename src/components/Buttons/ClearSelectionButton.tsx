'use client';

import { useDispatch } from 'react-redux';
import { unSelectCards } from '../../store/selectSlice';

export default function ClearSelectionButton() {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => {
        dispatch(unSelectCards());
      }}
    >
      Clear selection
    </button>
  );
}
