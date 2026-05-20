const base = require('../../../jest.config.base');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  displayName: 'rxjs-boolean',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@rxjs-ninja/rxjs-boolean$': '<rootDir>/src/index.ts',
  },
  coverageDirectory: '../../../coverage/libs/rxjs/boolean',
};
