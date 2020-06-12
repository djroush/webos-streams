module.exports = {
  root: true,
  extends: [
    'airbnb', 
    'eslint:recommended', 
    'plugin:@typescript-eslint/eslint-recommended', 
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint', 
    'import', 
    'typescript', 
    'prettier',
    'react'
  ], 
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    "ecmaVersion": 11,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  env: {
    browser: true,
    es6: true,
    jquery: true,
    jest: true,
    node: true,
  },
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  settings: {
    'import/resolver': {
      parcel: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    'import/extensions': 0,
    'react/jsx-indent': 0,
    'object-curly-newline' : 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'operator-linebreak': 0,
    'indent': 0,
    'react/jsx-closing-tag-location': 0,
    'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
