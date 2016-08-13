import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

var version = require( './configuration/package.js' ).version

console.log( 'Running Webpack, process.env.NODE_ENV=' + process.env.NODE_ENV + ', version=' + version )

let config = {
  devtool: ( process.env.NODE_ENV == 'production' ? 'source-map' : 'eval' ),
  entry: {
    client: path.resolve('webapp/client.js')
  },
  output: {
    path: path.resolve( `public/assets/${version}` ),
    filename: '[name].js',
    publicPath: `http://localhost:8080/${version}/`
  },
  module: {
    preLoaders: [
      { test: /\.js(x)?$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js(x)?$/, loaders: [ 'react-hot', 'babel' ], exclude: /node_modules/ },
      { test: /\.json$/, loaders: [ 'json' ] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader') },
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin( ),
    new webpack.EnvironmentPlugin( Object.keys( process.env ) ),
    new ExtractTextPlugin( '[name].css' ),
    new webpack.DefinePlugin( {
        process: {
            env: {
                NODE_ENV: JSON.stringify( process.env.NODE_ENV )
            }
        }
    } ),
  ]
}

export default config
