import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { indexOf } from './index-of';

describe('indexOf', () => {
  it('should return the index of a found string', (done) => {
    of('Blue Whale')
      .pipe(indexOf('Whale'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(5),
        complete: () => done(),
      });
  });

  it('should return the index of a found string when start passed', (done) => {
    of('Blue Whale')
      .pipe(indexOf('Whale', 5), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(5),
        complete: () => done(),
      });
  });

  it('should return -1 if there is no value found', (done) => {
    of('Blue Whale')
      .pipe(indexOf('Blute'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(-1),
        complete: () => done(),
      });
  });
});
