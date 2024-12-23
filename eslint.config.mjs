import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import  eslintPluginPrettierRecommended  from 'eslint-plugin-prettier/recommended';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
    globals:{
      "process":"readonly"
    }
  },
  
];