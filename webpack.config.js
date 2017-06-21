// @flow
const webpack = require('webpack');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');
const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    '__DEV__': JSON.stringify(!isProd),
    '__VERSION__': JSON.stringify(pkg.version),
  }),
];

if (isProd) {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  plugins.push(new UglifyEsPlugin());
}

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

  plugins,
};
