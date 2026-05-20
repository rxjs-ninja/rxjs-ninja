import { marbles } from 'rxjs-marbles/jest';
import {
  abs,
  coerceNumber,
  intlNumberFormat,
  intlNumberFormatParts,
  intlNumberFormatRange,
  NUMBER_MAX_SAFE_INTEGER,
  sign,
} from '@rxjs-ninja/rxjs-number';

describe('number gap operators', () => {
  it(
    'coerceNumber and Math operators',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: '42', b: '-3' });
      m.expect(input.pipe(coerceNumber())).toBeObservable(m.cold('-x-y-|', { x: 42, y: -3 }));
      m.expect(m.hot('-a-|', { a: -4 }).pipe(abs())).toBeObservable(m.cold('-x-|', { x: 4 }));
      m.expect(m.hot('-a-|', { a: -1 }).pipe(sign())).toBeObservable(m.cold('-x-|', { x: -1 }));
    }),
  );

  it('exports Number constants', () => {
    expect(NUMBER_MAX_SAFE_INTEGER).toBe(Number.MAX_SAFE_INTEGER);
  });

  it(
    'Intl.NumberFormat operators',
    marbles((m) => {
      const n = m.hot('-a-|', { a: 1000 });
      m.expect(n.pipe(intlNumberFormat('en-US'))).toBeObservable(m.cold('-x-|', { x: '1,000' }));
      m.expect(n.pipe(intlNumberFormatParts('en-US'))).toBeObservable(
        m.cold('-x-|', { x: expect.arrayContaining([expect.objectContaining({ type: 'integer' })]) }),
      );
      const range = m.hot('-a-|', { a: [1, 5] as [number, number] });
      m.expect(range.pipe(intlNumberFormatRange('en-US'))).toBeObservable(m.cold('-r-|', { r: '1–5' }));
    }),
  );
});
