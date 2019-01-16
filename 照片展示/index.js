var wrap = $('.wrapper');

setTimeout(function(){
    wrap.removeClass('init');
},200);


// active--->width(16%--->100%)   :not(.active) (width:0% hieght:0%)
$('li').on('click',function(){
    $(this).addClass('active');
    wrap.addClass('wrap-active');
});
$('.close').on('click',function(e){
    e.stopPropagation();
    console.log(111)
    $('.active').removeClass('active');
    wrap.removeClass('wrap-active');
})