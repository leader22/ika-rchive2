// @flow
const webpack = require('webpack');
const isProd = process.argv.indexOf('-p') !== -1;
const pkg = require('./package.json');

module.exports = {
  entry: {
    main: './src/js/main',
  },

  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      '__DEV__': JSON.stringify(!isProd),
      '__VERSION__': JSON.stringify(pkg.version),
    }),
  ],
};
