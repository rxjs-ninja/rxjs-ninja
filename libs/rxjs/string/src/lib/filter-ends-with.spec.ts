import { from } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { filterEndsWith } from '@tinynodes/rxjs-string';

describe('filterEndsWith', () => {
  it('should return a string if a string ends with a character', (done) => {
    from(['test?', 'foo', 'bar?'])
      .pipe(
        filterEndsWith('?'),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['test?', 'bar?']),
        complete: () => done(),
      });
  });
});
