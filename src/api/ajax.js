import axios from 'axios'; 
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,respect)=>{
        let promise;
        if(type==='GET'){
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            // 如果成功了, 调用 resolve(response.data)
            resolve(response.data)
        })
        promise.catch(error=>{// 对所有 ajax 请求出错做统一处理, 外层就不用再处理错误了
            message.error("失败了"+error.message);
        })
        
    })
        
}