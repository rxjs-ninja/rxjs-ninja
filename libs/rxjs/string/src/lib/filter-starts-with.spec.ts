import { from } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { filterStartsWith } from './filter-starts-with';

describe('fromStartsWith', () => {
  it('should return a string if a string ends with a character', (done) => {
    from(['test?', 'foo', 'test'])
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
