import { take } from 'rxjs/operators';
import { fromString, reverse } from '@tinynodes/rxjs-string';

describe('reverse', () => {
  it('should reverse a string', (done) => {
    fromString('emordnilaP')
      .pipe(reverse(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Palindrome'),
        complete: () => done(),
      });
  });
});
