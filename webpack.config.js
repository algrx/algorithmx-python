// Custom webpack rules
const rules = [
  { test: /\.ts$/, loader: 'ts-loader' },
  { test: /\.js$/, loader: 'source-map-loader' },
];

const version = require('./package.json').version;
const path = require('path');

const resolve = {
  // Add '.ts' and '.tsx' as resolvable extensions.
  extensions: [".webpack.js", ".web.js", ".ts", ".js"]
};

const externals = ['@jupyter-widgets/base', 'd3', 'webcola', 'algorithmx']

module.exports = [
  {
    // Notebook extension
    entry: './js/extension.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'algorithmx', 'nbextension', 'static'),
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    devtool: 'source-map',
    externals: externals,
    resolve: resolve,
  },

  {
    // embeddable bundle (e.g. for docs)
    entry: './js/index.ts',
    output: {
      filename: 'embed-bundle.js',
      path: path.resolve(__dirname, 'docs', 'source', '_static'),
      library: "algorithmx-jupyter",
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    devtool: 'source-map',
    externals: externals,
    resolve: resolve,
  },
  {// Embeddable algorithmx-jupyter bundle
    //
    // This bundle is generally almost identical to the notebook bundle
    // containing the custom widget views and models.
    //
    // The only difference is in the configuration of the webpack public path
    // for the static assets.
    //
    // It will be automatically distributed by unpkg to work with the static
    // widget embedder.
    //
    // The target bundle is always `dist/index.js`, which is the path required
    // by the custom widget embedder.
    //
    entry: './js/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'amd',
        library: "algorithmx-jupyter",
        publicPath: 'https://unpkg.com/algorithmx-jupyter@' + version + '/dist/'
    },
    devtool: 'source-map',
    module: {
        rules: rules
    },
    externals: externals,
    resolve: resolve,
  }
];
