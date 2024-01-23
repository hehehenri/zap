/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  root: true,
  extends: ["@repo/eslint-config/next.js", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  }
};
