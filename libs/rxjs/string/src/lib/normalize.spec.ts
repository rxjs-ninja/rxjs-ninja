import { fromString } from './from-string';
import { normalize } from './normalize';

describe('normalize', () => {
  it('should normalise a unicode character string', (done) => {
    fromString('\u0041\u006d\u00e9\u006c\u0069\u0065')
      .pipe(normalize())
      .subscribe({
        next: (value) => expect(value).toBe('Amélie'),
        complete: () => done(),
      });
  });
});
