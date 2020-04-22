import { from } from 'rxjs';
import { toLocaleString } from './to-locale-string';
import { take } from 'rxjs/operators';

describe('toLocaleString', () => {
  it('should convert to a formatted locale', done => {
    from([1000000])
      .pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }), take(1))
      .subscribe({
        next: value => expect(value).toBe('€1,000,000.00'),
        complete: () => done(),
      });
  });
});
