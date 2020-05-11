import { take } from 'rxjs/operators';
import { toLocaleString } from './to-locale-string';
import { fromNumber } from './from-number';

describe('toLocaleString', () => {
  it('should convert to a formatted locale', (done) => {
    fromNumber(1000000)
      .pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('€1,000,000.00'),
        complete: () => done(),
      });
  });
});
