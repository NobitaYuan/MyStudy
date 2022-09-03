//使用时,盒子必须有 定位 属性
//2022/7/24
function animate(obj , target ,callback) {
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer)
            
            // 回调函数写到定时器结束后
            // if(callback){
            //     callback()
            // }
            
            //执行回调函数优化为：短路运算
            callback && callback();
        }
        // 把每次加step 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px'
        console.log(obj.offsetLeft);
    }, 15)
}