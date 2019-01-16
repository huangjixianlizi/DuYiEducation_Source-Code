function Index(mus) {
    this.music = mus.music;
    this.dom = {
        sun: $('.sun'),
        moon: $('.moon'),
        audio: $('audio'),
        perc: $('.per')
    }
    this.drag = false;
    this.top = this.dom.moon.offset().top - $('.wrapper').offset().top;
    this.radius = parseInt(this.dom.moon.css('width')) * 0.5;
    this.init();
}
Index.prototype.init = function () {
    var source = $('<source src = "' + this.music + '"></source>');
    this.dom.audio.append(source);
    this.bindEvent();
    this.change(0);
}
Index.prototype.bindEvent = function () {
    var self = this;
    var moon = self.dom.moon;
    var radius = self.radius;
    var coords = [0, 0];
    var dis = [0, 0];
    var location = [0, 0];
    moon.on('mousedown', function (e) {
        self.drag = true;
        coords = [e.clientX, e.clientY];
        dis = [coords[0] - moon.offset().left, coords[1] - moon.offset().top];
    });
    $('body').on('mousemove', function (e) {
        if (!self.drag) {
            return;
        }
        location = [e.clientX - dis[0] - $('.wrapper').offset().left, e.clientY - dis[1] - $('.wrapper').offset().top];
        moon.css({
            'left': location[0],
            'top': self.top
        });
        self.getVoice()
    });
    $('body').on('mouseup', function () {
        self.drag = false;
    });
}
Index.prototype.getVoice = function () {
    var self = this;
    var per,
        d = 2 * self.radius,
        moonL = self.dom.moon.offset().left,
        moonR = moonL + d,
        sunL = self.dom.sun.offset().left,
        sunR = sunL + d;
    if (sunL > moonR || moonL > sunR) {
        per = 0;
    } else {
        if (sunL < moonL) {
            per = (sunR - moonL) / d;
        } else if (moonR >= sunL) {
            per = (moonR - sunL) / d;
        }
    }
    self.change(per);
}
Index.prototype.change = function (per) {
    var self = this;
    self.dom.audio[0].volume = per;
    self.dom.perc.html("Volume: " + (per * 100).toPrecision(4) + "%");
    self.dom.moon.css({
        'background': "hsl(194, 56%, " + (1 - per) * 60 + "%)"
    })
    $('body').css({
        'background': "hsl(" + (194 + Math.floor(166 * per)) + ", 66%, " + (1 - per) * 50 + "%)"
    })
}
new Index({ 'music': 'http://jq22.qiniudn.com/2_01.mp3' })