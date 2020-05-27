import { take } from 'rxjs/operators';
import { fromCharCode } from '@tinynodes/rxjs-string';
import { asapScheduler } from 'rxjs';

describe('fromCharCode', () => {
  it('should create a string from a passed list of number', (done) => {
    fromCharCode([65, 66, 67, 68])
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('ABCD'),
        complete: () => done(),
      });
  });

  it('should create a string from a passed list of number with scheduler', (done) => {
    fromCharCode([65, 66, 67, 68], asapScheduler)
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('ABCD'),
        complete: () => done(),
      });
  });
});
