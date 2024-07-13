module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'indent': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'semi-spacing': ['warn', { 'before': false, 'after': true }],
        'comma-spacing': ['warn', { 'before': false, 'after': true }],
        'space-infix-ops': 2,
        'space-in-parens': [1, 'never'],
        'spaced-comment': ['error', 'always'],
        'array-bracket-spacing': ['warn', 'never'],
        'object-curly-spacing': ['warn', 'always'],
        'block-spacing': 'warn',
        'arrow-spacing': 'warn',
        'space-before-function-paren': ['warn', 'never'],
        'keyword-spacing': ['warn', { 'before': true }],
        'linebreak-style': ['error', 'unix'],
        'padded-blocks': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'brace-style': ['error', 'allman'],
        'prefer-const': ['warn'],
        'max-len': [
          'warn',
          {
            'ignoreStrings': true,
            'ignoreRegExpLiterals': true,
            'code': 300
          }
        ],
        'no-shadow-restricted-names': 'error',
        'no-sequences': 'error',
        'no-new-wrappers': 'error',
        'no-multiple-empty-lines': 'warn',
        'no-eval': 'error',
        'no-fallthrough': 'warn',
        'no-invalid-this': 'off',
        'no-cond-assign': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'off',
        'no-caller': 'error',
        'new-parens': 'error',
        'max-lines': ['warn', 600],
        'no-trailing-spaces': [
          'warn',
          { 'ignoreComments': false, 'skipBlankLines': false }
        ],
        'no-unused-vars': 'off',
        'no-prototype-builtins': 'warn',
        'comma-dangle': [
          'error',
          {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
          }
        ],
        'no-console': 1,
        'prefer-template': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'object-shorthand': 'warn',
        'one-var': ['warn', 'never'],
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        'radix': 'error',
        'curly': 'warn',
        'use-isnan': 'error',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          { 'functions': true, 'variables': true, 'classes': false }
        ],
        '@typescript-eslint/ban-types': [
          'warn',
          {
            'types': {
              'Object': {
                'message': 'Avoid using the `Object` type. Did you mean `object`?'
              },
              'Function': {
                'message': 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
              },
              'Boolean': {
                'message': 'Avoid using the `Boolean` type. Did you mean `boolean`?'
              },
              'Number': {
                'message': 'Avoid using the `Number` type. Did you mean `number`?'
              },
              'String': {
                'message': 'Avoid using the `String` type. Did you mean `string`?'
              },
              'Symbol': {
                'message': 'Avoid using the `Symbol` type. Did you mean `symbol`?'
              }
            }
          }
        ],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/type-annotation-spacing': 'warn',
        '@typescript-eslint/no-unsafe-argument': 0,
        'no-mixed-spaces-and-tabs': 0
  },
};
