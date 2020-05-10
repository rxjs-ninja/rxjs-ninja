import { from } from 'rxjs';
import { filterIncludes } from './filter-includes';
import { reduce } from 'rxjs/operators';

describe('fromIncludes', () => {
  it('should return a string if a string includes the value', (done) => {
    from(['test', 'testing', 'foobar'])
      .pipe(
        filterIncludes('test'),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['test', 'testing']),
        complete: () => done(),
      });
  });
});
