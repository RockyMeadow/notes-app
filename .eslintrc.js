const defaultRules = {
  'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
  'prettier/prettier': 'error',
};

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'prettier'],
  rules: defaultRules,
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ['vite.config.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['*.ts', '*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        ...defaultRules,
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
