import { from } from 'rxjs';
import { filterIsInteger } from './filter-is-integer';

describe('filterIsInteger', () => {
  it('should return true for an integer', (done) => {
    const output = [];

    from([1, 2, 3.14, '2', false, true, null])
      .pipe(filterIsInteger())
      .subscribe({
        next: (value) => output.push(value),
        complete: () => {
          expect(output).toStrictEqual([1, 2]);
          done();
        },
      });
  });
});
