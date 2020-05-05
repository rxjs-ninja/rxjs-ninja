import { debounceWithQuery } from './debounce-with-query';
import { from, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

// TODO: Write test
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
