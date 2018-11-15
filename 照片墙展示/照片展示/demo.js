var img = document.getElementsByTagName('img');
var btn = document.getElementsByClassName('btn')[0];
var flag = true;
var len = img.length;

bindEvent();
function bindEvent() {
    btn.addEventListener('click', function () {
        if (!flag) {
            return;
        }
        var endNum = 0;
        flag = false;
        for (var i = 0; i < len; i++) {
            // 利用立即执行函数 防止闭包
            (function (i) {
                setTimeout(function () {
                    // 当前这张图片正在执行的动作
                    monition(img[i], '1s', function () {
                        this.style.transform = 'scale(0)';
                        // 当前动作执行完，下一个动作
                    }, function () {
                        monition(this, '1s', function () {
                            this.style.transform = 'scale(1)';
                            this.style.opacity = 0;
                            // 判断是否所有图片都执行完淡出
                        }, function () {
                            endNum++;
                            if (endNum == len) {
                                // 所有图片最后旋转一圈展示
                                show();
                            }
                        });
                    });
                }, Math.random() * 1000);
            })(i);
        }
    })
};

// 封装运动函数，及当前图片运动后的动作
function monition(dom, time, doFun, cb) {
    dom.style.transition = time;
    doFun.call(dom);
    var called = false;
    dom.addEventListener('transitionend', function () {
        if (!called) {
            cb && cb.call(dom);
            called = true;
        }
    })
};

// 实现图片最后旋转展示
function show() {
    var allEnd = 0;
    for (var i = 0; i < len; i++) {
        img[i].style.transition = '';
        img[i].style.transform = 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)';
        (function (i) {
            setTimeout(function () {
                monition(img[i], '2s', function () {
                    this.style.opacity = 1;
                    this.style.transform = 'rotateY(-360deg) translateZ(0)';                   
                },function (){
                    allEnd ++;
                    if(allEnd == len){
                        flag = true;
                    }
                });
            }, Math.random() * 1000)
        })(i);
    }
}
