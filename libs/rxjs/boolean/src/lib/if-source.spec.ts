import { of } from 'rxjs';
import { ifSource } from './if-source';

describe('ifSource', () => {
  it('should return of truthy predicate', (done) => {
    of('42')
      .pipe(
        ifSource<string, number, string>(
          (value) => value === '42',
          (value) => parseInt(value),
          (value) => `${value}: This is not the answer`,
        ),
      )
      .subscribe({
        next: (value) => expect(value).toBe(42),
        complete: () => done(),
      });
  });

  it('should return of falsy predicate', (done) => {
    of('24')
      .pipe(
        ifSource<string, number, string>(
          (value) => value === '42',
          (value) => parseInt(value),
          (value) => `${value}: This is not the answer`,
        ),
      )
      .subscribe({
        next: (value) => expect(value).toBe('24: This is not the answer'),
        complete: () => done(),
      });
  });
});
