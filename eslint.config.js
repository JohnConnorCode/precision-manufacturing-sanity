import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends('next/core-web-vitals'),
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
      '@next/next': next,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readable',
        JSX: 'readable',
        NodeJS: 'readable',
        console: 'readable',
        process: 'readable',
        window: 'readable',
        document: 'readable',
        navigator: 'readable',
        fetch: 'readable',
        URL: 'readable',
        URLSearchParams: 'readable',
        setTimeout: 'readable',
        clearTimeout: 'readable',
        setInterval: 'readable',
        clearInterval: 'readable',
        Buffer: 'readable',
        global: 'readable',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', {
        ignore: [
          'args', 'attach', 'position', 'rotation', 'scale',
          'intensity', 'color', 'visible', 'side',
          'metalness', 'roughness', 'emissive', 'emissiveIntensity',
          'envMapIntensity', 'transparent', 'opacity'
        ]
      }],
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      // TODO: Re-enable once types are properly defined (312 violations to fix)
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // TODO: Replace console.log with console.warn/error (48 violations to fix)
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['e2e/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['sanity/schemas/**/*.{ts,tsx}'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
  {
    files: ['scripts/**/*.{ts,tsx,js,jsx,mjs}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      'public/**',
      'next-env.d.ts',
      'sanity/**',
      'scripts/**',
    ],
  },
];
