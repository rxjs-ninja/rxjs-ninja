import { from } from 'rxjs';
import { fromIsInteger } from './from-is-integer';

describe('fromIsInteger', () => {
  it('should return true for an integer', (done) => {
    const output = [];

    from([1, 2, 3.14, '2', false, true, null])
      .pipe(fromIsInteger())
      .subscribe({
        next: (value) => output.push(value),
        complete: () => {
          expect(output).toStrictEqual([1, 2]);
          done();
        },
      });
  });
});
