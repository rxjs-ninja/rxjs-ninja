import { take } from 'rxjs/operators';
import { fromString, indexOf } from '@tinynodes/rxjs-string';

describe('indexOf', () => {
  it('should return the index of a found string', (done) => {
    fromString('Blue Whale')
      .pipe(indexOf('Whale'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(5),
        complete: () => done(),
      });
  });

  it('should return the index of a found string when start passed', (done) => {
    fromString('Blue Whale')
      .pipe(indexOf('Whale', 5), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(5),
        complete: () => done(),
      });
  });

  it('should return -1 if there is no value found', (done) => {
    fromString('Blue Whale')
      .pipe(indexOf('Blute'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(-1),
        complete: () => done(),
      });
  });
});
