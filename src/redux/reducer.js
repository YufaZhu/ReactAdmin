import {SET_HEADER_TITLE,RECEIVE_USER,SHOW_ERROR_MSG，RESET_USER} from './action-type'
import storageUtils from '../utils/storageUtils'
import {combineReducers} from 'redux'

//用来管理头部标题的reducer函数
const initHeaderTitle = '首页'
function headerTitle(state=initHeaderTitle,action){
    switch(action.type){
        case SET_HEADER_TITLE:
            return action.data
        default:
            return state
    }
}

//用来管理当前登录用户的reducer函数
const initUser = storageUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            return {...state,errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    headerTitle,
    user
})
