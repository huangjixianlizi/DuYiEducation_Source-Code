var solid = document.getElementsByClassName('solid')[0];
var btn = document.querySelectorAll('ol li');
var oUl = document.getElementsByClassName('oUl')[0];
var css = document.getElementsByTagName('style')[0];
var timer, n = 0;

createDom();
function createDom() {
    var num = 100, uHTML = '', pHTML = '', tHTML = '';
    // 获得到父级宽度
    var allWidth = solid.offsetWidth;
    // var allWidth = parseInt(getComputedStyle(solid, null).width);
    // 父级宽度除以num  计算出来每一个li的宽度
    var width = allWidth / num;
    // 通过for循环 创建num个li   并且将li插入到ul父级中  每一个li中有四个div在css中设置样式四个div分散为立方体的四个面
    for (var i = 0; i < num; i++) {
        uHTML += '<li><div></div><div></div><div></div><div></div></li>';
        // 将每一个li中的所有div的背景图片 平移一定距离  最终拼接展示为整张图片
        pHTML += '.solid ul li:nth-child(' + (i + 1) + ') div{background-position-x: ' + (-i*width) + 'px;}';
        // 为每一个li设置动画过渡
        tHTML += '.solid ul li:nth-child(' + (i + 1) + '){transition: 0.8s ' + (0.3 * i / num) + 's}';
    }
    // 将生成的li结构插入到ul中
    oUl.innerHTML = uHTML;
    // 为li及li下div设置宽高  拼接到style设置的css中
    css.innerHTML += pHTML + tHTML  + '.solid ul li, .solid ul li div{width:' + width + 'px;height:100%}';
    bindEvent();
    play();
}

// 为每一个小圆点绑定点击事件
function bindEvent() {
    // 将每一个圆点绑定上事件
    for (var i = 0; i < btn.length; i++) {
        // 在每一个按钮上加上一个index属性记录
        btn[i].index = i;
        // 为每一个按钮绑定事件
        btn[i].onclick = function () {
            // 获得到存在每一个按钮上的索引
            n = this.index;
            // 先将每一个按钮清空class类名
            for (var i = 0; i < btn.length; i++) {
                btn[i].className = '';
            }
            // 为当前点击的按钮添加on class类名
            this.className = 'on';
            // 按照点击按钮绕着x轴旋转整体ul中的li  角度为n*90
            css.innerHTML += '.solid ul li{transform: translateZ(-180px) rotateX(' + (n * 90) + 'deg);}';
        }
    };
    // 鼠标移入 清除定时器
    solid.onmouseenter = function () {
        clearInterval(timer);
    };
    // 鼠标移走  进行自动播放
    solid.onmouseleave = function () {
        play();
    };
}

// 自动播放
function play() {
    // 每次先清除定时器
    clearInterval(timer);
    // 设置定时器
    timer = setInterval(function () {
        // n计数++
        n++;
        // 当n超过4时  n取除以4取余的数
        n %= 4;
        // 进行设置动画
        for (var i = 0; i < btn.length; i++) {
            btn[i].className = '';
        }
        btn[n].className = 'on';
        css.innerHTML += '.solid ul li{transform: translateZ(-180px) rotateX(' + (n * 90) + 'deg);}';
    }, 4000);
}            