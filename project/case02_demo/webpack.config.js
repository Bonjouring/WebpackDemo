"use strict"

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // css 文件压缩
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 文件压缩
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 自动清理构建文件
const autoprefixer = require('autoprefixer')

module.exports = (env) => ({
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader, // 使用 MiniCssExtractPlugin.loader 取代 loader
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // rem 相对于 px 转换的单位：1 rem = 75px，适合 width 为 750px 的像素稿
                            remPrecesion: 8 // px 转化为 rem 时，小数点后面的位数
                        }
                    }
                ]
            },
            {
                test: /.less$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader, // MiniCssExtractPlugin.loader 要放在 css-loader 后
                    'css-loader',
                    'postcss-loader',
                    // 'postcss-loader' + .broswerslistrc 等价于以下配置，但 postcss.config.js 里的 plugins 要改写成：'postcss-plugin': {}，参考 官网的使用范例
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: () => [
                    //             require('autoprefixer')({
                    //                 overrideBrowserslist: ['last 4 versions', '>1%']
                    //             })
                    //         ]
                    //     }
                    // },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // rem 相对于 px 转换的单位：1 rem = 75px，适合 width 为 750px 的像素稿
                            remPrecesion: 8 // px 转化为 rem 时，小数点后面的位数
                        }
                    },
                    /* 
                    注：p2xrem-loader 要放在 less-loader 前，这样 less 里若有嵌套的{} 就不会报错了
                    less-loader 要放在 postcss-loader 后，如果 less 文件中有 // 或 /**/// 多行注释的话（且 //xxx 不能有空格）*/
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/, // use: 'file-loader' 可换成用 url-loader
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        // limit: 10240 // 限制图片大小为 10k, 若小于的话 webpack 打包时会根据 url-loader 自动转化为 base64, 让其至少是 10k
                    }
                }],
               
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:9].css'
        }),
        new OptimizeCSSAssetsPlugin({ // css文件压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),
            filename: 'search.html',
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin()
    ]
})
