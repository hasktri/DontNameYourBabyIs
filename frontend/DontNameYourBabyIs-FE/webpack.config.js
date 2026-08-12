const path = require('path');
const webpack = require('webpack');

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const apiBaseUrl = process.env.API_BASE_URL || 'https://dontnameyourbabyisapi.onrender.com/';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: isGitHubPages ? '/DontNameYourBabyIs/' : '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(apiBaseUrl),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 4001,
    open: true,
  },
};
