import React, { Component } from 'react';
import { Form, Tree, Input } from 'antd'
import PropsTypes from 'prop-types'
import menuList from '../../config/menuConfig'

const Item = Form.Item;
const { TreeNode } = Tree;

class AuthForm extends Component {

    static PropsTypes = {
        role: PropsTypes.object
    }

    constructor(props) {
        super(props)

        const { menus } = this.props.role

        this.state = {
            checkedKeys: menus
        }
    }

    /*为父组件提交获取最新 menus 数据的方法*/

    getMenus = () => this.state.checkedKeys

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key} >
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre;
        }, [])
    }

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)
    }

    // 根据新传入的 role 来更新 checkedKeys 状态
    /*当组件接收到新的属性时自动调用*/
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps()', nextProps)
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
        // this.state.checkedKeys = menus
    }

    render() {
        const { role } = this.props
        const { checkedKeys } = this.state
        const formItemLaypout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        };
        return (
            <div>
                <Item label='角色名称' {...formItemLaypout}>
                    <Input value={role.name} disabled />
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title='平台权限' key='all'>
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>
        );
    }
}

export default AuthForm;