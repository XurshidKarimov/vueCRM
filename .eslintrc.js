module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    // 'testing-library/prefer-screen-queries': 'error',
    // 'testing-library/no-manual-cleanup': 'error',
    // 'testing-library/prefer-wait-for': 'error',
    // 'testing-library/no-await-sync-events': 'error'
  },

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ]
};
