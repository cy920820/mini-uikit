module.exports = {
  extends: 'standard',
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  rules: {
    'no-console': 2,
    'standard/no-callback-literal': 0,
    'brace-style': 0,
    'space-before-function-paren': 0,
    'no-empty-function': 2,
    indent: ['error', 2, {
      'MemberExpression': 0
    }],
    'object-curly-spacing': [2, 'always']
  }
}
