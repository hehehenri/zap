module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: "./src",
  artifactDirectory: './src/__generated__',
  language: "typescript",
  eagerEsModules: false,
  schema: "./data/schema.graphql",
  excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
}
