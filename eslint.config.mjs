import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      // Enforce 2-space indentation
      indent: ['error', 2],

      // Enforce semicolons at the end of statements
      semi: ['error', 'always'],

      // Prefer single quotes for strings
      quotes: ['error', 'single', { avoidEscape: true }],

      // Enforce consistent spacing before function parentheses
      'space-before-function-paren': ['error', 'never'],

      // Disallow unused variables
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Prefer `const` over `let` where possible
      'prefer-const': 'error',

      // Disallow `console` except for warning or error messages
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Encourage using `arrow functions` where appropriate
      'prefer-arrow-callback': 'error',

      // Disallow `var` (use `let` or `const`)
      'no-var': 'error',

      // Enforce consistent spacing around operators
      'space-infix-ops': 'error',

      // Encourage the use of strict equality (`===`)
      eqeqeq: ['error', 'always'],

      // '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
