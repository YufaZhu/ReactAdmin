import {SET_HEAD_TITLE} from './action-type'
import storageUtils from '../utils/storageUtils'
import {combineReducers} from 'redux'

//用来管理头部标题的reducer函数
const initHeaderTitle = '首页'
function headTitle(state=initHeaderTitle,action){
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

//用来管理当前登录用户的reducer函数
const initUser = storageUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
        case INCREMENT:
            return state + action.data
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})
