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
  mode: 'production',
  module: {
    rules: rules
  },
  resolve: resolve,
  devtool: 'source-map',
  externals: externals
}

distPath = path.resolve(__dirname, 'dist'),

module.exports = [
  {
    // notebook external imports
    entry: './src/extension.ts',
    output: {
      filename: 'extension.js',
      path: path.resolve(distPath, 'nbextension'),
      libraryTarget: 'amd'
    },
    ...options
  },
  {
    // notebook bundle
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(distPath, 'nbextension'),
      libraryTarget: 'amd'
    },
    ...options
  },
  {
    // lab plugin
    entry: './src/labplugin.ts',
    output: {
      filename: 'labplugin.js',
      path: path.resolve(distPath, 'jupyter-lab'),
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
      path: path.resolve(distPath, 'docs'),
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
      path: path.resolve(distPath, 'lib'),
      library: name,
      libraryTarget: 'amd',
      publicPath: publicPath
    },
    ...options
  }
]
