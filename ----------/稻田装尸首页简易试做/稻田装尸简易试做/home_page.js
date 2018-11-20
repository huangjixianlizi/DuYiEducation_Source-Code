$(document).ready(function(){
	// 轮播
	
	/* 设置第一张图片 */
	$(".slider .bd li").first().before($(".slider .bd li").last());
	
	/* 鼠标悬停箭头按钮显示 */
	$(".slider").hover(function(){
		$(this).find(".arrow").stop(true,true).fadeIn(300)
	},function(){
		$(this).find(".arrow").fadeOut(300)
	});
	
	/* 滚动切换 */
	$(".slider").slide({
		titCell:".hd ul", 
		mainCell:".bd ul", 
		effect:"leftLoop",
		autoPlay:true, 
		vis:3,
		autoPage:true, 
		trigger:"click"
	});



	function pr() {
	var R=document.getElementById("side");
	var L=document.getElementById("main");
	if (R.className=="sidebar")
		{
			R.className="widget-area";
			L.className="content-area";
		}
	else
		{
			R.className="sidebar";
			L.className="primary";
		}
	}


	//轮换图片
	var abc = document.getElementsByClassName('line');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var btn = document.getElementsByClassName('btn');
	var len = abc.length;
	console.log(typeof abc,abc);
	var timer = null;
	var sort = [];
	var flag = true;
	var width = abc[0].getBoundingClientRect().width;
	function init() {
	    sort = Array.prototype.slice.call(abc);
	    setUp(sort);
	    bindEvent();
	    move();
	}
	init();
	function setUp(arr) {
	    var len = arr.length;
	    var center = Math.floor(arr.length / 2);
	    arr[center].style.transform = 'scale(1.2)';
	    arr[center].style.zIndex = 4;
	    for (var i = 0; i < len; i++) {
	        var abs = Math.abs(i - center);
	        if (i != center) {
	            arr[i].style.zIndex = -abs,
	                arr[i].style.transform = 'translateX(' + (i - center) * width / 2 + 'px)';
	        };
	        flag = true;
	    }
	}
	function bindEvent() {
	    if (flag) {
	        prev.addEventListener('click', function () {
	            flag = false;
	            sort.unshift(sort.pop())
	            setUp(sort);
	        });
	        next.addEventListener('click', function () {
	            flag = false;
	            sort.push(sort.shift());
	            setUp(sort)
	        });
	    }
	    for (var i = 0; i < btn.length; i++) {
	        btn[i].addEventListener('mouseenter', function () {
	            clearInterval(timer);
	        });
	        btn[i].addEventListener('mouseout', function () {
	            move();
	        });
	    }
	};
	function move() {
	    clearInterval(timer);
	    timer = setInterval(function () {
	        sort.push(sort.shift());
	        setUp(sort)
	    }, 2000);
	}


});

