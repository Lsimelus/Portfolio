// ESLint flat config: JS + TypeScript recommended rules and React Hooks rules (same base as real-calc's frontend).
// CI runs `npm run lint`, which fails on any warning.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  { ignores: ["build/**", "dist/**", "node_modules/**", "public/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"] ?? reactHooks.configs["recommended-latest"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  { files: ["**/*.test.{ts,tsx}", "src/setupTests.ts"], languageOptions: { globals: { ...globals.node, ...globals.vitest } } },
  { files: ["*.config.{js,ts}"], languageOptions: { globals: { ...globals.node } } },
);
