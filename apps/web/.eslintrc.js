/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: [ "react", "react-hooks" ],
  root: true,
  extends: ["@repo/eslint-config/next.js", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
