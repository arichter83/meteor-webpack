const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const projectPath = path.resolve(__dirname, '..');

const clientConfig = {
    context: projectPath,
    entry: ['./imports/client/index.js'],
    externals: [
        resolveExternals
    ],
    plugins: [
        new CleanWebpackPlugin(['client/build', 'public/build']),
    ],
    output: {
        path: path.resolve(projectPath, 'client/build'),
        chunkFilename: '../../public/build/[name].lib.js',
        filename: 'lib.js'
    }
};

const serverConfig = {
    target: 'node',
    context: projectPath,
    entry: ['./imports/server/index.js'],
    externals: [
        resolveExternals
    ],
    plugins: [
        new CleanWebpackPlugin(['server/build']),
    ],
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(projectPath, 'server/build'),
        filename: 'lib.node.js'
    }
};

function resolveExternals(context, request, callback) {
    return resolveMeteor(request, callback) ||
        callback();
}

function resolveMeteor(request, callback) {
    var match = request.match(/^meteor\/(.+)$/);
    var package = match && match[1];
    if (package) {
        callback(null, `Package['${package}']`);
        return true;
    }
};

module.exports = [clientConfig, serverConfig];