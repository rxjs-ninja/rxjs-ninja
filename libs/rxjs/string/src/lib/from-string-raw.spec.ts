import { marbles } from 'rxjs-marbles/jest';
import { fromStringRaw } from './from-string-raw';

describe('fromStringRaw', () => {
  it(
    'should emit a raw string without escape processing',
    marbles((m) => {
      m.expect(fromStringRaw`line1\nline2`).toBeObservable(m.cold('(x|)', { x: 'line1\\nline2' }));
    }),
  );
});