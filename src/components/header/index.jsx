import React, { Component } from 'react';
import './index.less'
import {formateDate} from './../../utils/dateUtils'
import memoryUtils from './../../utils/memoryUtils'
import storageUtils from './../../utils/storageUtils'
import {reqWeather} from './../../api'
import {withRouter} from 'react-router-dom'
import menuList from './../../config/menuConfig';
import {Modal} from 'antd'
import LinkButton from './../../components/link-button'
import {connect} from 'react-redux'

class Header extends Component {

    state={
        currentTime :formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }

    getTime=()=>{
        this.intervalId=setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather=async()=>{
        const {dayPictureUrl,weather} = await reqWeather('北京')
        this.setState({
            dayPictureUrl:dayPictureUrl,
            weather:weather
        })
    }

    getTitle=()=>{
        const path = this.props.location.pathname
        let title;
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title
            }else if(item.children){
                const cItem = item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title;
    }

    logOut=()=>{
        Modal.confirm({
            content: '确定要退出吗？',
            onOk:()=> {
                storageUtils.removeUser();
                memoryUtils.user={}
                this.props.history.replace('/login')
            }
          });
    }

    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    
    render() { 
        const {currentTime,dayPictureUrl,weather} = this.state
        const username = memoryUtils.user.username
        //const title = this.getTitle()
        //用redux的方式实现
        const title = this.props.headTitle
        return ( 
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <span>{title}</span>
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default connect(
    state=>({headTitle:state.headTitle}),
    {}
)(withRouter(Header));
