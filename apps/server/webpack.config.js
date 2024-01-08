const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = () => {
  return process.env.ENV === 'production'
    ? 'production'
    : 'development' 
};

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  mode: env(),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()]
};
