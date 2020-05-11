import { reduce, take } from 'rxjs/operators';
import { filterStartsWith, fromString } from '@tinynodes/rxjs-string';

describe('filterStartsWith', () => {
  it('should return a string if a string ends with a character', (done) => {
    fromString(['test?', 'foo', 'test'])
      .pipe(
        filterStartsWith('t'),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['test?', 'test']),
        complete: () => done(),
      });
  });
});
