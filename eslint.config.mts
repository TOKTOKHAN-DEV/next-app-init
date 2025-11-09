import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'

import prettierConfig from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  js.configs.recommended,

  /**
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/recommended.ts
   */
  ...tseslint.configs.recommended,

  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },

  // React plugin configuration
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // TypeScript specific configuration (타입 체크 규칙은 TypeScript 파일에만 적용)
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-array-constructor': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-misused-new': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/prefer-as-const': 'off',

      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@chakra-ui/react',
              message:
                "Please use individual imports from @chakra-ui/react instead of importing everything. Example: import { Button } from '@chakra-ui/react/button'",
            },
          ],
        },
      ],
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },

  prettierConfig,

  {
    ignores: [
      // dependencies
      'node_modules/**',
      '.pnp/**',
      '.pnp.js',
      // testing
      'coverage/**',
      // next.js
      '.next/**',
      'out/**',
      // production
      'build/**',
      'dist/**',
      // misc
      '.idea/**',
      '.DS_Store',
      '*.pem',
      // debug
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      // local env files
      '.env',
      '.env.development',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      // vercel
      '.vercel/**',
      // build info
      'tsconfig.tsbuildinfo',
      '.eslintcache',
      // config files
      '*.config.js',
      '*.config.mjs',
      '.prettierrc.js',
      '.lintstagedrc.js',
      'public/**',
      // generated files
      'src/generated/**',
      // scripts
      '.scripts/**',
    ],
  },
])
