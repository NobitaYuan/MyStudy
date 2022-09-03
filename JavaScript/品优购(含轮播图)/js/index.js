
window.addEventListener('load', function () {
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus')
    // 焦点图宽度
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        //清除定时器
        clearInterval(timer);
        timer = null; // 清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        //添加定时器
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建li
        var li = document.createElement('li');
        li.index = i;
        ol.appendChild(li)
    };
    //ol里的第一个li设置为选中
    ol.children[0].className = 'currentC';

    //点击圆点，图片滚动
    //点击事件优化:利用事件委托
    ol.addEventListener('click', function (e) {
        if (e.target != ol) {
            for (var j = 0; j < ul.children.length - 1; j++) {
                ol.children[j].className = ''
            }
            console.log(e.target.index);
            num = e.target.index
            circleIndex = e.target.index
            e.target.className = 'currentC'
            //更改样式的同时移动图片

            animate(ul, -e.target.index * focusWidth, function () { })
        }
    })
    //复制第一张图片
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
    //点击箭头，图片滚动
    // num控制图片滚动
    var num = 0;
    // circleIndex控制圆点滚动
    var circleIndex = 0;

    // 添加一个节流阀
    var flag = true;

    // 右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到了最后复制的一张图片，此时ul要快速复原
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++;
            animate(ul, -num * focusWidth, function () {flag = true;})
            //点击箭头，小圆圈跟随变化
            circleIndex++;
            if (circleIndex == ol.children.length) {
                circleIndex = 0
            }
            changeCircle();
        }
    })
    // 左侧按钮
    arrow_l.addEventListener('click', function () {
        if(flag){
            flag = false
            //如果走到了第一张图片，此时ul要快速复原
        if (num == 0) {
            ul.style.left = -(ul.children.length - 1) * focusWidth + 'px'
            num = ul.children.length - 1
        }
        num--;
        animate(ul, -num * focusWidth, function () {flag = true; })
        //点击箭头，小圆圈跟随变化
        circleIndex--;
        if (circleIndex < 0) {
            circleIndex = ol.children.length - 1
        }

        changeCircle();
        }
    })
    function changeCircle() {
        //清除其他小圆点,将当前圆点设置为选中
        for (var j = 0; j < ul.children.length - 1; j++) {
            ol.children[j].className = ''
        }
        ol.children[circleIndex].className = 'currentC'
    }


    //添加定时器
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
})