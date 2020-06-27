"use strict"

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/, // use: 'file-loader' 可换成用 url-loader
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240 // 限制图片大小为 10k, 若小于的话 webpack 打包时会根据 url-loader 自动转化为 base64, 让其至少是 10k
                    }
                }],
               
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    // 热更新配置
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
