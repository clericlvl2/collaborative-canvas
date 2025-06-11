import jseslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import stylisticPlugin from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default tseslint.config(
    /* Global ignore config */
    {
        ignores: ['.config/', 'dist/', 'tsconfig.json'],
    },

    /* js recommended config */
    jseslint.configs.recommended,

    /* Globals config */
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.jest,
            },
        },
    },

    /* ts strict + ts stylistic config */
    {
        extends: [
            tseslint.configs.strict,
            tseslint.configs.stylistic,
        ],
        rules: {
            '@typescript-eslint/no-extraneous-class': 'off',
            '@typescript-eslint/no-invalid-void-type': 'off',
        },
    },

    /* react plugins config */
    {
        extends: [
            reactPlugin.configs.flat.recommended,
            reactPlugin.configs.flat['jsx-runtime'],
            reactHooksPlugin.configs['recommended-latest'],
            reactRefreshPlugin.configs.recommended,
        ],
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/display-name': 'off',
        },
    },

    /* imports config */
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['**/*.config.{js,ts}'],
        extends: [
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
        ],
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [{ regex: '^@mui/[^/]+$' }],
                },
            ],
            'import/first': 'error',
            'import/no-duplicates': 'error',
            'import/newline-after-import': 'error',
            'import/no-default-export': 'error',
            'import/no-unassigned-import': 'error',
            'import/order': ['error', {
                groups: ['type', 'builtin', 'external', 'index', 'internal', 'parent', 'sibling'],
                named: true,
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            }],
        },
    },

    /* @stylistic/eslint-plugin config */
    {
        extends: [
            stylisticPlugin.configs.customize({
                indent: 4,
                arrowParens: false,
                semi: true,
                braceStyle: '1tbs',
                quoteProps: 'as-needed',
            }),
        ],
        rules: {
            '@stylistic/max-len': ['error', 80, {
                ignoreStrings: true,
                ignoreComments: true,
            }],
            '@stylistic/comma-dangle': ['error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                dynamicImports: 'always-multiline',
                exports: 'always-multiline',
            }],
        },
    }
);
