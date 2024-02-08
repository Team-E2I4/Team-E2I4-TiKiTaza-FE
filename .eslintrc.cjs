module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'unused-imports', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    curly: 2, //0: off, 1: warn, 2: error

    'no-console': ['error'], //콘솔로그 사용시 에러...,

    'react/react-in-jsx-scope': 'off', //react 17버전이후로 import react안해도되는데 오류발생하는것 제거

    /* simple-sort */
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
      },
    ],
    'simple-import-sort/exports': 'error',

    /* naming convention */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        suffix: ['Type'],
      },
    ],
    'react/jsx-key': 'error',
    'no-unreachable': 'warn',

    /* ts enum error */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    /* unused-imports */
    'unused-imports/no-unused-imports': 'error',
  },

  // typescript-eslint/naming-convention 사용할때 파서 옵션
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
};
