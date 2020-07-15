/*后台管理主路由组件
*/
import React, {Component} from 'react'
//import memoryUtils from '../../utils/memoryUtils'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import Header from './../../components/header'
import LeftNav from './../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import {connect} from 'react-redux'


const { Footer, Sider, Content } = Layout;
class Admin extends Component {
    render () {
        //const user = memoryUtils.user
        const user = this.props.user
        if(!user || !user._id){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:20,backgroundColor: 'white'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {}
)(Admin)
