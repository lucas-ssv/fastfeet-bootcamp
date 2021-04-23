module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier/react',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', {extensions: ['.jsx', '.js']}],
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    indent: 'off',
    'comma-dangle': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'no-unused-vars': 'warn',
    'operator-linebreak': 'off',
    'no-param-reassign': [2, {props: false}],
    'no-console': 'off',
    'object-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    camelcase: 'off',
    'react/prop-types': 'off',
    'arrow-body-style': 'off',
    'no-alert': 'off',
    'no-shadow': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};
