import { from } from 'rxjs';
import { filterTruthy } from './filter-truthy';

describe('filterTruthy', () => {
  it('should filter a source for truthy values', done => {
    const output = [];

    from([0, 1, 2, 3, false, true, '', 'test', null, undefined])
      .pipe(filterTruthy())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toHaveLength(5);
          done();
        },
      });
  });
});
