const path = require('path');
const pkg = require('./package.json');

const rules = [
    { test: /\.ts$/, loader: 'ts-loader' },
    { test: /\.js$/, loader: 'source-map-loader' },
];
const resolve = { extensions: ['.ts', '.js'] };

const version = pkg.version;
const name = pkg.name;

const baseDir = path.resolve(__dirname);
const distDir = path.resolve(__dirname, 'dist');
const buildDir = path.resolve(__dirname, 'build');

const externals = ['@jupyter-widgets/base'];
const publicPath = 'https://unpkg.com/' + name + '@' + version + '/dist/index.js';

const options = {
    mode: 'production',
    module: {
        rules: rules,
    },
    resolve: resolve,
    devtool: 'source-map',
    externals: externals,
};

module.exports = [
    {
        // library bundle (used by the http server frontend)
        entry: path.resolve(baseDir, './src/library.ts'),
        output: {
            filename: 'index.js',
            path: path.join(buildDir, 'library'),
            library: 'algorithmx',
            libraryTarget: 'var',
        },
        ...options,
    },
    {
        // jupyter widget bundle
        entry: path.resolve(baseDir, './src/index.ts'),
        output: {
            filename: 'index.js',
            path: distDir,
            library: 'algorithmx-jupyter',
            libraryTarget: 'amd',
            publicPath: publicPath,
        },
        ...options,
    },
    {
        // jupyter notebook bundle
        entry: path.resolve(baseDir, './src/nbextension.ts'),
        output: {
            filename: 'extension.js',
            path: path.join(buildDir, 'nbextension'),
            library: 'algorithmx-jupyter',
            libraryTarget: 'amd',
        },
        ...options,
    },
    {
        // jupyter lab imports
        entry: path.resolve(baseDir, './src/labextension.ts'),
        output: {
            filename: 'labextension.js',
            path: distDir,
            libraryTarget: 'amd',
        },
        ...options,
        externals: externals.concat(['./index']),
    },
];
