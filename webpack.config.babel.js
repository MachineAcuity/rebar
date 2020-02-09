import path from 'path'

import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ModuleConcatenationPlugin from 'webpack/lib/optimize/ModuleConcatenationPlugin'

// Read environment
require('dotenv').config()

const version = require('./package.json').version
const host = process.env.HOST
const port_webpack = process.env.PORT_WEBPACK
const node_env = process.env.NODE_ENV
const sassets_configuration_version = process.env.CFSB_SASSETS_CONFIGURATION_VERSION

const publicPath = sassets_configuration_version
  ? `/sassets/${version}.${sassets_configuration_version}/`
  : node_env === 'production' ? `/assets/${version}/` : `http://${host}:${port_webpack}/${version}/`

console.log(
  'Webpack ' +
    JSON.stringify({
      node_env,
      version,
      sassets_configuration_version,
      publicPath,
    }),
)

const ifNotProd = (plugin) => (node_env !== 'production' ? plugin : undefined)
const ifProd = (plugin) => (node_env === 'production' ? plugin : undefined)
const removeEmpty = (array) => array.filter((p) => !!p)

const config = {
  devServer: {
    host,
    port: port_webpack,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },

  entry: {
    client: [ 'whatwg-fetch', path.resolve('units/rb-appbase-webapp/client.js') ],
    vendor: [
      'babel-polyfill',
      'farce',
      'found',
      'found-relay',
      'isomorphic-fetch',
      '@material-ui/core',
      'prop-types',
      'react',
      'react-code-splitting',
      'react-dom',
      'react-event-listener',
      'react-helmet',
      'react-relay',
      'relay-runtime',
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  output: {
    path: path.resolve(
      `deployment/units/_configuration/rb-base-server/public_files/assets/${version}`,
    ),
    filename: '[name].js',
    publicPath,
  },

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: removeEmpty([
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-flow',
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    targets: '> 5%, not dead',
                  },
                ],
              ],
              plugins: removeEmpty([
                'dynamic-import-webpack',
                ifNotProd('flow-react-proptypes'),
                'syntax-dynamic-import',
                'transform-class-properties',
                [
                  'relay',
                  {
                    schema: 'schema.graphql',
                  },
                ],
              ]),
            },
          },
          ifNotProd({ loader: 'eslint-loader' }),
        ]),
        exclude: /node_modules/,
      },

      // Code for CSS loader tested with react-table
      {
        test: /\.css$/,
        use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ],
      },

      // Load images and files
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]',
      },
    ],
  },

  resolve: {
    extensions: [ '.js', '.jsx' ],
  },

  plugins: removeEmpty([
    new webpack.EnvironmentPlugin(),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      },
    }),
    ifNotProd(new webpack.NamedModulesPlugin()),
    ifProd(new ModuleConcatenationPlugin()),
  ]),
}

if (node_env !== 'production') {
  config.devtool = 'source-map'

  // Introduce relatively large timeout to allow babel-node to restart and avoid
  // getting an entirely blank screen when hot reloading happens and babel-node
  // is in the process of restarting
  config.watch = true
  config.watchOptions = {
    aggregateTimeout: 10000,
    poll: false,
  }
}

export default config
