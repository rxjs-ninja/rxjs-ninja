import { of } from 'rxjs';
import { trimString } from './trim-string';
import { take } from 'rxjs/operators';

describe('trim string', () => {
  it('should trim a string at both ends by default', done => {
    of('  this is a test  ')
      .pipe(trimString(), take(1))
      .subscribe({
        next: value => expect(value).toBe('this is a test'),
        complete: () => done(),
      });
  });

  it('should trim a string on the left only', done => {
    of('  this is a test  ')
      .pipe(trimString('left'), take(1))
      .subscribe({
        next: value => expect(value).toBe('this is a test  '),
        complete: () => done(),
      });
  });

  it('should trim a string on the right only', done => {
    of('  this is a test  ')
      .pipe(trimString('right'), take(1))
      .subscribe({
        next: value => expect(value).toBe('  this is a test'),
        complete: () => done(),
      });
  });
});
