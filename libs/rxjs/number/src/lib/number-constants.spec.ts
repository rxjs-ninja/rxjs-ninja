import { NUMBER_MAX_SAFE_INTEGER } from './number-constants';

describe('number constants', () => {
  it('exports Number constants', () => {
    expect(NUMBER_MAX_SAFE_INTEGER).toBe(Number.MAX_SAFE_INTEGER);
  });
});