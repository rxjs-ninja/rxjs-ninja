import { marbles } from 'rxjs-marbles/jest';
import {
  and,
  booleanEvery,
  booleanNone,
  booleanSome,
  filterFalsy,
  isBoolean,
  isFalsy,
  isTruthy,
  nand,
  or,
  xor,
} from '@rxjs-ninja/rxjs-boolean';

describe('boolean gap operators', () => {
  it(
    'filterFalsy without predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-|', { a: 0, b: 1, c: '', d: 'x' });
      const subs = '^--------!';
      const expected = m.cold('-a---c---|', { a: 0, c: '' });
      m.expect(input.pipe(filterFalsy())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'isBoolean, isTruthy, isFalsy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: true, b: 0, c: false });
      m.expect(input.pipe(isBoolean())).toBeObservable(m.cold('-t-f-t-|', { t: true, f: false }));
      m.expect(input.pipe(isTruthy())).toBeObservable(m.cold('-t-f-f-|', { t: true, f: false }));
      m.expect(input.pipe(isFalsy())).toBeObservable(m.cold('-f-t-t-|', { f: false, t: true }));
    }),
  );

  it(
    'booleanEvery, booleanSome, booleanNone',
    marbles((m) => {
      const allTrue = m.hot('-a-b-c-|', { a: true, b: true, c: true });
      m.expect(allTrue.pipe(booleanEvery())).toBeObservable(m.cold('-------(t|)', { t: true }));
      const someTrue = m.hot('-a-b-c-|', { a: false, b: true, c: false });
      m.expect(someTrue.pipe(booleanSome())).toBeObservable(m.cold('-------(t|)', { t: true }));
      m.expect(someTrue.pipe(booleanNone())).toBeObservable(m.cold('-------(f|)', { f: false }));
    }),
  );

  it(
    'and, or, xor, nand',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: true, b: false });
      m.expect(input.pipe(and(true))).toBeObservable(m.cold('-t-f-|', { t: true, f: false }));
      m.expect(input.pipe(or(false))).toBeObservable(m.cold('-t-f-|', { t: true, f: false }));
      m.expect(input.pipe(xor(true))).toBeObservable(m.cold('-f-t-|', { f: false, t: true }));
      m.expect(input.pipe(nand(true))).toBeObservable(m.cold('-f-t-|', { f: false, t: true }));
    }),
  );
});
