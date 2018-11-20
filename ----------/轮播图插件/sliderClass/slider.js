// 具体实现扩展轮播图插件 sliderImg
// 放在一个父级中id名为swiper  具有宽高 
// 
// $('#swiper').sliderImg({
//     image: ['./image/pic1.jpg', './image/pic2.jpg', './image/pic3.jpg'],
// interVal: 2000,
// });

(function () {
    function Swiper(opt) {
        // 合并参数
        var opts = $.extend({ 'image': [], 'interVal': 2000 }, opt);
        this.img = opts.image;
        this.wrap = opts.father;
        this.interVal = opts.interVal;
        this.init();
    }
    Swiper.prototype.init = function () {
        this.nowIndex = 0;
        this.len = this.img.length;
        this.itemWidth = this.wrap.width();
        this.timer = undefined;
        this.flag = true;
        // 创建并且插入dom元素
        this.creatDom();
        // 点击事件
        this.bindEvent();
        // 自动轮播
        this.sliderAuto();
    }
    Swiper.prototype.creatDom = function () {
        var len = this.len;
        var str = '';
        var listStr = '';
        var w = this.wrap.width();
        var h = this.wrap.height();
        var ulW = w * (len + 1);
        var imgBox = $('<ul class="img-box"></ul>');
        var order = $('<div class="order"></div>');
        var list = $('<ul></ul>');
        var btn = '<div class="btn">\
                <a class="prevBtn" href = "javascript:;" > <span>&lt;</span></a>\
                <a class="nextBtn" href="javascript:;"><span>&gt;</span></a>\
        </div> ';
        imgBox.css({
            'width': ulW + 'px',
            'height': h + 'px'
        })
        for (var i = 0; i < len; i++) {
            str += '<li><a href="javascript:;"><img src="' + this.img[i] + '" alt=""></a></li>';
            listStr += '<li></li>';
        }
        str += '<li><a href="javascript:;"><img src="' + this.img[0] + '" alt=""></a></li>';
        $(listStr).appendTo(list);
        this.wrap.append(imgBox.html(str))
            .append(btn)
            .append(order.append(list));
        imgBox.find('li').css({
            'width': w + 'px',
            'height': h + 'px'
        });
        $('.order li').eq(0).addClass('active');
    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.order li').add('.prevBtn').add('.nextBtn').on('click', function () {
            if ($(this).attr('class') == 'prevBtn') {
                self.move('prev');
            } else if ($(this).attr('class') == 'nextBtn') {
                self.move('next');
            } else {
                var index = $(this).index();
                self.move(index);
            }
            self.changeStyle();
        });
        self.wrap.on('mouseenter', function () {
            $('.btn').show();
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            $('.btn').hide();
            self.sliderAuto();
        })
    }
    Swiper.prototype.sliderAuto = function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.move('next');
            self.changeStyle();
        }, self.interVal);
    }
    Swiper.prototype.move = function (dir) {
        var self = this;
        var len = self.len;
        if (self.flag) {
            self.flag = false;
            if (dir == 'prev' || dir == 'next') {
                if (dir == 'prev') {
                    if (self.nowIndex == 0) {
                        $('.imgBox').css({ left: -(len * self.itemWidth) });
                        self.nowIndex = len - 1;
                    } else {
                        self.nowIndex = self.nowIndex - 1;
                    }
                } else {
                    // len-1代表最后一张展示图片的索引
                    if (self.nowIndex == len - 1) {
                        $('.imgBox').animate({ left: -(self.itemWidth * len) }, function () {
                            $(this).css({ left: 0 });
                            self.sliderAuto();
                            self.flag = true;
                        })
                        self.nowIndex = 0;
                    } else {
                        self.nowIndex = self.nowIndex + 1;
                    }
                }
            } else {
                self.nowIndex = dir;
            }
            self.slider();
        }
    }
    Swiper.prototype.changeStyle = function () {
        $('.active').removeClass('active');
        $('.order li').eq(this.nowIndex).addClass('active');
    }

    Swiper.prototype.slider = function () {
        var self = this;
        $('.img-box').animate({ left: -(self.itemWidth * self.nowIndex) }, function () {
            self.sliderAuto();
            self.flag = true;
        });
    }
    $.fn.extend({
        sliderImg: function (options) {
            // console.log(options);
            // console.log(this);
            options.father = this || $('body');
            new Swiper(options);
        }
    })
})();