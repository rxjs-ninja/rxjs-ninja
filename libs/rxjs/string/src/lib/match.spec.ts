import { fromString } from './from-string';
import { match } from './match';

describe('match', () => {
  it('should return a match for a string', (done) => {
    fromString('Mary had a little lamb')
      .pipe(match('little'))
      .subscribe({
        next: (value) => expect(Array.from(value)).toStrictEqual(['little']),
        complete: () => done(),
      });
  });

  it('should return a match for a string only once without global', (done) => {
    fromString('Testing Test')
      .pipe(match(/[A-Z]/))
      .subscribe({
        next: (value) => expect(Array.from(value)).toStrictEqual(['T']),
        complete: () => done(),
      });
  });

  it('should return a match for a string multiple tiles with global', (done) => {
    fromString('Mary had a Little Lamb')
      .pipe(match(/[A-Z]/g))
      .subscribe({
        next: (value) => expect(Array.from(value)).toStrictEqual(['M', 'L', 'L']),
        complete: () => done(),
      });
  });
});
