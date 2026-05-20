import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**', 'docs/**', 'e2e/public/**'],
  },
  {
    files: ['libs/**/*.ts', 'e2e/**/*.ts', 'tools/**/*.ts'],
    ...eslint.configs.recommended,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.base.json', './libs/rxjs/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-undef': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    },
  },
  eslintConfigPrettier,
];
