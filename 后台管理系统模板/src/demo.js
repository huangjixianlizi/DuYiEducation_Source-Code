// 点击小三角  切换小三角方向 通过切换class名实现
$('#topAD').on('click', function () {
    $('#topA').toggleClass('glyphicon-triangle-right');
    $('#topA').toggleClass('glyphicon-triangle-bottom');
});

// 点击左侧列表 显示右侧相对应区域
$('.list-group-item').on('click', function () {
    $('.list-group-item').removeClass('list-group-item-active');
    $(this).addClass('list-group-item-active');
    var id = $(this).attr('href');
    $('.tab-pane').removeClass('active');
    $(id).addClass('active');
});

// 点击按钮  切换左侧与右侧区域显示状态
$('.toggle-btn').on('click', function () {
    $(".leftMenu").toggleClass("show");
    $(".rightCon").toggleClass("pd0px");
});

