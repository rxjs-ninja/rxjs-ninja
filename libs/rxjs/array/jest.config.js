const base = require('../../../jest.config.base');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  displayName: 'rxjs-array',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@rxjs-ninja/rxjs-array$': '<rootDir>/src/index.ts',
  },
  coverageDirectory: '../../../coverage/libs/rxjs/array',
};
