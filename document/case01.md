### 解析 ES6、CSS/Less/Sass

**解析 ES6**
> + loaders 使用 babel-loader, babel 的配置文件是: .babelrc  
> + webpack 配置: [alt webpack示例](../images/case01_a.png)  
> + .babelrc 配置：[alt .babelrc示例1](../images/case01_b.png)
> + npm 需安装 @babel/core @babel/preset-env babel-loader

**解析CSS/Sass/Less**
> + ***解析 CSS***  
    - Loders 中的 css-loader 用于加载 .css 文件，并且转换成 commonjs 对象  
    - style-loader 将样式通过 '<style>' 标签插入到 head 中  
    - webpack 配置：[alt webpack 示例](../images/case01_c.png)  
    - npm 安装：style-loader、css-loader  
> + ***解析 LESS***  
    - less-loader 用于将 less 转换成 css
    - webpack 配置：[alt webpack 示例](../images/case01_d.png) 
    - npm 安装: less-loader

**解析图片和字体**
> + ***解析图片/字体*** 
    - file-loader 用于处理文件资源
    - webpack 配置：[alt webpack 示例](../images/case01_图片.png)
    - npm 安装: file-loader
> + ***资源解析*** 
    - 除了 file-loader 可以解析各种文件外，还可以使用 url-loader
    - url-loader 也可以处理图片和字体，可以设置较小资源自动 base64
    - webpack 配置：[alt webpack 示例](../images/case01_urlLoader.png)
    - npm 安装: url-loader