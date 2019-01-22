// 取出dom元素
var solid = document.getElementsByClassName('solid')[0];
var oUl = document.getElementsByClassName('oUl')[0];
var css = document.getElementsByTagName('style')[0];
var btn = document.querySelectorAll('ol li');
var n = 0;

console.log(btn)
// 通过for循环创建结构  一个li中包含四个div即 四个div作为立方体的四个面
// ul中由多个li拼接成每一个面
createDom();
function createDom() {
    // num为将ul分成100份每份中有四个div  目的在翻转的过程中过渡翻转
    var num = 100, uHtml = '', pHtml = '', tHtml = '';
    var width = Math.floor(solid.offsetWidth / num);
    // console.log(width)
    for (var i = 0; i < num; i++) {
        // 字符串拼接html结构
        uHtml += '<li><div></div><div></div><div></div><div></div></li>';
        // 通过循环设置背景图片 位置
        pHtml += '.solid ul li:nth-child(' + (i + 1) + ') div{background-position-x: ' + (-i * width) + 'px;}';
        // tHtml += '.solid ul li:nth-child(' + (i + 1) + '){transition: 0.8s ' + (0.3 * i / num) + 's}';

    }
    oUl.innerHTML = uHtml;
    css.innerHTML += pHtml + tHtml + '.solid ul li{width:' + width + 'px}';
    bindEvent();
}

function bindEvent() {
    for (var i = 0; i < btn.length; i++) {
        btn[i].index = i;
        btn[i].onclick = function(){
            n = this.index;
            for(var i = 0; i < btn.length ; i ++){
                btn[i].className = '';
            }
            this.className = 'on';
            css.innerHTML += '.solid ul li{transform: translateZ(-180px) rotateX(' + (n * 90) + 'deg);}';
        }
    }
}
