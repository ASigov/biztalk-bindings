import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', 'client'),
  output: {
    path: path.resolve(__dirname, 'dist', 'client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'client', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'client', 'favicon.ico'),
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(
          __dirname,
          'node_modules',
          'bootstrap',
          'dist',
          'css',
          'bootstrap.min.css',
        ),
        typeOfAsset: 'css',
      },
      {
        filepath: path.resolve(
          'node_modules',
          'jquery',
          'dist',
          'jquery.slim.min.*',
        ),
      },
      {
        filepath: path.resolve(
          'node_modules',
          'popper.js',
          'dist',
          'umd',
          'popper.min.js',
        ),
      },
      {
        filepath: path.resolve(
          'node_modules',
          'bootstrap',
          'dist',
          'js',
          'bootstrap.min.js',
        ),
      },
      {
        filepath: path.resolve(
          'node_modules',
          'react',
          'umd',
          'react.development.js',
        ),
      },
      {
        filepath: path.resolve(
          'node_modules',
          'react-dom',
          'umd',
          'react-dom.development.js',
        ),
      },
      {
        filepath: path.resolve('node_modules', 'axios', 'dist', 'axios.min.*'),
      },
      {
        filepath: path.resolve(
          'node_modules',
          'bs-custom-file-input',
          'dist',
          'bs-custom-file-input.min.js',
        ),
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios',
    'bs-custom-file-input': 'bsCustomFileInput',
  },
};

export default config;
