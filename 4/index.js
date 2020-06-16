// 弹幕定时器
var timers = [];

// 控制弹幕显隐变量
var isShow = true;

// 监听发送按钮
$(".send").on("click", function () {
    // 创建弹幕
    var jqueryDom = createScreenbullet($("#screenBulletText").val());
    // 添加定时任务
    addInterval(jqueryDom);
});

// Enter按钮监听
$("#screenBulletText").on("keydown", function (event) {
    if (event.keyCode == 13) {
        // 创建弹幕
        var jqueryDom = createScreenbullet($("#screenBulletText").val());
        // 添加定时器
        addInterval(jqueryDom);
    }
});

// 监听关闭弹幕按钮
$(".clear").on("click", function () {
    if (isShow) {
        $(".bullet").css("opacity", 0);
        isShow = false;
    } else {
        $(".bullet").css("opacity", 1);
        isShow = true;
    }   
});

// 新建一个弹幕
function createScreenbullet(text) {
    var jqueryDom = $("<div class='bullet'>" + text + "</div>");
    var fontColor = getRandomColor();
    var fontSize = Math.floor((Math.random() + 1) * 24) + "px";
    var left = $(".container").width() + "px";
    var top = Math.floor(Math.random() * 550) + "px";
    top = parseInt(top) > 552 ? "552px" : top;
    jqueryDom.css({
        "position": 'absolute',
        "color": fontColor,
        "font-size": fontSize,
        "left": left,
        "top": top,
        "white-space": 'nowrap'
    });
    $(".container").append(jqueryDom);
    return jqueryDom;
}

//获取随机颜色
function getRandomColor(){
    return '#' + (function(h){    
        return new Array(7 - h.length).join("0") + h   
    }    
    )((Math.random() * 0x1000000 << 0).toString(16))    
}

// 为弹幕添加定时任务
function addInterval(jqueryDom) {
    var left = jqueryDom.offset().left - $(".container").offset().left;
    var timer = setInterval(function () {
        left--;
        jqueryDom.css("left", left + "px");
        if (jqueryDom.offset().left + jqueryDom.width() < $(".container").offset().left) {
            jqueryDom.remove();
            clearInterval(timer);
        }
    }, 10);
    timers.push(timer);
}
