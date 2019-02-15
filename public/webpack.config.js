/* eslint-disable */
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const EnvironmentPlugin = require('../node_modules/webpack/lib/EnvironmentPlugin.js');
const DefinePlugin = require('../node_modules/webpack/lib/DefinePlugin.js');

module.exports = {
    entry: './app.js',
    devServer: {
        outputPath: path.join(__dirname, './dist'),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new WriteFilePlugin(),
        new EnvironmentPlugin( { ...process.env } ),
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            // query: {
            //     presets: ["es2015", "react", "stage-0"]
            // }
        }]
    },
    node: {
        fs: "empty"
    }
};


// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
var src = path.join(__dirname, '..', '..', 'src');
var fs = require('fs');
if (fs.existsSync(src)) {
    // Use the latest src
    module.exports.resolve = {alias: {'react-router-redux': src}}
    module.exports.module.loaders.push({
        test: /\.js$/,
        loaders: ['babel'],
        include: src
    });
}
