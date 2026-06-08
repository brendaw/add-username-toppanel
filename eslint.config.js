import js from "@eslint/js";

const gnomeGlobals = {
  imports: "readonly",
  pkg: "readonly",
  uuid: "readonly",
  log: "readonly",
  logError: "readonly",
  print: "readonly",
  printerr: "readonly",
};

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: gnomeGlobals,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
