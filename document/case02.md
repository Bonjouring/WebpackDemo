### webpack 中文件监听
文件监听是在发现源码发生变化时，自动重新构建出新的输出文件  

webpack 开启监听模式又两种方式
    - 启动 webpack 命令时，带上 --watch 参数
    - 配置 webpack.config.js 中设置 watch:true
    - 缺陷：每次需要手动刷新浏览器
    - package 配置示例: [alt package示例](../images/case02_fileListener.png)  

**文件监听原理分析**  
轮询判断文件的最后编辑时间是否变化
某个文件发生了变化，并不会立即告诉监听者，而是先缓存起来，等 aggregateTimeout  
webpack配置: [alt webpack 示例](../images/case02_fileListenerWebpack.png)

### 热更新 
**方式一： WDS(webpack-dev-server)**
相比较于 文件监听 的方式，热更新弥补了其不足:  
    - WDS 不刷新浏览器
    - WDS 不输出文件，而是放在内存中，所以构建更加快速
    - 使用HotModuleReplacementPlugin 插件
    - 主要在开发环境使用
    - package.json 配置：[package 示例](../images/case02_hotModuleRelacePackage.png)
    - webpakc 配置中，mode 为 development，再引入 plugins

**方式二： WDM(webpack-dev-middleware)**  
WDM 将 webpack 输出的文件传输给服务器，适用于灵活的定制场景  
参考: [alt 使用范例](../images/case02_WDM.png)  

热更新原理分析  
webpack compile: 将 JS 编译成 Bundle  
HMR Server: 将热更新的文件输出给 HMR Runtime  
Bundle server: 提供文件在服务器的访问  
HMR Runtime: 会被注入到浏览器，更新文件的变化  
bundle.js: 构建输出的文件  
参考: [alt 示例图](../images/case02_concept.png)  

热更新过程
    - 启动阶段：在文件系统里进行编译，编译过后，经过 webpack commpiler 打包，打包好后，再将打包好的文件传给 HMR Server（服务器），它能让文件以挂载在 server 的方式让浏览器能够访问到（对应示例图中 1,2,a,b）
    - 更新阶段: 若开发过程中要编译的文件发生了变化。过程还是先由 file system 编译，然后传给 webpack compiler 打包，再发送给 HMR Server, 然后 HMR Server 就能监听到那些资源发生了变化,再将变更通知给 HMR Runtime(客户端) ,然后实现不刷新变更 


### 文件指纹
打包后输出的文件名的后缀  
示例：[alt 文件指纹](../images/case02_file指纹.png) 
作用：  
    - 文件版本的管理
    - 指纹的变化可及时更新浏览器缓存

**文件指纹如何生成**
    - Hash: 和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改（所以只要有一个文件被修改了，所有文件的指纹都会改变）
    - Chunkhash: 和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值
    - Contenthash: 根据文件内容来定义 hash，文件内容不变，则 contenthash 不变（注：js 没有 contenthash，contenthash 一般用于 css 和图片）

**JS 文件指纹设置**
设置 output 的 filename，使用 [chunkhash],webpack 配置: [alt webpack 示例](../images/case02_jsChunckhash.png)

**CSS 文件指纹设置**
设置 MiniCssExtractPlugin(通过这个插件，把 style-loader 编译后的 css 内容提取成一个独立的文件，成了独立的 css 文件后才可使用 css 的文件指纹，这和 style-loader 是相反的，style-loader 是把css 插入到 <style> 标签中) 的 filename，使用 [contenthash], webpack 配置: [alt webpack 示例](../images/case02_cssContenthash.png)  
npm 安装: npm i mini-css-extract-plugin


**图片 文件指纹设置**
设置 file-loader/url-loader 的 options.name，使用 [hash]，常见的占位符: [alt file-loader 占位符](../images/case02_imageHash.png), webpack 配置: [alt webpack 示例](../images/case02_imageHashDemo.png)
*注：图片文件的 [hash] 和 js/css 的[hash]不一样；[hash:8] 表示取hash值前8位*

### 代码压缩
**JS 文件压缩**
webpack 内置了 uglifyjs-webpack-plugin，所以默认通过 webpack 打包后的 js 文件是压缩处理了的

**CSS 文件压缩**
需要使用 optimize-css-assets-webpack-plugin 插件，同时使用 cssnano 这个 CSS 预处理器  
使用示例：[alt weback 示例](../images/case02_cssPress.png)
npm 安装：  
    - npm i optimize-css-assets-webpack-plugin
    - npm i cssnano

**HTML 文件压缩**
使用 html-webpack-plugin, 设置压缩参数  
使用示例：[alt webpack 示例](../images/case02_htmlPress.png)  
npm 安装:  
    - npm i html-webpack-plugin
