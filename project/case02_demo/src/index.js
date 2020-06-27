import './style1.css';
import './style2.less';
import imageDemo from '../../../images/case01_图片.png'
let a = 'hello es6'
document.write(a)
const div = document.createElement('div')
div.innerHTML = `<span>Font CSS</span>  Hi, Webpack <img src=${imageDemo} />`
div.className = 'font-styles bg_div'
document.body.appendChild(div)