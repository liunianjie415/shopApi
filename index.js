// node 后端服务器
const GoodsApi = require('./api/GoodsApi')
const GoodstypeApi = require('./api/GoodstypeApi')
const StoreApi = require('./api/StoreApi')
const ProviderApi = require('./api/ProviderApi')
const EmpApi = require('./api/EmpApi')
const DiscountApi = require('./api/DiscountApi')
const SellApi = require('./api/SellApi')
// const fs = require('fs')
// const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
//采用设置所有均可访问的方法解决跨域问题
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})
app.use(bodyParser.json()) // 以json格式返回出去
app.use(bodyParser.urlencoded({ extended: false }))
// 后端api路由
app.use('/api', GoodsApi)
app.use('/api', GoodstypeApi)
app.use('/api', StoreApi)
app.use('/api',ProviderApi)
app.use('/api', EmpApi)
app.use('/api', DiscountApi)
app.use('/api', SellApi)

// 监听端口
app.listen(8888)
console.log('success listen at port:8888......')