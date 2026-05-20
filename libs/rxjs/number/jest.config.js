const base = require('../../../jest.config.base');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  displayName: 'rxjs-number',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@rxjs-ninja/rxjs-number$': '<rootDir>/src/index.ts',
  },
  coverageDirectory: '../../../coverage/libs/rxjs/number',
};
