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
const indexFile = path.resolve(baseDir, './src/index.js');

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
        // main bundle
        entry: path.resolve(baseDir, './src/index.ts'),
        output: {
            filename: 'index.js',
            path: distDir,
            libraryTarget: 'amd',
            publicPath: publicPath,
        },
        ...options,
    },
    {
        // jupyter notebook extension
        entry: path.resolve(baseDir, './src/extension.ts'),
        output: {
            filename: 'extension.js',
            path: distDir,
            libraryTarget: 'amd',
        },
        ...options,
    },
    {
        // jupyter lab extension
        entry: path.resolve(baseDir, './src/lab-extension.ts'),
        output: {
            filename: 'lab-extension.js',
            path: distDir,
            libraryTarget: 'amd',
        },
        ...options,
        externals: externals.concat(['./index']),
    },
];
