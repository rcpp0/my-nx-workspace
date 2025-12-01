import nx from '@nx/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            // L'app peut importer features, data-access et ui
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:data-access',
                'type:ui',
              ],
            },
            // Les features : data-access et ui (PAS d'autres features !)
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:ui'],
            },
            // ui peut importer data-access
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:data-access'],
            },
            // data-access ne peut rien importer
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    plugins: {
      sonarjs: sonarjs,
    },
    rules: {
      // ========================================
      // RÈGLES SONARJS - QUALITÉ DE CODE
      // ========================================

      // Règles Critiques (Erreurs)
      'sonarjs/no-all-duplicated-branches': 'error', // Branches identiques dans if/else
      'sonarjs/no-element-overwrite': 'error', // Écrasement d'éléments de tableau
      'sonarjs/no-identical-conditions': 'error', // Conditions identiques
      'sonarjs/no-identical-expressions': 'error', // Expressions identiques

      // Règles Importantes (Warnings)
      'sonarjs/cognitive-complexity': ['warn', 15], // Complexité cognitive max 15
      'sonarjs/no-collapsible-if': 'warn', // If imbriqués collapsables
      'sonarjs/no-duplicate-string': ['warn', { threshold: 5 }], // Strings dupliquées (min 5 fois)
      'sonarjs/no-identical-functions': 'warn', // Fonctions identiques
      'sonarjs/prefer-immediate-return': 'warn', // Return immédiat préféré
      'sonarjs/no-small-switch': 'warn', // Switch avec trop peu de cases
    },
  },
];
