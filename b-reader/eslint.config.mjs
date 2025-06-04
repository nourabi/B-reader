import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variable errors
      "@typescript-eslint/no-explicit-any": "off", // Allow usage of `any`
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit return type requirement
    },
  },
];

export default eslintConfig;
