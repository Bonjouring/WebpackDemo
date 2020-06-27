module.exports = {
    // parser: 'sugarss', // 如果指定了 sugarss，要注意 css/less/sass 里格式问题，特别是空格，容易报错：Unnecessary curly bracket
    parser: false,
    // plugins: {
    //     'postcss-plugin': {}
    // }
    plugins: [
        require('autoprefixer')
    ]
}