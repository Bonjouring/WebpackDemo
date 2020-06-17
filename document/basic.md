### webpack 配置文件
>默认配置文件：webpack.config.js  
>可通过 webpack --config 指定配置文件

** config -- Loaders **
>webpack 开箱即用，它只支持 js 和 json 两种文件类型。但可通过 Loaders 去支持其它文件类型并把它们转化成有效的模块，并添加到依赖图中  
>Loders 本身是一个函数，接受源文件作为参数，返回转换后的结果  
>webpack 里常见的 Loaders: ![alt 常用loaders](../images/config_loaders01.png)
>loaders 用法:[alt loaders 用法]("../images/config_loaders02.png")