'use strict'
const path = require('path')

// 单入口 webpack.config.js
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'), // __dirname 表示当前文件所在目录的绝对路径
        filename: 'bundle.js'
    },
    mode: 'production'
}