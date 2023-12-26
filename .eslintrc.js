module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  overrides: [
    {
      files: ['.eslintrc.js', './projects/**/*.ts'],
      excludedFiles: './projects/**/*.spec.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
      },
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      rules: {
        'no-negated-condition': 'off',
      },
    },
    {
      files: ['.eslintrc.js', './projects/**/*.spec.ts', 'jest.config.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-negated-condition': 'off',
      },
    },
  ],
};
