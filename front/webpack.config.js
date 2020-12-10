const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Login',
      template: './src/html/index.html',
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Page Not Found',
    //   template: './src/html/404.html',
    //   filename: '404.html',
    //   chunks: [],
    // }),
    new CompressionPlugin({
      test: /\.(js|css|html)$/,
      threshold: 1024 * 10,
      // deleteOriginalAssets: true,
    }),
  ],
};
