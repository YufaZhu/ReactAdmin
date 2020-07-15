import {SET_HEADER_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from './action-type'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'

//设置头部标题的同步action
export const setHeaderTitle = (headTitle)=>({type:SET_HEADER_TITLE,data:headTitle})

//用来接收用户信息的同步action
export const receiveUser = (user) =>({type:RECEIVE_USER,user})

//显示错误信息的同步action
export const showErrowMsg = (errorMsg) =>({type:SHOW_ERROR_MSG,errorMsg})

//退出登陆的同步action
export const logout = () => {
    //删除local中的user
    storageUtils.removeUser()
    //返回action对象
    return {type:RESET_USER}
} 

//登陆的异步action
export const login = (username,password) => {
    return async dispatch =>{
        //1.执行异步ajax请求
        const result = await reqLogin(username,password)
        //2.1如果成功，分发成功的同步action
        if(result.status===0){
            const user = result.data
            //保存到local中
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{   //2.2如果失败，分发失败的同步action
            const msg = result.msg
            dispatch(showErrowMsg(msg))
        }
    }
}
