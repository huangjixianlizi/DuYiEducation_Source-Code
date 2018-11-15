

var nowIndex = 0,  //当前展示的图片的索引
    w = $('.wrapper').width(),   //单张图片的宽度
    len = $('.item').length,     //展示的图片的张数
    slider_timer = undefined,    //定时器
    flag = true;   //加锁，防止疯狂点击

//初始化方法
function init() {
    bindEvent();
    slide_auto();
}

init();

//绑定点击事件和鼠标事件
function bindEvent() {
    $('.prevBtn').add($('.nextBtn')).add($('.item')).on('click', function () {
        if ($(this).attr('class') == 'prevBtn'){
            move('prev');
        }else if($(this).attr('class') == 'nextBtn'){
            move('next');
        }else{
            var index = $(this).index();
            move(index);
        }
        changeOrderStyle(nowIndex);
    })

    $('.wrapper').mouseenter(function () {
        $('.btn').css({display: 'block'});
        clearTimeout(slider_timer);

    }).mouseleave(function () {
        $('.btn').css({display: 'none'});
        clearTimeout(slider_timer);
        slide_auto();
    })

    $('.btn a').mouseenter(function () {
        clearTimeout(slider_timer);
        slide_auto();

    }).mouseleave(function () {
        clearTimeout(slider_timer);
    })

}


//移动当前展示图片的方法
function move(direction) {
    if (flag){
        flag = false;
        var showAnimate = true;
        if (direction == 'prev' || direction == 'next'){
            if (direction == 'prev'){
                if (nowIndex == 0){  //如果当前是第一张图片，则先变化到最后一张图片，再动画向左移动一张
                    $('.img-box').css({left: -(w * len)});
                    nowIndex = len-1;

                }else {
                    nowIndex = nowIndex-1;
                }

            }else {
                if (nowIndex == 4){  //如果当前是倒数第二张图片，则先动画向右移动一张，再变化到第一张图片
                    showAnimate = false;
                    $('.img-box').animate({left: -(w * len)}, function () {
                        $(this).css({left: 0});
                        clearTimeout(slider_timer);
                        slide_auto();
                        flag = true;
                    })
                    nowIndex = 0;
                }else {
                    nowIndex = nowIndex + 1;
                }

            }
        }else {
            nowIndex = direction;
        }

        if (showAnimate){
            $('.img-box').animate({left: -(w * nowIndex)}, function () {
                clearTimeout(slider_timer);
                slide_auto();
                flag = true;
            })
        }

    }
}

//每次变化，改变小圆点的样式
function changeOrderStyle(index) {
    $('.active').removeClass('active');
    $('.item').eq(index).addClass('active');
}

//设置自动轮播的动画
function slide_auto() {
    slider_timer = setTimeout(function () {
        move('next');
        changeOrderStyle(nowIndex);
    }, 3000)

}


