/*用户登陆的路由组件
*/
import React, { Component } from 'react'
import logo from './../../assets/images/logo.png'
import './login.less'
import {
    Form,
    Input,
    Icon,
    Button,
    message
} from 'antd'
// import {reqLogin} from './../../api'
// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from './../redux/actions'

const Item = Form.Item
class Login extends Component {
   
    login= (e) => {
        // 阻止事件默认行为(不提交表单)
        e.preventDefault()
        // 进行表单所有控件的校验
        this.props.form.validateFields(async (err, values) => {
        // 检验成功
        if (!err) {
            //redux的方式实现
            this.props.login(username,password)
            // // console.log('提交登陆的 ajax 请求', values)
            // const {username, password} = values
            // const result = await reqLogin(username, password)
            // // console.log('login()', result)
            // if(result.status === 0) {
            //     // 提示登录成功
            //     message.success('登录成功', 2)
            //     // 保存用户登录信息,保存到内存中,但是并不能永久保存，一旦刷新，状态就会丢失，所以还要保存到本地
            //     const user = result.data
            //     memoryUtils.user = user 
            //     //保存到本地
            //     storageUtils.saveUser(user)
            //     // 跳转到主页面
            //     this.props.history.replace('/')
            // } else {
            //     // 登录失败, 提示错误
            //     message.error(result.msg)
            // }

        } else {
        console.log('检验失败!')
        }
    })
}

    //自定义表单的校验规则
    validator=(rule, value, callback)=>{
        if(!value){
            // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
            callback('必须输入密码')
        }else if(value.length<4){
            callback('密码必须大于 4 位')
        }else if (value.length > 12) {
            callback('密码必须小于 12 位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数组或下划线组成')
        }else{
            callback() // 必须调用 callback
        }
    }
    render() {
        // 如果用户已经登陆, 自动跳转到 admin
        const user = this.props.user
        if (user && user._id) {
            return <Redirect to='/home'/>
        }

        const errorMsg = this.props.user.errorMsg
        // if (memoryUtils.user && memoryUtils.user._id) {
        //     return <Redirect to='/'/>
        // }
        const form = this.props.form
        const {getFieldDecorator} = form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <div className={user.errorMsg ? 'error-msg show':'error-msg'}>{errorMsg}</div>
                    <h3>用户登陆</h3>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username',{
                                rules:[
                                    { required: true, whitespace: true, message: '必须输入用户名'},
                                    {min:4,message:'用户名必须大于 4 位'},
                                    {max:12,message:'用户名必须小于 12 位'},
                                    {pattern:/^[a-zA-Z0-9_]+$/, message:'用户名必须是英文、数组或下划线组成'}
                                ]
                                })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名" />,
                                )
                            }
                            
                        </Item>
                        <Item>
                        {
                            getFieldDecorator('password',{
                            rules:[
                                // 自定义表单校验规则
                                {validator: this.validator}
                            ]
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password" placeholder="密码" />,
                            )
                        }
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
//为了拿到antd Form表单里强大的form参数
const WarpLogin = Form.create()(Login)
export default connect(
    state=>({user:state.user}),
    {login}
)(WarpLogin);
