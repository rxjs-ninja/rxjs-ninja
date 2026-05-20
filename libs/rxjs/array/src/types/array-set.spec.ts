import { isArrayOrSet } from './array-set';

describe('isArrayOrSet', () => {
  it('returns true for arrays and sets', () => {
    expect(isArrayOrSet([1])).toBe(true);
    expect(isArrayOrSet(new Set([1]))).toBe(true);
  });

  it('returns false for other iterables and scalars', () => {
    expect(isArrayOrSet('ab')).toBe(false);
    expect(isArrayOrSet(new Map())).toBe(false);
    expect(isArrayOrSet(1)).toBe(false);
  });
});
