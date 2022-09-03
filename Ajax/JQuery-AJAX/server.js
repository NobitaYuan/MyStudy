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

// jQuery 服务
app.get('/jquery-server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    const data = {
        names: 'NobitaYuan',
        years: '21'
    }
    let str = JSON.stringify(data);
    response.send(str);
})
app.post('/jquery-server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send('hello jquery ajax post');
})

// axios服务
// app.get('/axios-server', (request, response) => {
//     // 设置响应头 设置允许跨域
//     response.setHeader('Access-Control-Allow-Origin', '*')
//     const data = {
//         names: 'NobitaYuan',
//         years: '21',
//         type:'axios'
//     }
//     let str = JSON.stringify(data);
//     response.send(str);
// })
app.all('/axios-server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置响应头，允许自定义响应头字段
    response.setHeader('Access-Control-Allow-Headers', '*')
    const data = {
        names: 'NobitaYuan',
        years: '21',
    }
    let str = JSON.stringify(data);
    response.send(str);
})

// fetch
app.all('/fetch-server', (request, response) => {
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置响应头，允许自定义响应头字段
    response.setHeader('Access-Control-Allow-Headers', '*')
    const data = {
        names: 'NobitaYuan',
        years: '21',
    }
    let str = JSON.stringify(data);
    response.send(str);
})

// jsonp
app.all('/jquery-jsonp-server', (request, response) => {
    const data = {
        name: 'NobitaYuan',
        years: '21',
        city:['北京','上海','长沙']
    }
    let str = JSON.stringify(data);
    let cb = request.query.callback;
    // 返回结果
    response.end(`${{cb}}(${{str}})`);
})

// 4.监听端口启动服务
app.listen(8000, () => {
    console.log('服务已经启动,8000端口监听中....')
})