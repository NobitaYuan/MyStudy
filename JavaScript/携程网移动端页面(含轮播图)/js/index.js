window.addEventListener('load', function () {
    var focous = document.querySelector('.focous');
    var ul = focous.children[0];
    var ol = focous.children[1];
    //获得focus的宽度
    var w = focous.offsetWidth;
    //2.利用定时器自动轮播图片
    var index = 0
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + translatex + 'px)'
    }, 2000);
    //等过渡完成后
    ul.addEventListener('transitionend', function () {
        //无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉孤独效果，让ul快速的调回第一张
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度，快速跳到第二张
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)'
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度，快速跳到第二张
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }
        //3.小圆点变化
        ol.querySelector('.current').classList.remove('current')
        ol.children[index].classList.add('current')
    })

    //4.手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    //
    flag = false;
    //触摸元素touchstart:获取手指初始坐标
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer)
    })
    //移动手指 touchmove:计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        //计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        //移动盒子
        var translatex = -index * w + moveX;
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + translatex + 'px)'
        flag = true;
        e.preventDefault();
    })
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            //如果移动距离大于50px我们就播放上一张或者下一章
            if (Math.abs(moveX) > 50) {
                //如果是右滑就是播放上一张,movex是正值
                if (moveX > 0) {
                    index--;
                }
                //如果是左滑就是播放下一张,movex是负值
                else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .5s'
                ul.style.transform = 'translateX(' + translatex + 'px)'
            } else {
                //如果小于50就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .5s'
                ul.style.transform = 'translateX(' + translatex + 'px)'
            }
            flag = false;
        }
        //手指离开就重新开启定时器
        clearInterval(timer)
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }, 2000);
    })

    //返回顶部模块
    var goback = document.querySelector('.goBack')
    var nav = document.querySelector('nav')
    window.addEventListener('scroll',function(){
        // console.log(window.pageYOffset,nav.offsetTop);
        if(window.pageYOffset >= nav.offsetTop){
            goback.style.display = 'block'
        }else{
            goback.style.display = 'none'
        }
    })
    goback.addEventListener('click',function(){
        scroll(0,0)
    })
})