// load 等页面内容全部加载完毕才会执行，包含页面dom元素图片 flash css等等
// DOMContentLoaded 是DOM加载完毕就会执行，不包含图片 falsh css等就可以执行加载速度比load更快一些

window.addEventListener('DOMContentLoaded',function(){
    var preview_img = document.querySelector('.preview_img')
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1. 当我们鼠标经过 preview_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
    preview_img.addEventListener('mouseover', function(){
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove',function(e){
        // 鼠标在盒子内的位移值
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x,y);
        // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
        // (3) 我们mask 移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // (4) 如果x 坐标小于0 就让他停在0 的位置
        // 遮挡层的最大移动距离
        if(maskX <= 0 ){
            maskX = 0
            // ↓ 此公式代表遮挡层在大盒子里的最大x位移距离
        }else if(maskX >= preview_img.offsetWidth-mask.offsetWidth){
            maskX = 100
        }
        if(maskY <= 0){
            maskY = 0;
            // ↓ 此公式代表遮挡层在大盒子里的最大y位移距离
        }else if(maskY >= preview_img.offsetHeight-mask.offsetHeight){
            maskY = 100
        }
        //遮挡层进行位移
        mask.style.left = maskX +'px'
        mask.style.top = maskY +'px'

        // 3. 大图片的移动
        // 获取大图对象
        var bigImg = document.querySelector('.bigImg')
        //大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        //遮挡层的最大移动距离x,y
        var maskMaxx = preview_img.offsetWidth-mask.offsetWidth;
        var maskMaxy = preview_img.offsetHeight-mask.offsetHeight;
        // 大图片最大移动距离x,y
        var bigMaxx = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxy = bigImg.offsetHeight - big.offsetHeight;
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMaxx / maskMaxx;
        var bigY = maskY * bigMaxy / maskMaxy;

        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
    
})


/* window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1. 当我们鼠标经过 preview_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove', function(e) {
        // (1). 先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
        // (3) 我们mask 移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // (4) 如果x 坐标小于了0 就让他停在0 的位置
        // 遮挡层的最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图
        var bigIMg = document.querySelector('.bigImg');
        // 大图片最大移动距离
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';

    })

}) */