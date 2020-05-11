import { from } from 'rxjs';
import { parseFloat } from './parse-float';
import { reduce, take } from 'rxjs/operators';

describe('parseFloat', () => {
  it('should parse a string to a floating point number', (done) => {
    from(['1', '2.3', '3.14'])
      .pipe(
        parseFloat(),
        reduce<number, number[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 2.3, 3.14]),
        complete: () => done(),
      });
  });
});
