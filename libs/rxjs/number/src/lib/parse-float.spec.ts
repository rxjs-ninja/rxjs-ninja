import { from } from 'rxjs';
import { parseFloat } from './parse-float';

describe('parseFloat', () => {
  it('should parse a string to a float number', done => {
    const output = [];

    from(['1', '2.3', '3.14'])
      .pipe(parseFloat())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toStrictEqual([1, 2.3, 3.14]);
          done();
        },
      });
  });
});
