import { reduce, take } from 'rxjs/operators';
import { fromUnicode } from './from-unicode';

describe('fromUnicode', () => {
  it('should return a Observable from a passed string', (done) => {
    fromUnicode('\u0041\u006d\u00e9\u006c\u0069\u0065')
      .pipe(take(1))
      .subscribe({
        next: (value) => expect(value).toBe('Amélie'),
        complete: () => done(),
      });
  });

  it('should create an Observable from an array of strings', (done) => {
    fromUnicode(['\u0041\u006d\u00e9\u006c\u0069\u0065', '\u0041\u006d\u0065\u0301\u006c\u0069\u0065'])
      .pipe(
        reduce<string, string[]>((acc, val) => [...acc, val], []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['Amélie', 'Amélie']),
        complete: () => done(),
      });
  });
});
