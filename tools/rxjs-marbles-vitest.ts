/**
 * RxJS Marbles adapter for Vitest (replaces rxjs-marbles/jest imports).
 */
import { expect, it, describe } from 'vitest';
import { configure as configureMarbles } from 'rxjs-marbles/marbles';
import { _cases } from 'rxjs-marbles/cases';
import { DoneSubscriber } from 'rxjs-marbles/done-subscriber';
import type { Observable } from 'rxjs';
import type { Configuration } from 'rxjs-marbles/configuration';
import type { NamedCase, UnnamedCase } from 'rxjs-marbles/cases';
import type { MarblesFunction } from 'rxjs-marbles/marbles';
import type { Context } from 'rxjs-marbles/context';

function vitestConfiguration(): Configuration {
  return {
    assertDeepEqual: (actual, expected) => {
      expect(actual).toEqual(expected);
    },
    frameworkMatcher: true,
    run: true,
  };
}

const { marbles } = configureMarbles(vitestConfiguration());

function cases<T extends UnnamedCase>(
  name: string,
  func: (context: Context, caseValues: NamedCase & T) => unknown,
  caseDefinitions: { [key: string]: T } | T[],
): void {
  describe(name, () => {
    _cases((caseValues) => {
      const runner = caseValues.only ? it.only : caseValues.skip ? it.skip : it;
      runner(caseValues.name, marbles((context) => func(context, caseValues as NamedCase & T)));
    }, caseDefinitions);
  });
}

/**
 * Runs an observable test under Vitest (async) instead of Jest's done callback.
 */
function observe<T>(observableTest: () => Observable<T>): () => Promise<void> {
  return () =>
    new Promise<void>((resolve, reject) => {
      observableTest().subscribe(new DoneSubscriber(reject, resolve));
    });
}

export { marbles, cases, observe };
export type { MarblesFunction, Context };
