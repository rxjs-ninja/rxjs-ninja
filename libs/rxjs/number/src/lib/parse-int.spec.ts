import { from } from 'rxjs';
import { parseInt } from './parse-int';
import { reduce, take } from 'rxjs/operators';

describe('parseInt', () => {
  it('should parse a string to a integer number', (done) => {
    from(['1', '2.3', '3.14'])
      .pipe(
        parseInt(),
        reduce<number, number[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 2, 3]),
        complete: () => done(),
      });
  });
});
