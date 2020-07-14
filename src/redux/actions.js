import {SET_HEAD_TITLE} from './action-type'

//设置头部标题的同步action
export const setHeadTitle = (headTitle)=>({type:SET_HEAD_TITLE,data:headTitle})
