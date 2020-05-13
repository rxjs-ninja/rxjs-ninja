import { reduce, take } from 'rxjs/operators';
import { filterEndsWith, fromString } from '@tinynodes/rxjs-string';

describe('filterEndsWith', () => {
  it('should return words that end with a character at the string full length', (done) => {
    fromString(['test', 'testing'])
      .pipe(
        filterEndsWith('g'),
        reduce<string, string[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['testing']),
        complete: () => done(),
      });
  });

  it('should return words that end with a character at the string as passed length', (done) => {
    fromString(['test', 'testing'])
      .pipe(
        filterEndsWith('t', 4),
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
