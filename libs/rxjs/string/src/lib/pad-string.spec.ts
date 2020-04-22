import { of } from 'rxjs';
import { padString } from './pad-string';
import { take } from 'rxjs/operators';

describe('pad string', () => {
  it('should pad a string at the start by a specified length', done => {
    of('12345')
      .pipe(padString('start', 10), take(1))
      .subscribe({
        next: value => expect(value).toBe('     12345'),
        complete: () => done(),
      });
  });

  it('should pad a string at the start by a specified length with fill string', done => {
    of('12345')
      .pipe(padString('start', 10, 'X'), take(1))
      .subscribe({
        next: value => expect(value).toBe('XXXXX12345'),
        complete: () => done(),
      });
  });

  it('should pad a string at the end by a specified length', done => {
    of('12345')
      .pipe(padString('end', 10), take(1))
      .subscribe({
        next: value => expect(value).toBe('12345     '),
        complete: () => done(),
      });
  });

  it('should pad a string at the end by a specified length with fill string', done => {
    of('12345')
      .pipe(padString('end', 10, 'X'), take(1))
      .subscribe({
        next: value => expect(value).toBe('12345XXXXX'),
        complete: () => done(),
      });
  });
});
