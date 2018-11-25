/* tslint-disable */
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });
module.exports = {
    mode: 'development',
    entry: ['./src/StartServer.ts'],
    target: 'node',
    node: {
        __dirname: true,
    },
    externals: nodeModules,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'StartServer.js',
    },
    module: {
        /* noParse: /ejs/, */
        rules: [{
            test: /\.tsx?$/,
            use: ['ts-loader'],
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        alias: {
            views: path.resolve(__dirname, 'src/views')
        }
    },
    plugins: [/* new CopyWebpackPlugin([{
        from: 'src/views',
        to: 'views'
    },{
        from: 'src/assets',
        to: 'assets'
    },]) */],
}