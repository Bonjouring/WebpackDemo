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