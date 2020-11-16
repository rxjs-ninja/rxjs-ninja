import { reduce, take } from 'rxjs/operators';
import { filterIncludes, fromString } from '@tinynodes/rxjs-string';

describe('filterIncludes', () => {
  it('should return a string if a string includes the value', (done) => {
    fromString(['test', 'testing', 'foobar'])
      .pipe(
        filterIncludes('test'),
        reduce<string, string[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['test', 'testing']),
        complete: () => done(),
      });
  });
});
