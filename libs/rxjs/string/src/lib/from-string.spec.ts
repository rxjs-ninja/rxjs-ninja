import { fromString } from './from-string';
import { take } from 'rxjs/operators';

describe('fromString', () => {
  it('should return a Observable string from a passed string', (done) => {
    fromString('Testing')
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Testing'),
        complete: () => done(),
      });
  });
});
