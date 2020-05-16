import { reduce, take } from 'rxjs/operators';
import { endsWith, fromString } from '@tinynodes/rxjs-string';

describe('endsWith', () => {
  it('should return boolean of string that end with a character at the string full length', (done) => {
    fromString(['test', 'testing'])
      .pipe(
        endsWith('g'),
        reduce<boolean, boolean[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([false, true]),
        complete: () => done(),
      });
  });

  it('should return boolean of string that end with a character at the string as passed length', (done) => {
    fromString(['test', 'testing'])
      .pipe(
        endsWith('t', 4),
        reduce<boolean, boolean[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([true, true]),
        complete: () => done(),
      });
  });
});
