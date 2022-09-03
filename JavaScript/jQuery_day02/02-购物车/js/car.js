$(function () {
    //1.全选 全不选功能模块
    $('.checkall').change(function () {
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
        
        // 添加背景
        if($(this).prop("checked")){
            $(".cart-item").addClass("check-cart-item")
        }else{
            $(".cart-item").removeClass("check-cart-item")
        }
    })

    $(".j-checkbox").change(function () {
        //如果拥有属性checked的元素个数等于该元素的总个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true)
        } else {
            $(".checkall").prop("checked", false)
        }

        // 添加背景
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item")
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
    })

    //2. 商品增减模块
    $(".increment").click(function () {
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);

        // 3.修改商品小计模块
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);

        $(this).parent().parent().siblings(".p-sum").html('￥'+(p * n).toFixed(2));

        getSum()

    })
    $(".decrement").click(function () {
        var n = $(this).siblings('.itxt').val();
        if (n > 1) {
            n--;
        }
        $(this).siblings('.itxt').val(n);

         // 3.修改商品小计模块
         var p = $(this).parent().parent().siblings(".p-price").html();
         p = p.substr(1);
 
         $(this).parent().parent().siblings(".p-sum").html('￥'+(p * n).toFixed(2));

         getSum()
    })

    // 4.用户修改文本框的值， 重新计算小计
    $(".itxt").change(function(){
        var n = $(this).val();
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        $(this).parent().parent().siblings(".p-sum").html('￥'+(p * n).toFixed(2));

        getSum()
    })
    getSum()
    // 5.商品总计 和 价格总计
    function getSum(){
        var count = 0 //总件数
        var money = 0 //总价钱

        $(".itxt").each(function(i,ele){
            count += parseInt($(ele).val())
        })
        $(".amount-sum em").text(count);
        
        $(".p-sum").each(function(i,ele){
            money +=parseFloat($(ele).text().substr(1))
        })
        $(".price-sum em").text(money.toFixed(2));
        // console.log(money);
    }

    // 6.删除购物车商品
    // （1）删除单个商品
    $(".p-action a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
    })
    // （2）删除选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // （3）删除所有的商品
    $(".clear-all").click(function(){
        $('.cart-item').remove();
        getSum();
    })
})