import { of } from 'rxjs';
import { reverse } from './reverse';
import { take } from 'rxjs/operators';

describe('reverse', () => {
  it('should reverse a string', (done) => {
    of('emordnilaP')
      .pipe(reverse(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Palindrome'),
        complete: () => done(),
      });
  });
});
