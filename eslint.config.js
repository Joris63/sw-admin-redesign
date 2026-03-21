import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      // ── Vue — logic (meaningful rules) ──────────────────────────
      'vue/multi-word-component-names': 'off',   // allow e.g. Navigation.vue
      'vue/no-unused-vars': 'error',
      'vue/no-mutating-props': 'error',
      'vue/no-template-shadow': 'warn',
      'vue/no-v-html': 'off',                    // used intentionally
      'vue/component-name-in-template-casing': ['warn', 'PascalCase', {
        ignores: ['/^router/', 'component', '/.*_.*/'],  // allow <router-view>, <component>, <OrdersAdd_Step>
      }],
      'vue/prop-name-casing': 'off',             // project uses camelCase props intentionally

      // ── Vue — style (off: handled by Prettier / project convention) ──
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-closing-bracket-spacing': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/attribute-hyphenation': 'off',        // project uses camelCase consistently
      'vue/attributes-order': 'off',             // not enforced
      'vue/block-order': 'off',                  // not enforced

      // ── TypeScript ──────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': 'off',

      // ── General ─────────────────────────────────────────────────
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Store tabs use Record<string, any> props as a mutable mock store (intentional prototype pattern)
  {
    files: [
      'src/views/logistics/store/tabs/StoreGeneralTab.vue',
      'src/views/logistics/store/tabs/StoreMediaTab.vue',
    ],
    rules: {
      'vue/no-mutating-props': 'off',
    },
  },

  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js', 'vite.config.*'],
  },
);
