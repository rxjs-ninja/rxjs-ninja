import { reduce, take } from 'rxjs/operators';
import { filterStartsWith, fromString } from '@tinynodes/rxjs-string';

describe('filterStartsWith', () => {
  it('should return strings that starts with a character at the string full length', (done) => {
    fromString(['test', 'testing', 'foobar'])
      .pipe(
        filterStartsWith('t'),
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

  it('should return strings that starts with a character at the string as passed length', (done) => {
    fromString(['test', 'testing', 'amazing'])
      .pipe(
        filterStartsWith('i', 4),
        reduce<string, string[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['testing', 'amazing']),
        complete: () => done(),
      });
  });
});
