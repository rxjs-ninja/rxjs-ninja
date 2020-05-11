import { from } from 'rxjs';
import { filterTruthy } from './filter-truthy';
import { reduce } from 'rxjs/operators';

describe('filterTruthy', () => {
  it('should filter a source for truthy values', (done) => {
    from([0, 1, 2, 3, false, true, '', 'test', null, undefined])
      .pipe(
        filterTruthy(),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
      )
      .subscribe({
        next: (value) => expect(value).toHaveLength(5),
        complete: () => done(),
      });
  });
});
