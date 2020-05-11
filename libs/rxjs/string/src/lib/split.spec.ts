import { take } from 'rxjs/operators';
import { fromString, split } from '@tinynodes/rxjs-string';

describe('split', () => {
  it('should return an array of strings based on a separator on the original string', (done) => {
    fromString('Name,Age,Street')
      .pipe(split(','), take(1))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['Name', 'Age', 'Street']),
        complete: () => done(),
      });
  });
});
