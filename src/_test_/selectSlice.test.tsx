import { describe, expect, test } from 'vitest';

import selectSlice, {
  addCards,
  removeCards,
  unSelectCards,
} from '../store/selectSlice.ts';

describe('Testing SelectSlice', (): void => {
  test('add card id to state', () => {
    const initialState = { cards: [] };
    const state = selectSlice.reducer(
      initialState,
      addCards({ name: 'Aaa', uid: '123' })
    );
    expect(state.cards).toContainEqual({ name: 'Aaa', uid: '123' });
  });

  test('remove cardId from state', () => {
    const initialState = { cards: [{ name: 'Aaa', uid: '123' }] };
    const state = selectSlice.reducer(initialState, removeCards('123'));
    expect(state.cards).not.toContainEqual({ name: 'Aaa', uid: '123' });
  });

  test('remove ALL cards from state', () => {
    const initialState = {
      cards: [
        { name: 'Aaa', uid: '123' },
        { name: '333', uid: '122123' },
      ],
    };
    const state = selectSlice.reducer(initialState, unSelectCards());
    expect(state.cards).toHaveLength(0);
  });
});
