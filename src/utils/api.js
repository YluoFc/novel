import axios from "axios";
import {Message} from 'element-ui';
import router from "@/router";

// 请求拦截器（用于获取token，写入后续的请求中）
axios.interceptors.request.use(config=>{
    if (window.sessionStorage.getItem('tokenStr')){
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
},error => {
    console.error(error);
})

// 响应拦截器（用于判断请求是否成功，及其对应的弹窗提示）
axios.interceptors.response.use(success=>{

    // 业务逻辑返回值可以后续确定，此处先暂时定义500为业务逻辑错误
    if (success.status && success.status === 200){
        if (success.data.code === 500){
            Message.error({message:success.data.message})
            return;
        }else if (success.response.code === 401){
            Message.error({message:'请先登录！'})
            router.replace('/');
        }
        if (success.data.message){
            Message.success({message:success.data.message});
        }
    }
    return success.data;
},error => {
    if (error.response.code === 404 || error.response.code === 504){
        Message.error({message:'服务器出错！'})
    }else if (error.response.code === 403){
        Message.error({message:'无请求权限'})
    }else {
        if (error.response.data.message){
            Message.error({message:error.response.data.message})
        }else {
            Message.error({message:'未知错误！'})
        }
    }
    return;
});

let baseUrl = '';

export const postRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${baseUrl}${url}`,
        data: params
    })
}