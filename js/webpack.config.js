const rules = [
  { test: /\.ts$/, loader: 'ts-loader' },
  { test: /\.js$/, loader: 'source-map-loader' },
]
const resolve = { extensions: ['.ts', '.js'] }

const version = require('./package.json').version
const name = require('./package.json').name
const path = require('path')

const externals = ['@jupyter-widgets/base']

const publicPath = 'https://unpkg.com/' + name + '@' + version + '/dist/index.js'

const options = {
  // readthedocs has out of memory error in production
  mode: 'production',
  module: {
    rules: rules
  },
  resolve: resolve,
  devtool: 'source-map',
  externals: externals
}

module.exports = [
  {
    // notebook external imports
    entry: './src/extension.ts',
    output: {
      filename: 'extension.js',
      path: path.resolve(__dirname, '..', 'algorithmx', 'nbextension', 'static'),
      libraryTarget: 'amd'
    },
    ...options
  },
  {
    // notebook bundle
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '..', 'algorithmx', 'nbextension', 'static'),
      libraryTarget: 'amd'
    },
    ...options
  },
  {
    // lab plugin
    entry: './src/labplugin.ts',
    output: {
      filename: 'labplugin.js',
      path: path.resolve(__dirname, 'dist-lab'),
      libraryTarget: 'amd'
    },
    ...options,
    externals: externals.concat(['../dist/index'])
  },
  {
    // docs bundle
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '..', 'docs', 'source', '_static'),
      library: name,
      libraryTarget: 'amd'
    },
    ...options
  },
  {
    // embeddable bundle
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: name,
      libraryTarget: 'amd',
      publicPath: publicPath
    },
    ...options
  }
]
