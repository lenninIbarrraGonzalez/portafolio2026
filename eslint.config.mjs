import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
  // Custom rules for better code quality
  {
    rules: {
      // React rules
      "react/prop-types": "off", // TypeScript handles this
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/display-name": "off",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": ["warn", {
        prefer: "type-imports",
        fixStyle: "inline-type-imports"
      }],

      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "no-var": "error",

      // Import organization
      "import/order": ["warn", {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "type"
        ],
        "newlines-between": "never",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }],

      // Accessibility - warnings for common issues
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
    }
  }
]);

export default eslintConfig;
