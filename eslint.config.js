import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // 1. Maintain your global ignores (this caught the Playwright error)
  {
    ignores: [
      '**/playwright-report/**',
      '**/test-results/**',
      '**/.next/**',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },

  // 2. Add the Next.js recommended linting rules & parser
  ...compat.extends('next/core-web-vitals'),

  // 3. (Optional) Your custom rules go here
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // add custom rules if you have any
    },
  },
];
