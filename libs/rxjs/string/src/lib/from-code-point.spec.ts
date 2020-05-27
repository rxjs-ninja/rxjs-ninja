import { take } from 'rxjs/operators';
import { fromCodePoint } from '@tinynodes/rxjs-string';
import { asapScheduler } from 'rxjs';

describe('fromCodePoint', () => {
  it('should create a string from a passed list of number', (done) => {
    fromCodePoint([9731, 9733, 9842])
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('☃★♲'),
        complete: () => done(),
      });
  });

  it('should create a string from a passed list of number with schedular', (done) => {
    fromCodePoint([9731, 9733, 9842], asapScheduler)
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('☃★♲'),
        complete: () => done(),
      });
  });
});
