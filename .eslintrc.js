module.exports = {
    root: true,
    extends: [
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended',
      'plugin:prettier/recommended',
      'plugin:import/errors',
      'plugin:import/warnings'
    ],
    plugins: ['react', '@typescript-eslint', 'jest'],
    env: {
      browser: true,
      es6: true,
      jest: true
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json'
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-useless-rename': 'warn',
      'no-duplicate-imports': 'warn',
      'object-shorthand': ['warn', 'always'], // https://eslint.org/docs/rules/object-shorthand
      'spaced-comment': 'warn',
      'react/prop-types': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-props-no-spreading': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'no-param-reassign': [2, { props: false }],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.stories.tsx']
        }
      ],
      "no-return-assign": 0,
      "react/require-default-props": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/no-noninteractive-element-interactions": 0,
      "no-plusplus": 0,
      "import/prefer-default-export": 0,
      "no-nested-ternary": 0,
      "react/no-array-index-key": 0,
      "jsx-a11y/no-static-element-interactions": 0
    },
    settings: {
      react: {
        version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
      },
      'import/resolver': {
        node: {
          paths: ['src']
        }
      }
    }
  };
