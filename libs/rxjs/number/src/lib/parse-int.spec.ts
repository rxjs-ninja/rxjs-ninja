import { from } from 'rxjs';
import { parseFloat } from './parse-float';
import { parseInt } from './parse-int';

describe('parseInt', () => {
  it('should parse a string to a int number', done => {
    const output = [];

    from(['1', '2.3', '3.14'])
      .pipe(parseInt())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toStrictEqual([1, 2, 3]);
          done();
        },
      });
  });
});
