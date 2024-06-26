module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
    }],
  },
};
