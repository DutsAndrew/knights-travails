const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
  mode: 'development',
   entry: './src/index.js',
   plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Knights Travails',
      favicon: './src/assets/chess-knight.svg',
    })
  ],
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
 };