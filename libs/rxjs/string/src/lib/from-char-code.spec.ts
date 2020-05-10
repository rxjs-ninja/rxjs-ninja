import { fromCharCode } from './from-char-code';
import { take } from 'rxjs/operators';

describe('fromCharCode', () => {
  it('should create a string from a passed list of number', (done) => {
    fromCharCode([65, 66, 67, 68])
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('ABCD'),
        complete: () => done(),
      });
  });
});
