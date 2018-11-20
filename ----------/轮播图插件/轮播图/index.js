function init() {
    bindEvent();
    sliderAuto();
}
init();
var nowIndex = 0;
var len = 5;
var itemWidth = 520;
var timer = undefined;
var flag = true;
function bindEvent() {
    $('.order li').add('.prevBtn').add('.nextBtn').on('click', function () {
        if ($(this).attr('class') == 'prevBtn') {
            move('prev');
        } else if ($(this).attr('class') == 'nextBtn') {
            move('next');
        } else {
            var index = $(this).index();
            move(index);
        }
        changeStyle();
    });
    $('.wrapper').on('mouseenter', function () {
        $('.btn').show();
        clearTimeout(timer);
    }).on('mouseleave', function () {
        $('.btn').hide();
        sliderAuto();
    })
}
// 自动轮播
function sliderAuto() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        move('next');
        changeStyle();
    }, 2000);
}
function move(dir) {
    if (flag) {
        flag = false;
        if (dir == 'prev' || dir == 'next') {
            if (dir == 'prev') {
                if (nowIndex == 0) {
                    $('.imgBox').css({ left: -(len * itemWidth) });
                    nowIndex = len - 1;
                } else {
                    nowIndex = nowIndex - 1;
                }
            } else {
                if (nowIndex == 4) {
                    $('.imgBox').animate({ left: -(itemWidth * len) }, function () {
                        $(this).css({ left: 0 });
                        sliderAuto();
                        flag = true;
                    })
                    nowIndex = 0;
                } else {
                    nowIndex = nowIndex + 1;
                }
            }
        } else {
            nowIndex = dir;
        }
        slider();
    }
}
function changeStyle() {
    $('.active').removeClass('active');
    $('.order li').eq(nowIndex).addClass('active');
}

function slider() {
    $('.imgBox').animate({ left: -(itemWidth * nowIndex) }, function () {
        sliderAuto();
        flag = true;
    });
}