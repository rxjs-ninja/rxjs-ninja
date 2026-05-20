const base = require('../../../jest.config.base');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  displayName: 'rxjs-random',
  testEnvironment: 'jsdom',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@rxjs-ninja/rxjs-random$': '<rootDir>/src/index.ts',
  },
  coverageDirectory: '../../../coverage/libs/rxjs/random',
};
