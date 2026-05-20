/**
 * The Digital Rube Goldberg Machine
 *
 * One Observable marble rolls through every @rxjs-ninja department:
 * random gate → Fibonacci ramp → array contraptions → numeric boiler →
 * string circus → utility thermostat → boolean victory bell.
 *
 * Run (from repo root, after `npm install` && `npm run build`):
 *   npx tsx examples/digital-rube-goldberg.ts
 *
 * Consumer install:
 *   npm install rxjs @rxjs-ninja/rxjs-array @rxjs-ninja/rxjs-boolean \\
 *     @rxjs-ninja/rxjs-number @rxjs-ninja/rxjs-random @rxjs-ninja/rxjs-string \\
 *     @rxjs-ninja/rxjs-utility
 */
import { from, of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { map, switchMap, take, toArray, tap } from 'rxjs/operators';
import {
  filterArray,
  mapArray,
  objectGroupBy,
  objectValuesToArray,
  shuffle,
  sort,
  union,
} from '@rxjs-ninja/rxjs-array';
import { booleanSome, isTruthy } from '@rxjs-ninja/rxjs-boolean';
import { filterInRange, fromFibonacci, intlNumberFormat, mean, roundTo } from '@rxjs-ninja/rxjs-number';
import { fromRandomCryptoInt } from '@rxjs-ninja/rxjs-random';
import { coerceString, concat, intlListFormat, join, split, titleize } from '@rxjs-ninja/rxjs-string';
import { mapIf, temperature, Temperatures } from '@rxjs-ninja/rxjs-utility';

export type GoldbergStage = { stage: string; value: unknown };

export type GoldbergResult = {
  triumph: boolean;
  headline: string;
  stages: GoldbergStage[];
};

const stage =
  (name: string, stages: GoldbergStage[]) =>
  tap<unknown>({ next: (value) => stages.push({ stage: name, value }) });

/**
 * Builds the full Goldberg pipeline. Set `chaotic: false` for a deterministic run (no shuffle).
 */
export function digitalRubeGoldberg$(options: { chaotic?: boolean; fibIterations?: number } = {}) {
  const { chaotic = true, fibIterations } = options;
  const stages: GoldbergStage[] = [];

  const marbleRun$ =
    fibIterations !== undefined
      ? fromFibonacci(fibIterations)
      : fromRandomCryptoInt(5, 8).pipe(
          take(1),
          stage('🎲 cosmic dice — pick Fibonacci length', stages),
          switchMap((n) => fromFibonacci(n)),
        );

  return marbleRun$.pipe(
    stage('🌀 Fibonacci ramp — release marbles', stages),
    filterInRange(1, 21),
    stage('🔍 numeric sieve — drop 0 and huge marbles', stages),
    toArray(),
    stage('📥 collection tray', stages),
    mapArray((n) => n ** 2),
    stage('🔨 squaring hammer', stages),
    filterArray((n) => n % 2 === 0),
    stage('🚪 parity gate — evens only', stages),
    union([0]),
    stage('🔀 union ramp — spare zero domino', stages),
    ...(chaotic ? [shuffle(), stage('🎰 chaos tumbler', stages)] : []),
    sort((a, b) => a - b),
    stage('📐 organizer shelf', stages),
    mean(1),
    stage('⚖️ balancer — mean weight', stages),
    roundTo(1),
    stage('📏 calipers', stages),
    mapIf(
      (n) => n < 12,
      (n) => n + 8,
      (n) => n,
    ),
    stage('🌡️ thermostat — warm short readings', stages),
    temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT),
    stage('🔥 boiler — °C → °F', stages),
    intlNumberFormat('en-US', { maximumFractionDigits: 1 }),
    stage('📟 digital gauge', stages),
    coerceString(),
    stage('📠 teletype', stages),
    concat('°F — the bell rings at '),
    stage('🔔 banner arm', stages),
    split(' '),
    stage('✂️ word chopper', stages),
    objectGroupBy((word) => word.length),
    stage('🗂️ sorting bins (by word length)', stages),
    objectValuesToArray(),
    stage('📦 bin conveyor', stages),
    map((bins) => (bins as string[][]).flat()),
    stage('⬇️ bin tipper', stages),
    intlListFormat('en', { type: 'conjunction' }),
    stage('🎪 list cannon', stages),
    titleize([], ' '),
    stage('🏷️ triumph sign', stages),
    switchMap((headline) =>
      from([headline.length > 10, /°F/.test(headline)]).pipe(
        isTruthy(),
        stage('💡 filament checks', stages),
        booleanSome(),
        stage('🔔 victory bell', stages),
        switchMap((triumph) => of({ triumph, headline, stages: [...stages] })),
      ),
    ),
  );
}

async function main(): Promise<void> {
  console.log('\n🏭 Digital Rube Goldberg — @rxjs-ninja edition\n');

  const result = await firstValueFrom(digitalRubeGoldberg$());

  console.log('\n--- Stage log ---');
  for (const { stage: name, value } of result.stages) {
    console.log(`  ${name}`);
    console.log(`    →`, value);
  }

  console.log('\n--- Final ---');
  console.log(`  Triumph: ${result.triumph}`);
  console.log(`  Headline: ${result.headline}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
