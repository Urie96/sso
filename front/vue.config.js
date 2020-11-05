const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 1024 * 10,
            // deleteOriginalAssets: true,
          }),
        ],
      };
    }
  },

  devServer: {
    host: 'localhost',
    port: 8081,
    https: false,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7122',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },

  // outputDir: '../dist',
};
