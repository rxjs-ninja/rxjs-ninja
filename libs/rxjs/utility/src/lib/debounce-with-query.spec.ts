import { debounceWithQuery } from '@rxjs-ninja/rxjs-utility';
import { from, of } from 'rxjs';

describe('debounceWithQuery', () => {
  it('should debounce a query for 1 second', (done) => {
    from(['t', 'te', 'tes', 'test'])
      .pipe(debounceWithQuery(500, (query) => of(query)))
      .subscribe({
        next: (v) => expect(v).toBe('test'),
        complete: () => done(),
      });
  });
});
