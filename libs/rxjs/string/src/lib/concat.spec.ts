import { of } from 'rxjs';
import { concat } from './concat';
import { take } from 'rxjs/operators';

describe('concat', () => {
  it('should concatenate a string from a source', (done) => {
    of('test')
      .pipe(concat('ing'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('testing'),
        complete: () => done(),
      });
  });

  it('should concatenate a string from a source and multiple arguments', (done) => {
    of('test')
      .pipe(concat('ing', ' ', 'is fun'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('testing is fun'),
        complete: () => done(),
      });
  });
});
