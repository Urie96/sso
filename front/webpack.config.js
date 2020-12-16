const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: {
    login: './src/js/index.js',
  },
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
  },
  externalsType: 'script',
  externals: {
    vue: ['https://cdn.jsdelivr.net/npm/vue@3.0.4/dist/vue.global.prod.js', 'Vue'],
    'element-ui': ['https://cdn.jsdelivr.net/npm/element-plus@1.0.1-beta.8/lib/index.full.js', 'ElementPlus'],
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
      {
        test: /login\.html$/,
        use: ['./html-loader.js']
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Login',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      title: 'Page Not Found',
      template: './src/html/404.html',
      filename: '404.html',
      chunks: [],
    }),
    new CompressionPlugin({
      test: /\.(js|css|html)$/,
      threshold: 1024 * 10,
      // deleteOriginalAssets: true,
    }),
  ],
};
