### 当前构建的问题  
每次构建的时候(build)，不会自动清理构建目录，造成构建的输出目录 output 文件越来越多  
**方式一：通过 npm scripts 清理构建目录**  
    - rm -rf ./dist && webpack
    - rimraf ./dist && webpack  

**方式二: 使用 clean-webpack-plugin（推荐）**  
默认会删除 output 指定的输出目录, 示例：[alt webpack 示例](../images/case03_cleandist.png)  
npm 安装: npm i clean-webpack-plugin

*范例参考: case02_demo*

### PostCSS 插件 autoprefixer 自动补齐 CSS3 前缀  
不同浏览器下 css3 的前缀: [alt 图](../images/case03_cssPrefix.png)  
例如 border-radius 样式，如果要适应每个浏览器，那么需要写全所有的前缀，那么一个样式就会写 4 次，比较耗费时间和精力。  
解决办法：使用 autoprefixer 插件  
**autoprefixer 插件**
autoprefixer，来自动补全 CSS3 的前缀  
根据 Can I Use 规则 (https://caniuse.com)  
示例: [alt webpack 配置](../images/case03_cssPrefix.png)  
autoprefixer 是 CSS 的后置处理器, 与 less-loader sass-loader 不同，它们是 CSS 预处理器（在打包前处理）  
autoprefixer 插件通常和 postCSS-loader 一起使用  
npm 安装：npm i postcss-loader autoprefixer -D --save  

注：  
- 使用 postcss loader, https://www.npmjs.com/package/postcss-loader#syntaxes, 可以通过 postcss.config.js 来配置
- autoprefixer 插件：https://github.com/postcss/autoprefixer#options
- 使用 autoprefixer 时，必须要配置好 broswerlistrc，参考：https://github.com/browserslist/browserslist#readme
- 关于配置 css 的各项 loader 时要注意的顺序：根据 postcss loader 官网, postcss-loader 要放在 css-loader 和 style-loader 之后，在其它 preprocess loaders 前（如 less/sass/stylus-loader）

*范例参考：case02_demo*


### 移动端 css px自动转换 rem
移动端屏幕的分辨率是多种多样的，没种机型版本其分辨率都不同  
解决办法：  
- 使用 CSS 媒体查询实现响应式布局（缺陷: 需要写多套适配样式代码）示例:[alt media query 示例](../iamges/../images/case03_autoQuery.png)
- 使用 rem: rem 是相对单位(相对于 font-size), px 是绝对单位
  
**webpack 中使用 rem**  
使用 px2rem-loader，页面渲染时，计算根元素的 font-size 值  
在开发过程中依然使用 px 来写，打包时，webpack 会利用 px2rem-loader 将 px 转化为 rem  

npm 安装: npm i px2rem-loader lib-flexible -D--save
*关于 rem与px的换算，参考手淘的 lib-flexible 库：https://github.com/amfe/lib-flexible*  
*范例参考：case02_demo*

### 静态资源内联
资源内联的意义：  
- 代码层面：
    - 页面框架的初始化脚本
    - 上报相关打点(如 css 初始化，加载完成，js 初始化，加载完成等这些上报点，只能内联)
- css 内联避免页面闪动
    - 请求层面：减少 HTTP 网络请求数
    - 小图片或字体内联(url-loader)


**HTML 和 JS 内联**  
raw-loader 内联 html
    - <script>${require('raw-loader!babel-loader!./meta.html')}</script>  
raw-loader 内联 JS
    - <script>${require('raw-loader!babel-loader!../node_modules/lib_flexible')}</script>   
*注：内联 JS 时，还要用到 babel-loader，因为如果使用 es6 写的js 的话，还需用 babel-loader 将其转化为 ES6 以下的版本，再来用 raw-loader 内联*  

CSS 内联  
- 方案一：借助 style-loader  
参考:[alt webpack 示例](../images/case03_cssInline.png)  
- 方案二：html-inline-css-webpack-plugin  
npm 安装: npm i raw-loader@0.5.1 -D


