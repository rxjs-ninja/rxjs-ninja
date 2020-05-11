import { take } from 'rxjs/operators';
import { fromString, padString } from '@tinynodes/rxjs-string';

describe('pad string', () => {
  it('should pad a string at the start by a specified length', (done) => {
    fromString('12345')
      .pipe(padString('start', 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('     12345'),
        complete: () => done(),
      });
  });

  it('should pad a string at the start by a specified length with fill string', (done) => {
    fromString('12345')
      .pipe(padString('start', 10, 'X'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('XXXXX12345'),
        complete: () => done(),
      });
  });

  it('should pad a string at the end by a specified length', (done) => {
    fromString('12345')
      .pipe(padString('end', 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('12345     '),
        complete: () => done(),
      });
  });

  it('should pad a string at the end by a specified length with fill string', (done) => {
    fromString('12345')
      .pipe(padString('end', 10, 'X'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('12345XXXXX'),
        complete: () => done(),
      });
  });
});
