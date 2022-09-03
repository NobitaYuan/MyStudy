// 1.引入express
const express = require('express')

// 2.创建应用对象
const app = express();

// 3.创建路由规则
// reuqest 是对请求报文的封装
// response 是对响应报文的封装
// app.all('/server',(request,response)=>{
//     // 设置响应头 设置允许跨域
//     response.setHeader('Access-Control-Allow-Origin','*')
//     // 设置响应
//     response.send('HELLO AJAX get')
// })
app.all('/json-server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置响应头，允许自定义响应头字段
    response.setHeader('Access-Control-Allow-Headers', '*')

    // 设置一个数据
    const data = {
        names: 'NobitaYuan',
        years: '21'
    }
    let str = JSON.stringify(data);
    // 设置响应
    response.send(str);
})

app.get('/delay', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    setTimeout(() => {
        // 设置响应
        response.send('3s后的延时响应');
    }, 3000);
})

// 4.监听端口启动服务
app.listen(8000, () => {
    console.log('服务已经启动,8000端口监听中....')
})