import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var version = require('./configuration/package.js').version;

let config = {
  entry: {
    client: path.resolve('webapp/client.js')
  },
  output: {
    path: path.resolve(`public/assets/${version}`),
    filename: '[name].js',
    publicPath: `http://localhost:8080/${version}/`
  },
  module: {
    preLoaders: [
      {test: /\.js(x)?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.js(x)?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new ExtractTextPlugin('[name].css'),
    // Implementing fix https://github.com/callemall/material-ui/issues/2336 by https://github.com/chadrien
    new webpack.DefinePlugin({
        process: {
            env: {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }
    }),
  ],
  devtool: 'source-map'
};

export default config;
