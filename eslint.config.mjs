import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/\\\\d+(?:\\\\.\\\\d+)?px/]',
          message: 'Pixels (px) are not allowed. Use rem, em, or a design token.',
        },
        {
          selector: 'TemplateElement[value.raw=/\\\\d+(?:\\\\.\\\\d+)?px/]',
          message: 'Pixels (px) are not allowed. Use rem, em, or a design token.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > Literal[value=/\\\\d+(?:\\\\.\\\\d+)?px/]',
          message: 'Tailwind classes must not use px. Use rem or design tokens.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer Literal[value=/\\\\d+(?:\\\\.\\\\d+)?px/]',
          message: 'Tailwind classes must not use px. Use rem or design tokens.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer TemplateElement[value.raw=/\\\\d+(?:\\\\.\\\\d+)?px/]',
          message: 'Tailwind classes must not use px. Use rem or design tokens.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > Literal[value=/\\[(?![^\\]]*(?:vh|vw|vmin|vmax|%))[^\\]]+\\]/]',
          message:
            'Tailwind arbitrary values are only allowed for viewport/percentage units (vh, vw, vmin, vmax, %). Use scale utilities (e.g. gap-3.25).',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer Literal[value=/\\[(?![^\\]]*(?:vh|vw|vmin|vmax|%))[^\\]]+\\]/]',
          message:
            'Tailwind arbitrary values are only allowed for viewport/percentage units (vh, vw, vmin, vmax, %). Use scale utilities (e.g. gap-3.25).',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer TemplateElement[value.raw=/\\[(?![^\\]]*(?:vh|vw|vmin|vmax|%))[^\\]]+\\]/]',
          message:
            'Tailwind arbitrary values are only allowed for viewport/percentage units (vh, vw, vmin, vmax, %). Use scale utilities (e.g. gap-3.25).',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > Literal[value=/#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/]',
          message:
            'Hard-coded hex colors are not allowed in className. Use CSS variables/classes defined in .css.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer Literal[value=/#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/]',
          message:
            'Hard-coded hex colors are not allowed in className. Use CSS variables/classes defined in .css.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer TemplateElement[value.raw=/#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/]',
          message:
            'Hard-coded hex colors are not allowed in className. Use CSS variables/classes defined in .css.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > Literal[value=/\\b(?:text|bg|border|ring|from|to|via|stroke|fill)-(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\\d{1,3})?(?:\\/\\d{1,3})?\\b/]',
          message:
            'Tailwind color utilities are not allowed in className. Use CSS variables/classes defined in .css.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer Literal[value=/\\b(?:text|bg|border|ring|from|to|via|stroke|fill)-(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\\d{1,3})?(?:\\/\\d{1,3})?\\b/]',
          message:
            'Tailwind color utilities are not allowed in className. Use CSS variables/classes defined in .css.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(className|class)$/] > JSXExpressionContainer TemplateElement[value.raw=/\\b(?:text|bg|border|ring|from|to|via|stroke|fill)-(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\\d{1,3})?(?:\\/\\d{1,3})?\\b/]',
          message:
            'Tailwind color utilities are not allowed in className. Use CSS variables/classes defined in .css.',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: ['.next/'],
  },
]

export default eslintConfig
