import React, { Component } from 'react';
import './index.less'
import { Link ,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from './../../assets/images/logo.png'
import menuList from './../../config/menuConfig' 

const { SubMenu } = Menu;
class LeftNav extends Component {

    getMenuNodes = (menuList) =>{
        const path = this.props.location.pathname
        return menuList.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>  
                )
            }else{
                const cItem = item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    this.openKey = item.key
                }
                return(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                    {this.getMenuNodes(item.children)}
                        
                    </SubMenu>
                )
            }
        })
    }
/*在第一次 render()之前执行一次
一般可以在此同步为第一次 render()准备数据
*/
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        
        const path = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className="left-nav">
                <Link to='/home' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    
                 {
                    this.menuNodes
                 }
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav);