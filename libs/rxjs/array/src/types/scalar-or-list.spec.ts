import { isSearchList } from './scalar-or-list';

describe('isSearchList', () => {
  it('returns true for arrays and sets', () => {
    expect(isSearchList(['a'])).toBe(true);
    expect(isSearchList(new Set(['a']))).toBe(true);
  });

  it('returns false for strings and scalar values', () => {
    expect(isSearchList('ab')).toBe(false);
    expect(isSearchList(1)).toBe(false);
  });
});
