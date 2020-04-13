const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

const externals = ['@agri-apps-us/app-core', 'vue', 'vuex', 'firebase', 'firebase/app', 'firebase/firestore', 'lodash']

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    externals: externals.reduce(
        (acc, name) => Object.assign({}, acc, { [name]: true }),
        {}
    ),
    output: {
        filename: 'agri-apps.firebase.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: true,
            })
        ]
    }
}