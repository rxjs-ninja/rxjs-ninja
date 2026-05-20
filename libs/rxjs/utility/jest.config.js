const base = require('../../../jest.config.base');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  displayName: 'rxjs-utility',
  testEnvironment: 'jsdom',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@rxjs-ninja/rxjs-utility$': '<rootDir>/src/index.ts',
  },
  coverageDirectory: '../../../coverage/libs/rxjs/utility',
};
