import { reduce, take } from 'rxjs/operators';
import { fromString } from '@tinynodes/rxjs-string';

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
});
