import { map, reduce, take } from 'rxjs/operators';
import { filterTruthy, fromBoolean } from '@tinynodes/rxjs-boolean';
import { asapScheduler } from 'rxjs';

describe('fromBoolean', () => {
  it('should return a Observable boolean from a passed boolean', (done) => {
    fromBoolean(false)
      .pipe(
        map((val) => !val),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return an Observable numbers from passed boolean array', (done) => {
    fromBoolean([false, true, false])
      .pipe(
        filterTruthy(),
        reduce((acc) => acc + 1, 0),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe(1),
        complete: () => done(),
      });
  });

  it('should return an Observable numbers from passed array of strings', (done) => {
    fromBoolean<string>(['', 'true', ''])
      .pipe(
        filterTruthy(),
        reduce((acc) => acc + 1, 0),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe(1),
        complete: () => done(),
      });
  });

  it('should return an Observable numbers from passed array of numbers', (done) => {
    fromBoolean<number>([0, 1, 0, 2])
      .pipe(
        filterTruthy(),
        reduce((acc) => acc + 1, 0),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe(2),
        complete: () => done(),
      });
  });

  it('should return an Observable numbers from passed array mixed array', (done) => {
    fromBoolean<number | string | boolean>([0, 1, '', 'true', false, true])
      .pipe(
        filterTruthy(),
        reduce((acc) => acc + 1, 0),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe(3),
        complete: () => done(),
      });
  });

  it('should return a Observable boolean with different scheduler', (done) => {
    fromBoolean(false, asapScheduler)
      .pipe(
        map((val) => !val),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return a Observable boolean with different scheduler with array', (done) => {
    fromBoolean(['', 'true'], asapScheduler)
      .pipe(
        map((val) => !val),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });
});
