import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['.prettierignore', '.prettierrc.js', 'eslint.config.mjs'],
    rules: {
      'no-undef': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
