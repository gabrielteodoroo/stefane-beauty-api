// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  {
    ignores: ['eslint.config.mjs'],
  },  
  ...compat.extends('@rocketseat/eslint-config/node'),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-useless-constructor': 'off',
    },
  },
];