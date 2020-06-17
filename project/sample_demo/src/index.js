import { helloWebpack } from "./hellowebpack";

document.write(helloWebpack())

// 使用 webpack 编译 index.js 文件
// 法一：通过 npm script，在 package.json 里，script 中加上 "build": "webpack" 通过执行 npm run build 运行构建
//      注：这里由于 package.json 和 webpack.config.js 不在同一个目录下，所以在 package.json 这边要特别制定 --config 参数
//      原理：局部安装的模块会在 node_modules/.bin 目录创建软连接
// 法二：在 sample_demo 下执行 ../node_modules/.bin/webpack