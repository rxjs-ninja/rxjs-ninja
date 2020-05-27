import { reduce, take } from 'rxjs/operators';
import { fromString } from '@tinynodes/rxjs-string';
import { asapScheduler } from 'rxjs';

describe('fromString', () => {
  it('should return a Observable from a passed string', (done) => {
    fromString('Testing')
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Testing'),
        complete: () => done(),
      });
  });

  it('should create an Observable from an array of strings', (done) => {
    fromString(['Foo', 'Bar'])
      .pipe(
        reduce((acc, val) => acc + val),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe('FooBar'),
        complete: () => done(),
      });
  });

  it('should return a Observable from a passed string with scheduler', (done) => {
    fromString('Testing', asapScheduler)
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Testing'),
        complete: () => done(),
      });
  });

  it('should create an Observable from an array of strings with scheduler', (done) => {
    fromString(['Foo', 'Bar'], asapScheduler)
      .pipe(
        reduce((acc, val) => acc + val),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe('FooBar'),
        complete: () => done(),
      });
  });
});
