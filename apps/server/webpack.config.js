const nodeExternals = require('webpack-node-externals');
const path = require("path");

const env = () => {
  return process.env.ENV === 'production'
    ? 'production'
    : 'development' 
};

/** @type { import('webpack').Configuration } */
module.exports = {
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  mode: env(),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.html$/],
        use: 'ts-loader',
        exclude: [/node_modules/, /\.html$/],
      },
    ],
  },
};
