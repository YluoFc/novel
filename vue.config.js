let proxyObj ={}

proxyObj['/']={
    ws:false,
    // 目标地址
    target:'',
    // 发送的请求头中host地址改为target
    change:true,

    // 是否需要重写请求地址
    pathRewrite:{}
}

module.exports = {
    devServer:{
        // 请求地址
        host:'localhost',
        // 端口号
        port:'8080',
        // 代理转发
        proxy:proxyObj
    }
}