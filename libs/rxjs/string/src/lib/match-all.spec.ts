import { fromString } from './from-string';
import { matchAll } from './match-all';

describe('matchAll', () => {
  it('should return a match for a string', (done) => {
    fromString('test1test2')
      .pipe(matchAll(/t(e)(st(\d?))/g))
      .subscribe({
        next: (value) => expect(Array.from([...value][0])).toStrictEqual(['test1', 'e', 'st1', '1']),
        complete: () => done(),
      });
  });
});
