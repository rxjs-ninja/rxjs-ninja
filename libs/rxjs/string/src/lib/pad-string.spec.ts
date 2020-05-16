import { take } from 'rxjs/operators';
import { fromString, PadPosition, padString } from '@tinynodes/rxjs-string';

describe('pad string', () => {
  it('should pad a string at the start by a specified length', (done) => {
    fromString('12345')
      .pipe(padString(PadPosition.START, 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('     12345'),
        complete: () => done(),
      });
  });

  it('should pad a string at the start by a specified length with fill string', (done) => {
    fromString('12345')
      .pipe(padString(PadPosition.START, 10, 'X'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('XXXXX12345'),
        complete: () => done(),
      });
  });

  it('should pad a string at the end by a specified length', (done) => {
    fromString('12345')
      .pipe(padString(PadPosition.END, 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('12345     '),
        complete: () => done(),
      });
  });

  it('should pad a string at the end by a specified length with fill string', (done) => {
    fromString('12345')
      .pipe(padString(PadPosition.END, 10, 'X'), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('12345XXXXX'),
        complete: () => done(),
      });
  });
});
