'use strict'

const path = require('path')

// 多入口 配置
module.exports = {
    entry: { // 多入口时，entry 是一个对象了
        index: path.join(__dirname, 'src/index.js'),
        search: path.join(__dirname, 'src/search.js')
    },
    output: { // 多入口时，output 结构依然不变，只是 filename 要用到占位符 [name] 表示 name 唯一
        path: path.join(__dirname, 'mutiDist'),
        filename: '[name].js'
    },
    mode: 'production'
}