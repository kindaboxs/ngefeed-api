import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: false,
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'style/brace-style': 'off',
    'style/arrow-parens': 'off',
    'style/comma-dangle': 'off',
    'style/semi': 'off',
  },
});
