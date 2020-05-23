/**
 * @packageDocumentation
 * @module utility
 */
import { of } from 'rxjs';
import { luhnCheck } from './luhn-check';
import { take } from 'rxjs/operators';

describe('luhnCheck', () => {
  it('should return true for a valid Luhn number as string', (done) => {
    of('4485275742308327')
      .pipe(luhnCheck(), take(1))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return true for a valid Luhn number as string', (done) => {
    of('1231432153213212')
      .pipe(luhnCheck(), take(1))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });

  it('should return true for a valid Luhn number', (done) => {
    of(4485275742308327)
      .pipe(luhnCheck(), take(1))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return true for a valid Luhn number as string', (done) => {
    of(1231432153213212)
      .pipe(luhnCheck(), take(1))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });
});
