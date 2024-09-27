import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist"]
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true
        }
      ],
      indent: ["error", 2, {
        "SwitchCase": 1
      }],
      "comma-dangle": ["error", "never"],
      "semi": [2, "always"],
      quotes: ["error", "double"],
      "eol-last": 1,
      "no-multiple-empty-lines": ["error", {
        "max": 1
      }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-spacing": ["error", {
        "before": false, "after": true
      }],
      "object-curly-newline": ["error", {
        "ObjectExpression": {
          "multiline": true, "minProperties": 1
        }
      }],
      "padded-blocks": ["error", "never"],
      "space-before-blocks": ["error", "always"],
      "key-spacing": ["error", {
        "beforeColon": false,
        "afterColon": true
      }],
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "no-multi-spaces": "error",
      "no-trailing-spaces": ["error"]
    }
  }
);
